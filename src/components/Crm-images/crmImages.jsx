import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../Redax/Crm-add-new-product/slices/product-slice";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { ReactComponent as FileIcon } from "../../icons/file.svg";
import { ReactComponent as StarIcon } from "../../icons/star.svg";
import Notiflix from "notiflix";
import styles from "./crmImages.module.scss";


const CrmImages = () => {
  const [fileName, setFileName] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState({});
  const [filesUrl, setFilesUrl] = useState([]);
  const [fileIsOpen, setFileIsOpen] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // function convertFileToBase64(file, callback) {
  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     callback(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // }

  useEffect(() => {
    dispatch(addData({ type: 'images', value: filesUrl}))
  }, [filesUrl, dispatch])

  const cleaningInput = () => {
    fileInputRef.current.value = "";
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      return Notiflix.Notify.info("Максимальна кількість зображень 4");
    }

    if (fileInputRef.current) {
      cleaningInput();
    }
    
    const newFilePreviews = {};
   

    files.forEach((file) => {
      if (!fileName.includes(file.name)) {
        newFilePreviews[file.name] = URL.createObjectURL(file);

          const mainImage = activeFile === file.name; 
          const newFileUrl = {
            description: file.name,
            image_file: newFilePreviews[file.name],
            main_image: mainImage,
        };
        
        setFilesUrl((prev) => [...prev, newFileUrl]);
      }
      else {
        return Notiflix.Notify.warning("Файл з такою назвою вже завантажений");
      }
    });
      
    const newFileNames = files.map((file) => file.name).filter((file) => !fileName.includes(file));
      
    setFilePreviews((prev) => ({ ...prev, ...newFilePreviews }));
      
    setFileName((prev) => [...prev, ...newFileNames.slice(0, 4)]);
  };

  const handleClickDelete = (file) => {
    const delleteFile = fileName.filter((item) => item !== file);
    const delleteFileUrl = filesUrl.filter((item) => item.description !== file);
    console.log(delleteFile);
    const newFilePreviews = { ...filePreviews };
    URL.revokeObjectURL(newFilePreviews[file]);

    if (fileInputRef.current) {
      cleaningInput()
    }

    setFileName(delleteFile);

    !delleteFile.includes(activeFile) && setActiveFile('');
    delete newFilePreviews[file];
    setFilePreviews(newFilePreviews);
    setFilesUrl(delleteFileUrl);
  }
  
  const toggleActiveStar = (file) => {
    setActiveFile(activeFile === file ? null : file)
    
    setFilesUrl(
      filesUrl.map((fileUrl) => {
        return {
          ...fileUrl,
          main_image: fileUrl.description === file,
        };
      })
    );
  };

  const handleMouseDown = (e, file) => setFileIsOpen(file);

  const handleMouseUp = () => setFileIsOpen('');
 

  return (
    <div className={styles.fileWrapper}>
      <input
        ref={fileInputRef}
        name="images"
        type="file"
        id="file"
        multiple
        className={styles.fileInput}
        onChange={handleFileChange}
      />
      <div>
        <h3 className={styles.fileTitle}>
          Завантажені фото
          <span className={styles.fileMax}>(макс 4 по 10 МВ)</span>
        </h3>
        <ul className={styles.fileList}>
          {fileName.map((file) => (
            <li key={file} className={styles.fileLine}>
              <StarIcon
                className={`${styles.starIcon} ${
                  activeFile === file && styles.starIconActive
                }`}
                onClick={() => toggleActiveStar(file)}
              />
              <div className={styles.fileLineWrrap}>
                <div
                  className={styles.fileContentWrrap}
                  onMouseDown={(e) => handleMouseDown(e, file)}
                  onMouseUp={(e) => handleMouseUp(e, file)}
                >
                  <FileIcon className={styles.fileIcon} />
                  <span className={styles.fileName}>{file}</span>
                </div>
                <DeleteIcon
                  className={styles.deleteIcon}
                  onClick={() => handleClickDelete(file)}
                />
              </div>
              {fileIsOpen === file && (
                <img
                  src={filePreviews[file]}
                  alt={file}
                  className={styles.filePreview}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <label
        htmlFor="file"
        className={`${styles.fileLabel} ${
          fileName.length >= 4 && styles.fileLabelDisabled
        }`}
      >
        Завантажити фото
        <PlusIcon
          className={`${styles.plusIcon} ${
            fileName.length >= 4 && styles.plusIconDisabled
          }`}
        />
      </label>
    </div>
  );
};

export default CrmImages;

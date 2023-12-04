import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductId } from "../../Redax/Crm-add-new-product/selectors/Selectors";
import { addImages } from "../../Redax/Crm-add-new-product/operation/Operation";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { ReactComponent as FileIcon } from "../../icons/file.svg";
import { ReactComponent as StarIcon } from "../../icons/star.svg";
import Notiflix from "notiflix";
import styles from "./crmImages.module.scss";


const CrmImages = () => {
  const [activeFile, setActiveFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState({});
  const [filesArr, setFiles] = useState([]);
  const [fileIsOpen, setFileIsOpen] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const productId = useSelector(selectProductId);

  useEffect(() => {
    if (productId ?? filesArr.length > 0) {
      filesArr.map((image) => {
        const formData = new FormData();
        formData.append("image_file", image);
        formData.append("description", image.name);
        formData.append("main_image", image.name === activeFile ? true : false);
        formData.append("product_id", productId);
        dispatch(addImages(formData));
      });
      setActiveFile(null);
      setFilePreviews({});
      setFiles([]);
    }
  }, [productId])

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
      if (!filesArr.some((f) => f.name === file.name)) {
        newFilePreviews[file.name] = URL.createObjectURL(file);

        setFiles((prev) => [...prev, file]);
      } else {
        return Notiflix.Notify.warning("Файл з такою назвою вже завантажений");
      }
    });
      
    setFilePreviews((prev) => ({ ...prev, ...newFilePreviews }));
  };

  const handleClickDelete = (file) => {
    const delletedFiles = filesArr.filter((item) => item.name !== file);
    const newFilePreviews = { ...filePreviews };
    URL.revokeObjectURL(newFilePreviews[file]);

    if (fileInputRef.current) {
      cleaningInput()
    }

    !delletedFiles.some((file) => file.name === activeFile) && setActiveFile("");
    delete newFilePreviews[file];
    setFilePreviews(newFilePreviews);
    setFiles(delletedFiles);
  }
  
  const toggleActiveStar = (file) => {
    setActiveFile(activeFile === file ? null : file)
  };

  const handleMouseDown = (e, file) => setFileIsOpen(file);

  const handleMouseUp = () => setFileIsOpen('');
 

  return (
    <div className={styles.fileWrapper}>
      <input
        ref={fileInputRef}
        accept="image/jpeg, image/png, image/webp, image/heic"
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
          {filesArr.map((file) => (
            <li key={file.name} className={styles.fileLine}>
              <StarIcon
                className={`${styles.starIcon} ${
                  activeFile === file.name && styles.starIconActive
                }`}
                onClick={() => toggleActiveStar(file.name)}
              />
              <div className={styles.fileLineWrrap}>
                <div
                  className={styles.fileContentWrrap}
                  onMouseDown={(e) => handleMouseDown(e, file.name)}
                  onMouseUp={(e) => handleMouseUp(e, file.name)}
                >
                  <FileIcon className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                </div>
                <DeleteIcon
                  className={styles.deleteIcon}
                  onClick={() => handleClickDelete(file.name)}
                />
              </div>
              {fileIsOpen === file.name && (
                <img
                  src={filePreviews[file.name]}
                  alt={file.name}
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
          filesArr.length >= 4 && styles.fileLabelDisabled
        }`}
      >
        Завантажити фото
        <PlusIcon
          className={`${styles.plusIcon} ${
            filesArr.length >= 4 && styles.plusIconDisabled
          }`}
        />
      </label>
    </div>
  );
};

export default CrmImages;

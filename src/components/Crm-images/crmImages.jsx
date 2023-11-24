import { useState, useEffect } from "react";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { ReactComponent as FileIcon } from "../../icons/file.svg";
import { ReactComponent as StarIcon } from "../../icons/star.svg";
import styles from "./crmImages.module.scss";

const CrmImages = () => {
  const [fileName, setFileName] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    if (fileName.length > 4) return setFileName(fileName.slice(0, 4));
  }, [fileName])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name);
    const newFiles = fileName.length === 0 ? files : files.filter((file) => !fileName.includes(file));
    setFileName((prev) => [...prev, ...newFiles]);
  };

  const handleClickDelete = (file) => setFileName(fileName.filter((item) => item !== file))
  
  const toggleActiveStar = (file) => setActiveFile(activeFile === file ? null : file);
  
    
  return (
    <div className={styles.fileWrapper}>
      <input
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
                className={`${styles.starIcon} ${activeFile === file && styles.starIconActive}`}
                onClick={() => toggleActiveStar(file)}
              />
              <div className={styles.fileLineWrrap}>
                <div className={styles.fileContentWrrap}>
                  <FileIcon className={styles.fileIcon} />
                  {file}
                </div>
                <DeleteIcon
                  className={styles.deleteIcon}
                  onClick={() => handleClickDelete(file)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <label
        htmlFor="file"
        className={`${styles.fileLabel} ${fileName.length >= 4 && styles.fileLabelDisabled}`}
      >
        Завантажити фото
        <PlusIcon
          className={`${styles.plusIcon} ${fileName.length >= 4 && styles.plusIconDisabled}`}
        />
      </label>
    </div>
  );
};

export default CrmImages;

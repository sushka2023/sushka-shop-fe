import { useState, useEffect } from 'react'
import PlusIcon from '../../icons/plus.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import FileIcon from '../../icons/file.svg?react'
import StarIcon from '../../icons/star.svg?react'
import styles from './crmImages.module.scss'

const CrmImages = () => {
  const [fileName, setFileName] = useState([])
  const [activeFile, setActiveFile] = useState(null)

  useEffect(() => {
    if (fileName.length > 4) return setFileName(fileName.slice(0, 4))
  }, [fileName])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => {
      return file.name
    })
    const newFiles =
      fileName.length === 0
        ? files
        : files.filter((file) => {
            return !fileName.includes(file)
          })
    setFileName((prev) => {
      return [...prev, ...newFiles]
    })
  }

  const handleClickDelete = (file) => {
    return setFileName(
      fileName.filter((item) => {
        return item !== file
      })
    )
  }

  const toggleActiveStar = (file) => {
    return setActiveFile(activeFile === file ? null : file)
  }

  return (
    <div className={styles.fileWrapper}>
      <input
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
          {fileName.map((file) => {
            return (
              <li key={file} className={styles.fileLine}>
                <StarIcon
                  className={`${styles.starIcon} ${activeFile === file && styles.starIconActive}`}
                  onClick={() => {
                    return toggleActiveStar(file)
                  }}
                />
                <div className={styles.fileLineWrrap}>
                  <div className={styles.fileContentWrrap}>
                    <FileIcon className={styles.fileIcon} />
                    {file}
                  </div>
                  <DeleteIcon
                    className={styles.deleteIcon}
                    onClick={() => {
                      return handleClickDelete(file)
                    }}
                  />
                </div>
              </li>
            )
          })}
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
  )
}

export default CrmImages

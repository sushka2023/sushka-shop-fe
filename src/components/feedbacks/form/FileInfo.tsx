import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import styles from '../Feedbacks.module.scss'


export const FileInfo = ({ file, onDelete }) => {
    const formatFileSize = (size) => {
        if (size === undefined || size === null) {
      return 'Невідомий розмір';
    }
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  while (size > 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
    };
    
  return (
      <div className={styles.fileInfo}>
          <div>
             <PermMediaOutlinedIcon/>
            <div className={styles.fileInfoWrapper}>
                <span>{ file.name}</span>
                  <span>{formatFileSize(file.size)}</span>
              </div>
          </div>
          <button type='button' className={styles.deleteBtn} onClick={onDelete}>
              <DeleteOutlineOutlinedIcon />
          </button>
      </div>
  );
};
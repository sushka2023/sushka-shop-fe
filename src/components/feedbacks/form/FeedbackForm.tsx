import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import { useState } from 'react';
import { FileInfo } from './FileInfo';
import { CustomTextarea } from './CustomTextarea'
const FeedbackForm = () => {

  const [rating, setRating] = useState(0);
  const [file, setFile] = useState('');
  const [fileSelected, setFileSelected] = useState(false);

const handleRatingChange = (value) => {
    setRating(value);
  };
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
  };

  const handleFileChange = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      setFile({
        name: fileInput.files[0].name,
         size: fileInput.files[0].size  });
      setFileSelected(true);
    } else {
      setFile('');
      setFileSelected(false);
    }
  };
  const handleFileDelete = () => {
    setFile('');
    setFileSelected(false);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      <form className={ styles.feedbackForm} onSubmit={handleSubmit}>
        <input type="text" className={styles.feedbackFormInput} />
        <div className={styles.wrapperTextarea}>
        <CustomTextarea maxLength={250}/>
          <label htmlFor="fileInput" className={`${styles.customFileInput } ${fileSelected ? styles.fileSelected : ''}`}>
            <span>Додати фото</span>
            <span className={styles.plusIcon}>+</span>
            <input type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
          </label>
        </div>
        {fileSelected && <FileInfo file={file} onDelete={handleFileDelete} />}
        <div className={styles.submitWrapper}>
           <Rating onRate={handleRatingChange} />
           <button type="submit" className={styles.feedbackFormBtn}>Відправити</button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
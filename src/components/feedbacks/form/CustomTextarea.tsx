import { useState } from 'react';
import styles from '../Feedbacks.module.scss'
export const CustomTextarea = ({ maxLength }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <>
      <textarea
        value={text}
              onChange={handleChange}
              className={styles.feedbackFormTextarea}
        placeholder="Ваш відгук"
      />
      <div className={styles.counter}>
              {text.length}/{maxLength}
      </div>
    </>
  );
};

import React, { useState } from 'react';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import styles from '../Feedbacks.module.scss'
export const Rating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
          index < rating ? (<StarOutlinedIcon key={index} size='24px'  onClick={() => handleStarClick(index + 1)}/>) : (<StarOutlineOutlinedIcon key={index} size='24px' onClick={() => handleStarClick(index + 1)}/>)
      ))}
    </div>
  );
};

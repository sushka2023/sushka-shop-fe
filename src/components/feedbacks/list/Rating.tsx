import { useState } from 'react';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import styles from '../Feedbacks.module.scss'
export const Rating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? <StarOutlinedIcon fontSize="24px" /> : <StarOutlineOutlinedIcon fontSize="24px" />}
        </span>
      ))}
    </div>
  );
};

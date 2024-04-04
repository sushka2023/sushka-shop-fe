import styles from '../Feedbacks.module.scss'

export const HoverPopUp = () => {
  return (
    <div className={styles.wrapperPopUp}>
      <div className={styles.main}>
        <p>Максимальний розмір файлу 10 МВ .png .jpeg .jpg .dng .svg</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
      >
        <path
          d="M8.86603 13.5C8.48113 14.1667 7.51888 14.1667 7.13398 13.5L0.20577 1.5C-0.179131 0.833334 0.301994 0 1.07179 0L14.9282 0C15.698 0 16.1791 0.833333 15.7942 1.5L8.86603 13.5Z"
          fill="#FEF3C7"
        />
      </svg>
    </div>
  )
}

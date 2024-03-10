import { GridPagination } from '@mui/x-data-grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  StyledButton,
  StyledButtonTypography,
  StyledNumberOfPagesTypography
} from './CrmCustomPaginationStyles'
import styles from './crmProductsPage.module.scss'
import { PAGE_SIZE } from './CrmProductsPage'

const PaginationWrapper = (props: CustomPaginationProps) => {
  return <GridPagination ActionsComponent={CustomPagination} {...props} />
}

type CustomPaginationProps = {
  count: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void
  page: number
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  onPageChange
}: CustomPaginationProps) => {
  const isPreviousButtonDisabled = page === 0
  const isNextButtonDisabled = page === Math.floor(count / PAGE_SIZE)

  const buttonStyles = (disabled: boolean) => ({
    backgroundColor: disabled ? '#F1F2F4' : 'transparent',
    color: disabled ? '#B4BFCD' : '#5D5FEF',
    borderColor: disabled ? '#B4BFCD' : '#5D5FEF'
  })

  return (
    <div className={styles.customPaginationButtonsWrapper}>
      <StyledNumberOfPagesTypography>{`${page + 1} з ${count === 0 ? page + 1 : Math.ceil(count / 10)}`}</StyledNumberOfPagesTypography>
      <StyledButton
        disabled={isPreviousButtonDisabled}
        onClick={(event) => onPageChange(event, page - 1)}
        sx={buttonStyles(isPreviousButtonDisabled)}
      >
        <ArrowBackIcon />
        <StyledButtonTypography
          sx={{
            textTransform: 'capitalize',
            marginLeft: '4px'
          }}
        >
          Попередня
        </StyledButtonTypography>
      </StyledButton>
      <StyledButton
        disabled={isNextButtonDisabled}
        onClick={(event) => onPageChange(event, page + 1)}
        sx={buttonStyles(isNextButtonDisabled)}
      >
        <StyledButtonTypography
          sx={{
            textTransform: 'capitalize',
            marginRight: '4px'
          }}
        >
          Наступна
        </StyledButtonTypography>
        <ArrowForwardIcon />
      </StyledButton>
    </div>
  )
}

export default PaginationWrapper

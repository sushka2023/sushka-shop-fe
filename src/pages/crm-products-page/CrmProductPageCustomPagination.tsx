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

const PaginationWrapper = (props: any) => {
  return <GridPagination ActionsComponent={CustomPagination} {...props} />
}

const CustomPagination: React.FC<any> = (props) => {
  const isPreviousButtonDisabled = props.page === 0
  const isNextButtonDisabled =
    props.page === Math.floor(props.count / PAGE_SIZE)

  const buttonStyles = (disabled: boolean) => ({
    backgroundColor: disabled ? '#F1F2F4' : 'transparent',
    color: disabled ? '#B4BFCD' : '#5D5FEF',
    borderColor: disabled ? '#B4BFCD' : '#5D5FEF'
  })

  return (
    <div className={styles.customPaginationButtonsWrapper}>
      <StyledNumberOfPagesTypography>{`${props.page + 1} з ${Math.ceil(props.count / 10)}`}</StyledNumberOfPagesTypography>
      <StyledButton
        disabled={isPreviousButtonDisabled}
        onClick={(event) => props.onPageChange(event, props.page - 1)}
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
        onClick={(event) => props.onPageChange(event, props.page + 1)}
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

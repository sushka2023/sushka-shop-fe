import NotFoundIcon from '../../icons/not-found-page.svg?react'
import {
  StyledCustomNoRowsOverlay,
  StyledCustomNoRowsOverlayTypography
} from './CrmCustomPaginationStyles'

const CustomNoRowsOverlay = () => {
  return (
    <StyledCustomNoRowsOverlay>
      <NotFoundIcon />
      <StyledCustomNoRowsOverlayTypography>
        За вашим запитом немає товарів
      </StyledCustomNoRowsOverlayTypography>
    </StyledCustomNoRowsOverlay>
  )
}

export default CustomNoRowsOverlay

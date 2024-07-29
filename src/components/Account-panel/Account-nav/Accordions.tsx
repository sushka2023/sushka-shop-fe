import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { Button } from '../../UI/Button'
import { Typography } from '../../UI/Typography'

import { useAuth } from '../../../hooks/use-auth'
import { accordions } from '../../../constants/account/accordions'
import { CustomAccordion } from '../../../utils/accordions-panel/accordions-panel'
import { stAccordionBtn, stContainerTabPanel, stWavePink } from '../style'

type PropsType = {
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const AccordionsSmallScreen: FC<PropsType> = ({
  activeIndex,
  setActiveIndex,
  setOpenModal
}) => {
  const { user } = useAuth()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleAccordionChange = (newIndex: number | null) => {
    setActiveIndex(newIndex ?? 0)
  }

  return (
    <Fragment>
      {isSmallScreen ? (
        user ? (
          <Container sx={{ p: 0, mt: 2 }}>
            {accordions.map((accordion, index) => (
              <CustomAccordion
                key={index}
                index={index}
                expanded={activeIndex}
                onChange={handleAccordionChange}
                summary={accordion.summary}
              >
                <Box sx={stContainerTabPanel}>{accordion.content}</Box>
                <Box sx={{ ...stWavePink, height: 35 }} />
              </CustomAccordion>
            ))}
            <Button onClick={() => setOpenModal(true)} sx={stAccordionBtn}>
              Вийти
            </Button>
          </Container>
        ) : (
          <Typography>Loading...</Typography>
        )
      ) : null}
    </Fragment>
  )
}

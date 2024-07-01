import { Box, Grid, Typography } from '@mui/material'
import { Button } from '../../UI/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import NpLogo from '../../../icons/npLogo.svg?react'
import { stCard, stDeleteBtn } from './style'
import { ModalCustomFormRadius } from '../../Modal-custom-btn/ModalCustomFormRadius'
import React, { useState } from 'react'

export const CardRenderer = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <React.Fragment>
      <Box sx={{ width: { xs: '100%', sm: '60%', md: '100%' } }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={stCard}>
              <Button sx={stDeleteBtn}>
                <DeleteOutlineIcon
                  sx={{
                    width: '20px',
                    height: '20px'
                  }}
                />
              </Button>

              <Box>
                <NpLogo style={{ margin: '0 10px' }} />
                <Box sx={{ display: 'inline-block' }}>
                  <Typography variant="body1">Нова пошта</Typography>
                  <Typography variant="body2">Адресна</Typography>
                </Box>

                <Typography sx={{ margin: '45px 10px 0 10px' }} variant="body1">
                  Київ, Київська область, Героїв Небесної сотні 25, кв.10
                </Typography>
              </Box>
            </Box>
            <Button sx={{ padding: '10px 30px' }} fullWidth variant="contained">
              редагувати
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              onClick={() => setOpenModal(true)}
              sx={{ padding: '10px 30px', backgroundColor: '#FFFFFF', mt: 2 }}
              fullWidth
              variant="text"
            >
              редагувати
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ModalCustomFormRadius
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  )
}

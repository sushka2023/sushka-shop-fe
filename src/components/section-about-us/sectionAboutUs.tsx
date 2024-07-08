import styles from './sectionAboutUs.module.scss'
import { Box, Container, Typography, Theme, useTheme } from '@mui/material'
import { SxProps } from '@mui/system'
import FruitMix from '../../images/fruit-mix-1.png'

const AboutUsParagraph: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
  return (
    <Typography variant="body1" sx={sx}>
      Будь сильним, дбай про своє здоров’я, а ми подбаємо про смачну пастилу та
      фріпси.
    </Typography>
  )
}

const SectionAboutUs = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth="lg"
      className={styles.sectionAboutUs}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'clamp(0.625rem, -2.028rem + 7.08vw, 2.5rem)',
        color: 'secondary.darker'
      }}
      id="aboutUs"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <Typography variant="h2">Про нас</Typography>
        <Typography variant="body1">
          Відверто кажучи, ми маленьке крафтове виробництво корисних смаколиків.
          Любимо усе, що дає нам матінка природа, а ще сильніше
          <Typography
            variant="caption"
            className={styles.aboutUsParagraphItalic}
          >
            {' '}
            яблука!{' '}
          </Typography>
        </Typography>
        <Typography variant="body1">
          Ми любимо солодке і спорт, малечу та її батьків, а також мандруємо і{' '}
          <Typography
            variant="caption"
            className={styles.aboutUsParagraphItalic}
          >
            обожнюємо Україну
          </Typography>
          . Наша продукція зростає і покращується, оскільки все більше людей
          обирають наші натуральні смаколики замість цукерок зі складними
          компонентами.
        </Typography>
        <AboutUsParagraph
          sx={{
            [theme.breakpoints.down('sm')]: { display: 'none' }
          }}
        />
      </Box>
      <Box minWidth="40%" className={styles.aboutSectionCap}>
        <AboutUsParagraph
          sx={{
            [theme.breakpoints.up('sm')]: { display: 'none' }
          }}
        />
        <Box component="img" src={FruitMix} alt="fruit mix" width="100%" />
      </Box>
    </Container>
  )
}

export default SectionAboutUs

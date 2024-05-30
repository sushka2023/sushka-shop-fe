import { Box, Container, Typography } from '@mui/material'
import FruitMix from '../../images/fruit-mix-1.jpg'
import {
  aboutUsParagraph,
  aboutUsParagraphItalic,
  sectionAboutUs
} from './style'

const SectionAboutUs = () => {
  return (
    <Container sx={sectionAboutUs} id="aboutUs">
      <Box>
        <Typography
          component="h2"
          variant="h2"
          sx={{ color: 'secondary.darker' }}
        >
          Про нас
        </Typography>
        <Typography component="p" variant="body1" sx={aboutUsParagraph}>
          Відверто кажучи, ми маленьке крафтове виробництво корисних смаколиків.
          Любимо усе, що дає нам матінка природа, а ще сильніше
          <Typography component="span" sx={aboutUsParagraphItalic}>
            {' '}
            яблука!{' '}
          </Typography>
        </Typography>
        <br />
        <Typography component="p" variant="body1" sx={aboutUsParagraph}>
          Ми любимо солодке і спорт, малечу та її батьків, а також мандруємо{' '}
          <Typography component="span" sx={aboutUsParagraphItalic}>
            і обожнюємо Україну
          </Typography>
          . Наша продукція зростає і покращується, оскільки все більше людей
          обирають наші натуральні смаколики замість цукерок зі складними
          компонентами.
        </Typography>
        <br />
        <Typography component="p" variant="body1" sx={aboutUsParagraph}>
          Будь сильним, дбай про своє здоров’я, а ми подбаємо про смачну пастилу
          та фріпси.
        </Typography>
        <br />
      </Box>
      <Box>
        <Box component="img" src={FruitMix} alt="fruit mix" width={670} />
      </Box>
    </Container>
  )
}

export default SectionAboutUs

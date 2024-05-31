import IconMix from '../../icons/mix.svg?react'
import IconApple from '../../icons/apple.svg?react'
import IconBowl from '../../icons/bowl.svg?react'
import IconBox from '../../icons/box.svg?react'
import ApllePic from '../../images/aplle-pic.jpg'
import FruitMixSecond from '../../images/fruit-mix-2.jpg'
import { Box, Container, List, ListItem, Typography } from '@mui/material'
import {
  paragraphItalic,
  paragraphWrapper,
  yourChoiceList,
  yourChoiceListItem,
  yourChoiceParagraph,
  yourChoiceWrapper
} from './style'

const itemsList = [
  { icon: <IconMix />, text: 'Без цукру та барвників' },
  { icon: <IconApple />, text: '100% натурально' },
  { icon: <IconBowl />, text: 'Якісний продукт' },
  { icon: <IconBox />, text: 'Дійсно поживно' }
]

const SectionYourChoice = () => {
  return (
    <Container id="aboutProduct" sx={{ pt: '10px' }}>
      <Box sx={yourChoiceWrapper}>
        <Box
          component="img"
          src={ApllePic}
          alt="falling apples"
          maxWidth={555}
        />
        <Box width={690}>
          <Typography
            component="h2"
            variant="h2"
            sx={{ mb: '40px', color: 'secondary.darker' }}
          >
            Твій свідомий вибір
          </Typography>
          <Box sx={paragraphWrapper}>
            <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
              Наша продукція містить домішки турботи, які підіймають рівень
              <br />
              <Typography
                component="span"
                variant="caption"
                sx={paragraphItalic}
              >
                дофамінів{' '}
              </Typography>
              в організмі!
            </Typography>
            <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
              Все, що приносить користь, поєднано у рулетах пастили <br /> та
              ломтиках фріпсів.
            </Typography>
            <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
              Як юзати ці смаколики знає навіть дитина: жуй, кусай, ламай,
              хрусти, відривай, облизуй та отримуй{' '}
              <Typography
                component="span"
                variant="caption"
                sx={paragraphItalic}
              >
                природну користь{' '}
              </Typography>
              в результаті.
            </Typography>
          </Box>
        </Box>
      </Box>
      <List sx={yourChoiceList}>
        {itemsList.map((item, index) => (
          <ListItem key={index} sx={yourChoiceListItem}>
            {item.icon}
            {item.text}
          </ListItem>
        ))}
      </List>
      <Box sx={yourChoiceWrapper}>
        <Box width={680}>
          <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
            Тут знайдеш близько{' '}
            <Typography component="span" variant="caption" sx={paragraphItalic}>
              30 смаків
            </Typography>{' '}
            пастили, від кислої до солодкої, від класичної до незвичної, з
            горіхами чи без.
          </Typography>
          <br />
          <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
            Познайомишся з 20-ма фруктами у вигляді чипсів. Усе перераховане
            висушене при бережних температурах у дегідраторах за всіма ТУ,
            зібране у зручні пакунки та готове радувати кращих людей.
          </Typography>
          <br />
          <Typography component="p" variant="body1" sx={yourChoiceParagraph}>
            З нами ти обереш той подарунок рідним, що так довго шукав, дозволиш
            собі смачно поїсти перед тренуванням, дасиш волю своїм смаковим
            фантазіям і обов’язково скажеш:{' '}
            <Typography component="span" variant="caption" sx={paragraphItalic}>
              «Це смачно!»
            </Typography>
          </Typography>
        </Box>
        <Box component="img" src={FruitMixSecond} alt="fruit mix" width={555} />
      </Box>
    </Container>
  )
}

export default SectionYourChoice

import styles from './sectionYourChoice.module.scss'
import IconMix from '../../icons/mix.svg?react'
import IconApple from '../../icons/apple.svg?react'
import IconBowl from '../../icons/bowl.svg?react'
import IconBox from '../../icons/box.svg?react'
import ApllePic from '../../images/aplle-pic.png'
import FruitMixSecond from '../../images/fruit-mix-2.png'
import {
  Box,
  Container,
  List,
  ListItem,
  Typography,
  useTheme
} from '@mui/material'

const ITEMS_LIST = [
  { icon: <IconMix />, text: 'Без цукру та барвників' },
  { icon: <IconApple />, text: '100% натурально' },
  { icon: <IconBowl />, text: 'Якісний продукт' },
  { icon: <IconBox />, text: 'Дійсно поживно' }
]

const SectionYourChoice = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth="lg"
      className={styles.sectionYourChoice}
      id="aboutProduct"
      sx={{ color: 'secondary.darker' }}
    >
      <Box className={styles.yourChoiceWrapper}>
        <Box className={styles.apllePic} minWidth="50%">
          <Box
            component="img"
            src={ApllePic}
            alt="falling apples"
            width="100%"
          />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              mb: 'clamp(1.25rem, 0.357rem + 2.38vw, 2.5rem)',
              fontWeight: 700
            }}
          >
            Твій свідомий вибір
          </Typography>
          <Box className={styles.paragraphWrapper}>
            <Typography variant="body1">
              Наша продукція містить домішки турботи, які підіймають рівень{' '}
              <Typography variant="caption" className={styles.paragraphItalic}>
                дофамінів{' '}
              </Typography>
              в організмі!
            </Typography>
            <Typography variant="body1">
              Все, що приносить користь, поєднано у рулетах пастили та ломтиках
              фріпсів.
            </Typography>
            <Typography variant="body1">
              Як юзати ці смаколики знає навіть дитина: жуй, кусай, ламай,
              хрусти, відривай, облизуй та отримуй{' '}
              <Typography variant="caption" className={styles.paragraphItalic}>
                природну користь{' '}
              </Typography>
              в результаті.
            </Typography>
          </Box>
        </Box>
      </Box>
      <List
        className={styles.yourChoiceList}
        sx={{
          margin: '80px 0',
          [theme.breakpoints.down(768)]: { margin: '30px 0' }
        }}
      >
        {ITEMS_LIST.map((item, index) => (
          <ListItem
            key={index}
            className={styles.yourChoiceListItem}
            sx={{ [theme.breakpoints.down(768)]: { padding: 0 } }}
          >
            {item.icon}
            <Typography className={styles.listItemCaption}>
              {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box className={styles.yourChoiceWrapper}>
        <Box className={styles.paragraphWrapper}>
          <Typography variant="body1">
            Тут знайдеш близько{' '}
            <Typography variant="caption" className={styles.paragraphItalic}>
              30 смаків
            </Typography>{' '}
            пастили, від кислої до солодкої, від класичної до незвичної, з
            горіхами чи без.
          </Typography>
          <Typography variant="body1">
            Познайомишся з 20-ма фруктами у вигляді чипсів. Усе перераховане
            висушене при бережних температурах у дегідраторах за всіма ТУ,
            зібране у зручні пакунки та готове радувати кращих людей.
          </Typography>
          <Typography variant="body1">
            З нами ти обереш той подарунок рідним, що так довго шукав, дозволиш
            собі смачно поїсти перед тренуванням, дасиш волю своїм смаковим
            фантазіям і обов’язково скажеш:{' '}
            <Typography variant="caption" className={styles.paragraphItalic}>
              «Це смачно!»
            </Typography>
          </Typography>
        </Box>
        <Box className={styles.fruitMixSecond} minWidth="50%">
          <Box
            component="img"
            src={FruitMixSecond}
            alt="fruit mix"
            width="100%"
            height="clamp(17.5rem, 5rem + 25vw, 27.5rem)"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default SectionYourChoice

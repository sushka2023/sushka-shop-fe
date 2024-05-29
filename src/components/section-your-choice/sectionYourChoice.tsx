import IconMix from '../../icons/mix.svg?react'
import IconApple from '../../icons/apple.svg?react'
import IconBowl from '../../icons/bowl.svg?react'
import IconBox from '../../icons/box.svg?react'
import ApllePic from '../../images/aplle-pic.jpg'
import FruitMixSecond from '../../images/fruit-mix-2.jpg'
import styles from './sectionYourChoice.module.scss'
import { Box, Container, List, ListItem, Typography } from '@mui/material'
import {
  paragraphWrapper,
  yourChoiceList,
  yourChoiceListItem,
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
            <Typography
              component="p"
              variant="body1"
              sx={{ fontSize: '18px', color: 'secondary.darker' }}
            >
              Наша продукція містить домішки турботи, які підіймають рівень
              <br />
              <span>
                <em>
                  <strong>дофамінів </strong>
                </em>
              </span>
              в організмі!
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{ fontSize: '18px', color: 'secondary.darker' }}
            >
              Все, що приносить користь, поєднано у рулетах пастили <br /> та
              ломтиках фріпсів.
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{ fontSize: '18px', color: 'secondary.darker' }}
            >
              Як юзати ці смаколики знає навіть дитина: жуй, кусай, ламай,
              хрусти, відривай, облизуй та отримуй
              <span>
                <em>
                  <strong> природну користь </strong>
                </em>
              </span>
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
      <div className={styles.yourChoiceLastBlock}>
        <div className={styles.yourChoiceLastBlockWrapper}>
          <p className={styles.yourChoiceLastBlockPararaph}>
            Тут знайдеш близько{' '}
            <span className={styles.yourChoiceLastBlockPararaphItalic}>
              30 смаків
            </span>{' '}
            пастили, від кислої до солодкої, від класичної до незвичної, з
            горіхами чи без.
          </p>
          <br />
          <p className={styles.yourChoiceLastBlockPararaph}>
            Познайомишся з 20-ма фруктами у вигляді чипсів. Усе перераховане
            висушене при бережних температурах у дегідраторах за всіма ТУ,
            зібране у зручні пакунки та готове радувати кращих людей.
          </p>
          <br />
          <p className={styles.yourChoiceLastBlockPararaph}>
            З нами ти обереш той подарунок рідним, що так довго шукав, дозволиш
            собі смачно поїсти перед тренуванням, дасиш волю своїм смаковим
            фантазіям і обов’язково скажеш:{' '}
            <span className={styles.yourChoiceLastBlockPararaphItalic}>
              «Це смачно!»
            </span>
          </p>
        </div>
        <img src={FruitMixSecond} alt="fruit mix" width={555} />
      </div>
    </Container>
  )
}

export default SectionYourChoice

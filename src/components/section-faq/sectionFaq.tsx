/* eslint-disable react/no-unescaped-entities */
import styles from './sectionFaq.module.scss'
import { styled } from '@mui/material/styles'
import { Fragment } from 'react'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordion from '@mui/material/Accordion'
import Arrow from '../../icons/arrow.svg?react'
import { Box, Container, Typography } from '@mui/material'
import { ACCORDION_DATA } from './accordionData'

const Accordion = styled(MuiAccordion)(() => {
  return {
    'background': 'inherit',
    'border': 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }
}) as typeof MuiAccordion

const AccordionSummary = styled((props) => {
  return (
    <MuiAccordionSummary
      {...props}
      expandIcon={<Arrow style={{ fill: 'white', fontSize: '0.9rem' }} />}
    />
  )
})(() => {
  return {
    'backgroundColor': 'none',
    'borderBottom': '1px solid #fff',
    'margin': '0px',
    'paddingLeft': '0px',
    'flexDirection': 'row',
    '&.Mui-expanded': {
      borderBottom: 'none'
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(-90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginTop: '16px',
      marginBottom: '24px'
    }
  }
}) as typeof MuiAccordionSummary

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  return {
    padding: theme.spacing(0),
    paddingBottom: '30px',
    borderBottom: '1px solid background.default'
  }
})

const CreateBorderStyle = (url: string, positionWave: 'top' | 'bottom') => ({
  position: 'relative',
  [positionWave]: '2px', // динамічний ключ (top або bottom)
  backgroundImage: `url(${url})`,
  width: '100%',
  height: 'clamp(1.25rem, -0.804rem + 10.27vw, 8.438rem)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%'
})

const borderTop = CreateBorderStyle('/src/icons/wave.svg', 'top')

const SectionFaq = () => {
  return (
    // <Box component="section" sx={accordionSection} id="faq">
    /* <Box sx={border}></Box> */
    <Fragment>
      <Box
        sx={{ ...borderTop, mt: 'clamp(2.5rem, -0.357rem + 14.29vw, 12.5rem)' }}
      ></Box>
      <Box
        component="section"
        sx={{
          backgroundColor: 'turquoise.darker',
          color: 'background.default'
        }}
      >
        <Container maxWidth="lg" className={styles.accordionSection}>
          <Typography
            variant="h2"
            sx={{ mb: 'clamp(1.5rem, 0.085rem + 3.77vw, 2.5rem)' }}
          >
            Найчастіші запитання
          </Typography>
          {ACCORDION_DATA.map((item, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              square
              sx={{ color: 'background.default' }}
            >
              <AccordionSummary
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h3">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </Fragment>
    // </Box>
  )
}

export default SectionFaq

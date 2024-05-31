/* eslint-disable react/no-unescaped-entities */
import { styled } from '@mui/material/styles'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordion from '@mui/material/Accordion'
import Arrow from '../../icons/arrow.svg?react'
import { Box, Container, Typography } from '@mui/material'
import { accordionSection, border } from './style'
import { accordionData } from './accordionData'

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

const SectionFaq = () => {
  return (
    <Box component="section" sx={accordionSection} id="faq">
      <Box sx={border}></Box>
      <Container>
        <Typography
          component="h2"
          variant="h2"
          sx={{ mb: '40px', color: 'background.default' }}
        >
          Найчастіші запитання
        </Typography>
        {accordionData.map((item, index) => (
          <Accordion key={index} disableGutters elevation={0} square>
            <AccordionSummary
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                component="h3"
                variant="h3"
                sx={{ color: 'background.default' }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="p"
                variant="body1"
                sx={{ color: 'background.default' }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  )
}

export default SectionFaq

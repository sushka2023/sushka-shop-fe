import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import { FC, ReactNode } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { a11yProps } from '../a11y-tabs/a11yTabs'

type CustomAccordionProps = {
  index: number
  expanded: number | null
  onChange: (newIndex: number | null) => void
  summary: string
  children: ReactNode
}

export const CustomAccordion: FC<CustomAccordionProps> = ({
  index,
  expanded,
  onChange,
  summary,
  children
}) => (
  <Accordion
    expanded={expanded === index}
    onChange={(_, isExpanded) => onChange(isExpanded ? index : null)}
    sx={{
      '&.MuiPaper-root.MuiAccordion-root': {
        'boxShadow': 'none',
        '&::before': {
          display: 'none'
        }
      }
    }}
  >
    <AccordionSummary
      expandIcon={<KeyboardArrowDownIcon sx={{ color: 'secondary.darker' }} />}
      {...a11yProps(index)}
      sx={{
        '.MuiTypography-root': {
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: 17,
          color: 'secondary.darker'
        }
      }}
    >
      <Typography>{summary}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
  </Accordion>
)

export const StyledProductNumberCell = ({ children }: any) => {
  return (
    <span
      style={{
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '21px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#5D5FEF'
      }}
    >
      {children}
    </span>
  )
}

export const StyledCategoryTextCell = ({ children }: any) => {
  return (
    <span
      style={{
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '21px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#64748B'
      }}
    >
      {children}
    </span>
  )
}

interface ChipStatus {
  new: { color: string; backgroundColor: string }
  activated: { color: string; backgroundColor: string }
  archived: { color: string; backgroundColor: string }
}

interface CellProps {
  value: string
  status: keyof ChipStatus
  style?: React.CSSProperties
}

const chipStatusColors: ChipStatus = {
  new: { color: '#5D5FEF', backgroundColor: '#E0E7FF80' },
  activated: { color: '#059691', backgroundColor: '#D1FAE580' },
  archived: { color: '#64748B', backgroundColor: '#F1F5F980' }
}

export const ChipCell: React.FC<CellProps> = ({ value, status, style }) => {
  const getColor = (status: keyof ChipStatus): React.CSSProperties => {
    return chipStatusColors[status]
  }

  const combinedStyle = {
    ...getTextStyle(),
    ...getColor(status),
    ...style
  }

  return <span style={combinedStyle}>{value}</span>
}

const getTextStyle = () => ({
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '21px',
  letterSpacing: '0em',
  padding: '5px 10px',
  borderRadius: '10px'
})

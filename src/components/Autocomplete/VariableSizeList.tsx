import {
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef
} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListSubheader from '@mui/material/ListSubheader'
import Popper from '@mui/material/Popper'
import { useTheme, styled } from '@mui/material/styles'
import { VariableSizeList, ListChildComponentProps } from 'react-window'
import { Box, Typography, autocompleteClasses } from '@mui/material'

const LISTBOX_PADDING = 8

function renderRow({ data, index, style }: ListChildComponentProps) {
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING
  }

  if ('group' in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    )
  }

  return (
    <Typography
      component="li"
      {...dataSet[0]}
      noWrap={false}
      style={inlineStyle}
    >
      {dataSet[1]}
    </Typography>
  )
}

const OuterElementContext = createContext<HTMLAttributes<HTMLElement> | null>(
  null
)

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <Box ref={ref} {...props} {...outerProps} />
})

function useResetCache<T>(data: T): MutableRefObject<VariableSizeList | null> {
  const ref = useRef<VariableSizeList | null>(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

export const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function ListboxComponent({ children, ...other }, ref) {
  const itemData: ReactElement[] = []
  ;(children as ReactElement[]).forEach(
    (item: ReactElement & { children?: ReactElement[] }) => {
      itemData.push(item)
      itemData.push(...(item.children || []))
    }
  )

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 56 : 48

  const getChildSize = (child: ReactElement) => {
    if ('group' in child) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <Box ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </Box>
  )
})

export const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    'boxSizing': 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
})

/* eslint-disable */

import useMediaQuery from '@mui/material/useMediaQuery'
import ListSubheader from '@mui/material/ListSubheader'
import Popper from '@mui/material/Popper'
import { useTheme, styled } from '@mui/material/styles'
import { VariableSizeList, ListChildComponentProps } from 'react-window'
import { Typography, autocompleteClasses } from '@mui/material'
import * as React from 'react'

const LISTBOX_PADDING = 8

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING
  }

  if (dataSet.hasOwnProperty('group')) {
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

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

export const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData: React.ReactElement[] = []
  ;(children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item)
      itemData.push(...(item.children || []))
    }
  )

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 65 : 48

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty('group')) {
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
    <div ref={ref}>
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
    </div>
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

/* eslint-enable */

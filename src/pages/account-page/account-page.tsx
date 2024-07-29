import { Fragment, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { AccordionsSmallScreen } from '../../components/Account-panel/Account-nav/Accordions'
import { TabsBigScreen } from '../../components/Account-panel/Account-nav/Tabs'

export const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openModal, setOpenModal] = useState(false)

  const initialTabIndex = searchParams.get('tab')
    ? parseInt(searchParams.get('tab') || '1', 10) - 1
    : 0

  const [activeIndex, setActiveIndex] = useState(initialTabIndex)

  return (
    <Fragment>
      <TabsBigScreen
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setSearchParams={setSearchParams}
        setOpenModal={setOpenModal}
      />
      <AccordionsSmallScreen
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setOpenModal={setOpenModal}
      />
      <BasicModal openModal={openModal} setOpenModal={setOpenModal} />
    </Fragment>
  )
}

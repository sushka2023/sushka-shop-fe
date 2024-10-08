import { Fragment, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { AccordionsSmallScreen } from '../../components/Account-panel/Account-nav/Accordions'
import { TabsBigScreen } from '../../components/Account-panel/Account-nav/Tabs'

export const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openModal, setOpenModal] = useState(false)

  const tabParam = searchParams.get('tab')
  const activeIndex = tabParam ? parseInt(tabParam, 10) - 1 : 0

  const handleSetActiveIndex = (index: number) => {
    setSearchParams({ tab: (index + 1).toString() })
  }

  return (
    <Fragment>
      <TabsBigScreen
        activeIndex={activeIndex}
        setActiveIndex={handleSetActiveIndex}
        setSearchParams={setSearchParams}
        setOpenModal={setOpenModal}
      />
      <AccordionsSmallScreen
        activeIndex={activeIndex}
        setActiveIndex={handleSetActiveIndex}
        setOpenModal={setOpenModal}
      />
      <BasicModal openModal={openModal} setOpenModal={setOpenModal} />
    </Fragment>
  )
}

import HeroSection from '../../components/hero-section/heroSection'
import SimpleSlider from '../../components/section-slider/sliderSection'
import SectionYourChoice from '../../components/section-your-choice/sectionYourChoice'
import SectionReviews from '../../components/section-reviews/sectionReviews'
import SectionAboutUs from '../../components/section-about-us/sectionAboutUs'
import SectionFaq from '../../components/section-faq/sectionFaq'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchItems } from '../../redux/products/operation'

const MainPage = () => {
  const popularProducts = useSelector(
    (state: RootState) => state.items.popularItems
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!popularProducts.length) {
      dispatch(
        fetchItems({
          limit: 4,
          offset: 0,
          isPopular: true,
          operationType: 'fetchPopular'
        })
      )
    }
  }, [popularProducts])

  return (
    <Fragment>
      <HeroSection />
      {popularProducts && <SimpleSlider data={popularProducts} />}
      <SectionYourChoice />
      <SectionReviews />
      <SectionAboutUs />
      <SectionFaq />
    </Fragment>
  )
}

export default MainPage

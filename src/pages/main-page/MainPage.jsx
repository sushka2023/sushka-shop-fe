import HeroSection from '../../components/hero-section/heroSection';
import SimpleSlider from '../../components/section-slider/sliderSection';
import SectionYourChoice from '../../components/section-your-choice/sectionYourChoice';
import SectionReviews from '../../components/section-reviews/sectionReviews';
import SectionAboutUs from '../../components/section-about-us/sectionAboutUs';
import SectionFaq from '../../components/section-faq/sectionFaq';

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <SimpleSlider />
      <SectionYourChoice />
      <SectionReviews />
      <SectionAboutUs />
      <SectionFaq />
    </>
  );
};

export default MainPage;
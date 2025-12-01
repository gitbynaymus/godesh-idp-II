import AnimatedSection from "../Animation/AnimatedSection";
import Hero from "../components/Hero";
// import Overview from "../components/Overview";
import TourismAndTravelGuide from "../components/TourismAndTravelGuide";
// import TouristStories from "../components/TouristStories";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedDestinations from "../components/FeaturedDestinations";
import TravelTips from "../components/TravelTips";
import Reviews from "../components/Reviews";
// import Newsletter from "../components/Newsletter";
import SubscribeSection from "../components/SubscribeSection";

const Home = () => {
  return (
    <>
      <Hero />
      <AnimatedSection animation="fade-up">
        <TourismAndTravelGuide />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <FeaturedDestinations />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <TravelTips />
      </AnimatedSection>
      {/* <AnimatedSection animation="fade-up">
        <TouristStories />
      </AnimatedSection> */}
      <AnimatedSection animation="fade-up">
        <WhyChooseUs />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <Reviews />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        {/* <Newsletter /> */}
        <SubscribeSection />
      </AnimatedSection>
    </>
  );
};

export default Home;

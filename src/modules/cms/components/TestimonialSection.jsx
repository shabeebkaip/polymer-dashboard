import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader, setPageTitle } from "../../../slices/sharedSlice";
import CardSection from "../../../shared/contentSection/CardSection";
import { testimonialsCrud } from "../Cms-Service"; 

const TestimonialSection = () => {
  const [testimonialsData, setTestimonialsData] = useState({ content: [] });
  const dispatch = useDispatch();

  const getTestimonialsData = async () => {
    dispatch(setPageTitle("Testimonials"));
    dispatch(setLoader(true)); 

    try {
      const response = await testimonialsCrud.fetch({}); 
      if (response?.data?.data) {
        setTestimonialsData({ content: response.data.data });
      } else {
        setTestimonialsData({ content: [] });
        console.warn("No testimonial data found or unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      dispatch(setLoader(false)); 
    }
  };

  useEffect(() => {
    getTestimonialsData();
  }, []); 

  return (
    <div>
      <CardSection
        name="Testimonials"
        section="Testimonials" 
        route="Testimonials" 
        data={testimonialsData} 
        displayFields={["title", "shortDescription", "fullStoryUrl"]} 
        getHomePageData={getTestimonialsData} 
        crudOperations={testimonialsCrud} 
      />
    </div>
  );
};

export default TestimonialSection;
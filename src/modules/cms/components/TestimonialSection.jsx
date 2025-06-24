import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader, setPageTitle } from "../../../slices/sharedSlice";
import CardSection from "../../../shared/contentSection/CardSection";
import { testimonialsCrud } from "../Cms-Service"; // Ensure this path is correct

const TestimonialSection = () => {
  const [testimonialsData, setTestimonialsData] = useState({ content: [] });
  const dispatch = useDispatch();

  const getTestimonialsData = async () => {
    dispatch(setPageTitle("Testimonials"));
    dispatch(setLoader(true)); // Start loading

    try {
      const response = await testimonialsCrud.fetch({}); // Assuming fetch takes an empty object or params for filtering
      if (response?.data?.data) {
        setTestimonialsData({ content: response.data.data });
      } else {
        // Handle cases where data might be empty or in a different format
        setTestimonialsData({ content: [] });
        console.warn("No testimonial data found or unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Optionally, show an error snackbar
      // enqueueSnackbar("Failed to load testimonials.", { variant: "error" });
    } finally {
      dispatch(setLoader(false)); // End loading
    }
  };

  useEffect(() => {
    getTestimonialsData();
  }, []); // Run once on component mount

  return (
    <div>
      <CardSection
        name="Testimonials"
        section="Testimonials" // Used for internal logic/identification within CardSection
        route="Testimonials" // Might be used for API routing if crudOperations don't encapsulate it fully
        data={testimonialsData} // Pass the fetched data
        displayFields={["title", "shortDescription", "fullStoryUrl"]} // Fields to display and edit
        getHomePageData={getTestimonialsData} // Callback to refresh data
        crudOperations={testimonialsCrud} // CRUD service for testimonials
      />
    </div>
  );
};

export default TestimonialSection;
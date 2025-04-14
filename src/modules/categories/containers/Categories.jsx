import ActionButton from "../../../shared/ActionButton";
import Title from "../../../shared/Title";

const Categories = () => {
  return (
    <div>
      <Title
        title="Industries"
        description="Displaying all the categories under Industries"
      />
      <div className="flex items-center justify-end p-1 mt-4 bg-white rounded-full shadow">
        <ActionButton
          buttonText="Add Category"
          handleOnClick={() => {}}
          textColor="#ffffff"
          bgColor="rgb(41, 82, 255)"
          icon={"/tools/create.svg"}
        />
      </div>
    </div>
  );
};

export default Categories;

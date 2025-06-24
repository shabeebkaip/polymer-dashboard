import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import DltIcon from "../../assets/delete.svg";
import CommonPopover from "../sharedComponents/CommonPopover";
import Card from "../card";
import AddEditCardSection from "./AddEditCardSection";
import DeleteModal from "../DeleteModal";
import { setDeleteModal } from "../../slices/sharedSlice";

const CardSection = ({
  data,
  section,
  route,
  displayFields,
  getHomePageData,
  name,
  crudOperations,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    debugger
    if (!selectedItem?.id) return;
    try {
      const response = await crudOperations.delete(selectedItem.id);
      if (response?.data?.status || response?.data?.success) {
        enqueueSnackbar(response.data.message || "Deleted successfully", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        getHomePageData?.();
      } else {
        enqueueSnackbar(response.data.message || "Delete failed", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      enqueueSnackbar("Something went wrong!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } finally {
      dispatch(setDeleteModal(false));
    }
  };

  const fieldRenderers = {
    title: (item) =>
      item.title ? (
        <h3 className="text-gray-800 text-[20px] font-bold mb-2 text-center">
          {item.title}
        </h3>
      ) : null,
    shortDescription: (item) =>
      item.shortDescription ? (
        <p className="text-gray-600 text-[16px] text-center leading-relaxed mb-4">
          {item.shortDescription}
        </p>
      ) : null,
    fullStoryUrl: (item) =>
      item.fullStoryUrl ? (
        <div className="text-center">
          <a
            href={item.fullStoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-[14px] underline"
          >
            Read Full Story
          </a>
        </div>
      ) : null,
  };

  const renderField = (item, field) => {
    if (!item[field]) return null;
    const renderer = fieldRenderers[field];
    return renderer ? renderer(item) : null;
  };

  return (
    <Card extra="p-5 m-5">
      <div className="flex justify-between">
        <p className="text-[25px] font-bold text-gray-800">{name} Section</p>
        <div className="flex items-center gap-5">
          <AddEditCardSection
            mode="add"
            section={section}
            route={route}
            cardData={{}}
            displayFields={displayFields}
            getHomePageData={getHomePageData}
            crudOperations={crudOperations}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.content?.map((item, index) => (
          <div
            key={index}
            className="relative p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="absolute top-2 right-2">
              <MoreVertIcon
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={(event) => handleClick(event, item)}
              />
            </div>

            <div className="block p-4 font-sans">
              {renderField(item, "image")}
              {displayFields
                ?.filter((field) => field !== "image")
                .map((field, fieldIndex) => (
                  <div key={fieldIndex}>{renderField(item, field)}</div>
                ))}
            </div>

            <CommonPopover
              id="example-popover"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              handleClose={handleClosePopover}
            >
              <div>
                <AddEditCardSection
                  mode="edit"
                  section={section}
                  route={route}
                  cardData={selectedItem ?? {}}
                  displayFields={displayFields}
                  getHomePageData={getHomePageData}
                  crudOperations={crudOperations}
                />
              </div>
              <div
                className="flex gap-3 p-2 rounded cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  handleClosePopover();
                  dispatch(setDeleteModal(true));
                }}
              >
                <img src={DltIcon} className="mr-2" alt="Delete" />
                <div className="text-[#2B3674] text-[17px] font-bold">
                  Delete
                </div>
              </div>
            </CommonPopover>
          </div>
        ))}
      </div>

      <DeleteModal handleDelete={handleDelete} />
    </Card>
  );
};

export default CardSection;

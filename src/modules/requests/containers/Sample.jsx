// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setPageTitle } from "../../../slices/sharedSlice";
// import Title from "../../../shared/Title";
// import { getSampleRequestApi } from "../api";
// import SampleList from "../components/SampleList";
// import SampleModal from "../components/SampleModal";
// import PageLoader from "../../../shared/PageLoader";
// import PaginationContainer from "../../../shared/PaginationContainer";

// const Sample = () => {
//   const [samples, setSamples] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [currentQuery, setCurrentQuery] = useState({ page: 1 });
//   const dispatch = useDispatch();

//   const fetchSamples = (query = {}) => {
//     setLoading(true);
//     setCurrentQuery(query);
//     dispatch(getSampleRequestApi(query))
//       .then((response) => {
//         if (response?.success) {
//           const paginationData = {
//             total: response.total,
//             currentPage: response.page,
//             totalPages: response.totalPages,
//           };
//           setPagination(paginationData);
//           setSamples(response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching samples:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const refreshCurrentPage = () => {
//     fetchSamples(currentQuery);
//   };

//   useEffect(() => {
//     dispatch(setPageTitle("Sample Enquiries"));
//   }, [dispatch]);

//   useEffect(() => {
//     fetchSamples({ page: 1 });
//   }, []);

//   return (
//     <div className="h-[calc(100vh-120px)] overflow-auto">
//       <Title
//         title="Sample Enquiries"
//         description="Display all the Sample Requests"
//       />
//       {loading ? (
//         <PageLoader />
//       ) : (
//         <>
//           <div className="mt-4">
//             <SampleList getResponseBack={refreshCurrentPage} />
//           </div>
//           <PaginationContainer
//             totalPages={pagination?.totalPages}
//             currentPage={pagination?.currentPage}
//             handlePageChange={(page) => fetchSamples({ page })}
//           />
//         </>
//       )}
//       <SampleModal />
//     </div>
//   );
// };

// export default Sample;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../slices/sharedSlice";
import Title from "../../../shared/Title";
import { getSampleRequestApi } from "../api";
import SampleList from "../components/SampleList";
import SampleModal from "../components/SampleModal";
import PageLoader from "../../../shared/PageLoader";
import PaginationContainer from "../../../shared/PaginationContainer";

const Sample = () => {
  const [samples, setSamples] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchSamples = (query = {}) => {
    setLoading(true);
    dispatch(getSampleRequestApi(query))
      .then((response) => {
        if (response?.success) {
          const paginationData = {
            total: response.total,
            currentPage: response.page,
            totalPages: response.totalPages,
          };
          setPagination(paginationData);
          setSamples(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching samples:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setPageTitle("Sample Enquiries"));
  }, [dispatch]);

  useEffect(() => {
    fetchSamples({ page: 1 });
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] overflow-auto">
      {loading ? <PageLoader /> :
        <>
          <div className="mt-4">
            <SampleList data={samples} />
          </div>
          <PaginationContainer
            totalPages={pagination?.totalPages}
            currentPage={pagination?.currentPage}
            handlePageChange={(page) => fetchSamples({ page })}
          />
        </>
      }
      <SampleModal />
    </div>
  );
};

export default Sample;
import { Routes, Route } from "react-router-dom";
import Users from "./modules/users/containers/Users";
import Products from "./modules/products/containers/Products";
import Industries from "./modules/industries/containers/Industries";

const AppRoutes = () => {
  return (
    <div className="p-5">
      <Routes>
        <Route path="/products" exact element={<Products />} />
        <Route path="/industries" exact element={<Industries />} />

        <Route path={"/users"} element={<Users />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

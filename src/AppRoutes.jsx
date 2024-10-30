import { Routes, Route } from "react-router-dom";
import { Employees } from "./modules/Employees/containers";
import { Logs } from "./modules/Logs/containers";

const AppRoutes = () => {
    return (
        <div className="p-5" >
            <Routes>
                <Route path="/" exact element={<Employees />} />
                <Route path="/employees" exact element={<Employees />} />
                <Route path="/logs" exact element={<Logs />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;

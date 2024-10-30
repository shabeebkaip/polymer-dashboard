import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    return (
        <nav className="w-full bg-white shadow-custom  h-[80px]">
            <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-5">
                    <h1 className="text-[#263238] text-2xl">{'Employees'}</h1>
                </div>

                <div className="relative flex h-[55px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 md:w-[200px] md:flex-grow-0 md:gap-1 xl:gap-2 shadow-xl">
                </div>
            </div>

            {loading && (
                <div>
                    <div className="relative w-full h-1 bg-gray-200">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#2952FF] linear-loader"></div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

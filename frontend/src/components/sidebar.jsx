import { useState } from "react";
import { useNavigate } from "react-router-dom";

import chevron from "../assets/chevron.png";

function Sidebar() {
    const [active, setActive] = useState("Dashboard");
    const menuItems = ["Dashboard", "Tasks", "Calendar", "Settings"];
    const navigate = useNavigate();

    const handleClick = (item) => {
        setActive(item);

        // navigation logic here
        switch(item) {
            case "Dashboard":
                navigate("/dashboard");
                break;
            case "Tasks":
                navigate("/tasks");
                break;
            case "Calendar":
                navigate("/calendar");
                break;
            case "Settings":
                navigate("/settings");
                break;
        }
    }

    return (
        <div className="h-[calc(100vh-40px)] w-90 rounded-4xl flex m-5 flex-col shadow-xl">
            
            {/* Collapse Button */}
            <button className="flex w-12 h-12 ml-auto mt-[20px] mr-[20px] rounded-3xl justify-center items-center hover:shadow-lg transition-shadow duration-400 ease-in-out">
                <img src={chevron} alt="chevron" className="w-6 h-6"/>
            </button>   

            {/* Menu Items */}
            <div className="flex flex-col w-full justify-center items-center gap-10 text-3xl mt-40">
                {menuItems.map((item) => (
                <button
                    key={item}
                    onClick={() => handleClick(item)}
                    className={`w-[80%] p-3 rounded-3xl relative transition-color ease-in-out duration-300 hover:text-black ${
                    active === item ? "text-black shadow-lg" : "text-gray-500"
                    }`}>
                    {item}
                </button>
                ))}
            </div>
        </div>
    )

}

export default Sidebar;
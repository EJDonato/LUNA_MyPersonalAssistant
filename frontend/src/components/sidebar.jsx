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

    return <div className="h-[calc(100vh-40px)] w-90 bg-gray-100 rounded-4xl flex m-5 flex-col shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
        
        {/* Collapse Button */}
        <button className="flex w-12 h-12 ml-auto mt-[20px] mr-[20px] rounded-3xl justify-center items-center hover:bg-gray-200 transition-colors duration-400 ease-in-out">
            <img src={chevron} alt="chevron" className="w-6 h-6"/>
        </button>   

        {/* Menu Items */}
        <div className="flex flex-col w-full justify-center items-center gap-10 text-3xl mt-40">
            {menuItems.map((item) => (
            <button
                key={item}
                onClick={() => handleClick(item)}
                className={`w-[80%] p-3 rounded-3xl relative transition-colors hover:text-black ${
                active === item ? "text-black" : "text-gray-500"
                }`}
            >
                {item}
                <span
                className={`absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-full 
                origin-center transform transition-transform duration-300 ease-in-out
                ${active === item ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                />
            </button>
            ))}
        </div>
    </div>
    

}

export default Sidebar;
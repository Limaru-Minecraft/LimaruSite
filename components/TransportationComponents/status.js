import React, { useState, useEffect } from "react";
import Image from "next/image";

const logo = {
    "Limaru Metro": { src: "/transport/metro.svg", width: 20, height: 20 },
    "Mainlines": { src: "/transport/train.svg", width: 20, height: 20 },
    "Bus Services": { src: "/transport/bus.svg", width: 20, height: 20 },

};

const Status = () => {
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        fetch(
            // API
            "https://script.google.com/macros/s/AKfycbwwRXuVfw8rIlqiWcUV9LLnCXJdhypmyVCs-J4njJuRv5jZd3NOXegTbiZcjo3uYlLaug/exec"
            // API
        )
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.slice(1).reduce((acc, [prefix, route, operator, status]) => {
                    let category = acc.find((cat) => cat.title === operator);
                    if (!category) {
                        category = { title: operator, items: [] };
                        acc.push(category);
                    }
                    category.items.push({ label: route, status });
                    return acc;
                }, []);
                setStatusData(processedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Closed":
                return "bg-red-500 text-white";
            case "Crowded":
            case "Busy":
                return "bg-yellow-500 text-black";
            case "Partially Open":
            case "Normal":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-200">
            {statusData.map((section) => (
                <div key={section.title} className="bg-white text-black p-4 rounded relative pb-8">
                    <div className="flex items-center mb-2">
                        {logo[section.title] && (
                            <Image
                                className="mr-2"
                                src={logo[section.title].src}
                                alt={section.title}
                                width={40}
                                height={40}
                            />
                        )}
                        <h3 className="text-sm sm:text-lg font-semibold">{section.title}</h3>
                    </div>
                    <ul className="list-none">
                        {section.items.map((item) => (
                            <li key={item.label} className="flex items-center justify-between mb-1">
                                <span className="text-xs sm:text-sm">{item.label}</span>
                                <span className={`px-2 py-1 text-xs sm:text-sm rounded-sm ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Status;

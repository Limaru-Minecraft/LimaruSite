import React, { useState, useEffect } from "react";
import Image from "next/image";

const logo = {
    "Limaru Metro": { src: "/transport/metro.svg" },
    "Mainlines": { src: "/transport/train.svg" },
    "Bus Services": { src: "/transport/bus.svg" },
    "Suburban Lines": { src: "/transport/suburban.svg" },
    "Ferry Services": { iconClass: "fa-solid fa-ship" },
};

const transitModes = [
    { id: "train", label: "Train", iconClass: "fa-solid fa-train-subway" },
    { id: "bus", label: "Bus", iconClass: "fa-solid fa-bus" },
    { id: "ferry", label: "Ferry", iconClass: "fa-solid fa-ship" },
];

const getTransitMode = (operator) => {
    const operatorName = operator.toLowerCase();

    if (operatorName.includes("bus")) {
        return "bus";
    }

    if (operatorName.includes("ferr") || operatorName.includes("boat")) {
        return "ferry";
    }

    return "train";
};

const Status = () => {
    const [statusData, setStatusData] = useState([]);
    const [activeMode, setActiveMode] = useState("train");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            "https://script.google.com/macros/s/AKfycbwwRXuVfw8rIlqiWcUV9LLnCXJdhypmyVCs-J4njJuRv5jZd3NOXegTbiZcjo3uYlLaug/exec"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const processedData = data.slice(1).reduce((acc, [, route, operator, status]) => {
                    if (!route || !operator) {
                        return acc;
                    }

                    const operatorName = String(operator);
                    const routeName = String(route);
                    const statusText = String(status || "Unknown");
                    let category = acc.find((cat) => cat.title === operatorName);
                    if (!category) {
                        category = {
                            title: operatorName,
                            mode: getTransitMode(operatorName),
                            items: [],
                        };
                        acc.push(category);
                    }
                    category.items.push({ label: routeName, status: statusText });
                    return acc;
                }, []);
                setStatusData(processedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Could not load service status. Please try again later.");
            })
            .finally(() => setIsLoading(false));
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Closed":
                return "bg-red-500 text-white";
            case "Crowded":
            case "Busy":
                return "bg-yellow-500 text-black";
            case "Partially Open":
                return "bg-amber-500 text-black";
            case "Normal":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const activeSections = statusData.filter((section) => section.mode === activeMode);
    const statusGridClass =
        activeMode === "bus"
            ? "grid grid-cols-1 gap-6"
            : "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3";

    return (
        <div className="p-4 font-sans">
            <div
                className="mb-6 grid gap-2 rounded-md bg-gray-100 p-2 sm:grid-cols-3"
                role="tablist"
                aria-label="Transit service type"
            >
                {transitModes.map((mode) => {
                    const isActive = mode.id === activeMode;

                    return (
                        <button
                            key={mode.id}
                            type="button"
                            id={`status-tab-${mode.id}`}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`status-panel-${mode.id}`}
                            className={`flex min-h-12 items-center justify-center gap-2 rounded-md px-4 py-2 font-bold transition ${
                                isActive
                                    ? "bg-lime-700 text-white shadow-sm"
                                    : "bg-white text-gray-800 hover:bg-yellow-100"
                            }`}
                            onClick={() => setActiveMode(mode.id)}
                        >
                            <i className={mode.iconClass} aria-hidden="true" />
                            {mode.label}
                        </button>
                    );
                })}
            </div>

            <div
                id={`status-panel-${activeMode}`}
                role="tabpanel"
                aria-labelledby={`status-tab-${activeMode}`}
            >
                {isLoading ? (
                    <div className="rounded-md border border-gray-200 bg-white p-10 text-center text-gray-700">
                        Loading service status...
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center" role="alert">
                        {error}
                    </div>
                ) : activeSections.length ? (
                    <div className={statusGridClass}>
                        {activeSections.map((section) => {
                            const logoConfig = logo[section.title];

                            return (
                                <div key={section.title} className="bg-white text-black p-4 rounded-lg shadow-md border border-gray-200">
                                    <div className="flex items-center mb-4 border-b pb-2">
                                        {logoConfig?.src ? (
                                            <Image
                                                className="mr-3"
                                                src={logoConfig.src}
                                                alt=""
                                                width={24}
                                                height={24}
                                            />
                                        ) : null}
                                        {logoConfig?.iconClass ? (
                                            <i
                                                className={`${logoConfig.iconClass} mr-3 text-xl text-gray-700`}
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                                    </div>
                                    <ul className="list-none space-y-3">
                                        {section.items.map((item) => (
                                            <li key={item.label} className="flex flex-col p-2 bg-gray-50 rounded-md">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-md border border-dashed border-gray-300 bg-white p-8 text-center text-gray-700">
                        No {transitModes.find((mode) => mode.id === activeMode)?.label.toLowerCase()} status updates right now.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Status;


import React from "react";
import {isDark} from "./utils";
import {useRouter} from "next/router";

const RouteSegmentsDisplay = ({ stations, routeSegments, routeNames, transferPoints, origin, destination, path }) => {
    const isSingleRoute = routeSegments.length <= 1;

    const router = useRouter();

    return (<div className="p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
            Suggested Route
            <div className="flex items-center text-lg font-medium ml-4">
                <span>{origin}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/transport/arrow.svg"
                    alt="Transport Icon"
                    className="w-6 h-6 mx-2"
                />
                <span>{destination} | with total of {stations.length} stations</span>
            </div>
        </h2>

        {routeSegments.length > 0 ? (<div className="relative flex flex-col items-start">
            {isSingleRoute ? (<div></div>) : (// Multiple routes with transfers
                stations.map((station, index) => {
                    const isRouteChange = index > 0 && routeNames[index - 1] !== routeNames[index];
                    const isLastStation = index === stations.length - 1;

                    // Determine route details
                    const transferIndex = routeSegments.findIndex((seg) => seg.from === station);
                    let route = "", eachDest = "", freq = "";

                    if (transferIndex !== -1) {
                        route = routeNames[transferIndex];
                        eachDest = routeSegments[transferIndex]?.destination || "";

                        const frequency = routeSegments[transferIndex]?.frequency; // Only fetch frequency for the relevant transfer segment
                        freq = frequency ? `Every ${frequency} ${frequency === 1 ? "min" : "mins"}` : ""; // Avoid fallbacks to unrelated segments

                    }

                    return (<React.Fragment key={index}> {/* Normal Station */}
                            <div className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`rounded-full ${station === origin || station === destination || transferPoints.includes(station) ? "w-5 h-5" : "w-3 h-3"}`}
                                        style={{
                                            backgroundColor: routeSegments[index - 1]?.color || routeSegments[index]?.color || "#2b2b2b",
                                            marginTop: "0px",
                                            marginLeft: !(station === origin || station === destination || transferPoints.includes(station)) ? "4px" : "",
                                        }}
                                    ></div>

                                    {/* Connecting line */}
                                    {index === 0 ? (<div
                                        className="w-1000 h-16 flex flex-col items-start"
                                        style={{
                                            backgroundColor: routeSegments[0]?.color || "#2b2b2b",
                                            marginTop: "-4px",
                                            width: "4px",
                                        }}
                                    >
                                        <div className="flex items-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={route.includes("Bus") ? "/transport/bus.svg" : "/transport/metro.svg"}
                                                alt="Transport Icon"
                                                className={`absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 ${isDark(routeSegments[0]?.color || "#2b2b2b") ? "invert" : ""}`}
                                                style={{
                                                    marginTop: route.includes("Bus") ? "8px" : "7px",
                                                    marginLeft: "38px",
                                                }}
                                            />
                                            <p
                                                className="ml-6 text-sm whitespace-nowrap inline-block rounded-lg px-2 py-1"
                                                style={{
                                                    marginTop: "8px",
                                                    backgroundColor: routeSegments[0]?.color || "#2b2b2b",
                                                    color: isDark(routeSegments[0]?.color || "#2b2b2b") ? "white" : "black",
                                                }}
                                            >
                                            <span
                                                className="ml-7"
                                                style={{
                                                    marginLeft: transferPoints.includes(station) ? "16px" : "",
                                                }}
                                            >
                                                {route}
                                            </span>
                                            </p>
                                            <p
                                                className="ml-1 text-sm whitespace-nowrap inline-block font-bold"
                                                style={{marginTop: "10px"}}
                                            >
                                                to {eachDest}
                                            </p>
                                        </div>
                                        <p
                                            className="ml-8 text-sm whitespace-nowrap inline-block"
                                            style={{marginTop: "2px", color: "gray"}}
                                        >
                                            {freq}
                                        </p>
                                    </div>) : (<div
                                        className="ml-2 w-1 h-6 mx-auto"
                                        style={{
                                            backgroundColor: isRouteChange ? "transparent" : routeSegments[index]?.color || "#2b2b2b",
                                            borderLeft: isRouteChange && !isLastStation ? "4px dotted #2b2b2b" : "none",
                                        }}
                                    ></div>)}
                                </div>
                                <p
                                    className={`ml-4 text-sm flex items-center h-30 ${station === origin || station === destination || transferPoints.includes(station) ? "font-bold" : ""}`}
                                    style={{
                                        marginTop: isLastStation ? "-26px" : index === 0 ? "-64px" : "-24px",
                                        marginLeft: transferPoints.includes(station) ? "16px" : station !== origin && station !== destination ? "19.5px" : "17px",
                                    }}
                                >
                                    {station}
                                </p>
                            </div>

                            {/* Route Change */}
                            {isRouteChange && !isLastStation && (<div className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-1 h-14 mx-auto"
                                         style={{borderLeft: "4px dotted #2b2b2b"}}></div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/transport/transfer.svg"
                                        alt="Interchange Icon"
                                        className="absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 bg-white rounded"
                                        style={{marginTop: "-8px"}}
                                    />
                                    <div
                                        className="absolute w-6 h-6 top-20.5 left-12 transform -translate-x-1/2 italic"
                                        style={{marginTop: "-8px", color: "#2b2b2b"}}
                                    >
                                        Transfer
                                    </div>
                                    <div
                                        className="w-5 h-5 rounded-full"
                                        style={{
                                            backgroundColor: routeSegments[index]?.color || "#2b2b2b",
                                            marginTop: "-20px",
                                        }}
                                    ></div>
                                    <div
                                        className="w-1000 h-16 flex flex-col items-start"
                                        style={{
                                            backgroundColor: routeSegments[index]?.color || "#2b2b2b",
                                            marginTop: "-4px",
                                            width: "4px",
                                        }}
                                    >
                                        <div className="flex items-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={route.includes("Bus") ? "/transport/bus.svg" : "/transport/metro.svg"}
                                                alt="Transport Icon"
                                                className={`absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 ${isDark(routeSegments[index]?.color || "#2b2b2b") ? "invert" : ""}`}
                                                style={{
                                                    marginTop: route.includes("Bus") ? "8px" : "7px",
                                                    marginLeft: "38px",
                                                }}
                                            />
                                            <p
                                                className="ml-6 text-sm whitespace-nowrap inline-block rounded-lg px-2 py-1"
                                                style={{
                                                    marginTop: "8px",
                                                    backgroundColor: routeSegments[index]?.color || "#2b2b2b",
                                                    color: isDark(routeSegments[index]?.color || "#2b2b2b") ? "white" : "black",
                                                }}
                                            >
                                            <span
                                                style={{
                                                    marginLeft: transferPoints.includes(station) ? "28px" : "",
                                                }}
                                            >
                                                {route}
                                            </span>
                                            </p>
                                            <p
                                                className="ml-1 text-sm whitespace-nowrap inline-block font-bold"
                                                style={{marginTop: "10px"}}
                                            >
                                                to {eachDest}
                                            </p>
                                        </div>
                                        <p
                                            className="ml-8 text-sm whitespace-nowrap inline-block"
                                            style={{marginTop: "2px", color: "gray"}}
                                        >
                                            {freq}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className={`ml-4 text-sm flex items-center h-8 ${station === origin || station === destination || transferPoints.includes(station) ? "font-bold" : ""}`}
                                    style={{marginTop: "-24px"}}
                                >
                                    {station}
                                </p>
                            </div>)}
                        </React.Fragment>


                    );
                }))}
        </div>) : origin === destination && path ? (<p>The origin station is same as your destination.</p>) : (<p>
            We&apos;re sorry, but we can&apos;t find the possible route. Is origin the same as
            destination? Or typo? Or the URL is empty?
        </p>)}
        <div className="mt-4">
            <button
                onClick={() => router.push("/transportation")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Return to transportation page
            </button>
        </div>
    </div>);
};

export default RouteSegmentsDisplay;

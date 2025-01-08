import {useRouter} from "next/router";
import React from "react";
import routes from "./routes.json";

// Function to determine if the color is dark or light
function isDark(color) {
    if (!color) return false;

    let r, g, b;
    if (color.startsWith("#")) {
        const hex = color.length === 4 ? color.slice(1).split("").map(c => c + c) : [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)];
        [r, g, b] = hex.map(h => parseInt(h, 16));
    } else if (color.startsWith("rgb")) {
        [r, g, b] = color.match(/\d+/g).map(Number);
    }

    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness < 128;
}


let isAlternativeRoute = false; // Tracks whether an alternative route is used
let indexTrack = 0; // Tracks the index of the selected alternative route

const RouteDetails = () => {

    const router = useRouter();
    const {path} = router.query;

    const stations = path ? path.split(",") : [];
    const routeNames = []; // Collect all route names here
    const routeSegments = [];

    let previousRoute = null; // Track the previously used route

    // Extract and sort lines based on the URL path order
    const allLinesForPath = stations.slice(0, -1).map((currentStation, i) => {
        const nextStation = stations[i + 1];
        const routeData = routes[currentStation]?.[nextStation];

        if (routeData) {
            return {
                from: currentStation, to: nextStation, lines: routeData.line || [],
            };
        }
        return null;
    }).filter(Boolean);


    for (let i = 0; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const nextStation = stations[i + 1];
        const routeData = routes[currentStation]?.[nextStation];

        if (routeData) {
            // Determine the selected route
            let selectedRoute, selectedColor, selectedDestination, selectedFrequency;

            if (Array.isArray(routeData.line)) {
                // Retrieve the next and previous stations route data
                const nextRouteData = routes[nextStation]?.[stations[i + 2]];
                const previousRouteData = routes[stations[i - 1]]?.[currentStation];

                // Shared lines between both next and previous stations
                const sharedLinesBoth = routeData.line.filter(line => (nextRouteData?.line || []).includes(line) && (previousRouteData?.line || []).includes(line));

                // Shared lines between either next or previous stations
                const sharedLinesEither = routeData.line.filter(line => (nextRouteData?.line || []).includes(line) || (previousRouteData?.line || []).includes(line));

                // Prioritize shared lines between next and previous stations
                selectedRoute = sharedLinesBoth[0] || sharedLinesEither[0] || routeData.line[0]; // Fall back to the first line if no shared or previous routes


                // Find the index of the selected route in the original array
                const routeIndex = routeData.line.indexOf(selectedRoute);


                // Check if the selected route is not the default (index 0) route
                if (routeData.line.length > 1 && selectedRoute !== routeData.line[0]) {
                    isAlternativeRoute = true;
                    indexTrack = routeIndex; // Track the index of the selected alternative route
                }

                // Map line to color and destination
                selectedColor = routeData.color[routeIndex];
                selectedDestination = routeData.destination[routeIndex];
                selectedFrequency = routeData.frequency; // will add routeIndex here once ready
            } else {
                selectedRoute = routeData.line;
                selectedColor = routeData.color;
                selectedDestination = routeData.destination;
                selectedFrequency = Array.isArray(routeData.frequency) ? previousRoute?.frequency || null : routeData.frequency || previousRoute?.frequency || null;

            }

            // Update previousRoute to be used in the next iteration
            previousRoute = selectedRoute;


            if (Array.isArray(routeData.line) && isAlternativeRoute && indexTrack >= 0) {
                selectedRoute = routeData.line[indexTrack];
                selectedColor = routeData.color[indexTrack];
                selectedFrequency = routeData.frequency; // will add indexTrack here once ready
            }


            // Log for debugging

            // Push the route data to routeSegments
            routeSegments.push({
                from: currentStation,
                to: nextStation,
                distance: routeData.distance,
                type: routeData.type,
                line: selectedRoute,
                color: selectedColor,
                destination: selectedDestination,
                frequency: selectedFrequency,
            });

            // Add the selected route to routeNames
            if (selectedRoute) {
                routeNames.push(selectedRoute);
            }

            // KEEP TRACK - DO NOT REMOVE

        }
    }


    // Separate stations into categories
    const origin = stations[0];
    const destination = stations[stations.length - 1];

    // Track transfer points
    let transferPoints = [];

    // Check for single route (without any transfers)
    let isSingleRoute = false;

    // Track where the transfers occur
    for (let i = 1; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const isRouteChange = routeNames[i - 1] !== routeNames[i];

        if (isRouteChange) {
            transferPoints.push(currentStation);
        }
    }

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

export default RouteDetails;
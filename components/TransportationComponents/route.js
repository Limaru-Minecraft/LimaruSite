import { useRouter } from "next/router";
import React from "react";
import routes from "./routes.json";

// Function to determine if the color is dark or light
function isDark(color) {
    if (!color) return false;

    // Convert hex color to RGB
    let r, g, b;
    if (color.startsWith("#")) {
        // Handling hex format (#RRGGBB or #RGB)
        if (color.length === 4) {
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
        } else if (color.length === 7) {
            r = parseInt(color.slice(1, 3), 16);
            g = parseInt(color.slice(3, 5), 16);
            b = parseInt(color.slice(5, 7), 16);
        }
    } else if (color.startsWith("rgb")) {
        const rgb = color.match(/\d+/g);
        r = parseInt(rgb[0], 10);
        g = parseInt(rgb[1], 10);
        b = parseInt(rgb[2], 10);
    }

    // Calculate brightness
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness < 128; // Dark if brightness is below a certain threshold
}


const RouteDetails = () => {
    const router = useRouter();
    const { path } = router.query;

    const stations = path ? path.split(",") : [];
    const routeNames = []; // Collect all route names here
    const routeSegments = [];
    for (let i = 0; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const nextStation = stations[i + 1];
        const routeData = routes[currentStation]?.[nextStation];

        if (routeData) {
            routeSegments.push({
                from: currentStation,
                to: nextStation,
                ...routeData,
            });

            // Add route name if it exists
            if (routeData.line) {
                routeNames.push(routeData.line);
            }
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
        const isRouteChange =
            routeNames[i - 1] !== routeNames[i];

        if (isRouteChange) {
            transferPoints.push(currentStation);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                Suggested Route
                <div className="flex items-center text-lg font-medium ml-4">
                    <span className="mr-2">{origin}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/transport/arrow.svg"
                        alt="Transport Icon"
                        className="w-6 h-6 mx-2"
                    />
                    <span>{destination}</span>
                </div>
            </h2>


            {routeSegments.length > 0 ? (
                <div className="relative flex flex-col items-start">
                    {isSingleRoute ? (
                        // Direct route with no transfers
                        <div className="flex items-center">
                            <p className="ml-4 text-sm">
                                {`Take the ${routeNames[0]}${
                                    routeSegments[0]?.frequency
                                        ? ` - Frequency: ${routeSegments[0].frequency}`
                                        : ""
                                }${
                                    routeSegments[0].destination
                                        ? ` - Destination: ${routeSegments[0].destination}`
                                        : ""
                                }`}
                            </p>
                        </div>
                    ) : (
                        // Multiple routes with transfers
                        stations.map((station, index) => {
                            const isRouteChange =
                                index > 0 && routeNames[index - 1] !== routeNames[index];

                            const isLastStation = index === stations.length - 1;

                            // Determine station type
                            let route;
                            let eachDest;
                            let freq;
                            if (station === origin) {
                                route = `${routeNames[0]}`;
                                eachDest = `${routeSegments[0].destination}`
                                routeSegments[0].frequency === 1
                                    ? freq = `Every ${routeSegments[0].frequency} min`
                                    : routeSegments[0]?.frequency
                                        ? freq = `Every ${routeSegments[0].frequency} mins`
                                        : "";
                            } else if (station === destination) {
                            } else if (transferPoints.includes(station)) {
                                const transferIndex = routeSegments.findIndex(
                                    (seg) => seg.from === station
                                );
                                route = `${routeNames[transferIndex]}`;
                                eachDest = `${routeSegments[transferIndex].destination}`
                                routeSegments[0].frequency === 1
                                    ? freq = `Every ${routeSegments[0].frequency} min`
                                    : routeSegments[0]?.frequency
                                        ? freq = `Every ${routeSegments[0].frequency} mins`
                                        : "";


                            } else {
                            }

                            return (
                                <React.Fragment key={index}>
                                    {/* Normal Station */}
                                    <div className="flex items-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-5 h-5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        routeSegments[index - 1]?.color ||
                                                        routeSegments[index]?.color ||
                                                        "#2b2b2b",
                                                    marginTop: isLastStation ? "0px" : "0px",
                                                }}
                                            ></div>
                                            {/* Connecting line */}
                                            {index === 0 && (
                                                <div
                                                    className="w-1000 h-16 flex flex-col items-start" // Add flex-col for vertical layout
                                                    style={{
                                                        backgroundColor: routeSegments[0]?.color || "#2b2b2b",
                                                        marginTop: "-4px",
                                                        width: "4px", // Aligns with the second transfer
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
                                                                marginTop: "8px", // Move text down by 2px
                                                                backgroundColor: routeSegments[0]?.color || "#2b2b2b",
                                                                color: isDark(routeSegments[0]?.color || "#2b2b2b") ? "white" : "black", // Conditional text color
                                                            }}
                                                        >
                                                            <p className="ml-7">{route}</p>
                                                        </p>
                                                        <p className="ml-1 text-sm whitespace-nowrap inline-block font-bold"
                                                           style={{
                                                               marginTop: "10px"
                                                           }}>
                                                            to {eachDest}
                                                        </p>
                                                    </div>
                                                    <p className="ml-8 text-sm whitespace-nowrap inline-block"
                                                       style={{
                                                           marginTop: "2px",
                                                           color: "gray"
                                                       }}>
                                                        {freq}
                                                    </p>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={"/transport/badge.svg"}
                                                        alt="test"
                                                        className={`absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 ${!(route.includes("Tokaido") || route.includes("Kotoha")) ? "invert" : ""}`}
                                                        style={{
                                                            marginTop: "37px",
                                                            marginLeft: "37px",
                                                        }}
                                                    />
                                                    <p className={`text-sm whitespace-nowrap inline-block ${!(route.includes("Tokaido") || route.includes("Kotoha")) ? "text-white" : "text-black font-bold"}`}
                                                       style={{
                                                           marginLeft: "56px",
                                                           marginTop: "3px",
                                                       }}>
                                                        Licensed driver need to be requested on this line
                                                    </p>
                                                    
                                                </div>
                                            )}
                                            {index !== 0 && (
                                                <div

                                                    className={
                                                        index === 0 ? "w-1 h-16 mx-auto" : "w-1 h-6 mx-auto"
                                                    }
                                                    style={{
                                                        backgroundColor: isRouteChange
                                                            ? "transparent"
                                                            : routeSegments[index]?.color || "#2b2b2b",
                                                        borderLeft: isRouteChange && !isLastStation ? "4px dotted #2b2b2b" : "none",
                                                    }}
                                                >

                                                </div>
                                            )}
                                        </div>
                                        <p
                                            className={`ml-4 text-sm flex items-center h-30 ${
                                                station === origin || station === destination || transferPoints.includes(station)
                                                    ? "font-bold"
                                                    : ""
                                            }`}
                                            style={{
                                                marginTop: isLastStation ? "-26px" :
                                                    index === 0 ? "-64px" : "-24px",
                                            }}
                                        >
                                            {station}
                                            <span className="ml-2 text-gray-500 italic">
                                            </span>
                                        </p>
                                    </div>

                                    {/* Route Change */}
                                    {isRouteChange && !isLastStation && (
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-center">
                                                {/* Gray line */}
                                                <div
                                                    className="w-1 h-14 mx-auto"
                                                    style={{
                                                        borderLeft: "4px dotted #2b2b2b",
                                                    }}
                                                ></div>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/transport/transfer.svg"
                                                    alt="Interchange Guy"
                                                    className="absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 bg-white rounded"
                                                    style={{
                                                        marginTop: "-8px",
                                                    }}
                                                />

                                                <div
                                                    className="absolute w-6 h-6 top-20.5 left-12 transform -translate-x-1/2 italic"
                                                    style={{
                                                        marginTop: "-8px", // Move text down by 2px
                                                        color: '#2b2b2b' // Hex color for text
                                                    }}>
                                                    Transfer
                                                </div>

                                                {/* Image above the line */}

                                                {/* Second Circle */}
                                                <div
                                                    className="w-5 h-5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            routeSegments[index]?.color || "#2b2b2b",
                                                        marginTop: "-20px", // Move the second transfer circle up by 8px
                                                    }}
                                                ></div>
                                                {/* Connecting line to the next stop */}
                                                <div
                                                    className="w-1000 h-16 flex flex-col items-start" // Add flex-col for vertical layout
                                                    style={{
                                                        backgroundColor: routeSegments[index]?.color || "#2b2b2b",
                                                        marginTop: "-4px",
                                                        width: "4px", // Aligns with the second transfer
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
                                                                marginTop: "8px", // Move text down by 2px
                                                                backgroundColor: routeSegments[0]?.color || "#2b2b2b",
                                                                color: isDark(routeSegments[0]?.color || "#2b2b2b") ? "white" : "black", // Conditional text color
                                                            }}
                                                        >
                                                            <p className="ml-7">{route}</p>
                                                        </p>
                                                        <p className="ml-1 text-sm whitespace-nowrap inline-block font-bold"
                                                           style={{
                                                               marginTop: "10px"
                                                           }}>
                                                            to {eachDest}
                                                        </p>
                                                    </div>
                                                    <p className="ml-8 text-sm whitespace-nowrap inline-block"
                                                       style={{
                                                           marginTop: "2px",
                                                           color: "gray"
                                                       }}>
                                                        {freq}
                                                    </p>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={"/transport/badge.svg"}
                                                        alt="test"
                                                        className={`absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2 ${!(route.includes("Tokaido") || route.includes("Kotoha")) ? "invert" : ""}`}
                                                        style={{
                                                            marginTop: "37px",
                                                            marginLeft: "37px",
                                                        }}
                                                    />
                                                    <p className={`text-sm whitespace-nowrap inline-block ${!(route.includes("Tokaido") || route.includes("Kotoha")) ? "text-white" : "text-black font-bold"}`}
                                                       style={{
                                                           marginLeft: "56px",
                                                           marginTop: "3px",
                                                       }}>
                                                        Licensed driver need to be requested on this line
                                                    </p>

                                                </div>


                                            </div>
                                            <p
                                                className={`ml-4 text-sm flex items-center h-8 ${
                                                    station === origin || station === destination || transferPoints.includes(station)
                                                        ? "font-bold"
                                                        : ""
                                                }`}
                                                style={{
                                                    marginTop: "-24px", // Move text down by 2px
                                                }}
                                            >
                                                {station}
                                                <span className="ml-2 text-gray-500 italic">
                                                </span>
                                            </p>

                                        </div>

                                    )}
                                </React.Fragment>
                            );
                        })
                    )}
                </div>
            ) : origin === destination ? (
                    <p>The origin station is same as your destination.</p>
                ) :
                (
                    <p>We&apos;re sorry, but we can&apos;t find the possible route. Is origin the same as destination?
                        Or typo?</p>
                )}
            <div className="mt-4">
                <button
                    onClick={() => router.push("/transportation")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Return to transportation page
                </button>
            </div>
        </div>
    );
};

export default RouteDetails;

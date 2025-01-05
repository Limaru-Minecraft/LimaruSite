import { useRouter } from "next/router";
import React from "react";
import routes from "./routes.json";

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
    const intermediateStops = [];

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
        } else {
            intermediateStops.push(currentStation);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Suggested Route{" "}
                <span className="text-lg font-medium ml-10 mr-2">{origin}</span> →{" "}
                <span className="text-lg font-medium mx-2">{destination}</span>
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
                                    routeSegments[0]?.routeDestination
                                        ? ` - Destination: ${routeSegments[0].routeDestination}`
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
                            let stationType;
                            let firstStation;

                            if (station === origin) {
                                firstStation =
                                    routeNames[0] === "Walking"
                                        ? "(Out-of-Station Interchange)"
                                        : routeNames[0]
                                            ? `(Take the ${routeNames[0]}${
                                                routeSegments[0]?.frequency
                                                    ? ` - Frequency: ${routeSegments[0].frequency}`
                                                    : ""
                                            }${
                                                routeSegments[0]?.routeDestination
                                                    ? ` - Destination: ${routeSegments[0].routeDestination}`
                                                    : ""
                                            })`
                                            : "";
                            } else if (station === destination) {
                                firstStation = "";
                            } else if (transferPoints.includes(station)) {
                                const transferIndex = routeSegments.findIndex(
                                    (seg) => seg.from === station
                                );
                                stationType =
                                    routeNames[transferIndex] === "Walking"
                                        ? "(Out-of-Station Interchange)"
                                        : routeNames[transferIndex]
                                            ? `(Transfer to the ${routeNames[transferIndex]}${
                                                routeSegments[transferIndex]?.frequency
                                                    ? ` - Frequency: ${routeSegments[transferIndex].frequency}`
                                                    : ""
                                            }${
                                                routeSegments[transferIndex]?.routeDestination
                                                    ? ` - Destination: ${routeSegments[transferIndex].routeDestination}`
                                                    : ""
                                            })`
                                            : "(Transfer to the route)";
                            } else {
                                firstStation = "";
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
                                                    marginTop: isLastStation ? "-8px" : "0px",
                                                }}
                                            ></div>
                                            {/* Connecting line */}
                                            {!isLastStation && (
                                                <div

                                                    className={
                                                    index === 0 ? "w-1 h-16 mx-auto" : "w-1 h-6 mx-auto"
                                                    }
                                                    style={{
                                                        backgroundColor: isRouteChange
                                                            ? "transparent"
                                                            : routeSegments[index]?.color || "#2b2b2b",
                                                        borderLeft: isRouteChange ? "4px dotted #2b2b2b" : "none",
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
                                                marginTop: isLastStation ? "-8px" :
                                                    index === 0 ? "-64px" : "-24px",
                                            }}
                                        >
                                            {station}
                                            <span className="ml-2 text-gray-500 italic">
                                                {firstStation}
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
                                                <img
                                                    src="/transport/interchange_guy.png"
                                                    alt="Interchange Guy"
                                                    className="absolute w-6 h-6 top-23 left-2.5 transform -translate-x-1/2"
                                                    style={{marginTop: "-8px",
                                                    }}

                                                />
                                                <div className="absolute w-6 h-6 top-20.5 left-12 transform -translate-x-1/2 text-gray-500 italic"
                                                     style={{
                                                         marginTop: "-8px", // Move text down by 2px
                                                     }}>
                                                    Interchange
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
                                                    className="w-1 h-16 mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            routeSegments[index]?.color || "#2b2b2b",
                                                        marginTop: "-4px", // Aligns with the second transfer
                                                    }}
                                                ></div>
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
                                                    {stationType}
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
                <p>We&apos;re sorry, but we can&apos;t find the possible route. Is origin the same as destination? Or typo?</p>
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

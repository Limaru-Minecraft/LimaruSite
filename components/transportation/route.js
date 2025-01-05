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
            // routeSegments[i - 1]?.color !== routeSegments[i]?.color;
            routeNames[i-1] !== routeNames[i];

        if (isRouteChange) {
            transferPoints.push(currentStation);
        } else {
            intermediateStops.push(currentStation);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Suggested Route</h2>
            {routeSegments.length > 0 ? (
                <div className="relative flex flex-col items-start">
                    {isSingleRoute ? (
                        // Direct route with no transfers
                        <div className="flex items-center">
                            <p className="ml-4 text-sm">
                                {`Take the ${routeNames[0]}`}
                            </p>
                        </div>
                    ) : (
                        // Multiple routes with transfers
                        stations.map((station, index) => {
                            const isRouteChange =
                                index > 0 &&
                                routeSegments[index - 1]?.color !== routeSegments[index]?.color;

                            const isLastStation = index === stations.length - 1;

                            // Determine station type
                            let stationType;
                            let firstStation;

                            if (station === origin) {
                                firstStation =
                                    routeNames[0] === "Walking"
                                        ? "(Out-of-Station Interchange)"
                                        : routeNames[0]
                                        ? `(Take the ${routeNames[0]})`
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
                                        ? `(Transfer to the ${routeNames[transferIndex]})`
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
                                                        "#ccc",
                                                    marginTop: isLastStation ? "-8px" : "0px",
                                                }}
                                            ></div>
                                            {/* Connecting line */}
                                            {!isLastStation && (
                                                <div
                                                    className="w-1 h-6 mx-auto"
                                                    style={{
                                                        backgroundColor: isRouteChange
                                                            ? "#ccc" // Gray line for transfer
                                                            : routeSegments[index]?.color || "#ccc",
                                                    }}
                                                ></div>
                                            )}
                                        </div>
                                        <p
                                            className={`ml-4 text-sm flex items-center h-8 ${
                                                station === origin ||
                                                station === destination ||
                                                transferPoints.includes(station)
                                                    ? "font-bold"
                                                    : ""
                                            }`}
                                            style={{
                                                marginTop: isLastStation ? "-8px" : "-24px",
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
                                                    className="w-1 h-4 mx-auto"
                                                    style={{
                                                        backgroundColor: "#ccc",
                                                    }}
                                                ></div>
                                                {/* Second Circle */}
                                                <div
                                                    className="w-5 h-5 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            routeSegments[index]?.color || "#ccc",
                                                        marginTop: "-20px", // Move the second transfer circle up by 8px
                                                    }}
                                                ></div>
                                                {/* Connecting line to the next stop */}
                                                <div
                                                    className="w-1 h-6 mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            routeSegments[index]?.color || "#ccc",
                                                        marginTop: "-4px", // Aligns with the second transfer
                                                    }}
                                                ></div>
                                            </div>
                                            <p
                                                className={`ml-4 text-sm flex items-center h-8 ${
                                                    station === origin ||
                                                    station === destination ||
                                                    transferPoints.includes(station)
                                                        ? "font-bold"
                                                        : ""
                                                }`}
                                                style={{
                                                    marginTop: "-22px", // Move text down by 2px
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
            ) : (
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
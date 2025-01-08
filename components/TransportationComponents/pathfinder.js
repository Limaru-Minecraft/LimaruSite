import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import routes from "./routes.json"; // Assuming routes.json contains the graph data

const travelOptions = [
    { value: "all", label: "All" },
    { value: "minimumStations", label: "Minimum Stations" },
    { value: "minimumTransfers", label: "Minimum Transfers" },
    { value: "isDriverless", label: "Without Driver First" }, // New option for driverless routes
];

const allStations = Object.keys(routes);

// Function to check if a direct route exists
function findDirectRoute(graph, start, end) {
    if (graph[start] && graph[start][end]) {
        return { path: [start, end], distance: graph[start][end].distance };
    }
    return null;
}

// BFS to find all possible paths
function findAllPaths(graph, start, end) {
    const paths = [];
    const queue = [[start, [start], 0, 0, null]]; // [current station, path, totalDistance, transfers, currentLine]

    while (queue.length > 0) {
        const [current, path, totalDistance, transfers, currentLine] = queue.shift();

        // If we've reached the destination, save the path
        if (current === end) {
            paths.push({
                path,
                totalDistance,
                stationCount: path.length - 1,
                transfers,
            });
            continue;
        }

        // Explore all neighbors
        for (const neighbor in graph[current]) {
            const edge = graph[current][neighbor];
            const { distance, line, frequency } = edge; // Extract "line" and "frequency" fields

            if (!path.includes(neighbor)) {
                const linesToCheck = Array.isArray(line) ? line : [line];
                let newTransfers = transfers;

                // Increment transfers if we are switching lines
                if (currentLine && linesToCheck.every(newLine => newLine !== currentLine)) {
                    newTransfers = transfers + 1; // We have changed lines
                }

                linesToCheck.forEach(newLine => {
                    queue.push([
                        neighbor,
                        [...path, neighbor],
                        totalDistance + distance,
                        newTransfers,
                        newLine,
                    ]);
                });
            }
        }
    }

    return paths;
}

// Function to find the optimal route based on user selection
function findOptimalRoute(graph, start, end, optimizationType) {
    const allPaths = findAllPaths(graph, start, end);

    if (!allPaths.length) return { path: [], totalDistance: 0 };

    // Handle "No Driver Route" mode
    if (optimizationType === "isDriverless") {
        // Prioritize routes with frequency field not null (automatic routes)
        const driverlessPaths = allPaths.filter(path => {
            return path.path.some(station => {
                const edge = graph[station] && graph[station][path.path[path.path.indexOf(station) + 1]];
                return edge && edge.frequency !== null; // Check for non-null frequency
            });
        });

        if (driverlessPaths.length) {
            // Return the first valid driverless path
            return driverlessPaths[0];
        }
    }

    // Default to the other modes if "No Driver Route" paths are not found
    if (optimizationType === "minimumTransfers") {
        return allPaths.reduce((best, current) => {
            if (
                current.transfers < best.transfers ||
                (current.transfers === best.transfers && current.totalDistance < best.totalDistance) ||
                (current.transfers === best.transfers &&
                    current.totalDistance === best.totalDistance &&
                    current.stationCount < best.stationCount)
            ) {
                return current;
            }
            return best;
        }, allPaths[0]);
    }

    if (optimizationType === "minimumStations") {
        return allPaths.reduce((best, current) => {
            if (
                current.stationCount < best.stationCount ||
                (current.stationCount === best.stationCount && current.totalDistance < best.totalDistance)
            ) {
                return current;
            }
            return best;
        }, allPaths[0]);
    }

    if (optimizationType === "all") {
        return allPaths.reduce((best, current) => {
            const compareTransfers = current.transfers < best.transfers;
            const compareStations = current.stationCount < best.stationCount;
            const compareDistance = current.totalDistance < best.totalDistance;

            if (
                compareTransfers ||
                (current.transfers === best.transfers &&
                    (compareStations || (current.stationCount === best.stationCount && compareDistance)))
            ) {
                return current;
            }

            return best;
        }, allPaths[0]);
    }

    // Default to shortest distance
    return allPaths.reduce((best, current) => {
        if (current.totalDistance < best.totalDistance) {
            return current;
        }
        return best;
    }, allPaths[0]);
}

const Pathfinder = () => {
    const [selectedTravelOption, setSelectedTravelOption] = useState("all");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const originRef = useRef(null);
    const destinationRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        // Prefill origin, destination, and travelOption from URL query
        if (router.query.origin && router.query.destination) {
            setOrigin(router.query.origin);
            setDestination(router.query.destination);
        }

        if (router.query.travelOption) {
            setSelectedTravelOption(router.query.travelOption);
        }

        const handleClickOutside = (event) => {
            if (
                originRef.current &&
                !originRef.current.contains(event.target) &&
                destinationRef.current &&
                !destinationRef.current.contains(event.target)
            ) {
                setOriginSuggestions([]);
                setDestinationSuggestions([]);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [router.query.origin, router.query.destination, router.query.travelOption]);

    const handleOriginFocus = () => {
        setOriginSuggestions(allStations);
    };

    const handleDestinationFocus = () => {
        setDestinationSuggestions(allStations);
    };

    const handleOriginChange = (event) => {
        const value = event.target.value.toLowerCase();
        setOrigin(value);
        setOriginSuggestions(
            allStations.filter((station) =>
                station.toLowerCase().includes(value)
            )
        );
    };

    const handleDestinationChange = (event) => {
        const value = event.target.value.toLowerCase();
        setDestination(value);
        setDestinationSuggestions(
            allStations.filter((station) =>
                station.toLowerCase().includes(value)
            )
        );
    };

    const handleFindRoute = () => {
        if (!origin || !destination) {
            alert("Please enter both origin and destination.");
            return;
        }

        const directRoute = findDirectRoute(routes, origin, destination);

        if (directRoute) {
            router.push({
                pathname: "/route",
                query: {
                    path: directRoute.path.join(","),
                    distance: directRoute.distance,
                    origin,
                    destination,
                    travelOption: selectedTravelOption,
                },
            }).then(() => {
                router.reload(); // Refresh the page after navigation
            });
            return;
        }

        const calculatedRoute = findOptimalRoute(
            routes,
            origin,
            destination,
            selectedTravelOption
        );

        if (!calculatedRoute.path.length) {
            alert("No route found between the selected stations.");
            return;
        }

        router.push({
            pathname: "/route",
            query: {
                path: calculatedRoute.path.join(","),
                distance: calculatedRoute.totalDistance,
                origin,
                destination,
                travelOption: selectedTravelOption,
            },
        }).then(() => {
            router.reload(); // Refresh the page after navigation
        });
    };

    const handleSwap = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md" style={{ position: 'relative', zIndex: 10 }}>
            <div className="flex flex-wrap items-end gap-4">
                <div>
                    <label htmlFor="travel-option" className="block font-medium mb-1">
                        Travel Option:
                    </label>
                    <select
                        id="travel-option"
                        value={selectedTravelOption}
                        onChange={(e) => setSelectedTravelOption(e.target.value)}
                        className="border rounded p-2"
                        style={{ width: "200px" }}
                    >
                        {travelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-grow flex items-start gap-2">
                    <div className="relative flex-1" ref={originRef}>
                        <label htmlFor="origin" className="block font-medium mb-1">
                            Origin:
                        </label>
                        <input
                            type="text"
                            id="origin"
                            className="border rounded p-2 w-full"
                            value={origin}
                            onFocus={handleOriginFocus}
                            onChange={handleOriginChange}
                        />
                        {originSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {originSuggestions.sort((a, b) => a.localeCompare(b))
                                    .map((station) => (
                                        <li
                                            key={station}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => {
                                                setOrigin(station);
                                                setOriginSuggestions([]);
                                            }}
                                        >
                                            {station}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
                        onClick={handleSwap}
                    >
                        ⇄
                    </button>

                    <div className="relative flex-1" ref={destinationRef}>
                        <label htmlFor="destination" className="block font-medium mb-1">
                            Destination:
                        </label>
                        <input
                            type="text"
                            id="destination"
                            className="border rounded p-2 w-full"
                            value={destination}
                            onFocus={handleDestinationFocus}
                            onChange={handleDestinationChange}
                        />
                        {destinationSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {destinationSuggestions.sort((a, b) => a.localeCompare(b))
                                    .map((station) => (
                                        <li
                                            key={station}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => {
                                                setDestination(station);
                                                setDestinationSuggestions([]);
                                            }}
                                        >
                                            {station}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleFindRoute}
                    >
                        Find Route
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pathfinder;

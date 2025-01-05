import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import routes from "./routes.json"; // Assuming routes.json contains the graph data

const travelOptions = [
    { value: "all", label: "All" },
];

const allStations = Object.keys(routes);

// Function to check if a direct route exists
function findDirectRoute(graph, start, end) {
    if (graph[start] && graph[start][end]) {
        return { path: [start, end], distance: graph[start][end].distance, type: graph[start][end].type };
    }
    return null;
}

// BFS to find all possible paths, taking into account mode of transport
function findAllPaths(graph, start, end, allowedTypes) {
    const paths = [];
    const queue = [[start, [start], 0, null]]; // [current station, path so far, total distance, current route type]

    while (queue.length > 0) {
        const [current, path, totalDistance, currentType] = queue.shift();

        // If the current station is the destination, add the path to results
        if (current === end) {
            paths.push({ path, totalDistance, routeConsistency: true });
            continue;
        }

        for (const neighbor in graph[current]) {
            const edge = graph[current][neighbor];

            if (
                (!allowedTypes || allowedTypes.includes(edge.type)) && // Allowed transport type
                !path.includes(neighbor) // Avoid revisiting stations in the same path
            ) {
                const isSameRoute = currentType === null || currentType === edge.type;
                queue.push([
                    neighbor,
                    [...path, neighbor],
                    totalDistance + edge.distance,
                    edge.type,
                ]);
                if (!isSameRoute) {
                    paths.push({ path: [...path, neighbor], totalDistance: totalDistance + edge.distance, routeConsistency: false });
                }
            }
        }
    }

    return paths;
}


// Function to select the path with the minimum station count, same route if possible, then minimum distance
// Function to select the path with the shortest distance
function findOptimalRoute(graph, start, end, allowedTypes) {
    const allPaths = findAllPaths(graph, start, end, allowedTypes);

    if (!allPaths.length) return { path: [], distance: 0 }; // No paths found

    let bestPath = null;
    let minDistance = Infinity;

    allPaths.forEach(({ path, totalDistance }) => {
        // Update best path based on distance only
        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            bestPath = path;
        }
    });

    return {
        path: bestPath,
        distance: minDistance,
    };
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
        // Prefill origin and destination from URL query
        if (router.query.origin && router.query.destination) {
            setOrigin(router.query.origin);
            setDestination(router.query.destination);
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
    }, [router.query.origin, router.query.destination]);

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
            });
        } else {
            const allowedTypes =
                selectedTravelOption === "all" ? null : selectedTravelOption.split("-and-");
            const calculatedRoute = findOptimalRoute(routes, origin, destination, allowedTypes);

            router.push({
                pathname: "/route",
                query: {
                    path: calculatedRoute.path ? calculatedRoute.path.join(",") : "",
                    distance: calculatedRoute.distance || 0,
                    origin,
                    destination,
                    travelOption: selectedTravelOption,
                },
            });
        }
    };

    const handleSwap = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
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
                        style={{ width: "150px" }}
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
                            style={{ width: "300px" }}
                            value={origin}
                            onFocus={handleOriginFocus}
                            onChange={handleOriginChange}
                        />
                        {originSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {originSuggestions
                                    .sort((a, b) => a.localeCompare(b)) // Sort suggestions alphabetically
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
                            style={{ width: "300px" }}
                            value={destination}
                            onFocus={handleDestinationFocus}
                            onChange={handleDestinationChange}
                        />
                        {destinationSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {destinationSuggestions
                                    .sort((a, b) => a.localeCompare(b)) // Sort suggestions alphabetically
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

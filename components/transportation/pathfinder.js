import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import routes from "./routes.json";

const travelOptions = [
    { value: "all", label: "All" },
];

const allStations = Object.keys(routes);

// Function to check if a direct route exists
function findDirectRoute(graph, start, end) {
    if (graph[start] && graph[start][end]) {
        return [start, end]; // Return the direct route path if it exists
    }
    return null;
}

// BFS to find all possible paths
function findAllPaths(graph, start, end, allowedTypes) {
    const paths = [];
    const queue = [[start]];
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];

        if (current === end) {
            paths.push(path); // Found a valid path
            continue;
        }

        if (visited.has(current)) {
            continue; // Skip already visited nodes to avoid cycles
        }

        visited.add(current);

        for (const neighbor in graph[current]) {
            if (
                !allowedTypes ||
                allowedTypes.every((type) => graph[current][neighbor].type.includes(type))
            ) {
                queue.push([...path, neighbor]); // Add the neighbor to the current path
            }
        }
    }

    return paths;
}

// Function to select the path with the minimum station count
function findShortestRouteByStations(graph, start, end, allowedTypes) {
    const allPaths = findAllPaths(graph, start, end, allowedTypes);

    // Find the path with the minimum number of stations (length)
    let minPath = null;
    let minLength = Infinity;

    allPaths.forEach((path) => {
        if (path.length < minLength) {
            minLength = path.length;
            minPath = path;
        }
    });

    return minPath;
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
    }, []);

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

        // First, try to find a direct route (single route)
        const directRoute = findDirectRoute(routes, origin, destination);

        if (directRoute) {
            // If a direct route is found, use it and redirect
            router.push({
                pathname: "/route",
                query: {
                    path: directRoute.join(","),
                    origin,
                    destination,
                    travelOption: selectedTravelOption,
                },
            });
        } else {
            // If no direct route is found, find the shortest path (with transfers)
            const allowedTypes =
                selectedTravelOption === "all" ? null : selectedTravelOption.split("-and-");
            const calculatedPath = findShortestRouteByStations(routes, origin, destination, allowedTypes);

            router.push({
                pathname: "/route",
                query: {
                    path: calculatedPath ? calculatedPath.join(",") : "",
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
                        style={{width: "150px"}}
                    >
                        {travelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-grow flex items-end gap-2">
                    <div className="relative flex-1" ref={originRef}>
                        <label htmlFor="origin" className="block font-medium mb-1">
                            Origin:
                        </label>
                        <input
                            type="text"
                            id="origin"
                            className="border rounded p-2 w-full"
                            style={{width: "300px"}}
                            value={origin}
                            onFocus={handleOriginFocus}
                            onChange={handleOriginChange}
                        />
                        {originSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {originSuggestions.map((station) => (
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                            style={{width: "300px"}}
                            value={destination}
                            onFocus={handleDestinationFocus}
                            onChange={handleDestinationChange}
                        />
                        {destinationSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto">
                                {destinationSuggestions.map((station) => (
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

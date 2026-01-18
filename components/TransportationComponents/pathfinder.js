import React, { useState, useRef, useEffect } from "react";

// --- UI Sub-components ---
const travelOptions = [
    { value: "fastest", label: "Recommended" },
    { value: "minsta", label: "Minimum Stations" },
    { value: "mintrans", label: "Minimum Transfers" },
];

const LineMarker = ({ lineKey, lineDetails }) => {
    const lineInfo = lineDetails.get(lineKey) || {};
    return <div className="inline-flex justify-center items-center w-6 h-6 rounded-full text-black bg-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ boxShadow: `0 0 0 2px ${lineInfo.color || '#ccc'}` }}>{lineKey}</div>;
};

const BusLinePills = ({ lines, lineDetails }) => {
    if (!lines || lines.length === 0) return null;
    return (
        <div className="flex gap-1 flex-shrink-0">
            {lines.map(lineKey => {
                const lineInfo = lineDetails.get(lineKey) || {};
                return <span key={lineKey} className="text-xs font-semibold px-1.5 py-0.5 border rounded" style={{ color: lineInfo.color, borderColor: lineInfo.color }}>{lineKey}</span>;
            })}
        </div>
    );
};


// --- Main Component ---
const Pathfinder = () => {
    // --- STATE MANAGEMENT ---
    // Data state
    const [displayData, setDisplayData] = useState({ trains: new Map(), buses: [] });
    const [lineDetails, setLineDetails] = useState(new Map());
    const [allLocations, setAllLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataError, setDataError] = useState("");
    
    // UI state
    const [uiError, setUiError] = useState("");
    const [selectedTravelOption, setSelectedTravelOption] = useState("fastest");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [originSuggestions, setOriginSuggestions] = useState(null);
    const [destinationSuggestions, setDestinationSuggestions] = useState(null);

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    // --- DATA FETCHING & PROCESSING ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setDataError("");
            try {
                const [datasetRes, datanodesRes] = await Promise.all([
                    fetch('https://winsanmwtv.github.io/tre-api/raw-data/routes/dataset.json'),
                    fetch('https://winsanmwtv.github.io/tre-api/raw-data/routes/datanodes.json')
                ]);
                if (!datasetRes.ok || !datanodesRes.ok) throw new Error(`HTTP error!`);

                const dataset = await datasetRes.json();
                const datanodes = await datanodesRes.json();
                
                const lines = new Map();
                [...dataset.routes, ...dataset.bus_routes].forEach(route => {
                    lines.set(String(route.key), { name: route.name, color: route.color || '#cbd5e0' });
                });
                setLineDetails(lines);

                const stationLinesMap = new Map();
                for (const stationKey in datanodes) {
                    const servingLines = new Set();
                    for (const neighborKey in datanodes[stationKey]) {
                        const conn = datanodes[stationKey][neighborKey];
                        if (conn.lines) {
                           (Array.isArray(conn.lines) ? conn.lines : [conn.lines]).forEach(line => servingLines.add(String(line)));
                        }
                    }
                    const filteredLines = [...servingLines].filter(line => line !== '0' && line !== '1');
                    if (filteredLines.length > 0) stationLinesMap.set(stationKey, filteredLines);
                }

                const locations = [...dataset.stations.map(s => ({ ...s, type: 'train' })), ...dataset.bus_stops.map(b => ({ ...b, type: 'bus' }))]
                    .map(loc => ({ name: loc.name, key: loc.key, type: loc.type, lines: stationLinesMap.get(loc.key) || [] }));
                setAllLocations(locations);

                // --- MODIFIED SECTION ---
                const trainLineGroups = new Map();
                const busStopGroup = [];
                const lineGroupPrefixes = ['LP', 'TN']; // Define the prefixes for grouping

                locations.forEach(loc => {
                    if (loc.type === 'train') {
                        // Use a Set to add a station to a merged group only once
                        const uniqueGroupKeys = new Set(); 
                        
                        loc.lines.forEach(lineKey => {
                            if (!lines.has(lineKey)) return;

                            // Find if the lineKey starts with a defined prefix
                            const matchingPrefix = lineGroupPrefixes.find(p => lineKey.startsWith(p));
                            // Use the prefix as the group key, or the original lineKey if no prefix matches
                            const groupKey = matchingPrefix || lineKey;
                            uniqueGroupKeys.add(groupKey);
                        });

                        // Add the station to each of its unique groups
                        uniqueGroupKeys.forEach(groupKey => {
                            if (!trainLineGroups.has(groupKey)) {
                                trainLineGroups.set(groupKey, []);
                            }
                            // Ensure station isn't added twice to the same group
                            if (!trainLineGroups.get(groupKey).some(s => s.key === loc.key)) {
                                trainLineGroups.get(groupKey).push(loc);
                            }
                        });

                    } else {
                        busStopGroup.push(loc);
                    }
                });
                // --- END MODIFIED SECTION ---

                const lineTermini = dataset.terminus || {};
                trainLineGroups.forEach((stations, lineKey) => {
                    const termini = lineTermini[lineKey];
                    if (!termini || termini.length === 0) {
                        stations.sort((a, b) => a.name.localeCompare(b.name));
                        return;
                    }
                    
                    const sequence = [termini[0]];
                    const visited = new Set(sequence);
                    let currentNode = termini[0];

                    while (sequence.length < stations.length) {
                        const neighbors = datanodes[currentNode];
                        let nextNode = null;
                        if (!neighbors) break;
                        for (const neighborKey in neighbors) {
                            if (visited.has(neighborKey)) continue;
                            const connLines = Array.isArray(neighbors[neighborKey].lines) ? neighbors[neighborKey].lines.map(String) : [String(neighbors[neighborKey].lines)];
                            if (connLines.includes(lineKey) && stations.some(s => s.key === neighborKey)) {
                                nextNode = neighborKey;
                                break;
                            }
                        }
                        if (nextNode) {
                            sequence.push(nextNode);
                            visited.add(nextNode);
                            currentNode = nextNode;
                        } else { break; }
                    }
                    stations.sort((a, b) => {
                        const indexA = sequence.indexOf(a.key);
                        const indexB = sequence.indexOf(b.key);
                        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
                    });
                });
                
                busStopGroup.sort((a, b) => a.name.localeCompare(b.name));

                setDisplayData({ trains: new Map([...trainLineGroups.entries()].sort()), buses: busStopGroup });

            } catch (e) {
                console.error("Failed to fetch transit data:", e);
                setDataError("Could not load station data. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Effect to parse URL parameters
     useEffect(() => {
        if (allLocations.length > 0) {
            const params = new URLSearchParams(window.location.search);
            const criteriaParam = params.get("criteria");
            const originKey = params.get("origin");
            const destKey = params.get("dest");
            if (criteriaParam && travelOptions.some(opt => opt.value === criteriaParam)) setSelectedTravelOption(criteriaParam);
            if (originKey) setOrigin(allLocations.find(loc => loc.key === originKey)?.name || "");
            if (destKey) setDestination(allLocations.find(loc => loc.key === destKey)?.name || "");
        }
    }, [allLocations]);

    // Effect to handle clicks outside suggestion boxes
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (originRef.current && !originRef.current.contains(event.target)) setOriginSuggestions(null);
            if (destinationRef.current && !destinationRef.current.contains(event.target)) setDestinationSuggestions(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Event Handlers ---
    const handleSuggestions = (value, type) => {
        const setter = type === 'origin' ? setOriginSuggestions : setDestinationSuggestions;
        if (!value) {
            setter(displayData);
            return;
        }
        const lowerCaseValue = value.toLowerCase();
        const filteredTrains = new Map();
        displayData.trains.forEach((stations, lineKey) => {
            const filteredStations = stations.filter(s => s.name.toLowerCase().includes(lowerCaseValue));
            if (filteredStations.length > 0) filteredTrains.set(lineKey, filteredStations);
        });
        const filteredBuses = displayData.buses.filter(s => s.name.toLowerCase().includes(lowerCaseValue));
        setter({ trains: filteredTrains, buses: filteredBuses });
    };

    const handleOriginChange = (e) => { setOrigin(e.target.value); handleSuggestions(e.target.value, 'origin'); };
    const handleDestinationChange = (e) => { setDestination(e.target.value); handleSuggestions(e.target.value, 'destination'); };
    const handleSwap = () => { setOrigin(destination); setDestination(origin); };

    const handleFindRoute = () => {
        setUiError("");
        const originLocation = allLocations.find(loc => loc.name.toLowerCase() === origin.toLowerCase());
        const destinationLocation = allLocations.find(loc => loc.name.toLowerCase() === destination.toLowerCase());

        if (!originLocation) return setUiError("Invalid origin. Please select a valid station from the list.");
        if (!destinationLocation) return setUiError("Invalid destination. Please select a valid station from the list.");

        const params = new URLSearchParams({ criteria: selectedTravelOption, origin: originLocation.key, dest: destinationLocation.key, source: "limaru.net" });
        window.location.href = `https://winsanmwtv.github.io/tre-api/limaru-tripplanner/index.html?${params.toString()}`;
    };
  
    // --- Render Logic ---
    const renderSuggestionsList = (suggestions, onSelect) => {
        if (!suggestions || (suggestions.trains.size === 0 && suggestions.buses.length === 0)) return null;
        return (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                {[...suggestions.trains.entries()].map(([lineKey, stations]) => (
                    <div key={lineKey}>
                        <div className="p-2 font-bold bg-gray-50 sticky top-0 flex items-start gap-2 z-10">
                             <LineMarker lineKey={lineKey} lineDetails={lineDetails} />
                             <div className="flex-1 min-w-0">{lineDetails.get(lineKey)?.name || 'Unknown Line'}</div>
                        </div>
                        {stations.map(loc => <div key={loc.key} className="p-2 pl-6 hover:bg-indigo-50 cursor-pointer flex items-center bg-white" onClick={() => onSelect(loc.name)}>{loc.name}</div>)}
                    </div>
                ))}
                {suggestions.buses.length > 0 && (
                     <div>
                        <div className="p-2 font-bold bg-gray-50 sticky top-0 flex items-center gap-2 z-10">
                            <span role="img" aria-label="Bus Stop">🚏</span> Bus Stops
                        </div>
                        {suggestions.buses.map(loc => (
                            <div key={loc.key} className="p-2 pl-6 hover:bg-indigo-50 cursor-pointer flex justify-between items-center bg-white" onClick={() => onSelect(loc.name)}>
                                <span>{loc.name}</span>
                                <BusLinePills lines={loc.lines} lineDetails={lineDetails} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    if (isLoading) return <div className="text-center p-10">Loading station data...</div>;

    const error = uiError || dataError;

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-sans">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">{error}</div>}
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-shrink-0">
                    <label htmlFor="travel-option" className="block text-sm font-medium text-gray-700 mb-1">Travel Option</label>
                    <select id="travel-option" value={selectedTravelOption} onChange={(e) => setSelectedTravelOption(e.target.value)} className="border-gray-300 rounded-md shadow-sm p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 transition">
                        {travelOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </div>
                <div className="flex-grow flex items-end gap-2">
                    <div className="relative flex-1" ref={originRef}>
                        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                        <input type="text" id="origin" className="border-gray-300 rounded-md shadow-sm p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 transition" value={origin} onFocus={() => handleSuggestions(origin, 'origin')} onChange={handleOriginChange} placeholder="Enter origin station" autoComplete="off"/>
                        {renderSuggestionsList(originSuggestions, (name) => { setOrigin(name); setOriginSuggestions(null); })}
                    </div>
                    <button onClick={handleSwap} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-md self-end transition-colors" title="Swap origin and destination">&#x21C4;</button>
                    <div className="relative flex-1" ref={destinationRef}>
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                        <input type="text" id="destination" className="border-gray-300 rounded-md shadow-sm p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 transition" value={destination} onFocus={() => handleSuggestions(destination, 'destination')} onChange={handleDestinationChange} placeholder="Enter destination station" autoComplete="off"/>
                        {renderSuggestionsList(destinationSuggestions, (name) => { setDestination(name); setDestinationSuggestions(null); })}
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <button onClick={handleFindRoute} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md shadow-sm w-full md:w-auto transition-transform transform hover:scale-105">Find Route</button>
                </div>
            </div>
        </div>
    );
};

export default Pathfinder;

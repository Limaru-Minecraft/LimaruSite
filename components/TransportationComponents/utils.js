export function isDark(color) {
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

export function findDirectRoute(graph, start, end) {
    if (graph[start] && graph[start][end]) {
        return { path: [start, end], distance: graph[start][end].distance };
    }
    return null;
}

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

export function findOptimalRoute(graph, start, end, optimizationType) {
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
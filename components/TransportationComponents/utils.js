export function isDark(color) {
    if (!color) return false;

    let r, g, b;
    if (color.startsWith("#")) {
        const hex = color.length === 4
            ? color.slice(1).split("").map(c => c + c)
            : [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)];
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

function findAllPaths(graph, start, end, maxDepth = 50, maxRoutes = 1000) {
    const paths = [];
    const queue = [[start, [start], 0, 0, null]]; // [current station, path, totalDistance, transfers, currentLine]
    const visited = new Set();
    let routeCount = 0;

    while (queue.length > 0 && routeCount < maxRoutes) {
        const [current, path, totalDistance, transfers, currentLine] = queue.shift();

        // Stop if path exceeds max depth
        if (path.length > maxDepth) continue;

        // If we reached the destination, store the path
        if (current === end) {
            paths.push({
                path,
                totalDistance,
                stationCount: path.length - 1,
                transfers,
            });
            routeCount++;
            continue;
        }

        visited.add(current); // Mark current node as visited

        for (const neighbor in graph[current]) {
            const edge = graph[current][neighbor];
            if (!edge || visited.has(neighbor)) continue; // Skip already visited nodes

            const { distance, line } = edge;
            const linesToCheck = Array.isArray(line) ? line : [line];
            let newTransfers = transfers;

            // Check for line transfer
            if (currentLine && linesToCheck.every(newLine => newLine !== currentLine)) {
                newTransfers += 1;
            }

            for (const newLine of linesToCheck) {
                queue.push([
                    neighbor,
                    [...path, neighbor],
                    totalDistance + distance,
                    newTransfers,
                    newLine,
                ]);
            }
        }

        // Prevent excessive queue growth
        if (queue.length > 10000) {
            throw new Error("Search terminated: excessive queue size.");
        }
    }

    return paths;
}

export function findOptimalRoute(graph, start, end, optimizationType) {
    const maxDepth = 50; // Adjustable
    const maxRoutes = 1000; // Adjustable
    const allPaths = findAllPaths(graph, start, end, maxDepth, maxRoutes);

    if (!allPaths.length) {
        return { error: "No path found between the specified stations." };
    }

    if (optimizationType === "isDriverless") {
        const driverlessPaths = allPaths.filter(path => {
            for (let i = 0; i < path.path.length - 1; i++) {
                const edge = graph[path.path[i]][path.path[i + 1]];
                if (edge && edge.frequency != null) return true;
            }
            return false;
        });

        if (driverlessPaths.length) return driverlessPaths[0];
    }

    const bestPath = optimizationType === "minimumTransfers"
        ? minimizeTransfers(allPaths)
        : optimizationType === "minimumStations"
            ? minimizeStations(allPaths)
            : optimizationType === "all"
                ? minimizeAll(allPaths)
                : minimizeDistance(allPaths);

    return bestPath;
}

function minimizeTransfers(paths) {
    return paths.reduce((best, current) => {
        if (
            current.transfers < best.transfers ||
            (current.transfers === best.transfers && current.totalDistance < best.totalDistance)
        ) {
            return current;
        }
        return best;
    }, paths[0]);
}

function minimizeStations(paths) {
    return paths.reduce((best, current) => {
        if (
            current.stationCount < best.stationCount ||
            (current.stationCount === best.stationCount && current.totalDistance < best.totalDistance)
        ) {
            return current;
        }
        return best;
    }, paths[0]);
}

function minimizeAll(paths) {
    return paths.reduce((best, current) => {
        if (
            current.transfers < best.transfers ||
            (current.transfers === best.transfers && current.stationCount < best.stationCount)
        ) {
            return current;
        }
        return best;
    }, paths[0]);
}

function minimizeDistance(paths) {
    return paths.reduce((best, current) => {
        return current.totalDistance < best.totalDistance ? current : best;
    }, paths[0]);
}

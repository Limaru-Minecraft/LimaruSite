export const translateMap = (/** @type {Array<{line: String, stations: Array<String>}>} */routeMap) => {
    return routeMap.map((lineMap) => ({
        line: lineMap.line,
        stations: lineMap.stations.map((n, i) => ({ distance: i, name: n }))
    }));
};

const getNeighbours = (/** @type {Array<{line: String, stations: Array<{distance: Number, name: String}>}>} */m) => {
	let lineMap = {};
    m.forEach((l) => {
        const stations = l.stations;
		for (let i = 1; i < stations.length; i++) {
            const distanceToLast = Math.abs(stations[i].distance - stations[i - 1].distance);
            const prevName = stations[i - 1].name;
            const currName = stations[i].name;

            lineMap[prevName] = lineMap[prevName] ?? {};
            lineMap[currName] = lineMap[currName] ?? {};

            lineMap[prevName][currName] = { line: l.line, distance: distanceToLast };
            lineMap[currName][prevName] = { line: l.line, distance: distanceToLast };
		}
	});
	return lineMap;
};

const floydWarshall = (/** @type {Array<Array<Number>>} */G) => {
    const distance = G.map((row) => [...row]);

    for (let k = 0; k < distance.length; k++) {
        for (let i = 0; i < distance.length; i++) {
            for (let j = 0; j < distance.length; j++) {
                distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
            }
        }
    }
    return distance;	
};

/**
 * Calculate all most convenient paths.
 * @param {Array<{line: String, stations: Array<{distance: Number, name: String}>}>} routeMap
 * @param {Number} maxTransfers
 * @returns 
*/
export default function calculatePaths (routeMap) {
	// Get neighbours
	const neighbours = getNeighbours(routeMap);
	const vertices = Object.keys(neighbours);
	
	// Shortest path algorithm
    let graph = vertices.map((n) =>
        vertices.map((v) => (neighbours[n]?.[v] ? neighbours[n][v].distance : n === v ? 0 : Number.POSITIVE_INFINITY))
    );

	const distances = floydWarshall(graph);
    
    let distancesMap = {};
    for (let i = 0; i < distances.length; i++) {
        let iName = vertices[i];
        distancesMap[iName] = distancesMap[iName] ?? {};
        for (let j = 0; j < distances[i].length; j++) {
            let jName = vertices[j];
            distancesMap[iName][jName] = distances[i][j];
        }
    }
    return distancesMap;
}

/**
 * Calculates all the fares from a distance map
 * @param {Object} distancesMap 
 * @param {Object} fareChart 
 */
export function toFares (distancesMap, fareChart) {
    let dmaps = {};
    Object.keys(fareChart).forEach( (fareClass) =>
        dmaps[fareClass] = toSingleClassFares(distancesMap, fareChart[fareClass])
    );
    return dmaps;
}

/**
 * Calculates the fares in 1 class from a distance map
 * @param {Object} distancesMap 
 * @param {Object} fareClassChart 
 */
function toSingleClassFares (distancesMap, fareClassChart) {
    let dmap = distancesMap;
    Object.keys(distancesMap).forEach( (iName) => {
        Object.keys(distancesMap[iName]).forEach( (oName) => {

            let realDistance = distancesMap[iName][oName];
            let fareStages = Object.keys(fareClassChart).sort();
            let returnVal = fareClassChart[0];
            if (realDistance == Infinity) {
                delete dmap[iName][oName];
            }

            for (const dist of fareStages) {
                if (Object.prototype.hasOwnProperty.call(fareClassChart, dist) && realDistance < dist) {
                    dmap[iName][oName] = returnVal;
                }
                returnVal = fareClassChart[dist];
            }
            // HELP
            console.log(iName, oName, returnVal);
        });
    });
    return dmap;
}
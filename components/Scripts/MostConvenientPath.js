const FareMap = class {
    /**
     * Create a FareMap
     * @param {Array<Array<String>>} fareMap 
     */
    constructor (fareMap) {
        this.fareMap = fareMap;
    }

    /**
     * 
     * @param {String} clazz 
     */
    getClass (clazz) {
        let a = new Map();
        this.fareMap.forEach( (entry) => {
            let d = entry.distance;
            entry.fares.forEach( (f) => (f.clazz === clazz) && a.set(d, f.fare) );
        });
        return a;
    }
}

const translateMap = (/** @type {Array<{line: String, stations: Array<String>}>} */routeMap) => {
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
function calculatePaths (routeMap) {
	routeMap = translateMap(routeMap);

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
 * 
 * @param {Object} distancesMap 
 * @param {Object} fareChart 
 */
function toFares (distancesMap, fareChart) {
    let dmaps = {};
    Object.keys(fareChart).forEach( (fareClass) =>
        dmaps[fareClass] = toSingleClassFares(distancesMap, fareChart[fareClass])
    );
    return dmaps;
}

/**
 * 
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

            for (const dist of fareStages) {
                if (Object.prototype.hasOwnProperty.call(fareClassChart, dist) && realDistance < dist) {
                    dmap[iName][oName] = returnVal;
                }
                returnVal = fareClassChart[dist];
            }
        });
    });
    return dmap;
}

const lp = { line: "LP", stations: ["0-1", "0-2", "0-3", "0-4"] };
const nk = { line: "NK", stations: ["1-1", "1-2", "1-3", "1-4", "0-2"] };
const ps = { line: "PS", stations: ["1-1", "2-2", "0-3", "2-4"] };
let m = [lp, nk, ps];
const dmap = calculatePaths(m);

const fc = {
    one: {0: 4.1, 0.5: 8.1, 1: 12.1, 1.5: 16.1},
    two: {0: 3.2, 1.5: 5.2, 2: 6.2, 3.5: 7.2},
};
console.log(toFares(dmap, fc));
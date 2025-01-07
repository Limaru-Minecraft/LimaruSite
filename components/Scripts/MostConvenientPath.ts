export function translateMap (routeMap: {line: string, stations: string[]}[]) {
    return routeMap.map((lineMap: { line: any; stations: any[]; }) => ({
        line: lineMap.line,
        stations: lineMap.stations.map((n: any, i: any) => ({ distance: i, name: n }))
    }));
};

const getNeighbours = (m: {line: string, stations:{distance: number, name: string}[]}[]) => {
	let lineMap: {[f: string]: {[t: string]: {line: string, distance: number}}} = {};
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

const floydWarshall = (G: number[][]) => {
    const distance = G.map((row: any) => [...row]);

    for (let k = 0; k < distance.length; k++) {
        for (let i = 0; i < distance.length; i++) {
            for (let j = 0; j < distance.length; j++) {
                distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
            }
        }
    }
    return distance;	
};

const getNextLow = (item: number, arr: number[]) => {
    arr = arr.filter(e => item - e >= 0);
    return arr[arr.length-1];
};

/**
 * Calculates the fares in 1 class from a distance map
 */
const toSingleClassFares = (distancesMap: {[x: string]: {[x: string]: number}}, fareClassChart: {[d: string]: string}) => {
    let dmap = structuredClone(distancesMap);
    Object.keys(distancesMap).forEach( (iName) => {
        Object.keys(distancesMap[iName]).forEach( (oName) => {

            let realDistance = distancesMap[iName][oName];
            if (realDistance == Infinity) delete dmap[iName][oName];
            let fareStages = Object.keys(fareClassChart).map(a => Number(a)).sort( (a, b) => a === b ? 0 : a < b ? -1 : 1 );
			console.log(fareStages);

            let chargeDistance = getNextLow(realDistance, fareStages.map(s => Number(s)))
            dmap[iName][oName] = Number(fareClassChart[chargeDistance]);
        });
    });
    return dmap;
}

/**
 * Calculates all the fares from a distance map
 */
export function toFares (distancesMap: {[x: string]: {[x: string]: number}}, fareChart: {[c: string]: {[d: string]: string}}) {
    let dmaps: {[f: string]: {[x: string]:{ [x: string]: number } }} = {};
    Object.keys(fareChart).forEach( (fareClass) => {
        dmaps[fareClass] = toSingleClassFares(distancesMap, fareChart[fareClass]);
    });
    return dmaps;
}

/**
 * Calculate all most convenient paths.
*/
export default function calculatePaths (routeMap: {line: string, stations: {distance: number, name: string}[]}[]) {
	// Get neighbours
	const neighbours = getNeighbours(routeMap);
	const vertices = Object.keys(neighbours);
	
	// Shortest path algorithm
    let graph = vertices.map((n) =>
        vertices.map((v) => (neighbours[n]?.[v] ? neighbours[n][v].distance : n === v ? 0 : Number.POSITIVE_INFINITY))
    );

	const distances = floydWarshall(graph);
    
    let distancesMap: {[f: string]: {[t: string]: number}} = {};
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

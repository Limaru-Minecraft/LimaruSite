import {useRouter} from "next/router";
import routes from "./routes.json";
import RouteRendering from "@/components/TransportationComponents/routeRendering";

let isAlternativeRoute = false; // Tracks whether an alternative route is used
let indexTrack = 0; // Tracks the index of the selected alternative route

const RouteDetails = () => {

    const router = useRouter();
    const {path} = router.query;

    const stations = path ? path.split(",") : [];
    const routeNames = []; // Collect all route names here
    const routeSegments = [];

    let previousRoute = null; // Track the previously used route

    for (let i = 0; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const nextStation = stations[i + 1];
        const routeData = routes[currentStation]?.[nextStation];

        if (routeData) {
            // Determine the selected route
            let selectedRoute, selectedColor, selectedDestination, selectedFrequency;

            if (Array.isArray(routeData.line)) {
                // Retrieve the next and previous stations route data
                const nextRouteData = routes[nextStation]?.[stations[i + 2]];
                const previousRouteData = routes[stations[i - 1]]?.[currentStation];

                const sharedLinesBoth = routeData.line.filter(line =>
                    nextRouteData?.line || [] === line &&
                    previousRouteData?.line || [] === line
                );
                const sharedLinesEither = routeData.line.filter(line =>
                    nextRouteData?.line || [] === line ||
                    previousRouteData?.line || [] === line
                );

                // Check if the express route of the same type exists
                const expressRouteSameLine = routeData.line.find((line, index) =>
                    line.toLowerCase().includes("express")
                );

                // Prioritize express route of the same line if available
                selectedRoute = expressRouteSameLine || sharedLinesBoth[0] || sharedLinesEither[0] || (previousRoute && routeData.line.includes(previousRoute) ? previousRoute : routeData.line[0]);

                const routeIndex = routeData.line.indexOf(selectedRoute);

                if (routeData.line.length > 1 && selectedRoute !== routeData.line[0]) {
                    isAlternativeRoute = true;
                    indexTrack = routeIndex; // Track the index of the selected alternative route
                }

                selectedColor = routeData.color[routeIndex];
                selectedDestination = routeData.destination[routeIndex];
                selectedFrequency = Array.isArray(routeData.frequency)
                    ? routeData.frequency[routeIndex] || previousRoute?.frequency || null
                    : routeData.frequency || previousRoute?.frequency || null;
            } else {
                selectedRoute = routeData.line;
                selectedColor = routeData.color;
                selectedDestination = routeData.destination;
                selectedFrequency = Array.isArray(routeData.frequency) ? previousRoute?.frequency || null : routeData.frequency || previousRoute?.frequency || null;

            }

            // Update previousRoute to be used in the next iteration
            previousRoute = selectedRoute;

            if (Array.isArray(routeData.line) && isAlternativeRoute && indexTrack >= 0) {
                selectedRoute = routeData.line[indexTrack];
                selectedColor = routeData.color[indexTrack];
                selectedFrequency = Array.isArray(routeData.frequency)
                    ? routeData.frequency[indexTrack] || null
                    : routeData.frequency || null;
            }

            // Push the route data to routeSegments
            routeSegments.push({
                from: currentStation,
                to: nextStation,
                distance: routeData.distance,
                type: routeData.type,
                line: selectedRoute,
                color: selectedColor,
                destination: selectedDestination,
                frequency: selectedFrequency,
            });

            // Add the selected route to routeNames
            if (selectedRoute) {
                routeNames.push(selectedRoute);
            }
        }
    }

    // Separate stations into categories
    const origin = stations[0];
    const destination = stations[stations.length - 1];

    // Track transfer points
    let transferPoints = [];

    // Track where the transfers occur
    for (let i = 1; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const isRouteChange = routeNames[i - 1] && routeNames[i] && routeNames[i - 1] !== routeNames[i];

        if (isRouteChange) {
            transferPoints.push(currentStation);
        }
    }

    return (
        <RouteRendering
            stations={stations}
            routeSegments={routeSegments}
            routeNames={routeNames}
            transferPoints={transferPoints}
            origin={origin}
            destination={destination}
            path={path}
        />
    );
};

export default RouteDetails;

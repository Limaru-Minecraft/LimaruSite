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

                // Shared lines between both next and previous stations
                const sharedLinesBoth = routeData.line.filter(line => (nextRouteData?.line || []).includes(line) && (previousRouteData?.line || []).includes(line));

                // Shared lines between either next or previous stations
                const sharedLinesEither = routeData.line.filter(line => (nextRouteData?.line || []).includes(line) || (previousRouteData?.line || []).includes(line));

                // Prioritize shared lines between next and previous stations
                selectedRoute = sharedLinesBoth[0] || sharedLinesEither[0] || routeData.line[0]; // Fall back to the first line if no shared or previous routes


                // Find the index of the selected route in the original array
                const routeIndex = routeData.line.indexOf(selectedRoute);


                // Check if the selected route is not the default (index 0) route
                if (routeData.line.length > 1 && selectedRoute !== routeData.line[0]) {
                    isAlternativeRoute = true;
                    indexTrack = routeIndex; // Track the index of the selected alternative route
                }

                // Map line to color and destination
                selectedColor = routeData.color[routeIndex];
                selectedDestination = routeData.destination[routeIndex];
                selectedFrequency = routeData.frequency; // will add routeIndex here once ready
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
                selectedFrequency = routeData.frequency; // will add indexTrack here once ready
            }


            // Log for debugging

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

            // KEEP TRACK - DO NOT REMOVE

        }
    }


    // Separate stations into categories
    const origin = stations[0];
    const destination = stations[stations.length - 1];

    // Track transfer points
    let transferPoints = [];

    // Check for single route (without any transfers)
    let isSingleRoute = false;

    // Track where the transfers occur
    for (let i = 1; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const isRouteChange = routeNames[i - 1] !== routeNames[i];

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
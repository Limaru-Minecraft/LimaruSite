import { useRouter } from "next/router";
import React from "react";
import routes from "./routes.json";

const RouteDetails = () => {
    const router = useRouter();
    const { path } = router.query;

    const stations = path ? path.split(",") : [];

    // Handle the case where origin and destination are the same
    if (stations.length === 1 || (stations.length > 1 && stations[0] === stations[stations.length - 1])) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Possible Routes</h2>
                <p>Your destination is just right there!</p>
                <div className="mt-4">
                    <button
                        onClick={() => router.push("/transportation")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Return to transportation page
                    </button>
                </div>
            </div>
        );
    }

    const routeSegments = [];
    for (let i = 0; i < stations.length - 1; i++) {
        const currentStation = stations[i];
        const nextStation = stations[i + 1];
        const routeData = routes[currentStation]?.[nextStation];

        if (routeData) {
            // Merge with the last segment if it's on the same line
            const lastSegment = routeSegments[routeSegments.length - 1];
            if (
                lastSegment &&
                lastSegment.line === routeData.line &&
                lastSegment.type === routeData.type &&
                lastSegment.to === currentStation
            ) {
                lastSegment.to = nextStation; // Extend the segment
            } else {
                routeSegments.push({
                    from: currentStation,
                    to: nextStation,
                    ...routeData,
                });
            }
        }
    }

    const getContrastColor = (bgColor) => {
        // Remove '#' if present
        const hex = bgColor.replace("#", "");

        // Convert to RGB values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Calculate brightness (YIQ formula)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Return black for light backgrounds and white for dark backgrounds
        return brightness > 150 ? "#000000" : "#FFFFFF";
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Possible Routes</h2>
            {routeSegments.length > 0 ? (
                <ul>
                    {routeSegments.map((segment, index) => (
                        <li key={index} className="mb-2">
                            <div
                                className="p-2 rounded"
                                style={{
                                    backgroundColor: segment.color,
                                    color: getContrastColor(segment.color),
                                }}
                            >
                                <strong>{segment.line}</strong>: {segment.from} → {segment.to}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We&apos;re sorry, but we can&apos;t find the possible route. Is your origin and destination the same? Or typo?</p>
            )}
            <div className="mt-4">
                <button
                    onClick={() => router.push("/transportation")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Return to transportation page
                </button>
            </div>
        </div>
    );
};

export default RouteDetails;

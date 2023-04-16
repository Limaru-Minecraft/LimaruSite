export default function Heading({level, children}) {
    switch(level) {
        case 1:
            return (
                <h1 className="text-6xl font-bold mb-6">{children}</h1>
            );
        case 2:
            return (
                <h2 className="text-4xl font-bold mb-6">{children}</h2>
            );
        case 3:
            return (
                <h3 className="text-xl font-bold mb-2">{children}</h3>
            );
        case 4:
            return (
                <h4 className="text-l font-bold mb-2">{children}</h4>
            );
        default:
            return (
                <h1 className="text-6xl font-bold mb-6">{children}</h1>
            );
    }
}

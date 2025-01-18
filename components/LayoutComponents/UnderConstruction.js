export default function UnderConstruction({type}) {
    return (
        <div className="w-full flex flex-col items-center text-center px-4 py-8 bg-yellow-300 rounded-lg">
            <span class="material-symbols-rounded text-6xl">construction</span>
            <p className="text-bold text-xl">Under Construction!</p>
            <p>Sorry, but this {type} is still being developed. Some features may be missing/do not work. Give us a few days to complete this {type}!</p>
        </div>
    )
}

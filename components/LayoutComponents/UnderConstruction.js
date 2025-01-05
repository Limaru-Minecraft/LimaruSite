export default function UnderConstruction({type}) {
    return (
        <div className="w-full flex flex-col items-center text-center px-4 py-16 bg-yellow-300 rounded-lg">
            <svg className="w-16 h-16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <p className="text-bold text-xl">Under Construction!</p>
            <p>Sorry, but this {type} is still being developed. Some features may be missing/do not work. Give us a few days to complete this {type}!</p>
        </div>
    )
}

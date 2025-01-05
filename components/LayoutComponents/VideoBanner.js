import { useState } from "react";
import Heading from '@/components/LayoutComponents/Heading'

/*<video
                className="w-full h-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
                src="/LIMARU TAIWAN INTRO 1.mp4"
                autoPlay
                controls
                />*/

export default function VideoBanner({YouTubeVideoID, title, subtitle, serverip=false}) {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlayButtonClick = () => {
        setShowVideo(true);
        window.scrollBy(0,-99999);
    };

    const handleCloseButtonClick = () => {
        setShowVideo(false);
    };

    const [isCopied, setIsCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText("play.limaru.net");
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        }, 2000)
    };

  return (
    <div className="h-5/6 bg-slate-500 bg-cover bg-fixed bg-center relative" style={{backgroundImage: `url('banners/Lands_End_Sunset.webp')`}}>
        {showVideo ? (
            <div className="h-full relative flex justify-center">
                <button
                className="absolute top-1 right-0 z-40 m-4 py-2 px-4 rounded-md bg-gray-800 text-white"
                onClick={handleCloseButtonClick}
                >
                Close
                </button>
                <iframe
                className="w-full aspect-video my-12 max-w-7xl mx-auto mx-2 sm:mx-6 lg:mx-8 shadow-2xl bg-neutral-800"
                src={`https://www.youtube-nocookie.com/embed/${YouTubeVideoID}?autoplay=1&cc_load_policy=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                />
            </div>
        ) : (
            <div className="py-48 flex justify-center">
                <div className="flex flex-col items-start justify-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-white">
                    <Heading level={1}>
                        <span className="bg-lime-600 px-4 box-decoration-clone">
                            {title}
                        </span>
                    </Heading>
                    <p className="text-2xl text-left mb-8 drop-shadow-md">
                        <span className="bg-yellow-400 font-medium text-gray-900 px-2 box-decoration-clone">
                            {subtitle}
                        </span>
                    </p>
                    {serverip && (
                        <button
                            onClick={handleClick}
                            className="flex items-center space-x-2 py-2 px-4 mb-8 text-xl font-semibold text-white bg-stone-800 border-4 border-stone-300 rounded-md hover:border-yellow-400 hover:shadow-xl shadow-yellow-400 focus:outline-none focus:ring-2"
                            title="Click to copy!"
                            >
                            <code>play.limaru.net</code>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            
                            {isCopied && <span className="text-sm">Copied!</span>}
                        </button>
                    )}
                    {/*<h1 className="text-6xl text-white font-bold mb-6">
                        Welcome to Limaru
                    </h1>
                    <p className="text-2xl text-white text-left mb-8">
                        A Minecraft City-Building and Transportation Community that strives in interactivity.
                        <br/>
                        Come be a part of our thriving community that fosters creativity and innovation, and explore our server filled with places to visit and explore!
                    </p>
                    <button
                        onClick={handleClick}
                        className="flex items-center space-x-2 py-2 px-4 mb-8 text-xl font-semibold text-white bg-stone-800 border-4 border-stone-300 rounded-md hover:border-yellow-400 hover:shadow-xl shadow-yellow-400 focus:outline-none focus:ring-2"
                        title="Click to copy!"
                        >
                        <code>play.limaru.net</code>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        
                        {isCopied && <span className="text-sm">Copied!</span>}
                    </button>*/}
                    <button onClick={handlePlayButtonClick} className="relative z-10 flex items-center justify-center bg-yellow-500 w-16 h-16 rounded-full">
                        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" alt="Play Video" className='w-1/2 h-1/2'>
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}

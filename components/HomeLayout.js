import Navbar from '@/components/HeaderComponents/Navbar'
import VideoBanner from '@/components/VideoBanner'
import Footer from '@/components/Footer'

export default function HomeLayout({ children }) {
    return (
        <>
            <Navbar/>
            <div className='h-16'/>
            <VideoBanner YouTubeVideoID="DX7kYO1slDs" title="Welcome to Limaru" serverip={true} subtitle={<>
                A Minecraft City-Building and Transportation Community that strives in interactivity.
                <br/>
                Come be a part of our thriving community that fosters creativity and innovation, and explore our server filled with places to visit and explore!
            </>} />
            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8">{children}</div>
            <Footer/>
        </>
    );
}
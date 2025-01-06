import Navbar from '@/components/HeaderComponents/Navbar'
import VideoBanner from '@/components/LayoutComponents/VideoBanner'
import Footer from '@/components/Footer'

export default function HomeLayout({ children }) {
    return (
        <>
            <Navbar/>
            <div className='h-16'/>
            <VideoBanner YouTubeVideoID="DX7kYO1slDs" title="Innovate, Create, Experience." serverip={true} subtitle={<>
                Welcome to Limaru, a community of Minecraft players who like creative building and transportation.
                <br/>
                Come explore our server today!
            </>} />
            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8">{children}</div>
            <Footer/>
        </>
    );
}
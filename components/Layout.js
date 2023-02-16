import Navbar from '@/components/HeaderComponents/Navbar'
import VideoBanner from '@/components/VideoBanner'

function Layout({ children }) {
    return (
        <div>
            <Navbar/>
            <div className='h-16'/>
            <VideoBanner />
            <br/>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
        </div>
    );
}

export default Layout;
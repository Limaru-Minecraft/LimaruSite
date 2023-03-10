import Navbar from '@/components/HeaderComponents/Navbar'
import TitleBanner from '@/components/LayoutComponents/TitleBanner'
import Footer from '@/components/Footer'

export default function PageLayout({ title, subtitle=false, image=false, children }) {
    return (
        <>
            <Navbar/>
            <div className='h-16'/>
            <TitleBanner title={title} subtitle={subtitle} image={image}/>
            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8">{children}</div>
            <Footer/>
        </>
    );
}
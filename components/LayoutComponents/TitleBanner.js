import Heading from '@/components/LayoutComponents/Heading'

export default function TitleBanner({title, subtitle=false, image=false}) {
  return (
    <div className="h-1/2 bg-slate-500 bg-cover bg-fixed bg-center relative" style={{backgroundImage: image ? `url(${image})` : `url('banners/Lands_End_Sunset.webp')` }}>
        <div className="py-24 flex justify-center">
            <div className="flex flex-col items-start justify-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-white">
                <Heading level={1}>
                    <span className="bg-lime-600 px-4 box-decoration-clone">
                        {title}
                    </span>
                </Heading>
                {subtitle && (
                    <p className="text-2xl text-left mb-8 drop-shadow-md">
                        <span className="bg-yellow-400 px-2 box-decoration-clone">
                            {subtitle}
                        </span>
                    </p>
                )}
            </div>
        </div>
    </div>
  );
}

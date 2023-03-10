import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/LayoutComponents/Heading'

export default function CardGrid({ items }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className="flex flex-col border rounded-md transition duration-300 hover:-translate-y-1 hover:text-white hover:bg-yellow-700 hover:shadow-md"
          target={item.newtab ? '_blank' : ''}
        >
          {item.image && (
            <Image
              className='w-full aspect-video'
              src={item.image}
              alt=""
              width={400}
              height={200}
            />
          )}
          <div className='flex flex-row h-full items-center justify-center p-4'>
            <div className="flex flex-col w-full h-full">
              <Heading level={3}>{item.title}</Heading>
              <h3 className="text-xl font-bold mb-2"></h3>
              <p>{item.subtitle}</p>
            </div>
            {item.newtab ? (
              <svg className="w-8 h-8 px-1" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8 px-1" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

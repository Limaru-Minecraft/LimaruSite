import Link from 'next/link'
import Heading from '@/components/LayoutComponents/Heading'

function CardContent({ item }) {
  return (
    <div className='flex flex-row items-center justify-center p-4'>
      <div className="flex flex-col w-full h-full justify-end">
        <Heading level={3}>{item.title}</Heading>
        <h3 className="text-xl font-bold mb-2"></h3>
      </div>
      {item.newtab ? (
        <svg className="w-8 h-8 px-1" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      ) : (
        item.url ? (
          <svg className="w-8 h-8 px-1" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        ) : null
      )}
    </div>
  );
}

export default function CardGridBackground({ items }) {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        item.url ? (
          <Link
            href={item.url}
            key={item.title}
            className="flex flex-col justify-end w-full aspect-[3/4] text-white border rounded-md transition duration-300 bg-cover bg-center shadow-[inset_0_-200px_200px_-200px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:bg-yellow-700"
            target={item.newtab ? "_blank" : ""}
            style={item.image ? { backgroundImage: `url(${item.image})` } : null}
          >
            <CardContent item={item} />
          </Link>
        ) : (
          <div
            key={item.title}
            className="flex flex-col justify-end w-full aspect-[3/4] text-white border rounded-md transition duration-300 bg-cover bg-center shadow-[inset_0_-200px_200px_-200px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:bg-yellow-700"
            style={item.image ? { backgroundImage: `url(${item.image})` } : null}
          >
            <CardContent item={item} />
          </div>
        )
      ))}
    </div>
  )
}

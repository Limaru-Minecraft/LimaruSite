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
          className="flex flex-col border rounded-md transition duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-md"
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
              <span class="material-symbols-rounded">open_in_new</span>
            ) : (
              <span class="material-symbols-rounded">arrow_forward</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

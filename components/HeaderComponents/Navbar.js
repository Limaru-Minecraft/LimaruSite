import Link from "next/link";
import Image from "next/image";
import LimaruLogo from "@/public/limaru_logo.png"

function NavbarLink({ href, text, target="" }) {
  return (
    <a href={href} target={target} title={text} className="h-full flex items-center text-center px-4 text-gray-800 box-border border-b-4 border-white hover:text-gray-900 hover:border-yellow-700 hover:bg-gray-100">
      {text}
      {target==="_blank"?(
        <svg className="w-4 h-4 pl-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      ):null}
    </a>
  );
}

export default function Navbar() {
  const links = [
    { href: '/getting-started', text: 'Getting Started' },
    { href: '/see-and-do', text: 'See & Do' },
    { href: '/about', text: 'About' },
    { href: '/transport', text: 'Transport' },
    { href: 'https://wiki.limaru.net', text: 'Wiki', target: '_blank' },
    { href: 'http://maps.limaru.net', text: 'Live Map', target: '_blank' },
    { href: '/support-us', text: 'Support Us' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" title="Home Page">
              <Image
                className="block h-8 w-auto"
                src={LimaruLogo}
                alt="Limaru Logo"
              />
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex lg:space-x-4">
            {links.map((link) => (
              <NavbarLink key={link.href} href={link.href} target={link.target} text={link.text} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

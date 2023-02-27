import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.css';
import { nav_links, footer_resource_links, social_media_links } from '@/constants/links';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
        <div className='max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                <h3 className="text-lg font-bold mb-4">Limaru.net</h3>
                <ul>
                    {nav_links.map((link) => (
                        <li key={link.text} className="mb-2">
                            <Link href={link.href} className="hover:underline flex flex-row items-center">
                                {link.text}
                                {link.newtab ? (
                                    <svg className="w-4 h-4 pl-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                ) : null}
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
                <div>
                <h3 className="text-lg font-bold mb-4">Other resources</h3>
                <ul>
                    {footer_resource_links.map((link) => (
                        <li key={link.text} className="mb-2">
                            <Link href={link.href} className="hover:underline flex flex-row items-center">
                                {link.text}
                                {link.newtab ? (
                                    <svg className="w-4 h-4 pl-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                ) : null}
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Connect with us</h3>
                    <ul className="flex gap-4">
                        {social_media_links.map((link) => (
                            <li key={link.href}>
                            <Link href={link.href} target="_blank">
                                <i className={`fab fa-${link.icon} text-2xl`}/>
                            </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-sm mt-8">
                <p>
                Disclaimer: This website is related to Limaru, a Minecraft city building server. Information presented on this website should not be confused with real-world events and .
                </p>
                <br/>
                <p>
                &copy; {new Date().getFullYear()} Limaru. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;

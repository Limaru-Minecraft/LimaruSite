import ContentWidth from "@/components/ContentWidth";
import Link from "next/link";
import Image from "next/image";
import { nav_links } from "@/constants/links";
import LimaruLogo from "@/public/limaru_logo.png";
import React, { useState } from "react";

/* Main Categories */
const MainCategories = ({ onLinkFocusChange }) => {
  return (
    <div className="flex w-full justify-center space-x-12 font-nunito-sans font-extrabold text-xl">
      {nav_links.map((link) => (
        <Link
          key={link.text}
          href={link.href}
          target={link.newtab ? "_blank" : ""}
          className="hover:border-b-4 border-amber-400"
          onMouseEnter={() => onLinkFocusChange(1)}
          onFocus={() => onLinkFocusChange(1)}
          onBlur={() => onLinkFocusChange(-1)}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

/* Full menu that shows on hover */
const FullMenu = ({ isVisible, onHover, onLinkFocusChange }) => {
  return (
    <div
      className={`fixed w-full h-full transition-opacity ${
        isVisible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className="w-full h-fit bg-gray-200"
        onMouseLeave={() => onLinkFocusChange(-1)}
      >
        <ContentWidth className="flex-row justify-center space-x-12">
          {nav_links.map((link) => (
            <div key={link.text}>
              <h2>{link.text}</h2>
              {/* Mapping over link.pages */}
              {link.pages && (
                <ul>
                  {link.pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        target={page.newtab ? "_blank" : ""}
                        className="hover:underline"
                        onFocus={() => onLinkFocusChange(1)}
                        onBlur={() => onLinkFocusChange(-1)}
                      >
                        {page.text}
                        {page.newtab ? (
                          <span className="material-symbols-outlined pl-1 text-sm text-gray-700">
                          open_in_new
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ContentWidth>
      </div>
      <div className="fixed w-full h-full bg-black opacity-50" />
    </div>
  );
};

export default function Navbar() {
  const [focusCount, setFocusCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Function to handle link focus change
  const handleLinkFocusChange = (change) => {
    setFocusCount((prevCount) => {
      const newCount = prevCount + change;
      return newCount >= 0 ? (newCount >= 2 ? 1 : newCount) : 0; // Ensure newCount is at least 0
    });
    console.log(focusCount);
  };

  // Effect to update isHovering based on focusCount changes
  React.useEffect(() => {
    if (focusCount > 0) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, [focusCount]);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <ContentWidth>
        <Link href="/" title="Home Page">
          <Image
            className="block h-8 w-auto"
            src={LimaruLogo}
            alt="Limaru Logo"
          />
        </Link>
        <MainCategories onLinkFocusChange={handleLinkFocusChange} />
      </ContentWidth>
      <FullMenu
        isVisible={isHovering}
        onHover={setIsHovering}
        onLinkFocusChange={handleLinkFocusChange}
      />
    </nav>
  );
}

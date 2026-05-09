import ContentWidth from "@/components/ContentWidth";
import Link from "next/link";
import Image from "next/image";
import { nav_links, navbar_icon_links } from "@/constants/links";
import LimaruLogo from "@/public/limaru_logo.png";
import React, { useState } from "react";

const desktopNavGridClass =
  "grid grid-cols-3 items-start gap-4 text-center sm:gap-8 lg:gap-12";
const desktopShellGridClass =
  "grid grid-cols-[8rem_1fr_8rem] items-center gap-4 lg:grid-cols-[10rem_1fr_10rem]";

/* Main Categories */
const MainCategories = ({ isMenuOpen, onMenuOpen, onMenuClose }) => {
  return (
    <div
      className={`${desktopNavGridClass} min-w-0 font-nunito-sans font-extrabold text-base sm:text-lg lg:text-xl`}
    >
      {nav_links.map((link, index) => (
        <Link
          key={link.text}
          href={link.href}
          target={link.newtab ? "_blank" : undefined}
          rel={link.newtab ? "noopener noreferrer" : undefined}
          className="border-b-4 border-transparent hover:border-amber-400 focus:border-amber-400"
          aria-haspopup={link.pages?.length ? "true" : undefined}
          aria-expanded={link.pages?.length ? isMenuOpen : undefined}
          onMouseEnter={() => (link.pages?.length ? onMenuOpen() : onMenuClose())}
          onFocus={onMenuOpen}
          onKeyDown={(event) => {
            if (!link.pages?.length || event.key !== "ArrowDown") {
              return;
            }

            event.preventDefault();
            onMenuOpen();
            window.setTimeout(() => {
              document
                .getElementById(`desktop-submenu-${index}-0`)
                ?.focus();
            }, 0);
          }}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

const NavbarIconLinks = () => {
  return (
    <div className="flex items-center justify-end gap-3 sm:gap-4 text-xl">
      {navbar_icon_links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="text-gray-800 hover:text-lime-700"
        >
          <i className={link.iconClass} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
};

const MobileMenuLink = ({ href, newtab, children, onClick, className = "" }) => {
  return (
    <Link
      href={href}
      target={newtab ? "_blank" : undefined}
      rel={newtab ? "noopener noreferrer" : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${
        isOpen ? "visible" : "invisible"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <div
        id="mobile-navigation"
        className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <span className="font-nunito-sans text-lg font-extrabold">
            Menu
          </span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-gray-800 hover:bg-gray-100"
            aria-label="Close menu"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            {nav_links.map((link) => (
              <div key={link.text}>
                <MobileMenuLink
                  href={link.href}
                  newtab={link.newtab}
                  onClick={onClose}
                  className="block font-nunito-sans text-xl font-extrabold text-gray-900 hover:text-lime-700"
                >
                  {link.text}
                  {link.newtab ? (
                    <span className="material-symbols-rounded pl-1 text-sm text-gray-700">
                      open_in_new
                    </span>
                  ) : null}
                </MobileMenuLink>
                {link.pages?.length ? (
                  <ul className="mt-3 space-y-2 border-l-4 border-amber-300 pl-4">
                    {link.pages.map((page) => (
                      <li key={page.href}>
                        <MobileMenuLink
                          href={page.href}
                          newtab={page.newtab}
                          onClick={onClose}
                          className="block text-base font-medium text-gray-700 hover:text-lime-700"
                        >
                          {page.text}
                          {page.newtab ? (
                            <span className="material-symbols-rounded pl-1 text-sm text-gray-700">
                              open_in_new
                            </span>
                          ) : null}
                        </MobileMenuLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            {navbar_icon_links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-2xl text-gray-800 hover:bg-lime-100 hover:text-lime-700"
                onClick={onClose}
              >
                <i className={link.iconClass} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Full menu that shows on hover */
const FullMenu = ({ isVisible, onMenuOpen, onMenuClose }) => {
  return (
    <div
      className={`fixed hidden w-full h-full transition-opacity md:block ${
        isVisible
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div
        className="w-full h-fit bg-gray-200"
        onMouseEnter={onMenuOpen}
        onMouseLeave={onMenuClose}
      >
        <ContentWidth className={`${desktopShellGridClass} items-start`}>
          <div />
          <div className={desktopNavGridClass}>
            {nav_links.map((link, linkIndex) =>
              link.pages?.length ? (
                <div key={link.text} className="text-left">
                  <h2>{link.text}</h2>
                  <ul>
                    {link.pages.map((page, pageIndex) => (
                      <li key={page.href}>
                        <Link
                          id={`desktop-submenu-${linkIndex}-${pageIndex}`}
                          href={page.href}
                          target={page.newtab ? "_blank" : undefined}
                          rel={page.newtab ? "noopener noreferrer" : undefined}
                          className="hover:underline focus:underline"
                          onFocus={onMenuOpen}
                        >
                          {page.text}
                          {page.newtab ? (
                            <span className="material-symbols-rounded pl-1 text-sm text-gray-700">
                              open_in_new
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={link.text} aria-hidden="true" />
              )
            )}
          </div>
          <div />
        </ContentWidth>
      </div>
      <div className="fixed w-full h-full bg-black opacity-50" />
    </div>
  );
};

export default function Navbar() {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="bg-white shadow-lg fixed w-full z-50"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsDesktopMenuOpen(false);
        }
      }}
    >
      <ContentWidth
        className="grid grid-cols-[auto_auto] items-center justify-between gap-4 md:grid-cols-[8rem_1fr_8rem] md:justify-normal lg:grid-cols-[10rem_1fr_10rem]"
      >
        <Link href="/" title="Home Page" className="flex-shrink-0">
          <Image
            className="block h-8 w-auto"
            src={LimaruLogo}
            alt="Limaru Logo"
          />
        </Link>
        <div className="hidden md:block">
          <MainCategories
            isMenuOpen={isDesktopMenuOpen}
            onMenuOpen={() => setIsDesktopMenuOpen(true)}
            onMenuClose={() => setIsDesktopMenuOpen(false)}
          />
        </div>
        <div className="hidden md:block">
          <NavbarIconLinks />
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-gray-800 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="fa-solid fa-bars" aria-hidden="true" />
        </button>
      </ContentWidth>
      <FullMenu
        isVisible={isDesktopMenuOpen}
        onMenuOpen={() => setIsDesktopMenuOpen(true)}
        onMenuClose={() => setIsDesktopMenuOpen(false)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}

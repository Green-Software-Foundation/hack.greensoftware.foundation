import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "About", href: "about" },
    { name: "Timeline", href: "timeline" },
    { name: "Awards", href: "awards" },
    { name: "Sponsors", href: "sponsors" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLayout = isOpen && (
    <div className="px-4 py-8 w-full bg-primary-dark text-white flex flex-col items-center justify-center rounded-2xl">
      {navItems.map((item, index) => (
        <a
          key={index}
          className="text-lg p-4 rounded-2xl hover:text-white/50 transition-all duration-300 ease-in-out"
          href={item.href}
        >
          {item.name}
        </a>
      ))}
      <a
        href="sign-up"
        className="text-lg p-3 ml-2 mt-2 bg-secondary hover:bg-secondary/90 text-primary-dark rounded-2xl focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-darkest transition-all duration-300 ease-in-out"
      >
        Sign Up
      </a>
    </div>
  );

  return (
    <nav className="relative text-right text-white">
      <div className="lg:hidden">
        {isOpen ? (
          <button onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon icon="mdi:hamburger-menu" width="24" height="24" />
          </button>
        )}
      </div>
      {navLayout}
    </nav>
  );
};

export default Nav;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const basePath = "/personal-website2026";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Define navigation items with IDs and labels
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Handle scroll events to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const sectionElements = sections.map((id) => document.getElementById(id));

      sectionElements.forEach((section, index) => {
        if (section) {
          // Adjusted threshold for active section detection
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[index]);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70",
        scrolled ? "shadow-md py-2" : "py-4 shadow-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Desktop Navigation - Left */}
        <div className="hidden md:flex flex-1 justify-start space-x-8">
          {navItems.map((item) => {
            const isAbout = item.id === "about";
            return (
              <Link
                key={item.id}
                href={isAbout ? "/about" : `/#${item.id}`}
                onClick={(e) => {
                  if (!isAbout && pathname === "/") {
                    e.preventDefault();
                    scrollToSection(item.id);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "relative group capitalize text-gray-600 transition-colors duration-100",
                  activeSection === item.id && "text-gray-800 font-medium"
                )}
              >
                {item.label}
                <span
                  className={
                    "absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-gray-400 group-hover:animate-underline-hover duration-400"
                  }
                />
              </Link>
            );
          })}
        </div>

        {/* Right side: Socials + PDF + About */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`https://github.com/justineyoo1`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-400 transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          </a>
          <a
            href={`https://www.linkedin.com/in/justineyoo/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-400 transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
          </a>
          <a
            href={`/Justin_Y__Resume (9).pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center hover:text-blue-400 transition-colors"
            aria-label="Resume"
          >
            <FontAwesomeIcon icon={faFilePdf} className="w-6 h-6" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-light-blue"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isAbout = item.id === "about";
              return (
                <Link
                  key={item.id}
                  href={isAbout ? "/about" : `/#${item.id}`}
                  onClick={(e) => {
                    if (!isAbout && pathname === "/") {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    "capitalize text-left py-2 px-4 rounded-md hover:bg-gray-50",
                    activeSection === item.id
                      ? "text-light-blue font-medium"
                      : "text-gray-600",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

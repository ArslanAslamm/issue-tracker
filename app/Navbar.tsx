"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];
  const currentPath = usePathname();
  return (
    <nav className="flex border-b space-x-6 px-5 h-14 items-center">
      <Link href="/" className=" ">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

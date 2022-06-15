import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle }) => {
  return (
    <nav className="flex justify-between item-center h-16 bg-white rext-black relative shadow-sm font-mono pt-3">
      <Link to="/" className="pl-8 text-2xl">
        Recipes
      </Link>
      <div className="px4 cursor-pointer md:hidden" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <Link to="/" className="pl-4">
          Home
        </Link>
        <Link to="/menu" className="pl-4">
          Meun
        </Link>
        <Link to="/about" className="pl-4">
          About
        </Link>
        <Link to="/contact" className="pl-4">
          Contact
        </Link>
        <button className="pl-8 text-base">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

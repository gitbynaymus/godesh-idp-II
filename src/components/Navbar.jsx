import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Logo from "./shared/Logo";
import Button from "./Button/Button";
import { IoMdLogOut } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-green-50/70 backdrop-blur-2xl transition-all ${
        scrolled ? "border-b border-accent/30" : ""
      }`}
    >
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          {/* Desktop Menu */}
          <ul className="hidden space-x-8 font-medium text-gray-700 lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-packages"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-guides"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Guides
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-stories"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Stories
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-accent text-accent"
                        : "duration-300 hover:text-accent"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/offer"
                    onClick={() => setDropdownOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-accent text-accent"
                        : "duration-300 hover:text-accent"
                    }
                  >
                    Offers
                  </NavLink>
                </li>
              </>
            )}
            {/* <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                About Us
              </NavLink>
            </li> */}
          </ul>

          {/* Right side */}
          <div className="flex items-center">
            {/* Desktop Auth Buttons / User Dropdown */}
            <div className="relative hidden items-center lg:flex">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="mr-5 font-semibold text-accent underline-offset-8 transition-all duration-300 hover:underline"
                  >
                    Login
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "/default-profile.png"}
                      alt="User profile"
                      className="h-10 w-10 rounded-full border-2 border-accent"
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-50 mt-63 w-56 rounded-md border border-accent/30 bg-white py-3 text-sm font-medium text-primary shadow-lg"
                    >
                      <div className="border-b border-accent/30 px-4 pb-2">
                        <p className="truncate font-semibold">
                          {user.displayName}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                      <div className="border-t border-accent/30 px-4 pt-2">
                        <button
                          onClick={() => {
                            logOut();
                            setDropdownOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center gap-1 text-accent transition-all duration-300 hover:gap-3 hover:text-red-500"
                        >
                          Logout <IoMdLogOut />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-accent focus:ring-2 focus:ring-accent focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {/* Hamburger icon */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <ul className="flex flex-col space-y-3 px-4 pt-4 pb-6 font-medium text-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-packages"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-guides"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Guides
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-stories"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent text-accent"
                    : "duration-300 hover:text-accent"
                }
              >
                Stories
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold text-accent hover:underline"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded bg-accent px-4 py-1 text-white transition hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-accent text-accent"
                        : "duration-300 hover:text-accent"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/offer"
                    onClick={() => setDropdownOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-accent text-accent"
                        : "duration-300 hover:text-accent"
                    }
                  >
                    Offers
                  </NavLink>
                </li>
                <li className="border-t border-gray-200 pt-3">
                  <p className="truncate font-semibold">{user.displayName}</p>
                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                </li>

                <li>
                  <button
                    onClick={() => {
                      logOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-1 rounded py-1 text-left text-accent duration-300 hover:gap-3 hover:text-red-500"
                  >
                    Logout <IoMdLogOut />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

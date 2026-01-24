"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaUser,
  FaBook,
  FaChevronDown,
} from "react-icons/fa";
import LightBgBtn from "./LightBgBtn";
import DarkBgBtn from "./DarkBgBtn";
import { useLogoutMutation } from "@/store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/store/slices/authSlice";
import { RootState } from "@/store";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Redux dispatch and logout mutation
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  // ✅ Use Redux state for auth - this updates immediately when user logs in
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Check if user is logged in
  const isLoggedIn = !!accessToken && !!user;

  // Auth page checks
  const isSignUpPage = pathname === "/sign-up";
  const isSignInPage = pathname === "/sign-in";
  const isOTPPage = pathname === "/verify-otp";
  const isAuthPage = isSignUpPage || isSignInPage || isOTPPage;

  // ✅ FIXED: Proper logout handler that clears cookies
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Call backend logout API (clears refresh token cookie)
      await logout().unwrap();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Always clear local state (this also clears the accessToken cookie)
      dispatch(clearCredentials());
      setOpen(false);
      setProfileDropdown(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <nav className="w-full border-b border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] relative z-50">
        <div className="mx-auto flex h-16 sm:h-20 max-w-480 items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/common/LOGO.png"
                alt="E-tutor Logo"
                width={100}
                height={100}
                priority
                className="h-auto w-25"
              />
            </Link>
          </div>

          {/* Search Bar */}
          {(!isAuthPage || isLoggedIn) && (
            <div className="hidden lg:flex flex-1 items-center gap-4">
              <div className="flex h-12 flex-1 items-center rounded-md border border-[rgb(var(--gray-200))] px-4">
                <input
                  placeholder="What do you want learn..."
                  className="body-sm-400 w-full bg-transparent outline-none text-[rgb(var(--gray-700))]"
                />
              </div>
            </div>
          )}

          {/* Desktop Actions */}
          {!isAuthPage ? (
            <>
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-5">
                  <FaBell className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />
                  <FaHeart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />
                  <FaShoppingCart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />

                  <div
                    className="flex items-center gap-3 border-l border-[rgb(var(--gray-200))] pl-4 relative"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setProfileDropdown(!profileDropdown)}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-8 h-8 bg-[rgb(var(--primary-100))] rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-[rgb(var(--primary-700))] uppercase">
                          {user?.username?.[0] || user?.email?.[0] || "U"}
                        </span>
                      </div>
                      <span className="body-sm-500 text-[rgb(var(--gray-900))] max-w-30 truncate">
                        {user?.username || user?.email}
                      </span>
                      <FaChevronDown
                        className={`text-[rgb(var(--gray-600))] text-xs transition-transform ${profileDropdown ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {profileDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[rgb(var(--gray-200))] py-2 z-50">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[rgb(var(--gray-50))] transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaUser className="text-[rgb(var(--gray-600))]" />
                          <span className="text-sm text-[rgb(var(--gray-900))]">
                            Dashboard
                          </span>
                        </Link>
                        <Link
                          href="/my-courses"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[rgb(var(--gray-50))] transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <FaBook className="text-[rgb(var(--gray-600))]" />
                          <span className="text-sm text-[rgb(var(--gray-900))]">
                            My Courses
                          </span>
                        </Link>
                        <div className="border-t border-[rgb(var(--gray-200))] my-2"></div>

                        <DarkBgBtn
                          onClick={handleLogout}
                          loading={loggingOut}
                          loadingText="Logging out..."
                          fullWidth
                        >
                          Logout
                        </DarkBgBtn>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-5">
                  <FaBell className="text-[rgb(var(--gray-700))] opacity-50" />
                  <FaHeart className="text-[rgb(var(--gray-700))] opacity-50" />
                  <FaShoppingCart className="text-[rgb(var(--gray-700))] opacity-50" />
                  <LightBgBtn href="/sign-up" children="Create Account" />
                  <DarkBgBtn href="/sign-in" children="Sign In" />
                </div>
              )}
            </>
          ) : (
            <>
              {isSignUpPage && (
                <div className="hidden md:flex items-center gap-3">
                  <p className="body-sm-400 text-[rgb(var(--gray-600))]">
                    Have an account?
                  </p>
                  <LightBgBtn href="/sign-in" children="Login Account" />
                </div>
              )}

              {isSignInPage && (
                <div className="hidden md:flex items-center gap-3">
                  <p className="body-sm-400 text-[rgb(var(--gray-600))]">
                    Don't have an account?
                  </p>
                  <LightBgBtn href="/sign-up" children="Create Account" />
                </div>
              )}

              {isOTPPage && (
                <div className="hidden md:flex items-center gap-3">
                  <p className="body-sm-400 text-[rgb(var(--gray-600))]">
                    Facing Any Issues?
                  </p>
                  <LightBgBtn href="/sign-up" children="Go Back" />
                </div>
              )}
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center rounded-md p-2 text-[rgb(var(--gray-700))] text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-lg text-[rgb(var(--gray-900))]">
              {isLoggedIn ? `Hi, ${user?.username || user?.email}` : "Menu"}
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-[rgb(var(--gray-100))] rounded-md transition-colors"
            >
              <FaTimes className="text-[rgb(var(--gray-700))]" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-4 space-y-4">
            {/* User Profile Section (for logged in users) */}
            {isLoggedIn && (
              <div className="flex items-center gap-3 pb-3 border-b border-[rgb(var(--gray-200))]">
                <div className="w-10 h-10 bg-[rgb(var(--primary-100))] rounded-full flex items-center justify-center">
                  <span className="text-base font-semibold text-[rgb(var(--primary-700))] uppercase">
                    {user?.username?.[0] || user?.email?.[0] || "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-[rgb(var(--gray-900))]">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-[rgb(var(--gray-600))] truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Search Bar in Menu */}
            {(!isAuthPage || isLoggedIn) && (
              <div className="pb-3 border-b border-[rgb(var(--gray-200))]">
                <div className="flex h-10 items-center rounded-md border border-[rgb(var(--gray-200))] px-3 bg-[rgb(var(--gray-50))]">
                  <input
                    placeholder="What do you want learn..."
                    className="text-sm w-full bg-transparent outline-none text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))]"
                  />
                </div>
              </div>
            )}

            {/* Quick Actions Icons - Compact */}
            <div className="flex items-center justify-around py-2 border-b border-[rgb(var(--gray-200))]">
              <button
                className="flex flex-col items-center gap-1"
                disabled={!isLoggedIn}
              >
                <FaBell
                  className={`text-xl ${isLoggedIn
                    ? "text-[rgb(var(--gray-700))]"
                    : "text-[rgb(var(--gray-400))]"
                    }`}
                />
                <span className="text-xs text-[rgb(var(--gray-600))]">
                  Notifications
                </span>
              </button>
              <button
                className="flex flex-col items-center gap-1"
                disabled={!isLoggedIn}
              >
                <FaHeart
                  className={`text-xl ${isLoggedIn
                    ? "text-[rgb(var(--gray-700))]"
                    : "text-[rgb(var(--gray-400))]"
                    }`}
                />
                <span className="text-xs text-[rgb(var(--gray-600))]">
                  Wishlist
                </span>
              </button>
              <button
                className="flex flex-col items-center gap-1"
                disabled={!isLoggedIn}
              >
                <FaShoppingCart
                  className={`text-xl ${isLoggedIn
                    ? "text-[rgb(var(--gray-700))]"
                    : "text-[rgb(var(--gray-400))]"
                    }`}
                />
                <span className="text-xs text-[rgb(var(--gray-600))]">
                  Cart
                </span>
              </button>
            </div>

            {/* Navigation Links (for logged in users) */}
            {isLoggedIn && (
              <div className="space-y-2 pb-3 border-b border-[rgb(var(--gray-200))]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgb(var(--gray-50))] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FaUser className="text-[rgb(var(--gray-600))]" />
                  <span className="text-sm text-[rgb(var(--gray-900))]">
                    Dashboard
                  </span>
                </Link>
                <Link
                  href="/my-courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgb(var(--gray-50))] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FaBook className="text-[rgb(var(--gray-600))]" />
                  <span className="text-sm text-[rgb(var(--gray-900))]">
                    My Courses
                  </span>
                </Link>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="space-y-2 pt-2">
              {!isAuthPage ? (
                <>
                  {isLoggedIn ? (
                    <DarkBgBtn
                      onClick={handleLogout}
                      loading={loggingOut}
                      loadingText="Logging out..."
                      fullWidth
                    >
                      Logout
                    </DarkBgBtn>
                  ) : (
                    <>
                      <LightBgBtn href="/sign-up" children="Create Account" />
                      <DarkBgBtn href="/sign-in" children="Sign In" />
                    </>
                  )}
                </>
              ) : (
                <>
                  {isSignUpPage && (
                    <div className="space-y-2">
                      <p className="body-sm-400 text-[rgb(var(--gray-600))] text-center">
                        Have an account?
                      </p>
                      <LightBgBtn href="/sign-in" children="Login Account" />
                    </div>
                  )}

                  {isSignInPage && (
                    <div className="space-y-2">
                      <p className="body-sm-400 text-[rgb(var(--gray-600))] text-center">
                        Don't have an account?
                      </p>
                      <LightBgBtn href="/sign-up" children="Create Account" />
                    </div>
                  )}

                  {isOTPPage && (
                    <div className="space-y-2">
                      <p className="body-sm-400 text-[rgb(var(--gray-600))] text-center">
                        Facing Any Issues?
                      </p>
                      <LightBgBtn href="/sign-up" children="Go Back" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

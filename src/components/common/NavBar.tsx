"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust path to your store
import { FaBell, FaHeart, FaShoppingCart } from "react-icons/fa";
import LightBgBtn from "./LightBgBtn";
import DarkBgBtn from "./DarkBgBtn";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ✅ Redux selectors for auth state
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user, "*******this is user********");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // ✅ Check if user is logged in
  const isLoggedIn = !!accessToken && !!user;

  // Auth page checks
  const isSignUpPage = pathname === "/sign-up";
  const isSignInPage = pathname === "/sign-in";
  const isOTPPage = pathname === "/verify-otp";
  const isAuthPage = isSignUpPage || isSignInPage || isOTPPage;

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("pendingSignupEmail");
    // Optionally dispatch logout action
    // dispatch(logout());
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="w-full border-b border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] relative z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
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

          {/* Search Bar (Desktop Only) - Show on non-auth pages when logged in or not auth page */}
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
              {/* ✅ LOGGED IN USER - Desktop */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-5">
                  <FaBell className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />
                  <FaHeart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />
                  <FaShoppingCart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors" />

                  {/* ✅ User Profile Section */}
                  <div className="flex items-center gap-3 border-l border-[rgb(var(--gray-200))] pl-4">
                    <div className="w-8 h-8 bg-[rgb(var(--primary-100))] rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-[rgb(var(--primary-700))] uppercase">
                        {user?.username?.[0] || user?.email?.[0] || "U"}
                      </span>
                    </div>
                    <span className="body-sm-500 text-[rgb(var(--gray-900))] max-w-[120px] truncate">
                      {user?.username || user?.email}
                    </span>
                    <DarkBgBtn
                      onClick={handleLogout}
                      children="Logout"
                      className="px-4 py-2"
                    />
                  </div>
                </div>
              ) : (
                /* GUEST USER - Desktop */
                <div className="hidden md:flex items-center gap-5">
                  <FaBell className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors opacity-50" />
                  <FaHeart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors opacity-50" />
                  <FaShoppingCart className="text-[rgb(var(--gray-700))] cursor-pointer hover:text-[rgb(var(--primary-500))] transition-colors opacity-50" />

                  <LightBgBtn href="/sign-up" children="Create Account" />
                  <DarkBgBtn href="/sign-in" children="Sign In" />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Auth Page CTAs */}
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
            className="md:hidden flex items-center justify-center rounded-md p-2 text-[rgb(var(--gray-700))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Menu Panel */}
        <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-[rgb(var(--white))] shadow-xl overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between border-b border-[rgb(var(--gray-200))] p-4">
            <h2 className="text-lg font-semibold">
              {isLoggedIn ? `Hi, ${user?.username || user?.email}` : "Menu"}
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-100))]"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          {!isAuthPage ? (
            <>
              {isLoggedIn ? (
                /* ✅ LOGGED IN USER - Mobile */
                <div className="p-6 space-y-6">
                  {/* Search Section */}
                  <div className="space-y-3">
                    <div className="flex h-12 w-full items-center rounded-md border border-[rgb(var(--gray-200))] px-4">
                      <input
                        placeholder="What do you want learn..."
                        className="body-sm-400 w-full bg-transparent outline-none text-[rgb(var(--gray-700))]"
                      />
                    </div>
                  </div>

                  {/* Icons Section */}
                  <div className="flex items-center justify-around py-4 border-y border-[rgb(var(--gray-200))]">
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <FaBell className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Notifications
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <FaHeart className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Wishlist
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <FaShoppingCart className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Cart
                      </span>
                    </div>
                  </div>

                  {/* User Profile & Logout */}
                  <div className="space-y-4 pt-4 border-t border-[rgb(var(--gray-200))]">
                    <div className="flex items-center gap-3 p-3 bg-[rgb(var(--gray-50))] rounded-lg">
                      <div className="w-10 h-10 bg-[rgb(var(--primary-100))] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-[rgb(var(--primary-700))] uppercase">
                          {user?.username?.[0] || user?.email?.[0] || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[rgb(var(--gray-900))] truncate">
                          {user?.username || user?.email}
                        </p>
                        <p className="text-xs text-[rgb(var(--gray-500))] truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DarkBgBtn
                      onClick={handleLogout}
                      children="Logout"
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                /* GUEST USER - Mobile */
                <div className="p-6 space-y-6">
                  {/* Search Section */}
                  <div className="space-y-3">
                    <div className="flex h-12 w-full items-center rounded-md border border-[rgb(var(--gray-200))] px-4">
                      <input
                        placeholder="What do you want learn..."
                        className="body-sm-400 w-full bg-transparent outline-none text-[rgb(var(--gray-700))]"
                      />
                    </div>
                  </div>

                  {/* Icons Section (Disabled for guests) */}
                  <div className="flex items-center justify-around py-4 border-y border-[rgb(var(--gray-200))]">
                    <div className="flex flex-col items-center gap-2 cursor-pointer opacity-50">
                      <FaBell className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Notifications
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer opacity-50">
                      <FaHeart className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Wishlist
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer opacity-50">
                      <FaShoppingCart className="text-xl text-[rgb(var(--gray-700))]" />
                      <span className="text-xs text-[rgb(var(--gray-600))]">
                        Cart
                      </span>
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <div className="space-y-3">
                    <LightBgBtn
                      href="/auth/sign-up"
                      onClick={() => setOpen(false)}
                      children="Create Account"
                    />
                    <DarkBgBtn
                      href="/auth/sign-in"
                      onClick={() => setOpen(false)}
                      children="Sign In"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Auth Page Mobile Menu */
            <>
              {isSignUpPage && (
                <div className="p-6">
                  <p className="mb-4 body-sm-400 text-[rgb(var(--gray-600))]">
                    Have an account?
                  </p>
                  <LightBgBtn
                    href="/auth/sign-in"
                    onClick={() => setOpen(false)}
                    children="Login Account"
                  />
                </div>
              )}
              {isSignInPage && (
                <div className="p-6">
                  <p className="mb-4 body-sm-400 text-[rgb(var(--gray-600))]">
                    Don't have an account?
                  </p>
                  <LightBgBtn
                    href="/auth/sign-up"
                    onClick={() => setOpen(false)}
                    children="Create Account"
                  />
                </div>
              )}
              {isOTPPage && (
                <div className="p-6">
                  <p className="mb-4 body-sm-400 text-[rgb(var(--gray-600))]">
                    Facing Any Issues?
                  </p>
                  <LightBgBtn
                    href="/auth/sign-up"
                    onClick={() => setOpen(false)}
                    children="Go Back"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;

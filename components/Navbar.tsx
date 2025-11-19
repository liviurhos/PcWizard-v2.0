// components/Navbar.tsx
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore } from "@/store/buildStore";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { Moon, Sun, Menu, X, Bell } from "lucide-react";
import CountrySelector from "./CountrySelector";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { user, setUser, currentBuild, savedBuilds } = useStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Deconectat!");
    setMobileMenuOpen(false);
  };

  // Verifică dacă ai componente în builder dar nu ai salvat încă
  const hasUnsavedChanges = Object.values(currentBuild).some(
    (c: any) => c && typeof c === "object" && c.price
  );

  const unsavedCount = hasUnsavedChanges ? 1 : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                PC Builder
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <CountrySelector />

              <Link href="/builder" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                Builder
              </Link>

              <div className="relative">
                <Link href="/preview" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition flex items-center gap-2">
                  Preview
                  {unsavedCount > 0 && (
                    <span className="relative flex">
                      <Bell className="w-5 h-5 text-orange-500 animate-pulse" />
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        !
                      </span>
                    </span>
                  )}
                </Link>
              </div>

              <div className="flex items-center space-x-4 pl-6 border-l border-gray-300 dark:border-gray-700">
                {user ? (
                  <>
                    <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                      Profile
                    </Link>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email?.split("@")[0]}
                    </span>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition shadow-md"
                  >
                    Login / Register
                  </button>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {unsavedCount > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-orange-500 animate-pulse" />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    !
                  </span>
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <CountrySelector />
              <Link href="/builder" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Builder
              </Link>
              <Link href="/preview" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Preview {unsavedCount > 0 && "(!)"}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                    Profile
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    <button onClick={handleLogout} className="mt-2 text-red-600 font-medium">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
                >
                  Login / Register
                </button>
              )}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 w-full py-3 text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
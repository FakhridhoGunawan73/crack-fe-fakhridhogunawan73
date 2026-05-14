"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLogin(true);
      setRole(userRole || "");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  return (
    <nav className="bg-blue-600 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Kostify
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={pathname === "/" ? "font-bold text-yellow-300" : ""}
          >
            Home
          </Link>

          {isLogin ? (
            <>
              {role === "OWNER" || role === "ADMIN" ? (
                <>
                  <Link
                    href="/owner/dashboard"
                    className={
                      pathname === "/owner/dashboard"
                        ? "font-bold text-yellow-300"
                        : ""
                    }
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className={
                      pathname === "/profile" ? "font-bold text-yellow-300" : ""
                    }
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/my-bookings"
                    className={
                      pathname === "/my-bookings"
                        ? "font-bold text-yellow-300"
                        : ""
                    }
                  >
                    My Bookings
                  </Link>

                  <Link
                    href="/profile"
                    className={
                      pathname === "/profile" ? "font-bold text-yellow-300" : ""
                    }
                  >
                    Profile
                  </Link>
                </>
              )}

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

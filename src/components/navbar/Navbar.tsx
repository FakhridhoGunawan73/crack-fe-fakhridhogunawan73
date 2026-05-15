"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.get("/auth/profile");

        setIsLogin(true);
        setRole(response.data.role);
      } catch {
        setIsLogin(false);
        setRole("");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } finally {
      setIsLogin(false);
      setRole("");
      document.cookie =
        "kostify_access_token=; Path=/; Max-Age=0; SameSite=Lax; Secure";
      window.location.href = "/login";
    }
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

          {isLoading ? (
            <div className="h-6 w-20 animate-pulse rounded bg-blue-500/50"></div>
          ) : isLogin ? (
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

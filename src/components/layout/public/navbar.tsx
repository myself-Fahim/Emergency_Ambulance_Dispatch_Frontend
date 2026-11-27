"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ambulance, LoaderCircle, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hooks";

const routes = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { data, isLoading } = useGetMe();
  const queryClient = useQueryClient();
  const user = data?.data;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (response) => {
        queryClient.cancelQueries({ queryKey: ["user"] });
        queryClient.setQueryData(["user"], null);
        toast.add({
          type: "success",
          description: response.message ?? "You have been logged out",
        });
        setIsMenuOpen(false);
      },
      onError: (error) =>
        toast.add({
          type: "error",
          description: error.message ?? "Unable to log out",
        }),
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:-rotate-6">
            <Ambulance className="size-5" />
          </span>
          <span>
            <span className="block text-lg font-bold leading-none tracking-tight">
              Ambulancia
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Emergency dispatch
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoading ? (
            <output
              className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
              aria-label="Checking account"
              title="Checking account"
            >
              <LoaderCircle className="size-4 animate-spin" />
            </output>
          ) : user ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="gap-2 rounded-full px-4"
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          ) : (
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              className="rounded-full px-5"
            >
              Login
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/70 bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
              >
                {route.name}
              </Link>
            ))}
            {isLoading ? (
              <div className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Checking account...
              </div>
            ) : user ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium text-primary hover:bg-muted"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-xl bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

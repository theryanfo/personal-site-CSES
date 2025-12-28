"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    const linkClass = (path: string) =>
        `px-3 py-2 text-sm font-medium transition ${
            pathname === path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
        }`;

    return (
        <nav className="border-b bg-background">
            <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3">
                <Link href="/" className={linkClass("/")}>
                    Home
                </Link>

                <Link href="/experience" className={linkClass("/experience")}>
                    Experience
                </Link>

                <Link href="/project" className={linkClass("/project")}>
                    Projects
                </Link>
            </div>
        </nav>
    );
}

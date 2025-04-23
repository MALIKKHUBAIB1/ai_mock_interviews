import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        <div className="flex items-center gap-4">
          {/* Let's Code link (internal) */}
          <Link href="/review" className="text-primary-100 text-sm">
            <h2 className="text-primary-100">Let's Code</h2>
          </Link>

          {/* Code Editor link (external, opens in same tab) */}
          <a
            href="https://code-editor-two-navy.vercel.app/"
            className="text-primary-100 text-sm"
          >
            <h2 className="text-primary-100">Code Editor</h2>
          </a>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;

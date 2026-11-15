import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Newspaper, Rocket } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TABS = [
  { to: "/", label: "Launches", icon: Rocket, exact: true },
  { to: "/news", label: "News", icon: Newspaper, exact: false },
  { to: "/saved", label: "Saved", icon: Bookmark, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const detail = path.startsWith("/launch/") || path.startsWith("/story/");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className={cn("mx-auto w-full max-w-md", detail ? "safe-bottom" : "nav-pad")}>{children}</div>
      {detail ? null : (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface" aria-label="Primary">
          <div className="safe-bottom mx-auto flex max-w-md px-2">
            {TABS.map((tab) => {
              const active = tab.exact ? path === tab.to : path === tab.to || path.startsWith(`${tab.to}/`);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1"
                >
                  <span
                    className={cn(
                      "flex h-8 w-16 items-center justify-center rounded-full",
                      active && "bg-primary/15",
                    )}
                  >
                    <Icon className={cn("size-5", active ? "text-primary" : "text-muted")} strokeWidth={1.75} />
                  </span>
                  <span className={cn("text-xs font-medium", active ? "text-primary" : "text-muted")}>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}

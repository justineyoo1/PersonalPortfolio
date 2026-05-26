import React from "react";
import { apps } from "@/data/apps";

type AppPageFooterProps = {
  currentSlug: string;
  supportUrl?: string;
};

export const AppPageFooter: React.FC<AppPageFooterProps> = ({
  currentSlug,
  supportUrl = "https://jstnyoo.com/apps",
}) => {
  const others = apps
    .filter((a) => a.slug !== currentSlug && a.status === "available")
    .slice(0, 2);

  return (
    <footer className="border-t border-black/10 dark:border-white/10 mt-24 pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {others.length > 0 && (
          <div className="mb-10">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              From the same person
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((app) => (
                <a
                  key={app.slug}
                  href={`/apps/${app.slug}`}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                >
                  {app.icon && (
                    <img
                      src={app.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {app.tagline}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="ml-auto text-neutral-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
          <a
            href="/"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Home
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a
            href="/apps"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            All apps
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a
            href="/app/privacy"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Privacy
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a
            href={supportUrl}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Support
          </a>
          <span className="ml-auto text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Justin Yoo
          </span>
        </div>
      </div>
    </footer>
  );
};

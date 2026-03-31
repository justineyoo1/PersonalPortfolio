import { AppInfo } from "@/data/apps";

export function AppCard({ app, index }: { app: AppInfo; index: number }) {
  const isAvailable = app.status === "available";
  const ctaHref = isAvailable ? app.appStoreUrl : app.waitlistUrl;

  return (
    <article
      className="opacity-0 animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden
        dark:terminal-window dark:rounded-xl dark:border dark:bg-[#0B0F14]/90 dark:border-gray-700/90
        bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_2px_15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      {/* Dark mode: mini terminal header */}
      <div className="hidden dark:flex relative py-1.5 px-3 bg-gray-800/80 items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono tracking-wide text-gray-400">
          {app.slug}
        </span>
      </div>

      {/* Card body */}
      <div className="flex items-center gap-4 p-4 dark:p-4">
        {/* App icon */}
        {app.icon ? (
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            width={64}
            height={64}
            className={`w-16 h-16 rounded-2xl shrink-0 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none ${
              app.iconBg === "dark"
                ? "bg-gray-900"
                : app.iconBg === "light"
                  ? "dark:bg-white dark:p-1.5"
                  : ""
            }`}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center text-2xl font-bold
              dark:border shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none"
            style={{
              backgroundColor: `${app.accentColor}15`,
              color: app.accentColor,
              borderColor: `${app.accentColor}40`,
            }}
          >
            {app.name[0]}
          </div>
        )}

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold truncate
            dark:font-mono dark:text-gray-100
            text-[#1D1D1F]">
            {app.name}
          </h2>
          <p className="text-sm mt-0.5 truncate
            dark:font-mono dark:text-gray-400
            text-[#86868B]">
            {app.tagline}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <a
          href={ctaHref ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full min-h-[44px] text-sm font-semibold transition-all duration-200
            dark:rounded-lg dark:font-mono dark:font-normal
            rounded-full"
          style={
            isAvailable
              ? {
                  backgroundColor: app.accentColor,
                  color: "#fff",
                }
              : {
                  backgroundColor: `${app.accentColor}15`,
                  color: app.accentColor,
                  border: `1.5px solid ${app.accentColor}35`,
                }
          }
        >
          <span className="hidden dark:inline">
            {isAvailable ? "$ download" : "$ join waitlist"}
          </span>
          <span className="dark:hidden">
            {isAvailable ? "Download" : "Join Waitlist"}
          </span>
        </a>
      </div>
    </article>
  );
}

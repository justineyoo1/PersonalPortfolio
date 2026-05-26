import React from "react";

type Variant = "black" | "white";

type AppStoreBadgeProps = {
  variant?: Variant;
  className?: string;
  appName: string;
};

export const AppStoreBadge: React.FC<AppStoreBadgeProps> = ({
  variant = "black",
  className = "h-12 w-auto",
  appName,
}) => {
  const isBlack = variant === "black";
  const bg = isBlack ? "#000000" : "#FFFFFF";
  const fg = isBlack ? "#FFFFFF" : "#000000";
  const stroke = isBlack ? "#000000" : "#A6A6A6";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      role="img"
      aria-label={`Download ${appName} on the App Store`}
      className={className}
    >
      <rect
        x="0.5"
        y="0.5"
        width="239"
        height="79"
        rx="12"
        ry="12"
        fill={bg}
        stroke={stroke}
        strokeWidth="1"
      />
      <g transform="translate(20 18)" fill={fg}>
        <path d="M30.12 22.05c-.02-3.34 2.73-4.97 2.86-5.05-1.56-2.28-3.99-2.59-4.85-2.63-2.04-.21-4.02 1.22-5.07 1.22-1.07 0-2.66-1.2-4.38-1.17-2.22.03-4.3 1.32-5.45 3.32-2.36 4.09-.6 10.11 1.66 13.43 1.13 1.62 2.45 3.45 4.18 3.38 1.69-.07 2.32-1.08 4.36-1.08s2.61 1.08 4.38 1.05c1.81-.03 2.96-1.65 4.06-3.29 1.31-1.88 1.84-3.72 1.86-3.81-.04-.02-3.55-1.36-3.61-5.37zM26.78 12.21c.91-1.13 1.53-2.7 1.36-4.27-1.32.05-2.93.9-3.87 2.02-.84 1-1.58 2.59-1.38 4.13 1.47.11 2.97-.75 3.89-1.88z" />
      </g>
      <text
        x="65"
        y="33"
        fill={fg}
        fontSize="11"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="400"
      >
        Download on the
      </text>
      <text
        x="65"
        y="58"
        fill={fg}
        fontSize="24"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        App Store
      </text>
    </svg>
  );
};

type AppStoreLinkProps = {
  appStoreId: string;
  appName: string;
  slug: string;
  variant?: Variant;
  className?: string;
};

export const AppStoreLink: React.FC<AppStoreLinkProps> = ({
  appStoreId,
  appName,
  slug,
  variant = "black",
  className,
}) => {
  const href = `https://apps.apple.com/app/id${appStoreId}?platform=iphone&app=jstnyoo-${slug}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-opacity hover:opacity-80"
      aria-label={`Download ${appName} on the App Store`}
    >
      <AppStoreBadge variant={variant} className={className} appName={appName} />
    </a>
  );
};

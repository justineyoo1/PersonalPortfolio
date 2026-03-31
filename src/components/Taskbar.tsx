import {
  FileUser,
  Linkedin,
  Github,
  Sun,
  Moon,
} from "lucide-react";
import Tooltip from "./Tooltip";
import { personalInfo } from "../data/info";

export const Taskbar = ({ theme }: { theme: "dark" | "light" }) => {
  return (
    <div
      className={`flex w-fit max-w-sm sm:max-w-md lg:w-fit fixed items-center gap-2 bottom-2 p-2 py-2 lg:py-1 rounded-xl justify-between px-3 lg:p-2 mx-2 lg:mx-0 z-50 ${
        theme === "dark"
          ? "shadow-xl border border-gray-700 bg-gray-950"
          : "apple-shadow-dock apple-glass-heavy rounded-[20px] border border-white/50"
      }`}
    >
      {/* Icons section - larger touch targets on mobile */}
      <div className="flex gap-3 lg:gap-2 w-full justify-center">
        <Tooltip text="GitHub">
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={
              "rounded-lg p-1 transition-colors " +
              (theme === "dark"
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7] rounded-xl apple-transition")
            }
          >
            <Github
              className="w-7 h-7 object-contain"
              color={theme === "dark" ? "white" : "#1D1D1F"}
            />
          </a>
        </Tooltip>

        <Tooltip text="LinkedIn">
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={
              "rounded-lg p-1 transition-colors " +
              (theme === "dark"
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7] rounded-xl apple-transition")
            }
          >
            <Linkedin
              className="w-7 h-7 object-contain"
              color={theme === "dark" ? "white" : "#1D1D1F"}
            />
          </a>
        </Tooltip>

        <Tooltip text="Resume">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("openResume"));
            }}
            className={
              "rounded-lg p-1 transition-colors " +
              (theme === "dark"
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7] rounded-xl apple-transition")
            }
          >
            <FileUser
              className="w-7 h-7 object-contain"
              color={theme === "dark" ? "white" : "#1D1D1F"}
            />
          </button>
        </Tooltip>
        <div className={`border rounded-full ${theme === "dark" ? "border-gray-700" : "border-[#E5E5EA]"}`} />
        <Tooltip text={theme === "dark" ? "Light Mode" : "Dark Mode"}>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("toggleTheme"));
            }}
            className={
              "rounded-lg p-1 transition-colors " +
              (theme === "dark" ? "border border-gray-700" : "hover:bg-[#F2F2F7] rounded-xl apple-transition")
            }
          >
            {theme === "dark" ? (
              <Sun
                className="w-7 h-7 object-contain"
                color={theme === "dark" ? "white" : "black"}
              />
            ) : (
              <Moon className="w-7 h-7 object-contain" color="black" />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Taskbar;

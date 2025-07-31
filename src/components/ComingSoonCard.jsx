import React from "react";
import useTheme from "../hooks/useTheme";

const ComingSoonCard = () => {
  const theme = useTheme();

  return (
    <div
      className={`flex items-center justify-center transition-colors duration-500 h-full w-full ${
        theme === "dark"
          ? "bg-[var(--color-darkprimary)]"
          : "bg-white"
      }`}
    >
      <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient border-2 border-transparent transition-transform duration-500 md:hover:scale-105">
        <div
          className={`rounded-xl px-5 py-8 md:px-10 md:py-10 shadow-xl w-full max-w-md text-center transition-colors duration-500 ${
            theme === "dark"
              ? "bg-[var(--color-darksecondary)] text-white"
              : "bg-[var(--color-primaybg)] text-[var(--color-textcolor)]"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 animate-bounce-slow glow-text leading-tight">
            Coming Soon...
          </h1>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-400"
                : "text-[var(--color-sectext)]"
            } text-base sm:text-lg md:text-xl font-medium animate-fade-in`}
          >
            We're working hard to bring you something amazing.
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 10px var(--color-ringlight), 0 0 20px var(--color-ringlight); }
          50% { text-shadow: 0 0 20px var(--color-ringlight), 0 0 30px var(--color-ringlight); }
          100% { text-shadow: 0 0 10px var(--color-ringlight), 0 0 20px var(--color-ringlight); }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out both;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2.4s infinite ease-in-out;
        }

        .glow-text {
          animation: glow 2s infinite ease-in-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 4s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonCard;

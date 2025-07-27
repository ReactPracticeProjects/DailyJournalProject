import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoHomeOutline,IoStatsChart } from "react-icons/io5";
import { FaCalendarAlt,FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import {NavLink } from "react-router";
import { Theme } from "../context/ThemeContext";

const Navbar = () => {
  const [theme, setTheme] = useContext(Theme);
  

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[var(--color-darkprimary)]" : "bg-white"
      } flex justify-around py-3 md:py-4 border-b-2 border-b-blue-500 sticky top-0 left-0 w-full`}
    >
      <div className="leftitems flex space-x-5 items-center">
        <h1
          className={`${
            theme === "dark" ? "text-white" : "text-[var(--color-textcolor)]"
          } text-lg md:text-xl font-semibold`}
        >
          📖 Daily Journal
        </h1>
        <div>
          <nav
            className={`text-md space-x-5 items-center ${
              theme === "dark" ? "text-white/80" : "text-[var(--color-sectext)]"
            } font-semibold hidden md:flex`}
          >
            <NavLink
              className={(e) => {
                return [
                  e.isActive
                    ? `${
                        theme === "dark"
                          ? "bg-[var(--color-ringlight)]/50"
                          : "text-blue-700"
                      } bg-[#dbeafe]/50 px-3 py-1.5 rounded-md flex items-center gap-2`
                    : "px-3 py-1.5 rounded-md flex items-center gap-2",
                ].join(" ");
              }}
              to={"/"}
            >
              <span>
                <IoHomeOutline />
              </span>{" "}
              Home
            </NavLink>
            <NavLink
              className={(e) => {
                return [
                  e.isActive
                    ? `${
                        theme === "dark"
                          ? "bg-[var(--color-ringlight)]/50"
                          : "text-blue-700"
                      } bg-[#dbeafe]/50 px-3 py-1.5 rounded-md flex items-center gap-2`
                    : "px-3 py-1.5 rounded-md flex items-center gap-2",
                ].join(" ");
              }}
              to={"/new"}
            >
              <span>
                <IoMdAdd />
              </span>
              New Entry
            </NavLink>
            <NavLink
              className={(e) => {
                return [
                  e.isActive
                    ? `${
                        theme === "dark"
                          ? "bg-[var(--color-ringlight)]/50"
                          : "text-blue-700"
                      } bg-[#dbeafe]/50 px-3 py-1.5 rounded-md flex items-center gap-2`
                    : "px-3 py-1.5 rounded-md flex items-center gap-2",
                ].join(" ");
              }}
              to={"/stats"}
            >
              <span>
                <IoStatsChart />
              </span>
              Stats
            </NavLink>
            <NavLink
              className={(e) => {
                return [
                  e.isActive
                    ? `${
                        theme === "dark"
                          ? "bg-[var(--color-ringlight)]/50"
                          : "text-blue-700"
                      } bg-[#dbeafe]/50 px-3 py-1.5 rounded-md flex items-center gap-2`
                    : "px-3 py-1.5 rounded-md flex items-center gap-2",
                ].join(" ");
              }}
              to={"/calendar"}
            >
              <span>
                <FaCalendarAlt />
              </span>
              Calendar
            </NavLink>
            <NavLink
              className={(e) => {
                return [
                  e.isActive
                    ? `${
                        theme === "dark"
                          ? "bg-[var(--color-ringlight)]/50"
                          : "text-blue-700"
                      } bg-[#dbeafe]/50 px-3 py-1.5 rounded-md flex items-center gap-2`
                    : "px-3 py-1.5 rounded-md flex items-center gap-2",
                ].join(" ");
              }}
              to={"/trash"}
            >
              <span>
                <FaRegTrashAlt />
              </span>
              Trash
            </NavLink>
          </nav>
        </div>
      </div>

      <button
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className={`${
          theme === "dark"
            ? "text-white hover:bg-slate-600"
            : "text-[var(--color-textcolor)] hover:bg-slate-200"
        } rightitems flex items-center text-lg p-2 rounded-md cursor-pointer`}
      >
        {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>
    </div>
  );
};

export default Navbar;

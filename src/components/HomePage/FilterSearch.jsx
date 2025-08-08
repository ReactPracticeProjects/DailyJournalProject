import React from "react";
import useTheme from "../../hooks/useTheme";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";

function FilterSearch({searchTerm, handleSearchTerm,removeSearchTerm ,getData}) {
  const theme = useTheme();

  return (
    <div className="grid  gap-2 md:grid-cols-6 items-center mt-2">
      <div
        className={`${
          theme === "dark"
            ? " bg-[#020817] border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
            : "bg-white border-slate-300  focus:ring-blue-500"
        }" md:col-span-5 border flex items-center px-3 py-2 md:px-4 md:py-2 h-12 rounded-md`}
      >
        <CiSearch />
        <input
        value={searchTerm}
          onChange={handleSearchTerm}
          className={`w-full  px-3 py-2 md:px-4 md:py-2  placeholder:text-slate-400 placeholder:text-sm md:placeholder:text-md outline-none`}
          type="text"
          placeholder="Search by title or content..."
          id="title"
        />
        <button className="cursor-pointer" onClick={removeSearchTerm}>

        <MdClear />
        </button>
      </div>

      <button onClick={()=>getData()}
        className={`${
          theme === "dark"
            ? "bg-[#020817] border-[var(--color-darkprimary)] hover:bg-[var(--color-darkprimary)]"
            : "bg-white border-slate-300 hover:bg-slate-100"
        } rounded-md border flex items-center justify-center px-3 py-2 md:px-4 md:py-2 gap-2 cursor-pointer md:col-span-1 h-12 `}
      >
        <CiFilter />
        Filter
      </button>
    </div>
  );
}

export default FilterSearch;

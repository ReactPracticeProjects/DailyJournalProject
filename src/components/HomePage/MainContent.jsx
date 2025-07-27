import { IoMdAdd } from "react-icons/io";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { JournalEntryData } from "../../context/JournalContext";
import Card from "./Card";
import Cards from "./Cards";

const MainContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);

  const entryCount = entries.length;

  return (
    <div className="px-5 py-7 md:px-10 lg:px-10  xl:px-30 xl:py-10 mx-auto max-w-8xl flex-col flex-grow min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <p className="text-xl md:text-2xl xl:text-3xl font-semibold">My Journal</p>
          <p className="text-slate-500 ">{entryCount} Entry</p>
        </div>
        <div>
          <button
            onClick={() => navigate("/new")}
            className={`${
              theme === "light"
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-[var(--color-darkprimary)]"
            } flex items-center gap-4 px-2 py-1 text-sm sm:py-2.5 md:text-md  md:px-3 md:py-3 rounded-md justify-center cursor-pointer`}
          >
            <IoMdAdd />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {entryCount > 0 ? (
        <Cards />
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center h-[350px]">
          <span className="text-6xl">📝</span>
          <p className="font-semibold text-xl">No Entries yet</p>
          <p className="text-slate-500 text-md">
            Start your journaling journey by creating your first entry.
          </p>
          <div>
            <button
              onClick={() => navigate("/new")}
              className={`${
                theme === "light"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-[var(--color-darkprimary)]"
              } flex items-center gap-4  px-3 py-2 rounded-md justify-center cursor-pointer`}
            >
              <IoMdAdd />
              <span>Create First Entry</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;

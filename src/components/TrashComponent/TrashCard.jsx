import React, { useContext } from "react";
import useTheme from "../../hooks/useTheme";
import { MdOutlineRestore } from "react-icons/md";
import { JournalEntryData } from "../../context/JournalContext";
import useJournalContext from "../../hooks/useJournalContext";
import { RiDeleteBin6Line } from "react-icons/ri";

const TrashCard = ({ trashData,journalDispatch,id }) => {
  const theme = useTheme();

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#020817] border border-[var(--color-darkprimary)]"
          : "bg-white border border-slate-300"
      } rounded-md col-span-1 px-8 py-8  flex flex-col h-full gap-1`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">{trashData.title}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={()=>journalDispatch({type:"restore",payload:id})} className="flex items-center gap-3 border-[1px] text-green-600 border-green-400 font-semibold text-md px-3 py-1 rounded-md cursor-pointer">
            <MdOutlineRestore /> Restore
          </button>
          <button onClick={()=>journalDispatch({type:"deleteForever",payload:id})} className="flex items-center gap-3 border-[1px] text-red-600 border-red-400 font-semibold text-md px-3 py-1 rounded-md cursor-pointer">
            <RiDeleteBin6Line />
            Delete Forever
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <p className="text-slate-500">{trashData.date}</p>
        <p>{trashData.mood}</p>
        <p
          className={` ${
            theme === "dark"
              ? "bg-[var(--color-darksecondary)]"
              : "bg-slate-100"
          } px-[8px] font-semibold rounded-md py-[2px] text-sm`}
        >
          {trashData.categoryselect}
        </p>
      </div>

      <div>{trashData.content}</div>
    </div>
  );
};

export default TrashCard;

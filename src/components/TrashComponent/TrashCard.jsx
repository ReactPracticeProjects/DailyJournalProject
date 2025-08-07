import useTheme from "../../hooks/useTheme";
import { MdOutlineRestore } from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";

const TrashCard = ({ trashData, journalDispatch, id }) => {
  const theme = useTheme();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      journalDispatch({ type: "deleteForever", payload: id });
    }
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#020817] border border-[var(--color-darkprimary)]"
          : "bg-white border border-slate-300"
      } rounded-md col-span-1 px-5 py-4 md:px-8 md:py-8  flex flex-col h-full gap-1`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm md:text-lg font-semibold">{trashData.title}</p>
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => journalDispatch({ type: "restore", payload: id })}
            className="flex items-center gap-3 border-[1px] text-green-600 border-green-400 font-semibold text-md px-3 py-1 rounded-md cursor-pointer"
          >
            <MdOutlineRestore /> Restore
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="flex items-center gap-3 border-[1px] text-red-600 border-red-400 font-semibold text-md px-3 py-1 rounded-md cursor-pointer"
          >
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

      <div className="flex sm:hidden w-full gap-2 mt-2">
        <button
          onClick={() => journalDispatch({ type: "restore", payload: id })}
          className="flex items-center gap-3 border-[1px] text-green-600 border-green-400 justify-center font-semibold text-[14px] w-full px-2 py-1 rounded-md cursor-pointer"
        >
          <MdOutlineRestore /> Restore
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="flex items-center gap-3 border-[1px] text-red-600 border-red-400 font-semibold text-[14px] w-full text-md px-2 py-1 justify-center rounded-md cursor-pointer"
        >
          <RiDeleteBin6Line />
          Delete Forever
        </button>
      </div>
    </div>
  );
};

export default TrashCard;

import React, { useContext, useState } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import { LuPinOff } from "react-icons/lu";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import useTheme from "../../hooks/useTheme";
import { JournalEntryData } from "../../context/JournalContext";

const Card = ({ data, id, Journaldispatch }) => {
  const theme = useTheme();

  const [showFullText, setShowFullText] = useState(false);

  return (
    <>
      {/* className='text-red-500'  */}

      <div
        className={`${
          theme === "dark"
            ? "bg-[#020817] border border-[var(--color-darkprimary)]"
            : "bg-white border border-slate-300"
        } rounded-md col-span-1 p-4  flex flex-col h-full gap-1`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[15px] sm:text-[18px]">{data.title}</p>
          </div>
          <div className="flex sm:text-[18px] md:text-[20px]  md:gap-2">
            <button
              className={`cursor-pointer hover:bg-slate-100 p-2 rounded-md`}
            >
              <LuPinOff />
            </button>
            <button
              className={`cursor-pointer hover:bg-slate-100 p-2 rounded-md`}
            >
              {" "}
              <TiEdit />
            </button>
            <button
              className={`cursor-pointer hover:bg-slate-100 p-2 rounded-md`}
              onClick={() => Journaldispatch({ type: "setTrash", payload: id })}
            >
              <RiDeleteBin6Line className="text-red-500" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <p className="text-slate-500">{data.date}</p>
          <p>{data.mood}</p>
          <p
            className={` ${
              theme === "dark"
                ? "bg-[var(--color-darksecondary)] "
                : "bg-slate-100 text-slate-600"
            } px-[8px] font-semibold text-slate-600 rounded-md py-[2px] text-sm`}
          >
            {data.categoryselect}
          </p>
        </div>

        <div className="flex-grow">
          <p className="text-md">
            {showFullText
              ? data.content
              : `${data.content.slice(0, 100)}${
                  data.content.length > 100 ? "..." : ""
                }`}
          </p>
          {data.content.length > 100 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-500 text-sm mt-1 cursor-pointer"
            >
              {showFullText ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className={`${
                  theme === "dark"
                    ? "bg-[#020817]  border-[var(--color-darkprimary)]"
                    : "bg-white border-slate-300"
                } border text-sm  p-1 text-[12px] font-semibold rounded-md`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div>{data.wordcount} words</div>
        </div>
      </div>
    </>
  );
};

export default Card;

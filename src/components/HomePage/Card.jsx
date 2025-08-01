import React, { useContext, useState } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import { LuPinOff } from "react-icons/lu";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import useTheme from "../../hooks/useTheme";
import { JournalEntryData } from "../../context/JournalContext";
import { useNavigate } from "react-router";

const Card = ({ data, id, Journaldispatch }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [showFullText, setShowFullText] = useState(false);

  const handleEditForm = (editid)=>{
    navigate(`/edit/${editid}`)
    

  }

  return (
    <>
      {/* className='text-red-500'  */}

      <div
        className={`${
          theme === "dark"
            ? data.isPinned ? "bg-[#020817]  border-blue-500":" bg-[#020817] border-[var(--color-darkprimary)] "
            : data.isPinned ? "bg-white border-blue-500" :  `bg-white  border-slate-300`
        } ${
          data.isPinned ? "border-blue-500" : "border-[var(--color-darkprimary)]"
        }  border-[2px] rounded-md col-span-1 p-4  flex flex-col h-full gap-1`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[15px] sm:text-[18px]">{data.title}</p>
          </div>
          <div className="flex sm:text-[18px] md:text-[20px]  md:gap-2">
            <button 
              onClick={() => Journaldispatch({type: "toggle_pinned", payload: id})}
              className={`cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"} p-2 rounded-md ${
                data.isPinned ? "text-blue-500" :  theme === "dark" ? "text-white":"text-black"
              }`}
            >
              {data.isPinned ? <MdPushPin /> : <LuPinOff />}
            </button>
            <button onClick={(e)=>handleEditForm(data.id,e)}
              className={`cursor-pointer ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"}  p-2 rounded-md`}
            >
              {" "}
              <TiEdit />
            </button>
            <button
              className={`cursor-pointer  ${theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"} p-2 rounded-md`}
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

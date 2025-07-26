import React, { forwardRef } from "react";
import { MdClear } from "react-icons/md";

const TagInput = forwardRef(({ handleTagChange, tags, handletagremove, theme }, tagref) => {
  return (
    <div className="space-y-2">
      <label htmlFor="tags">Tags</label>

      {tags && tags.length > 0 && (
        <div className="flex my-2.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => handletagremove(index)}
              className={`${
                theme === "dark"
                  ? "bg-[var(--color-darkprimary)]"
                  : "bg-slate-300 text-[#4b5563]"
              } flex items-center gap-4 w-fit px-2 py-1 ml-1 cursor-pointer text-sm rounded-md`}
            >
              {tag} <MdClear />
            </span>
          ))}
        </div>
      )}

      <div className="grid mt-2 grid-cols-12 gap-2">
        <input
          ref={tagref}
          className={`${
            theme === "dark"
              ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
              : "border-slate-300 focus:ring-blue-500"
          } col-span-11 border w-full px-4 py-1.5 rounded-md placeholder:text-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
          type="text"
          name="tags"
          placeholder="Add a tag..."
        />
        <button
          onClick={handleTagChange}
          className="col-span-1 bg-blue-500 text-white px-4 w-full cursor-pointer py-1.5 rounded-md"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
});

export default TagInput;

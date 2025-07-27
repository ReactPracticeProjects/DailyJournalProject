import React from "react";

const MoodSelector = ({theme,setemojiSelected,emojiSelected,register,setValue}) => {
  const moods = ["😊", "😢", "😡", "😴", "🤔", "😍", "😰", "🤗", "😎", "🤒"];
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="mood">Mood</label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {moods.map((emoji) => (
            <button
              {...register("mood")}
              key={emoji}
              onClick={() => {
                setemojiSelected(emoji);
                setValue("mood", emoji);
              }}
              type="button"
              className={`${
                theme === "dark"
                  ? "border-[var(--color-darkprimary)]"
                  : "border-slate-300"
              } ${
                emojiSelected === emoji && "bg-blue-500"
              } rounded-md p-1 md:px-3 md:py-1 text-xl md:text-2xl border cursor-pointer`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoodSelector;

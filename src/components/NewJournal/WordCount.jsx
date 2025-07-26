import React from 'react'

const WordCount = ({wordcount,register,handlewordCount,theme}) => {
  return (
    <>
     <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="journalContent">Content</label>
              <p>{wordcount} words</p>
            </div>

            <textarea
              {...register("content", {
                onChange: (e) => {
                  handlewordCount(e); // Call your handler
                },
              })}
              placeholder="Write your journal entry here"
              rows="7"
              className={`${
                theme === "dark"
                  ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                  : "border-slate-300 focus:ring-blue-500"
              } w-full border px-4 py-1.5 rounded-md placeholder:text-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
              id=""
            ></textarea>
          </div>

    </>
  )
}

export default WordCount

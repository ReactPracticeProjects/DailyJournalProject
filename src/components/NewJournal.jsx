import { useContext, useRef, useState } from "react";
import { Theme } from "../context/ThemeContext";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { JournalEntryData } from "../context/JournalContext";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";

const NewJournal = () => {
  const { register, reset, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      mood: "😊",
    },
  });

  const [theme, setTheme] = useContext(Theme);
  const navigate = useNavigate();

  const [{ entries, trashedEntries }, Journaldispatch] =
    useContext(JournalEntryData);

  const tagref = useRef();

  const moods = ["😊", "😢", "😡", "😴", "🤔", "😍", "😰", "🤗", "😎", "🤒"];
  const categories = ["Personal", "Work", "Travel", "Health", "Other"];
  const [emojiSelected, setemojiSelected] = useState("😊");

  const [wordcount, setwordcount] = useState(0);

  const handlewordCount = (e) => {
    const value =  e.target.value
    const count = value.trim().split(" ").length;
    setwordcount(count)
  };
  const [tags, setTags] = useState([]);

  const handletagremove = (tagindex) => {
    const data = tags.filter((tagitem, index) => {
      if (tagindex !== index) {
        return tagitem;
      }
    });
    setTags(data);
  };

  const handleTagChange = () => {
    const data = (tagref.current?.value).toLowerCase();
    setTags((prev) => [...prev, data]);
    tagref.current.value = "";
  };

  const onSubmit = (data) => {
    // data.id = data.categoryselect.toUpperCase().substring(0, 3) + Math.floor(Math.random() * 900) + 100 + Date.now().toString().substring(9,13);
    data.id =
      data.categoryselect.toUpperCase().substring(0, 3) +
      +(Math.floor(Math.random() * 90000) + 11000);
    data.isPinned = false;
    data.wordcount = wordcount;
    data.updatedDate = data.date;
    data.tags = tags;

    entries.push(data);
    localStorage.setItem("journalEntry", JSON.stringify(entries));
    setTags([]);
    reset();
  };

  return (
    <div className="px-20 py-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-3xl font-semibold tracking-tighter">
          New Journal Entry
        </p>
        <p className="text-slate-500">Capture your thoughts and memories</p>
      </div>

      <div
        className={`${
          theme === "dark"
            ? "bg-[#020817] border border-[var(--color-darkprimary)]"
            : "bg-white border border-slate-300"
        } rounded-lg px-10 py-8 space-y-6`}
      >
        <p className="text-2xl font-bold mb-2">New Entry</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <input
              {...register("title")}
              className={`${
                theme === "dark"
                  ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                  : "border-slate-300 focus:ring-blue-500"
              } border w-full px-4 mt-2 py-1.5 rounded-md placeholder:text-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
              type="text"
              placeholder="Enter a title for your entry..."
              id="title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date">Date</label>
              <input
                {...register("date")}
                className={`${
                  theme === "dark"
                    ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                    : "border-slate-300 focus:ring-blue-500"
                } border w-full mt-2 px-4 py-1.5 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
                type="date"
                id=""
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <select
                {...register("categoryselect")}
                className={`${
                  theme === "dark"
                    ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                    : "border-slate-300 focus:ring-blue-500"
                } border w-full mt-2 px-4 py-1.5 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
                id=""
              >
                {categories.map((categorie) => (
                  <option
                    key={categorie}
                    className="px-2 text-slate-700"
                    value={categorie}
                  >
                    {categorie}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                  } rounded-md px-3 py-1 text-2xl border cursor-pointer`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags">Tags</label>

            {tags && tags.length > 0 ? (
              <div className="flex my-2.5">
                {" "}
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => handletagremove(index)}
                    className={`
${
  theme === "dark"
    ? "bg-[var(--color-darkprimary)]"
    : "bg-slate-300 text-[#4b5563]"
} flex items-center gap-4  w-fit px-2 py-1 ml-1 cursor-pointer  text-sm rounded-md`}
                  >
                    {tag} <MdClear />{" "}
                  </span>
                ))}{" "}
              </div>
            ) : (
              ""
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
                id=""
              />
              <button
                onClick={handleTagChange}
                className="col-span-1 bg-blue-500 text-white  px-4 w-full cursor-pointer py-1.5 rounded-md"
                type="button"
              >
                +
              </button>
            </div>
          </div>

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

          <div className="grid grid-cols-12 gap-3 pt-2">
            <button
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } col-span-10 bg-blue-500 py-2 hover:bg-blue-700 text-white rounded-md flex justify-center items-center gap-3 cursor-pointer`}
              type="submit"
            >
              <span>
                <IoSaveOutline />
              </span>
              Save Entry
            </button>
            <button
              onClick={() => navigate("/")}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } border border-slate-300 py-2 col-span-2 rounded-md cursor-pointer hover:bg-slate-100`}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewJournal;

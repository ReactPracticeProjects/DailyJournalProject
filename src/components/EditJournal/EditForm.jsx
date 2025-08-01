import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useTheme from "../../hooks/useTheme";
import { IoSaveOutline } from "react-icons/io5";
import JournalContext from "../../context/JournalContext";
import useJournalContext from "../../hooks/useJournalContext";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";

const EditForm = () => {
  const categories = ["Personal", "Work", "Travel", "Health", "Other"];
  const moods = ["😊", "😢", "😡", "😴", "🤔", "😍", "😰", "🤗", "😎", "🤒"];
  const [emojiSelected, setemojiSelected] = useState("😊");
  const { editid } = useParams();
  const navigate = useNavigate();
  const tagref = useRef();
  const [wordcount, setwordcount] = useState(0);
  const [tags, setTags] = useState([]);
  const handlewordCount = (e) => {
    const value = e.target.value;
    const count = value.trim().split(" ").length;
    setwordcount(count);
  };
  const handletagremove = (tagindex) => {
    // cleaner function
    const data = tags.filter((_, index) => index != tagindex);

    setTags(data);
  };

  const handleTagChange = () => {
    const data = (tagref.current?.value).toLowerCase();
    setTags((prev) => [...prev, data]);
    tagref.current.value = "";
  };

  const [entries, trashedEntries, Journaldispatch] = useJournalContext();

  const data = entries.find((item, index) => item.id === editid);

  const { register, handleSubmit, setValue,reset } = useForm();

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("date", data.date);
      setValue("categoryselect", data.categoryselect);
      setemojiSelected(data.mood);
      setwordcount(data.wordcount);

      setTags(data.tags);
    }
  }, [data, setValue]);

  const theme = useTheme();

  const onSubmit = (editvaludeData) => {
    editvaludeData.id =
      editvaludeData.categoryselect.toUpperCase().substring(0, 3) +
      (Math.floor(Math.random() * 90000) + 11000);
    editvaludeData.isPinned = data.isPinned;
    editvaludeData.wordcount = wordcount;
    editvaludeData.updatedDate = data.date;
    editvaludeData.tags = tags;
    editvaludeData.mood = emojiSelected;
    Journaldispatch({
      type: "update_entry",
      payload: editvaludeData,
      itemid: editid,
    });
    setTags([]);
    reset();
    navigate("/");
  };

  return (
    <div className="px-8 py-4 pb-18 lg:px-20 lg:py-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-xl md:text-2xl xl:text-3xl font-semibold tracking-tighter">
          Edit Journal Entry
        </p>
        <p className="text-slate-500 text-sm md:text-md xl:text-[15px]">
          Update your thoughts and memories
        </p>
      </div>

      <div
        className={`${
          theme === "dark"
            ? "bg-[#020817] border border-[var(--color-darkprimary)]"
            : "bg-white border border-slate-300"
        } rounded-lg px-4 py-3 md:px-6 md:py-4 lg:px-10  lg:py-8 space-y-6`}
      >
        <p className="text-lg md:text-xl xl:text-2xl font-bold mb-2">
          Edit Entry
        </p>
        {/* <div onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <input
              {...register("title")}
              className={`${
                theme === "dark"
                  ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                  : "border-slate-300 focus:ring-blue-500"
              } border w-full mt-2  px-2 py-1 md:px-4 md:py-1.5 rounded-md placeholder:text-slate-400 placeholder:text-sm md:placeholder:text-md  outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
              type="text"
              placeholder="Enter a title for your entry..."
              id="title"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date">Date</label>
              <input
                {...register("date")}
                className={`${
                  theme === "dark"
                    ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                    : "border-slate-300 focus:ring-blue-500"
                } text-sm md:text-[15px]  border w-full mt-2 px-2 py-1 md:px-4 md:py-1.5 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
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
                } border text-sm md:text-[15px] w-full mt-2 px-2 py-1 md:px-4 md:py-1.5 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
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
                  } rounded-md p-1 md:px-3 md:py-1 text-xl md:text-2xl border cursor-pointer`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tags">Tags</label>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 my-2.5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handletagremove(index)}
                  className={`${
                    theme === "dark"
                      ? "bg-[var(--color-darkprimary)]"
                      : "bg-slate-300 text-[#4b5563]"
                  } flex  items-center gap-4 w-fit px-2 py-1 ml-1 cursor-pointer text-sm rounded-md`}
                >
                  {tag} <MdClear />
                </span>
              ))}
            </div>
          )}

          <div className="grid mt-2 grid-cols-12 gap-2">
            <input
              onKeyDown={(e) => {
                console.log(e.key);

                e.key === "Enter" ? handleTagChange() : console.log("hello");
              }}
              ref={tagref}
              className={`${
                theme === "dark"
                  ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                  : "border-slate-300 focus:ring-blue-500"
              } col-span-10 border w-full px-2 py-1 md:px-4 md:py-1.5 rounded-md placeholder:text-slate-400 placeholder:text-sm md:placeholder:text-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
              type="text"
              name="tags"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={handleTagChange}
              className="col-span-2 bg-blue-500 text-white px-3 md:px-4 w-full cursor-pointer py-1.5 rounded-md"
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
            {...register("content")}
            placeholder="Write your journal entry here"
            rows="7"
            className={`${
              theme === "dark"
                ? "border-[var(--color-darkprimary)] focus:ring-white focus:ring-offset-[var(--color-darkprimary)]"
                : "border-slate-300 focus:ring-blue-500"
            } w-full border px-2 py-1 placeholder:text-sm md:placeholder:text-md md:px-4 md:py-1.5 rounded-md placeholder:text-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition`}
            id=""
          ></textarea>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 pt-2">
        <button
          onClick={handleSubmit(onSubmit)}
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } col-span-8 md:col-span-9 bg-blue-500 py-2 hover:bg-blue-700 text-white rounded-md flex justify-center items-center gap-3 cursor-pointer`}
          type="submit"
        >
          <span>
            <IoSaveOutline />
          </span>
          Update Entry
        </button>
        <button
          onClick={() => navigate("/")}
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } border border-slate-300 py-2 col-span-4  md:col-span-3 rounded-md cursor-pointer hover:bg-slate-100`}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;

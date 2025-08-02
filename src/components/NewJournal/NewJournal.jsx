import { useContext, useEffect, useRef, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { JournalEntryData } from "../../context/JournalContext";
import { useForm } from "react-hook-form";

import MoodSelector from "./MoodSelector";
import TagInput from "./TagInput";
import WordCount from "./WordCount";
import useTheme from "../../hooks/useTheme";
import useJournalContext from "../../hooks/useJournalContext";

const NewJournal = () => {
  const { register, reset, handleSubmit, watch, setValue, getValues } = useForm(
    {
      defaultValues: {
        mood: "😊",
      },
    }
  );

  const theme = useTheme();
  const navigate = useNavigate();

  const [entries, trashedEntries, draft, Journaldispatch] = useJournalContext();

  const tagref = useRef();

  const categories = ["Personal", "Work", "Travel", "Health", "Other"];
  const [emojiSelected, setemojiSelected] = useState("😊");

  const [wordcount, setwordcount] = useState(0);
  const [tags, setTags] = useState([]);
  const [hasDraft, setHasDraft] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Auto-save draft functionality
  useEffect(() => {
    const subscription = watch((value) => {
      // Only auto-save if there's actual content
      if (value.title || value.content) {
        setIsAutoSaving(true);
        const timeoutId = setTimeout(() => {
          saveDraft();
          setIsAutoSaving(false);
        }, 2000); // Auto-save after 2 seconds of inactivity

        return () => clearTimeout(timeoutId);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Load draft on component mount
  useEffect(() => {
    if (draft && draft.length > 0) {
      const latestDraft = draft[draft.length - 1];
      setValue("title", latestDraft.title || "");
      setValue("date", latestDraft.date || "");
      setValue("categoryselect", latestDraft.categoryselect || "Personal");
      setValue("mood", latestDraft.mood || "😊");
      setValue("content", latestDraft.content || "");
      setTags(latestDraft.tags || []);
      setwordcount(latestDraft.wordcount || 0);
      setemojiSelected(latestDraft.mood || "😊");
      setHasDraft(true);
    }
  }, [draft, setValue]);

  const saveDraft = () => {
    const formData = getValues();
    const draftData = {
      ...formData,
      tags,
      wordcount,
      timestamp: new Date().toISOString(),
    };

    Journaldispatch({ type: "add_draft", payload: [draftData] });
  };

  const clearDraft = () => {
    Journaldispatch({ type: "clear_draft", payload: [] });
    setHasDraft(false);
  };

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

  const onSubmit = (data) => {
    data.id =
      data.categoryselect.toUpperCase().substring(0, 3) +
      (Math.floor(Math.random() * 90000) + 11000);
    data.isPinned = false;
    data.wordcount = wordcount;
    data.updatedDate = data.date;
    data.tags = tags;

    // Dispatch only (localStorage syncs in useEffect)
    Journaldispatch({ type: "add_entry", payload: data });

    // Clear draft after successful save
    clearDraft();
    
    setTags([]);
    reset();
    navigate("/");
  };

  return (
    <div className="px-8 py-4 pb-18 lg:px-20 lg:py-10 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-xl md:text-2xl xl:text-3xl font-semibold tracking-tighter">
          New Journal Entry
        </p>
        <p className="text-slate-500 text-sm md:text-md xl:text-[15px]">
          Capture your thoughts and memories
        </p>
        {/* Draft status indicator */}
        {(hasDraft || isAutoSaving) && (
          <div className="flex items-center gap-2 text-sm">
            {isAutoSaving && (
              <span className="text-blue-500">Auto-saving...</span>
            )}
            {hasDraft && !isAutoSaving && (
              <span className="text-green-500">Draft saved</span>
            )}
          </div>
        )}
      </div>

      <div
        className={`${
          theme === "dark"
            ? "bg-[#020817] border border-[var(--color-darkprimary)]"
            : "bg-white border border-slate-300"
        } rounded-lg px-4 py-3 md:px-6 md:py-4 lg:px-10  lg:py-8 space-y-6`}
      >
        <p className="text-lg md:text-xl xl:text-2xl font-bold mb-2">
          New Entry
        </p>
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

          <MoodSelector
            setValue={setValue}
            register={register}
            theme={theme}
            setemojiSelected={setemojiSelected}
            emojiSelected={emojiSelected}
          />

          <TagInput
            handleTagChange={handleTagChange}
            tags={tags}
            handletagremove={handletagremove}
            theme={theme}
            ref={tagref}
          />

          <WordCount
            wordcount={wordcount}
            register={register}
            handlewordCount={handlewordCount}
            theme={theme}
          />

          <div className="grid grid-cols-12 gap-3 pt-2">
            <button
              onClick={handleSubmit(onSubmit)}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } col-span-6 md:col-span-7 bg-blue-500 py-2 hover:bg-blue-700 text-white rounded-md flex justify-center items-center gap-3 cursor-pointer`}
              type="submit"
            >
              <span>
                <IoSaveOutline />
              </span>
              Save Entry
            </button>
            <button
              onClick={saveDraft}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } col-span-3 md:col-span-2 bg-gray-500 py-2 hover:bg-gray-700 text-white rounded-md flex justify-center items-center gap-3 cursor-pointer`}
              type="button"
            >
              Save Draft
            </button>
            <button
              onClick={() => navigate("/")}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } border border-slate-300 py-2 col-span-3  md:col-span-3 rounded-md cursor-pointer hover:bg-slate-100`}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
NewJournal.whyDidYouRender = true;
export default NewJournal;

import Navbar from "./Navbar";
import MainContent from "./MainContent";
import { Route, Routes } from "react-router";

import Stats from "./Stats";
import Calendar from "./Calendar";

import NewJournal from "./NewJournal/NewJournal";
import useTheme from "../hooks/useTheme";
import Trash from "./TrashComponent/Trash";

const Content = () => {
  const theme = useTheme();

  return (
    <div className="">
      <Navbar />

      <div
        className={`${
          theme === "dark"
            ? "text-white bg-[var(--color-darksecondary)] "
            : "text-[var(--color-textcolor)]  bg-[var(--color-primaybg)]"
        } w-full`}
      >
        <Routes>
          <Route path="/" element={<MainContent />}></Route>
          <Route path="/new" element={<NewJournal />}></Route>
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/trash" element={<Trash />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Content;

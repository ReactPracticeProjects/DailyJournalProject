import Navbar from "./Navbar";
import MainContent from "./HomePage/MainContent";
import { Navigate, Route, Routes } from "react-router";

import Stats from "./Stats";
import Calendar from "./Calendar";

import NewJournal from "./NewJournal/NewJournal";
import useTheme from "../hooks/useTheme";
import Trash from "./TrashComponent/Trash";
import EditForm from "./EditJournal/EditForm";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";


const Content = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  console.log(user)

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen">
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
          <Route path="/edit/:editid" element={<EditForm />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/trash" element={<Trash />}></Route>
         
        </Routes>
      </div>
    </div>
  );
};

export default Content;

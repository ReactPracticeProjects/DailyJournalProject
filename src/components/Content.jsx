import React from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import { Route, Routes } from "react-router";
import NewJournal from "./NewJournal";
import Trash from "./Trash";
import Stats from "./Stats";
import Calendar from "./Calendar";

const Content = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <div className="w-full h-screen bg-[var(--color-darksecondary)] text-white text-5xl">
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

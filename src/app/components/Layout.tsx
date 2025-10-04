"use client";

import { House, HouseIcon, Settings, SettingsIcon } from "lucide-react";
import "./layout.css";
import LetterBox from "./LetterBox";
import Board from "./Board";
import Keyboard from "./Keyboard";

export default function Layout() {
  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 px-3 h-1/12 bg-[white] zigzag-border">
        <HouseIcon color="#A77885" />
        <div className="flex flex-col">
          <span className="text-[#d1c0c3] text-xl font-bold">Mistakes</span>
          <div className="flex justify-around">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 border-2 border-[#d1c0c3] rounded-full"></div>
            ))}
          </div>
        </div>

        <SettingsIcon color="#A77885" />
      </div>

      {/* Text */}
      <div className="h-7/12 px-16 bg-[#f7f1f0]">
        <Board sentence="Hello World! I am Quangz From the Moon, Dep trai nhat the gioi" />
      </div>

      {/* Keyboard */}
      <div className="h-4/12 bg-[#d1c0c3]">
        <div className="pt-4">
          <Keyboard />
        </div>
      </div>
    </div>
  );
}

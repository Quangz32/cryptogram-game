"use client";

import { House, HouseIcon, Settings, SettingsIcon } from "lucide-react";
import "../stylesheets/layout.css";
import LetterBox from "./LetterBox";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { useMemo, useState } from "react";
import Link from "next/link";
import { sentences } from "../db/senteces";

export default function Layout() {
  const [pressedKey, setPressedKey] = useState<string>("");

  const sentence = useMemo(() => {
    return sentences[Math.floor(Math.random() * 20) + 1].sentence;
  }, []);
  const knownIndex: number[] = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
      return Math.floor(Math.random() * sentence.length) + 1;
    });
  }, []);

  // const [];

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
  };

  console.log("Rendering Layout.tsx");
  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 px-3 h-1/12 bg-[white] zigzag-border">
        <Link href="/home">
          <HouseIcon color="#A77885" />
        </Link>
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
      <div className="h-7/12">
        {/* <Board
          sentence="Hello World! I am Quangz From the Moon, Dep trai nhat the gioi"
          knownIndex={[0, 1, 2, 3, 60, 61]}
          pressedKey={pressedKey}
        /> */}
        <Board sentence={sentence} knownIndex={knownIndex} pressedKey={pressedKey} />
      </div>

      {/* Keyboard */}
      <div className="h-4/12 bg-[#d1c0c3]">
        <div className="pt-4">
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
}

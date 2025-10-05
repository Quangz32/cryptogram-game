"use client";

import { House, HouseIcon, PlayIcon, Settings, SettingsIcon } from "lucide-react";
import "../stylesheets/layout.css";
import LetterBox from "./LetterBox";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { sentences } from "../db/senteces";

export default function Layout() {
  const [pressedKey, setPressedKey] = useState<string>("");
  const [sentence, setSentence] = useState<string>("");
  const [won, setWon] = useState<boolean>(false);

  const handleSetWon = (won: boolean) => {
    setWon(won);
  };

  useEffect(() => {
    const isRandom = true; //FOR DEV MODE
    if (isRandom) {
      setSentence(sentences[Math.floor(Math.random() * 20) + 1].sentence);
    } else {
      setSentence(sentences[0].sentence);
    }
  }, []);

  //Check win every time press a key
  useEffect(() => {}, [pressedKey]);

  const knownIndex: number[] = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
      return Math.floor(Math.random() * sentence.length) + 1;
    });
  }, []);

  // const [];

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
  };

  function handleNextQuestion() {
    setSentence(sentences[Math.floor(Math.random() * 20) + 1].sentence);
  }

  console.log("Rendering Layout.tsx");
  return (
    <div className="h-full bg-[#F7F1F0]">
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
        <Board
          sentence={sentence}
          knownIndex={knownIndex}
          pressedKey={pressedKey}
          setWon={handleSetWon}
        />
      </div>

      {/**WON */}
      <div
        className={`py-2 flex justify-center items-center bg-[#F7F1F0] ${
          won ? "block" : "invisible"
        }`}
      >
        <div className=" text-2xl text-red-500">Congratulations 👏🎉🎊🥂🍾🎆</div>
        <div
          className="shadow-xl rounded-lg p-1 shadow-blue-600 ms-8 text-3xl cursor-pointer"
          onClick={() => {
            handleNextQuestion();
          }}
        >
          {"Next ->"}
        </div>
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

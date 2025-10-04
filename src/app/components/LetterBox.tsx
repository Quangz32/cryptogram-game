"use client";
import { useState } from "react";

interface LetterBoxProps {
  letter?: string | null;
  code?: number | null;
  showLetter?: boolean;
  showCode?: boolean;
  choosing?: boolean;
}

export default function LetterBox({
  letter = " ",
  code,
  choosing = false,
  showLetter = false,
  showCode = false,
}: LetterBoxProps) {
  // const [ch, setCh] = useState(choosing);
  return (
    <div
      className={`flex flex-col items-center border-2 px-0.5 h-18 w-7  ${
        choosing ? "bg-[#55F000] rounded-sm  !border-[#33BE00]" : "border-transparent"
      }`}
      // onClick={() => {
      //   setCh(!ch);
      // }}
    >
      <div className="h-8 text-3xl font-[550] text-[#73394A]">{showLetter ? letter : " "}</div>
      <div
        className={`w-full h-[2px] mt-1  ${showCode && code && code > 0 ? "d-block" : "hidden"} ${
          choosing ? "bg-[#65BA19]" : "bg-[#d7bac2]"
        }`}
      ></div>
      <div className="h-6 text-[#784050]"> {showCode && code && code > 0 ? code : " "}</div>
    </div>
  );
}

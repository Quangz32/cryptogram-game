import LetterBox from "./LetterBox";
import { getSuffleCharMap } from "../utils/shuffle";
import { useEffect, useMemo, useState } from "react";

interface BoardProps {
  sentence: string;
}

type LetterData = {
  id: number;
  letter: string;
  code: number | null | undefined;
  showLetter?: boolean;
  showCode?: boolean;
  choosing?: boolean;
};

export default function Board({ sentence }: BoardProps) {
  const [letterDatas, setLetterDatas] = useState<LetterData[]>([]);

  /* set-up leterData */
  useEffect(() => {
    const lettersDatas_ =
      sentence.length == 0
        ? []
        : sentence
            .concat(" ")
            .toUpperCase()
            .split("")
            .map((char, index) => ({
              id: index, // Using index to assign unique IDs
              letter: char,
              code: getCodeOfChar(char),
              showLetter: true,
              showCode: true,
              choosing: false,
            }));
    console.log(lettersDatas_);
    // console.log(splitToLines(lettersDatas_));
    setLetterDatas(lettersDatas_);
  }, [sentence]);

  //LINE CUT-POINTS
  const lineCutPoints = [0, 0];
  letterDatas?.forEach((letterData, index) => {
    //   console.log(letterData.letter + index);
    if (letterData.letter == " ") {
      if (index - lineCutPoints[lineCutPoints.length - 2] < 25) {
        lineCutPoints[lineCutPoints.length - 1] = index;
      } else {
        lineCutPoints.push(index);
      }
    }
  });

  console.log(lineCutPoints);

  function splitToLines(letterDatas: LetterData[]): LetterData[][] {
    // console.log(cutPoints);

    const lines: LetterData[][] = [];
    lineCutPoints.forEach((point, index) => {
      if (index == lineCutPoints.length - 1) return; //last index
      lines.push(letterDatas.slice(lineCutPoints[index], lineCutPoints[index + 1]));
    });

    // console.log(lines);
    return lines;
  }

  const charMap = useMemo(() => getSuffleCharMap(), [sentence]);
  console.log(charMap);
  //   const charMap = getSuffleCharMap();

  function getCodeOfChar(c: string): number | null | undefined {
    if (c.length != 1) return -1;
    if (charMap.get(c) != null) return charMap.get(c);
    return -1;
  }

  function toggleLetterBox(lineIndex: number, letterIndex: number) {
    //if not A->Z, return
    if (charMap.get(letterDatas[lineCutPoints[lineIndex] + letterIndex].letter) == null) return;
    setLetterDatas(
      letterDatas.map((data, index) =>
        index !== lineCutPoints[lineIndex] + letterIndex
          ? {
              ...data,
              choosing: false,
            }
          : {
              ...data,
              choosing: true,
            }
      )
    );
  }

  /*
    RENDER
  */
  console.log("Rendering Board");
  return (
    <div
      className="h-full px-16 bg-[#f7f1f0] flex flex-col justify-center"
      onClick={() => {
        console.log("clicked on board");
        setLetterDatas(letterDatas.map((d) => ({ ...d, choosing: false })));
      }}
    >
      {splitToLines(letterDatas)?.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-row justify-center">
          {line.map((letterData, letterIndex) => (
            <div
              key={letterIndex}
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked on letterbox");
                toggleLetterBox(lineIndex, letterIndex);
              }}
            >
              <LetterBox
                showLetter={letterData.showLetter}
                showCode={letterData.showCode}
                letter={letterData.letter}
                code={getCodeOfChar(letterData.letter)}
                choosing={letterData.choosing}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

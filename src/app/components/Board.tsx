import LetterBox from "./LetterBox";
import { getSuffleCharMap } from "../utils/shuffle";
import { useEffect, useState } from "react";

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
    // console.log(lettersDatas_);
    // console.log(splitToLines(lettersDatas_));
    setLetterDatas(lettersDatas_);
  }, [sentence]);

  /* set-up Line Cutpoint */

  const charMap = getSuffleCharMap();

  function splitToLines(letterDatas: LetterData[]): LetterData[][] {
    const cutPoints: number[] = [0, 0];

    letterDatas?.forEach((letterData, index) => {
      //   console.log(letterData.letter + index);
      if (letterData.letter == " ") {
        if (index - cutPoints[cutPoints.length - 2] < 25) {
          cutPoints[cutPoints.length - 1] = index;
        } else {
          cutPoints.push(index);
        }
      }
    });

    // console.log(cutPoints);

    const lines: LetterData[][] = [];
    cutPoints.forEach((point, index) => {
      if (index == cutPoints.length - 1) return; //last index
      lines.push(letterDatas.slice(cutPoints[index], cutPoints[index + 1]));
    });

    // console.log(lines);
    return lines;
  }

  function getCodeOfChar(c: string): number | null | undefined {
    if (c.length != 1) return -1;
    if (charMap.get(c) != null) return charMap.get(c);
    return -1;
  }

  /*
    RENDER
  */
  return (
    <div className="flex flex-col justify-center">
      {splitToLines(letterDatas)?.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-row justify-center">
          {line.map((letterData, letterIndex) => (
            <div
              key={letterIndex}
              onClick={() => {
                console.log("" + lineIndex + letterIndex);
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

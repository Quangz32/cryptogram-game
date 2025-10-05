import LetterBox from "./LetterBox";
import { getSuffleCharMap } from "../utils/shuffle";
import { useEffect, useMemo, useState } from "react";

interface BoardProps {
  sentence: string;
  knownIndex?: number[];
  pressedKey: string;
  setWon: (won: boolean) => void;
}

type LetterData = {
  id: number;
  letter: string;
  code: number;
  showLetter?: boolean;
  showCode?: boolean;
  choosing?: boolean;
};

export default function Board({ sentence, knownIndex = [], pressedKey, setWon }: BoardProps) {
  const [letterDatas, setLetterDatas] = useState<LetterData[]>([]);
  const [missGuessCount, setMissGuessCount] = useState<number>(0);
  //   const [choosenIndex, setChosenIndex] = useState<number>();

  useEffect(() => {
    let choosingIndex = letterDatas.findIndex((data) => data.choosing);
    if (choosingIndex == -1) return; //Not chosing anything

    const pressedKeyFirstCharacter = pressedKey.charAt(0);
    if (letterDatas[choosingIndex].letter == pressedKeyFirstCharacter) {
      //Un-choose and choose next letter
      const letterDatas_ = letterDatas.map((r) => r); //clone
      letterDatas_[choosingIndex] = {
        ...letterDatas_[choosingIndex],
        choosing: false,
        showLetter: true,
      };

      do {
        choosingIndex++;
        if (choosingIndex >= letterDatas_.length) break;
        console.log(choosingIndex);
        console.log(letterDatas_[choosingIndex]);
      } while (letterDatas_[choosingIndex].showLetter || letterDatas_[choosingIndex].code < 0);

      if (choosingIndex != letterDatas_.length) {
        letterDatas_[choosingIndex] = { ...letterDatas_[choosingIndex], choosing: true };
      }
      //CheckWin:
      const won = letterDatas_.every((data) => data.code < 0 || data.showLetter === true);
      if (won) {
        setWon(won);
        setMissGuessCount(0);
      }
      setLetterDatas(letterDatas_);
    } else {
      console.log("YOU MISSED GUESS");
      setMissGuessCount(missGuessCount + 1);
    }

    //Check Win:
    // setLetterDatas(
    //   letterDatas.map((data, index) => (!data.choosing ? data : { ...data, showLetter: true }))
    // );
  }, [pressedKey]);

  /* set-up leterData */
  // console.log("known" + knownIndex);

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
              showLetter: getCodeOfChar(char) < 0 || knownIndex.includes(index),
              showCode: true,
              choosing: false,
            }));
    console.log(lettersDatas_);
    // console.log(splitToLines(lettersDatas_));
    setLetterDatas(lettersDatas_);
  }, [sentence, knownIndex]);

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

  function getCodeOfChar(c: string): number {
    if (c.length != 1) return -1;
    return charMap.get(c) ?? -1;
  }

  function toggleLetterBox(lineIndex: number, letterIndex: number) {
    //if not A->Z, return
    // if (letterDatas[lineCutPoints[lineIndex + letterIndex]].showLetter == true) return;
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
      <div className="flex justify-center my-4">Bạn đã đoán sai: {missGuessCount} lần</div>
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

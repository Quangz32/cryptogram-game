import { useEffect } from "react";
import KeyboardButton from "./KeyboardButton";

interface keyboardProps {
  onKeyPress: (key: string) => void;
}

export default function Keyboard({ onKeyPress }: keyboardProps) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  // Danh sách các phím hợp lệ (chuyển thành chữ thường để so sánh)
  const validKeys = keys.flat().map((key) => key.toLowerCase());

  // Thêm sự kiện keydown khi component được mount
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase(); // Chuyển phím thành chữ hoa để khớp với keys
      console.log(key);
      if (validKeys.includes(key.toLowerCase())) {
        onKeyPress(key + Math.random()); // Gọi onKeyPress với phím hợp lệ
      }
    };

    // Thêm sự kiện keydown vào document
    document.addEventListener("keydown", handleKeyDown);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress, validKeys]); // Phụ thuộc vào onKeyPress và validKeys

  return (
    <div className="flex flex-col">
      {keys.map((row, index) => (
        <div key={index} className="flex justify-center mt-2">
          {row.map((item, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                onKeyPress(item + Math.random());
              }}
            >
              <KeyboardButton letter={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

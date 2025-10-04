import KeyboardButton from "./KeyboardButton";

export default function Keyboard() {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  return (
    <div className="flex flex-col">
      {keys.map((row, index) => (
        <div key={index} className="flex justify-center mt-2">
          {row.map((item, index) => (
            <div key={index} className="">
              <KeyboardButton letter={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

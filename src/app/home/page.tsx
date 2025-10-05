import { HouseIcon, SettingsIcon } from "lucide-react";
import "../stylesheets/layout.css";

export default function Home() {
  return (
    <div className="h-full">
      {/* Header */}
      <div
        className="flex justify-between items-center pt-2 pb-5 px-3 h-1/12
       bg-[white] zigzag-border"
      >
        <HouseIcon color="#A77885" />
        <div className="flex flex-col">
          <span className="text-[#d1c0c3] text-xl font-bold">Cryptogram By Quangz</span>
        </div>
        <SettingsIcon color="#A77885" />
      </div>

      {/* Text */}
      <div className="h-11/12 bg-amber-400"></div>
    </div>
  );
}

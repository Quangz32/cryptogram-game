interface KeyboardButtonProps {
  letter: string;
}
export default function KeyboardButton({ letter }: KeyboardButtonProps) {
  return (
    <div
      className="flex justify-center h-12 w-16 mx-1 py-1 px-4 text-3xl rounded-md 
    text-[#66496D] bg-[white] font-[550] shadow-md"
    >
      {letter}
    </div>
  );
}

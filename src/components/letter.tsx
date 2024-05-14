import { cn } from "@/lib/utils";
import { Hexagon } from "lucide-react";
import React from "react";

interface LetterButton {
  isMid?: boolean;
  letter: string;
  onLetterClicked: (word: string) => void;
}

export default function Letter({
  isMid,
  letter,
  onLetterClicked,
}: LetterButton) {
  return (
    <div
      className="cursor-pointer hover:scale-105 relative w-fit"
      onClick={() => onLetterClicked(letter)}
    >
      <Hexagon
        className={cn(
          "rotate-90 h-28 w-28 stroke-0",
          isMid ? "fill-yellow-400" : "fill-gray-200"
        )}
      />
      <div className="absolute top-10 left-11 text-3xl font-semibold uppercase">
        {letter}
      </div>
    </div>
  );
}

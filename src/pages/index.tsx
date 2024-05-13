import LetterButtons from "@/components/letter-button";
import { useState } from "react";
const answers = [
  "adak",
  "akak",
  "blok",
  "kaba",
  "kaka",
  "kala",
  "koka",
  "kola",
  "laka",
  "odak",
  "okka",
  "ablak",
  "akala",
  "alaka",
  "alkol",
  "bakla",
  "dalak",
  "dolak",
  "kabak",
  "kablo",
  "kakao",
  "kalak",
  "koala",
  "kokak",
  "lokal",
  "akbaba",
  "alakok",
  "bakkal",
  "kabala",
  "kalaba",
  "laakal",
  "laklak",
  "akbakla",
  "kabalak",
  "kakalak",
  "laklaka",
];

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="w-[400px]">
        <input className="text-3xl" readOnly value={value} />
        <LetterButtons onChangeWord={(word) => setValue(word)} />
      </div>
    </div>
  );
}

import LetterButtons from "@/components/letter-button";
import Timer from "@/components/timer";
import { DataType } from "@/lib/types";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Play({ repo }: { repo: DataType }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(0);

  const handleCorrect = (isCorrect: boolean) => {
    if (isCorrect) {
      setTimer((prevTime) => prevTime + 1);
    } else {
      console.log("ds");
    }
  };

  return (
    <div className="w-[400px]">
      <Timer setState={timer} />
      <input className="text-3xl" readOnly value={value} />
      <LetterButtons
        answers={repo.correctAnswers}
        letters={repo.letters}
        middleLetter={repo.middleLetter}
        onChangeWord={(word) => setValue(word)}
        onCorrectAnswer={handleCorrect}
      />
    </div>
  );
}

export const getServerSideProps = (async (context: any) => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3003/${context.params.lang}`);
  const repo: DataType = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: DataType }>;

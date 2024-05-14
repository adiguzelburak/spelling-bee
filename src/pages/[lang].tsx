import LetterButtons from "@/components/letter-button";
import Timer from "@/components/timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { DataType } from "@/lib/types";
import { Gauge, WholeWord } from "lucide-react";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Play({ repo }: { repo: DataType }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(0);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const handleCorrect = (isCorrect: boolean) => {
    if (isCorrect) {
      setTimer((prevTime) => prevTime + 1);
    } else {
      console.log("ds");
    }
  };

  const handleChangePoint = () => {
    const getCorrectAnswers = localStorage.getItem("correctAnswers");
    if (getCorrectAnswers) {
      setTotalPoint(pointCalculator(JSON.parse(getCorrectAnswers)));
      setCorrectAnswers(JSON.parse(getCorrectAnswers));
    }
  };

  const pointCalculator = (answers: string[]) => {
    const letterLengths = answers.map((item) => item.length);
    const total = letterLengths.reduce((prev, current) => {
      return prev + current;
    });

    return total;
  };

  return (
    <div className="w-[400px]  px-4">
      <div className=" grid grid-cols-2 gap-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoint}</div>
            {/* <Progress value={25} className="mt-4" /> */}
          </CardContent>
        </Card>
        <Timer
          isAnsweredCorrect={timer}
          totalPoint={totalPoint}
          timeFinish={() => null}
        />
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Words</CardTitle>
            <WholeWord className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold grid grid-cols-6">
              {correctAnswers.map((word, index) => (
                <div key={index}>
                  {word}
                  {correctAnswers.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
      <input className="text-3xl" readOnly value={value} />
      <LetterButtons
        answers={repo.correctAnswers}
        letters={repo.letters}
        middleLetter={repo.middleLetter}
        onChangeWord={(word) => setValue(word)}
        onCorrectAnswer={handleCorrect}
        onChangePoint={handleChangePoint}
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

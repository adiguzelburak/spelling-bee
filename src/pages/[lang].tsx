import LetterButtons from "@/components/letter-button";
import Timer from "@/components/timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { DataType } from "@/lib/types";
import { Gauge, WholeWord } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Play({ repo }: { repo: DataType }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
    const getCorrectAnswers = localStorage.getItem(
      `correctAnswers-${router.query.lang}`
    );
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

  const handleFinishTime = () => {
    localStorage.setItem(`correctAnswers-${router.query.lang}`, "");
    setIsOpen(false);
    router.reload();
  };

  useEffect(() => {
    i18n.changeLanguage(router.query.lang?.toString());
  }, [router.query.lang, i18n]);

  return (
    <div className="w-[400px] px-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>{t("timeFinish")}</DialogTitle>
            <DialogDescription>
              {t("yourScore")} : {totalPoint}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleFinishTime}>{t("playAgain")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className=" grid grid-cols-3 gap-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("score")}</CardTitle>
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
          timeFinish={() => setIsOpen(true)}
        />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("language")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Link
              target="_parent"
              className="p-0"
              href={router.query.lang === "en" ? "/tr" : "/en"}
            >
              <Image
                src={router.query.lang === "en" ? "/us.png" : "/tr.png"}
                alt="flag"
                width={40}
                height={20}
                className="w-fit h-5 mt-2"
              />
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("words")}</CardTitle>
            <WholeWord className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold grid grid-cols-6">
              {correctAnswers.map((word, index) => (
                <div key={index}>{word} ,</div>
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

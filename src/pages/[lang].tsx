import LetterButtons from "@/components/letter-button";
import MyHead from "@/components/myhead";
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
import { Gauge, LucideLinkedin, WholeWord } from "lucide-react";
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
    <div className="w-[400px] px-4 mx-auto lg:mt-8 mt-2">
      <MyHead />
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
      <div className=" grid grid-cols-3 gap-3">
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
                className="w-fit h-5 mt-2 rounded-sm"
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
            <div className="text-base font-bold flex items-center w-[300px] overflow-y-auto">
              {correctAnswers.map((word, index) => (
                <div key={index}>{word},</div>
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

      <div>
        <div className="flex items-center justify-center gap-6 my-8">
          <Link href="https://www.linkedin.com/in/adiguzelburak/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-8 h-8 fill-blue-500"
            >
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
          </Link>
          <Link href="https://x.com/adgzelburak">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </Link>
          <Link href="https://github.com/adiguzelburak">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              className="w-8 h-8"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </Link>
          <Link href="mailto:adiguzelburak@icloud.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8 fill-black"
            >
              <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
          </Link>
        </div>
        <div className="bg-black hover:bg-green-500 transition-colors duration-300 text-white h-20 text-2xl rounded-lg font-mono p-2 text-center">
          <div>{t("contributeProject")}</div>
          <div className="text-sm underline flex items-center justify-around mt-3">
            <Link href="https://github.com/adiguzelburak/spelling-bee">
              Frontend
            </Link>
            <Link href="https://github.com/adiguzelburak/spelling-bee-be">
              Backend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = (async (context: any) => {
  // Fetch data from external API
  const res = await fetch(
    `https://spelling-bee-be-0accb579b523.herokuapp.com/${context.params.lang}`
  );
  const repo: DataType = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: DataType }>;

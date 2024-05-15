import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import Letter from "./letter";
import { Button } from "./ui/button";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface ButtonProps {
  middleLetter: string;
  letters: string;
  answers: string[];
  onChangeWord: (word: string) => void;
  onCorrectAnswer: (isCorrect: boolean) => void;
  onChangePoint: (point: number) => void;
}

export default function LetterButtons({
  middleLetter,
  letters,
  answers,
  onChangeWord,
  onCorrectAnswer,
  onChangePoint,
}: ButtonProps) {
  const [words, setWords] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [middleLetter, letters]);

  const shuffleLetters = (letters: string[]) => {
    let currentIndex = letters.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [letters[currentIndex], letters[randomIndex]] = [
        letters[randomIndex],
        letters[currentIndex],
      ];
    }
  };

  useEffect(() => {
    onChangeWord(value);
  }, [value, onChangeWord]);

  useEffect(() => {
    onChangePoint(totalPoint);
  }, [onChangePoint, totalPoint]);

  const updateWord = (letter: string) => {
    setValue((prevValue) => prevValue + letter);
  };

  const deleteLetter = () => {
    if (value.length > 0) {
      setValue((prevValue) => prevValue.slice(0, -1));
    }
  };

  const shuffle = () => {
    const splittedText = letters?.split("");
    const withoutMidLetter = splittedText.filter(
      (lett) => lett !== middleLetter
    );
    shuffleLetters(withoutMidLetter);
    setWords(withoutMidLetter);
  };

  const pointCalculator = (answer: string) => {
    const splittedAnswer = answer.split("");
    const totalPoint = splittedAnswer.length;

    return totalPoint;
  };

  const checkAnswer = () => {
    const answer = answers.find((correct) => correct == value);
    const getCorrectAnswers = localStorage.getItem(
      `correctAnswers-${router.query.lang}`
    );
    const answersToJSON = getCorrectAnswers
      ? JSON.parse(getCorrectAnswers)
      : [];
    if (!answersToJSON.includes(answer) && answer) {
      answersToJSON.push(answer);
      localStorage.setItem(
        `correctAnswers-${router.query.lang}`,
        JSON.stringify(answersToJSON)
      );
      const point = pointCalculator(answer);
      setTotalPoint((prev) => prev + point);
      setValue("");
      toast({
        title: `Correct Added +${point} Point`,
      });
    } else {
      setValue("");
      toast({
        title: "This word already added.",
      });
    }
    if (answer) {
      onCorrectAnswer(true);
    } else {
      onCorrectAnswer(false);
      setValue("");
      toast({
        title: "Word is not found",
      });
    }
  };

  return (
    <div>
      <div className="relative h-[400px] w-[350px]">
        <Toaster />
        <div className="absolute top-0 left-32">
          <Letter letter={words[0]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-14 left-10">
          <Letter letter={words[1]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-28 left-32">
          <Letter isMid letter={middleLetter} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-14 left-[216px]">
          <Letter letter={words[2]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-40 left-10">
          <Letter letter={words[3]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-40 left-[216px]">
          <Letter letter={words[4]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute top-[216px] left-32">
          <Letter letter={words[5]} onLetterClicked={updateWord} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex items-center space-x-3">
            <Button onClick={deleteLetter}>{t("delete")}</Button>
            <Button onClick={shuffle} size="icon">
              <Shuffle className="w-[1.2rem] h-[1.2rem]" />
            </Button>
            <Button onClick={checkAnswer}>{t("enter")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

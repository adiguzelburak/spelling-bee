import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import Letter from "./letter";
import { Button } from "./ui/button";

interface ButtonProps {
  middleLetter: string;
  letters: string;
  answers: string[];
  onChangeWord: (word: string) => void;
  onCorrectAnswer: (isCorrect: boolean) => void;
}

export default function LetterButtons({
  middleLetter,
  letters,
  answers,
  onChangeWord,
  onCorrectAnswer,
}: ButtonProps) {
  const [words, setWords] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

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

  const checkAnswer = () => {
    const answer = answers.find((correct) => correct == value);
    const getCorrectAnswers = localStorage.getItem("correctAnswers");
    const answersToJSON = getCorrectAnswers
      ? JSON.parse(getCorrectAnswers)
      : [];
    if (!answersToJSON.includes(answer)) {
      answersToJSON.push(answer);
      localStorage.setItem("correctAnswers", JSON.stringify(answersToJSON));
    } else {
      console.log("already added");
    }
    answer ? onCorrectAnswer(true) : onCorrectAnswer(false);
  };

  return (
    <div>
      <div className="relative h-[400px] w-[350px]">
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
            <Button onClick={deleteLetter}>Delete</Button>
            <Button onClick={shuffle} size="icon">
              <Shuffle className="w-[1.2rem] h-[1.2rem]" />
            </Button>
            <Button onClick={checkAnswer}>Enter</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

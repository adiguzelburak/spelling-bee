import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Timer({
  isAnsweredCorrect,
  totalPoint,
  timeFinish,
}: {
  isAnsweredCorrect: number;
  totalPoint: number;
  timeFinish: () => void;
}) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (isAnsweredCorrect !== 0) {
      setTime((prevTime) => prevTime + 15);
    }
  }, [isAnsweredCorrect]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalPoint]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Time</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {`${Math.floor(time / 60)}`.padStart(2, "0")}:
          {`${time % 60}`.padStart(2, "0")}
        </div>
      </CardContent>
    </Card>
  );
}

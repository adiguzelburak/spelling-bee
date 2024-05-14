import { useEffect, useState } from "react";

export default function Timer({ setState }: { setState: number }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (setState !== 0) {
      setTime((prevTime) => prevTime + 15);
    }
  }, [setState]);

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
  }, []);

  return (
    <div className="App">
      <p>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
      </p>
    </div>
  );
}

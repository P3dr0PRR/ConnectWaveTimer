import { differenceInSeconds } from "date-fns";
import { useEffect, useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    markCicleAsFinished,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmountValue = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmountValue).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          markCicleAsFinished();
          setAmountSecondsPassed(0);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [activeCycle, totalSeconds, markCicleAsFinished, setAmountSecondsPassed]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    } else {
      document.title = "ConnectWave Timer";
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <section className="font-mono text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-white flex gap-4">
      <span className="bg-gray-700 rounded-md p-2">{minutes[0]}</span>
      <span className="bg-gray-700 rounded-md p-2">{minutes[1]}</span>
      <span className="text-emerald-500">:</span>
      <span className="bg-gray-700 rounded-md p-2">{seconds[0]}</span>
      <span className="bg-gray-700 rounded-md p-2">{seconds[1]}</span>
    </section>
  );
}

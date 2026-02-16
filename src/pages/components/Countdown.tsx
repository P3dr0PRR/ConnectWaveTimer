export function Countdown() {

      const { task, minutesAmount } = watch();

  const isSubmitDisabled = !task || !minutesAmount;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmountValue = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmountValue).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');
  
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
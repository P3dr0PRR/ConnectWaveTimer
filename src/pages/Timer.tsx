import { Play, TimerOff} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import { clearInterval } from 'node:timers';
import { Countdown } from './Countdown';
import { NewCycleForm } from './NewCycleForm';

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Timer() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
     interval = setInterval(() => {
      const secondsPassed = differenceInSeconds(new Date(), activeCycle.startDate);
      const totalSeconds = activeCycle.minutesAmount * 60;
      
      if (secondsPassed >= totalSeconds) {
 setCycles((state) =>
        state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
            clearInterval(interval);
          } else {
            return cycle;
          }
        }),
      );
      setActiveCycleId(null);
      setAmountSecondsPassed(0);
    } else {
      setAmountSecondsPassed(secondsPassed);
    }
  },1000)
  }

    return () => {
clearInterval(interval);
    }
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      }),
    );
    setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }


  const { task, minutesAmount } = watch();

  const isSubmitDisabled = !task || !minutesAmount;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmountValue = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmountValue).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      const formattedSeconds = String(seconds).padStart(2, '0');
      document.title = `${activeCycle.task} - ${minutes}:${formattedSeconds}`;
      return;
    }
    document.title = 'ConnectWave Timer';
  }, [minutes, seconds, activeCycle]);


  return (
    <section className="w-full h-full">
      <form className="flex flex-col items-center justify-between py-2 h-full" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm />

        <Countdown />

        {activeCycle ? (
          <button
            className="flex items-center justify-center gap-2 w-full p-2 rounded-md bg-red-500 text-white enabled:hover:bg-red-600"
            type="button"
            onClick={handleInterruptCurrentCycle}
            >
            <TimerOff /> Interromper
            </button>
        ) : (
          <button
          disabled={isSubmitDisabled}
          className="flex items-center justify-center gap-2 w-full p-2 rounded-md bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-emerald-600"
          type="submit"
        >
          <Play /> Começar
        </button>
        )}
      </form>
    </section>
  );
}
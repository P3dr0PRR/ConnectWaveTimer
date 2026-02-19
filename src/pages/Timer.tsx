import { Play, TimerOff } from 'lucide-react';
import { createContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';

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

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCicleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Timer() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCicleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        }
        return cycle;
      }),
    );
    setActiveCycleId(null);
  }

  const { task, minutesAmount } = watch();
  const isSubmitDisabled = !task || !minutesAmount;

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
  }



  return (
    <section className="w-full h-full">
      <form
        className="flex flex-col items-center justify-between py-2 h-full"
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCicleAsFinished }}>
          <NewCycleForm register={register} />
          <Countdown />
        </CyclesContext.Provider>

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
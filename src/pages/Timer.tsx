import { Play, TimerOff } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../contexts/CyclesContext";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

export function Timer() {
  const { activeCycle, createNewCicle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCicle(data);
    reset();
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle();
  }

  const { task, minutesAmount } = watch();
  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <section className="w-full h-full">
      <form
        className="flex flex-col items-center justify-between py-2 h-full"
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <NewCycleForm register={register} />
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

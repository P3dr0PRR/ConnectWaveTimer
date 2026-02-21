import { useContext } from "react";
import { UseFormRegister } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface NewCycleFormProps {
  register: UseFormRegister<NewCycleFormData>;
}

export function NewCycleForm({ register }: NewCycleFormProps) {
  const { activeCycle } = useContext(CyclesContext);

  return (
    <section className="flex flex-col md:flex-row md:flex-wrap gap-2 items-center justify-center w-full text-white text-lg">
      <label htmlFor="task" className="text-center shrink-0">
        Vou trabalhar em
      </label>

      <input
        id="taskInput"
        list="task-suggestions"
        type="text"
        placeholder="Nome..."
        disabled={!!activeCycle}
        className="w-full md:flex-1 md:min-w-0 text-center text-emerald-500 text-2xl bg-transparent pb-2 border-b-2 border-emerald-700 box-shadow-none focus:outline-none focus:ring-0 focus:border-emerald-500"
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto Front" />
        <option value="Projeto Portifólio" />
        <option value="Reunião" />
      </datalist>

      <label htmlFor="minutesAmountInput" className="text-center shrink-0">
        Durante
      </label>
      <input
        id="minutesAmountInput"
        max={60}
        type="number"
        placeholder="-  00 +"
        disabled={!!activeCycle}
        className="w-full md:flex-1 md:min-w-0 text-center text-emerald-500 text-2xl bg-transparent pb-2 border-b-2 border-emerald-700 box-shadow-none focus:outline-none focus:ring-0 focus:border-emerald-500"
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </section>
  );
}

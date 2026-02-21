import { createContext, useState, ReactNode } from "react";

interface CreateCycleData {
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
  cycles: Cycle[];
  markCicleAsFinished: () => void;
  createNewCicle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
  amountSecondsPassed: number;
  setAmountSecondsPassed: (amount: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContentProviderProps {
  children: ReactNode;
}

export function CyclesContentProvider({
  children,
}: CyclesContentProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function createNewCicle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
  }

  function interruptCurrentCycle() {
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        markCicleAsFinished,
        createNewCicle,
        interruptCurrentCycle,
        amountSecondsPassed,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

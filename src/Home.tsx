import { createContext, useContext, useState } from 'react';

const CyclesContext = createContext({} as any);

function NewCycleForm() {

  const { activeCycle, setActiveCycle } = useContext(CyclesContext);

  return <div><h1>NewCycleForm: {activeCycle}</h1>
  <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setActiveCycle(2)}}>Change Cycle</button>
  </div>;
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext);
  return <h1>Countdown: {activeCycle}</h1>;
}

export function Home() {

    const [activeCycle, setActiveCycle] = useState(0);

  return (

    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <NewCycleForm  />
        <Countdown />
    </div>
    </CyclesContext.Provider>
  );
}

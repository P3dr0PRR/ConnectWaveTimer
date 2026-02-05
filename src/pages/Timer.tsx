import { Play } from 'lucide-react';

export function Timer() {
  return (
<div className="w-full h-full">
      <form className="flex flex-col items-center justify-between py-2 h-full">

        <div className='flex flex-col md:flex-row md:flex-wrap gap-2 items-center justify-center w-full text-white text-lg'>         
          <label htmlFor="task" className='text-center shrink-0'>
           Vou trabalhar em
          </label>


          <input
            id="task"
            list='task-suggestions'
            type="text"
            placeholder="Nome..."
            className='w-full md:flex-1 md:min-w-0 text-center text-emerald-500 text-2xl bg-transparent pb-2 border-b-2 border-emerald-700 box-shadow-none focus:outline-none focus:ring-0 focus:border-emerald-500'
          />   
          <datalist id="task-suggestions">
            <option value="Projeto Front" />
            <option value="Projeto Portifólio" />
            <option value="Reunião" />
          </datalist>       
          <label htmlFor="minutesAmount" className='text-center shrink-0'>Durante</label>
          <input id="minutesAmount" max={60} type="number" placeholder="-  00 +" className='w-full md:flex-1 md:min-w-0 text-center text-emerald-500 text-2xl bg-transparent pb-2 border-b-2 border-emerald-700 box-shadow-none focus:outline-none focus:ring-0 focus:border-emerald-500'/>
            <span className=''>minutos.</span>        
        </div>

        <div className='font-mono text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-white flex gap-4 '>
          <span className='bg-gray-700 rounded-md'>0</span>
          <span className='bg-gray-700 rounded-md'>0</span>
          <span className='text-emerald-500'>:</span>
          <span className='bg-gray-700 rounded-md'>0</span>
          <span className='bg-gray-700 rounded-md'>0</span>
        </div>

       <button
  disabled
  className="
    flex items-center justify-center gap-2 w-full p-2 rounded-md
    bg-emerald-500 text-white
    disabled:opacity-50 disabled:cursor-not-allowed
    enabled:hover:bg-emerald-600
  "
  type="submit"
>
  <Play /> Começar
</button>
      </form>
    </div>
  )
}
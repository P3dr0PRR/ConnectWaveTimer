import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function DefaultLayout() {
  return (
    <div className="min-h-screen bg-black p-4 md:p-12 flex">
      <div className="bg-slate-800 flex-1 p-4 pb-6 flex flex-col">
        <Header />
        <div className="px-4 md:px-24 py-6 flex-1 flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
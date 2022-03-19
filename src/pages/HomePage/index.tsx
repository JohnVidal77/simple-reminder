import { Calendar } from '../../components/Calendar';
import { RemidersList } from '../../components/RemidersList';

export function HomePage() {
  return (
    <div className="w-screen md:overflow-hidden max-h-screen h-screen grid grid-cols-1 md:grid-cols-6 grid-rows-[56px_max-content] md:grid-rows-home-page gap-4">
      <header className="md:col-span-6 flex justify-center items-center text-slate-800 border-b-2 border-slate-200">
        Calendar
      </header>
      <main className="md:col-span-4">
        <Calendar />
      </main>
      <aside className="h-full md:col-span-2">
        <RemidersList />
      </aside>
    </div>
  );
}

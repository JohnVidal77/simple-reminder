import { Calendar } from '../../components/Calendar';

export function HomePage() {
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-4 grid-rows-[56px_max-content] md:grid-rows-[56px_1fr] gap-4">
      <header className="md:col-span-4">NAVBAR</header>
      <main className="md:col-span-3">
        <Calendar />
      </main>
      <aside>REMIDERS</aside>
    </div>
  );
}

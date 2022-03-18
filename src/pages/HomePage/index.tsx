export function HomePage() {
  return (
    <div className="w-screen h-screen grid grid-cols-4 grid-rows-[56px_1fr] gap-4">
      <header className="col-span-4">NAVBAR</header>
      <main className="col-span-3">CALENDAR</main>
      <aside>REMIDERS</aside>
    </div>
  );
}

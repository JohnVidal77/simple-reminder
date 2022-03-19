const COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
];

export const ColorSelector = () => {
  return (
    <fieldset className="mb-4">
      <legend className="text-slate-500 mb-2">Pick a color</legend>
      <div className="flex flex-wrap gap-2 justify-start md:justify-between">
        {COLORS.map(color => (
          <label
            className={`block w-6 h-6 rounded-md ${color}`}
            htmlFor={color}
          >
            <input className="hidden" type="radio" id={color} />
          </label>
        ))}
      </div>
    </fieldset>
  );
};

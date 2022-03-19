import React from 'react';
import { MdCheck } from 'react-icons/md';

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

interface IProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorSelector = ({ selectedColor, setSelectedColor }: IProps) => {
  return (
    <fieldset className="mb-4">
      <legend className="text-slate-500 mb-2">Pick a color</legend>
      <div className="flex flex-wrap gap-2 justify-start md:justify-between">
        {COLORS.map(color => (
          <label
            className={`flex justify-center items-center cursor-pointer hover:brightness-90 duration-200 w-6 h-6 rounded-md ${color}`}
            htmlFor={color}
          >
            {selectedColor === color && (
              <MdCheck className="w-4 h-4 text-white" />
            )}
            <input
              className="hidden"
              onChange={() => setSelectedColor(color)}
              type="radio"
              name="color"
              id={color}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
};

import React, { InputHTMLAttributes, useRef, KeyboardEvent } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdErrorOutline } from 'react-icons/md';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: (value: KeyboardEvent<HTMLInputElement>) => string;
}

export const Input = ({
  label,
  error,
  mask,
  id,
  icon: Icon,
  ...rest
}: IProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputMask = (value: KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current && mask) {
      inputRef.current.value = mask(value);
    }
  };

  return (
    <div className="w-full mb-2">
      <div
        className={`box-border flex gap-2 items-center justify-between w-full h-14 px-4 duration-200 border  focus-within:border-purple-600 focus-within:border-2 bg-white rounded-md ${
          error ? 'border-red-500' : 'border-slate-500 text-slate-600'
        }`}
      >
        <div>{Icon && <Icon className="" size={20} />}</div>
        <div className="relative flex-1 h-full">
          <input
            className="w-full h-full bg-transparent outline-none placeholder:invisible"
            placeholder={label}
            onKeyUp={o => handleInputMask(o)}
            ref={inputRef}
            id={id}
            type="text"
            {...rest}
          />
          <label
            className={`absolute max-w-full text-left top-[0.9rem] bg-white px-1 left-2 line-clamp-1 ${
              error ? 'text-red-600' : 'text-slate-400'
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <div className="w-5">
          {error && <MdErrorOutline className=" text-red-500" size={20} />}
        </div>
      </div>
      {error && (
        <span className="flex items-center ml-4 text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

/* eslint-disable react/jsx-no-useless-fragment */
import { useImperativeHandle, useState, forwardRef } from 'react';
import { MdOutlineClose } from 'react-icons/md';

import { IconButton } from '../IconButton';

interface IProps {
  title: string;
  children: JSX.Element;
}

export interface IModalRef {
  toggle: () => void;
}

export const Modal = forwardRef<IModalRef, IProps>(
  ({ children, title }, ref) => {
    const [isActive, setIsActive] = useState(false);

    useImperativeHandle(ref, () => ({
      toggle: () => {
        setIsActive(value => !value);
      },
    }));

    return isActive ? (
      <div className="absolute top-0 left-0 right-0 w-screen h-screen z-10 backdrop-blur-sm flex justify-center items-center">
        <button
          onClick={() => setIsActive(false)}
          type="button"
          aria-label="Close modal"
          className="fixed top-0 left-0 right-0 w-screen h-screen bg-black opacity-50"
        />
        <div className="relative p-4 w-screen h-screen md:w-2/4 md:h-2/3 bg-white rounded-md z-20">
          <header className="flex justify-between text-slate-800">
            <h1 className="text-xl font-medium">{title}</h1>
            <IconButton
              icon={MdOutlineClose}
              onClick={() => setIsActive(false)}
            />
          </header>
          {children}
        </div>
      </div>
    ) : (
      <></>
    );
  },
);

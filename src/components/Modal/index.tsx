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
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-screen h-full backdrop-blur-sm">
        <button
          onClick={() => setIsActive(false)}
          type="button"
          aria-label="Close modal"
          className="fixed top-0 left-0 right-0 w-screen h-screen bg-black opacity-50"
        />
        <div className="relative z-20 w-screen h-screen max-w-lg p-4 bg-white md:rounded-md md:w-3/4 md:h-2/3">
          <header className="flex justify-between mb-6 text-slate-800">
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

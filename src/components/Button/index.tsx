import { ButtonHTMLAttributes } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  modileFixedBottom?: boolean;
  typeStyle?: 'primary' | 'primary-border' | 'basic';
  aditionalClasses?: string;
}

const BUTTON_STYLE = {
  primary: 'bg-pink-600 border-pink-600 text-white',
  'primary-border': 'bg-white border-pink-600 text-pink-600',
  basic: 'bg-white border-white text-slate-800',
};

const DISABLED_STYLE =
  'disabled:hover:brightness-100 disabled:cursor-auto disabled:bg-gray-400 disabled:border-gray-400';
const NORMAL_STYLE = 'h-9 rounded-md';
const MOBILE_FIXED_BOTTOM_STYLE =
  'fixed h-14 bottom-0 left-0 right-0 md:relative md:h-9 md:rounded-md';

export const Button: React.FC<IProps> = ({
  children,
  isLoading,
  modileFixedBottom,
  typeStyle = 'primary',
  aditionalClasses,
  ...rest
}: IProps) => {
  return (
    <button
      className={`flex items-center justify-center w-full duration-200 border-2 cursor-pointer hover:brightness-90 ${aditionalClasses} ${DISABLED_STYLE} ${
        BUTTON_STYLE[typeStyle]
      } ${modileFixedBottom ? MOBILE_FIXED_BOTTOM_STYLE : NORMAL_STYLE}`}
      type="button"
      {...rest}
    >
      {!isLoading && children}
      {isLoading && <CgSpinner className="animate-spin" size="1.5rem" />}
    </button>
  );
};

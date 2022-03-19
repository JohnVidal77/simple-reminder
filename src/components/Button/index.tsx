import { ButtonHTMLAttributes } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  typeStyle?: 'primary' | 'primary-border' | 'basic';
  aditionalClasses?: string;
}

const buttonStyle = {
  primary: 'bg-pink-600 border-pink-600 text-white',
  'primary-border': 'bg-white border-pink-600 text-pink-600',
  basic: 'bg-white border-white text-slate-800',
};

const disabledButton =
  'disabled:hover:brightness-100 disabled:cursor-auto disabled:bg-gray-400 disabled:border-gray-400';

export const Button: React.FC<IProps> = ({
  children,
  isLoading,
  typeStyle = 'primary',
  aditionalClasses,
  ...rest
}: IProps) => {
  return (
    <button
      className={`flex items-center justify-center w-full h-9 duration-200 border-2 rounded-md cursor-pointer hover:brightness-90 ${aditionalClasses} ${disabledButton} ${buttonStyle[typeStyle]}`}
      type="button"
      {...rest}
    >
      {!isLoading && children}
      {isLoading && <CgSpinner className="animate-spin" size="1.5rem" />}
    </button>
  );
};

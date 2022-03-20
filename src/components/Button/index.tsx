import { ButtonHTMLAttributes } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
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

export const Button: React.FC<IProps> = ({
  children,
  isLoading,

  typeStyle = 'primary',
  aditionalClasses,
  ...rest
}: IProps) => {
  return (
    <button
      className={`flex items-center justify-center w-full duration-200 border-2 cursor-pointer hover:brightness-90 h-9 rounded-md ${aditionalClasses} ${DISABLED_STYLE} ${BUTTON_STYLE[typeStyle]} `}
      type="button"
      {...rest}
    >
      {!isLoading && children}

      {isLoading && (
        <CgSpinner
          data-testid="button-loading"
          className="animate-spin"
          size="1.5rem"
        />
      )}
    </button>
  );
};

import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
  size?: string;
}

export const IconButton: React.FC<IProps> = ({
  icon: Icon,
  size = '2rem',
  ...rest
}) => (
  <button
    className="duration-200 bg-transparent border-none text-slate-700 hover:cursor-pointer hover:brightness-90"
    type="button"
    {...rest}
  >
    <Icon size={size} />
  </button>
);

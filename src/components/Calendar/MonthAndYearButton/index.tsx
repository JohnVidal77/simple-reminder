interface IProps {
  value: string;
  handleClick: () => void;
  disabled: boolean;
  isSelected: boolean;
}

export const MonthAndYearButton = ({
  value,
  disabled,
  isSelected,
  handleClick,
}: IProps) => {
  return (
    <li className="w-1/3 h-16 p-1" key={value}>
      <button
        className={`text-center duration-200 hover:brightness-90 w-full h-full rounded-md border border-slate-200 disabled:brightness-90 ${
          isSelected ? 'bg-pink-600 text-white' : 'bg-white text-slate-600'
        }`}
        type="button"
        onClick={() => handleClick()}
        disabled={disabled}
      >
        {value}
      </button>
    </li>
  );
};

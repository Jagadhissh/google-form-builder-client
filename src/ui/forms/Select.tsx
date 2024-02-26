import { InfoCircledIcon } from "@radix-ui/react-icons";

interface SelectFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
  value?: string;
  error?: string | undefined;
}

const SelectField = ({ error, label, options, ...rest }: SelectFieldProps) => {
  return (
    <div className="relative">
      <select
        {...rest}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>

      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {label}
      </label>
      {error && (
        <span className=" text-xs text-destructive inline-flex items-center gap-1  ">
          <InfoCircledIcon className="  " />
          {error}
        </span>
      )}
    </div>
  );
};
export default SelectField;

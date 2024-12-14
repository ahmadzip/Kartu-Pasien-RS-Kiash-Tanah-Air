import React from "react";
import { Tooltip } from "react-tooltip";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  tooltip?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  tooltip,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {tooltip && (
          <label>
            <span
              data-tooltip-id={`${name}-tooltip`}
              data-tooltip-content={tooltip}
              className="ml-2 text-red-500 cursor-pointer"
            >
              !
            </span>
            <Tooltip id={`${name}-tooltip`} />
          </label>
        )}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-[#222E3C] dark:text-gray-300"
      />
    </div>
  );
};

export default InputField;

import React from "react";

type Props = {
  value: string,
  items: string[],
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

const Selector: React.FC<Props> = ({ value, onChange, items }) => {
  return (
    <div>
      <select
        className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;

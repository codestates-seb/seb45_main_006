import { useState } from "react";

interface DropdownProps {
    label: string;
    options: string[];
    selectedOption: string;
    onSelectOption: (option: string) => void;
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedOption, onSelectOption, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        onSelectOption(option);
        setIsOpen(false);
    };
    return (
        <div className="m-10">
            <label className="mb-10 block">{label}</label>
            <div className={`relative rounded-3xl bg-white shadow-sm ${isOpen ? "z-10" : ""}`}>
                <button
                    className={`w-full rounded-md bg-white p-6 text-left ${
                        disabled ? "z-10 bg-gray-400 text-gray-700" : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={toggleDropdown}
                    disabled={disabled}
                >
                    {selectedOption}
                </button>

                <ul
                    className={`absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white py-1 shadow-lg ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    {options.map((option, index) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`relative cursor-pointer select-none px-4 py-2 ${
                                selectedOption === option ? "bg-indigo-100 text-indigo-600" : "text-gray-900"
                            }`}
                            id={`listbox-option-${index}`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;

import { useState } from "react";
import ArrowUp from "@assets/arrowUp.png";

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
        console.log("11111", option);
    };

    // const handleBlur = () => {
    //     setIsOpen(false);
    // };
    console.log(selectedOption);
    return (
        <div className="font-gangwon">
            <div className="m-10">
                <label className="mb-10 block">{label}</label>
                <div
                    className={`relative rounded-md bg-white p-2 shadow-md ${
                        isOpen ? "z-10 border-2 border-main" : ""
                    }`}
                >
                    <button
                        className={`flex w-full items-center justify-between rounded-md bg-white p-6 text-left ${
                            disabled ? "z-10 bg-gray-400 text-gray-700" : "bg-white hover:bg-gray-100"
                        }`}
                        onClick={toggleDropdown}
                        // onBlur={handleBlur}
                        disabled={disabled}
                    >
                        {selectedOption}
                        <img
                            src={ArrowUp}
                            className={`mr-10 w-16 transition-transform duration-200 ease-in-out ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
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
                                // onBlur={handleBlur}
                                className={`relative cursor-pointer select-none px-4 py-2 hover:bg-indigo-100/30 ${
                                    selectedOption === option ? "bg-indigo-100/70 text-indigo-600" : "text-gray-900"
                                }`}
                                id={`listbox-option-${index}`}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

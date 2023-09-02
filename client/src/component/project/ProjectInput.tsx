interface IProps {
    label: string;
    required?: boolean;
    placeholder: string;
    disabled?: boolean;
    maxlength?: number;
    name?: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProjectInput({
    label,
    required = false,
    placeholder,
    disabled = false,
    maxlength = 80,
    name,
    value = "",
    onChange,
}: IProps) {
    return (
        <div className="flex items-center justify-center">
            <label>
                {label}
                {required && "*"}
            </label>
            <input
                name={name}
                disabled={disabled}
                className="m-10 w-5/6 rounded-md"
                maxLength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            ></input>
        </div>
    );
}

export interface IInput {
    name?: string;
    type?: string;
    disabled?: boolean;
    placeholder: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minlength?: number;
    maxlength?: number;
    borderStyle?: string;
}

function Input({
    name,
    type = "text",
    placeholder,
    disabled = false,
    minlength = 2,
    maxlength = 20,
    value = "",
    onChange,
    borderStyle,
}: IInput) {
    return (
        <input
            name={name}
            type={type}
            disabled={disabled}
            autoComplete="new-password"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            minLength={minlength}
            maxLength={maxlength}
            className={`min-h-40 w-full rounded-md border-b-1 p-8 text-sm leading-tight ${
                borderStyle ? borderStyle : ""
            }`}
        />
    );
}

export default Input;

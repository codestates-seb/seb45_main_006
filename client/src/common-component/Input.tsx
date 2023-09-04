export interface IInput {
    name?: string;
    type?: string;
    disabled?: boolean;
    placeholder: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minlength?: number;
    maxlength?: number;
    lineColor?: string;
}

function Input({
    name,
    type = "text",
    placeholder,
    disabled = false,
    minlength = 2,
    maxlength = 20,
    value = "",
    lineColor,
    onChange,
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
            className={`w-full border-b-1 p-4 text-sm leading-tight outline-none ${
                lineColor ? lineColor : "border-borderline"
            }`}
        />
    );
}

export default Input;

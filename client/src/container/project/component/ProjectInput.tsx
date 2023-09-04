interface IProps {
    label: string;
    required?: boolean;
    placeholder: string;
    disabled?: boolean;
    minlength?: number;
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
    minlength = 2,
    maxlength = 20,
    name,
    value = "",
    onChange,
}: IProps) {
    return (
        <div className="my-10 flex w-11/12 flex-col items-center justify-center p-10">
            <label className="self-baseline">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                name={name}
                disabled={disabled}
                className="m-10 w-full rounded-md p-4 shadow-md"
                minLength={minlength}
                maxLength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            ></input>
        </div>
    );
}

export interface IInput {
    name?: string;
    type?: string;
    disabled?: boolean;
    placeholder: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
    onKeyDownHandler,
    borderStyle,
}: IInput) {
    return (
        <div className="font-gangwon">
            <input
                name={name}
                type={type}
                disabled={disabled}
                autoComplete="new-password"
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (onKeyDownHandler) {
                        onKeyDownHandler(e);
                    }
                }}
                placeholder={placeholder}
                minLength={minlength}
                maxLength={maxlength}
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className={`text-md min-h-40 w-full rounded-md border-b-2 p-8 leading-tight ${
                    borderStyle ? borderStyle : "outline-main"
                }`}
            />
        </div>
    );
}

export default Input;

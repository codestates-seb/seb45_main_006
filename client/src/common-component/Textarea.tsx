import Typography from "@component/Typography";

export interface ITextarea {
    placeholder?: string;
    disabled?: boolean;
    minlength?: number;
    maxlength?: number;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    borderStyle?: string;
}

function Textarea({
    placeholder = "",
    disabled = false,
    minlength = 2,
    maxlength = 1000,
    name,
    value = "",
    onChange,
    borderStyle,
}: ITextarea) {
    return (
        <div className="relative w-full">
            <textarea
                name={name}
                disabled={disabled}
                className={`min-h-40 w-full rounded-md border-b-1 p-8 text-sm leading-tight ${
                    borderStyle ? borderStyle : ""
                }`}
                minLength={minlength}
                maxLength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Typography
                type="Description"
                text={`${value.length} / ${maxlength}`}
                styles="absolute bottom-10 right-10"
            />
        </div>
    );
}

export default Textarea;

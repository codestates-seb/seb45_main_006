import Typography from "./Typography";

export interface ITextarea {
    type: "OUTLINED" | "FIELD";
    placeholder: string;
    disabled?: boolean;
    minlength?: number;
    maxlength?: number;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({
    type,
    placeholder,
    disabled = false,
    minlength = 2,
    maxlength = 1000,
    name,
    value = "",
    onChange,
}: ITextarea) {
    return (
        <div className="relative w-full">
            <textarea
                name={name}
                disabled={disabled}
                className={`h-100 w-full rounded-md p-4 ${
                    type === "OUTLINED" ? "border-1 border-borderline" : "shadow-md"
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

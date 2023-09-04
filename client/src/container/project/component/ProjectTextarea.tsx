import Textarea from "@component/Textarea";

interface IProps {
    label: string;
    required?: boolean;
    placeholder: string;
    disabled?: boolean;
    minlength?: number;
    maxlength?: number;
    name?: string;
    value?: string;
    onChange: (value: string) => void;
}

export default function ProjectTextarea({
    label,
    required = false,
    placeholder,
    disabled = false,
    minlength = 2,
    maxlength = 500,
    name,
    value = "",
    onChange,
}: IProps) {
    return (
        <div className="my-10 flex w-11/12 flex-col items-center justify-center p-10">
            <label className="self-start">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <Textarea
                type="FIELD"
                name={name}
                disabled={disabled}
                minlength={minlength}
                maxlength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

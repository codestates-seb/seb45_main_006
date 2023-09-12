import Typography from "@component/Typography";
import Input from "@component/Input";
import { IInput } from "@component/Input";

interface IBoardInput extends IInput {
    label: string;
    required?: boolean;
}

export default function BoardInput({
    label,
    required = false,
    placeholder,
    disabled = false,
    minlength = 0,
    maxlength = 20,
    name,
    value = "",
    onChange,
}: IBoardInput) {
    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text={`${label}`} type="Body" />
                {required && <Typography text="*" type="Body" color="text-warn" />}
            </div>
            <Input
                type="text"
                name={name}
                disabled={disabled}
                minlength={minlength}
                maxlength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
}

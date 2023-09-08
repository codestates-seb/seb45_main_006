import Textarea from "@component/Textarea";
import Typography from "@component/Typography";

import { ITextarea } from "@component/Textarea";

interface IBoardTextarea extends ITextarea {
    label: string;
    required?: boolean;
}

export default function BoardTextarea({
    label,
    required = false,
    placeholder,
    disabled = false,
    minlength = 2,
    maxlength = 1000,
    name,
    value = "",
    onChange,
}: IBoardTextarea) {
    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text={`${label}`} type="Body" />
                {required && <Typography text="*" type="Body" color="text-warn" />}
            </div>
            <Textarea
                name={name}
                disabled={disabled}
                minlength={minlength}
                maxlength={maxlength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                borderStyle="shadow-md"
            />
        </div>
    );
}

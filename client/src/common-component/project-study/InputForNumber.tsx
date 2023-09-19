import Typography from "@component/Typography";
import Input from "@component/Input";
import { IInput } from "@component/Input";

interface IBoardInput extends IInput {
    label: string;
    required?: boolean;
}

export default function InputForNumber({
    label,
    required = false,
    placeholder,
    disabled = false,
    name,
    value = "",
    onChange,
    borderStyle,
}: IBoardInput) {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value || !isNaN(Number.parseInt(e.currentTarget.value))) {
            onChange(e);
        }
    };

    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text={`${label}`} type="Body" />
                {required && <Typography text="*" type="Body" color="text-warn" />}
            </div>
            <Input
                type="number"
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeHandler(e)}
                borderStyle={borderStyle}
            />
        </div>
    );
}

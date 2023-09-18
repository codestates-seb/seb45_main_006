import { useEffect, useState } from "react";
import Typography from "@component/Typography";
import Input from "@component/Input";
import { IInput } from "@component/Input";

interface ISignInput extends IInput {
    label: string;
    description?: string;
    regex?: RegExp;
    onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SignInput({
    name,
    label,
    description,
    type,
    value,
    onChange,
    placeholder,
    regex,
    disabled = false,
    onKeyDownHandler,
}: ISignInput) {
    const [isNeededWarn, setIsNeededWarn] = useState<boolean>(false);

    useEffect(() => {
        if (regex && value && typeof value === "string" && !regex.test(value)) {
            setIsNeededWarn(true);
        } else {
            setIsNeededWarn(false);
        }
    }, [regex, value]);

    const font = "font-gangwon";

    return (
        <div className={`mb-8 flex w-full flex-col ${font}`}>
            <div className="mb-4 flex w-full items-center">
                <div className="min-w-88 p-4">
                    <Typography type="SmallLabel" text={label} styles="font-bold" />
                </div>
                <Input
                    name={name}
                    disabled={disabled}
                    type={type}
                    value={value}
                    onChange={onChange}
                    maxlength={100}
                    onKeyDownHandler={onKeyDownHandler}
                    placeholder={placeholder}
                    borderStyle={`flex-1 rounded-none outline-none focus:outline-none ${
                        isNeededWarn ? "border-warn" : ""
                    }`}
                />
            </div>
            {description && isNeededWarn ? (
                <Typography type="Description" text={description || ""} styles="ml-123" color="text-warn" />
            ) : null}
        </div>
    );
}

export default SignInput;

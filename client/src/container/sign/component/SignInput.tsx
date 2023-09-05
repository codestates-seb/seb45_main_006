import { useEffect, useState } from "react";
import Typography from "@component/Typography";
import Input from "@component/Input";
import { IInput } from "@component/Input";

interface ISignInput extends IInput {
    label: string;
    description?: string;
    regex?: RegExp;
}

function SignInput({ name, label, description, type, value, onChange, placeholder, regex }: ISignInput) {
    const [isNeededWarn, setIsNeededWarn] = useState<boolean>(false);

    useEffect(() => {
        if (value && regex && description && !regex.test(value)) {
            setIsNeededWarn(true);
        } else {
            setIsNeededWarn(false);
        }
    }, [description, regex, value]);

    return (
        <div className="mb-18 flex flex-col">
            <div className="mb-4 flex">
                <div className="w-120 p-4">
                    <Typography type="SmallLabel" text={label} styles="font-bold" />
                </div>
                <Input
                    name={name}
                    disabled={false}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    lineColor={isNeededWarn ? "border-warn focus:outline-none" : ""}
                />
            </div>
            {isNeededWarn ? (
                <Typography type="Description" text={description || ""} styles="ml-123" color="text-warn" />
            ) : null}
        </div>
    );
}

export default SignInput;

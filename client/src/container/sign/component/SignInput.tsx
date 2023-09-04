import Typography from "@component/Typography";
import { useEffect, useState } from "react";

interface IUnderlinedInput {
    id: string;
    type: string;
    value: string;
    placeholder: string;
    setValue: (s: string) => void;
    lineColor?: string;
}

interface ISignInput extends IUnderlinedInput {
    label: string;
    description?: string;
    regex?: RegExp;
}

export const UnderlinedInput = ({ id, type, value, setValue, placeholder, lineColor }: IUnderlinedInput) => {
    return (
        <input
            key={id}
            type={type}
            autoComplete="new-password"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={placeholder}
            className={`w-320 border-b-1 p-4 text-sm leading-tight outline-none ${
                lineColor ? lineColor : "border-borderline"
            }`}
        />
    );
};

function SignInput({ id, label, description, type, value, setValue, placeholder, regex }: ISignInput) {
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
                <UnderlinedInput
                    id={id}
                    type={type}
                    value={value}
                    setValue={setValue}
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

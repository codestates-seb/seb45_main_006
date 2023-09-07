import { useToast } from "@hook/useToast";

type InputSummary = {
    name: string;
    content: string | number;
};

export const useCheckEmptyInput = () => {
    const { fireToast } = useToast();

    const alertWhenEmptyFn = (inputs: Array<InputSummary>) => {
        const emptyNames: Array<string> = [];
        inputs.forEach((v) => {
            if (!v.content) {
                emptyNames.push(v.name);
            }
        });

        fireToast({
            content: `${emptyNames.join(", ")}은/는 필수 입력값입니다!`,
            isConfirm: false,
            isWarning: true,
        });

        return emptyNames;
    };

    return { alertWhenEmptyFn };
};

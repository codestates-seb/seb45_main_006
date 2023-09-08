import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { Location } from "react-router-dom";

export type CurActivity = "REGISTER" | "EDIT" | "ERROR";

export const useCheckCurActivity = ({ location }: { location: Location }): { curActivity: CurActivity } => {
    const { fireToast } = useToast();
    const [curActivity, setCurActivity] = useState<CurActivity>("REGISTER");

    useEffect(() => {
        if (location.pathname.includes("edit")) {
            if (!location.state) {
                fireToast({
                    content: "올바른 접근이 아닙니다. 메인화면으로 이동합니다.",
                    isConfirm: false,
                    isWarning: false,
                });
                setCurActivity("ERROR");
                window.location.href = "/";
                return;
            }

            setCurActivity("EDIT");
        } else {
            setCurActivity("REGISTER");
        }
    }, []);

    return { curActivity };
};

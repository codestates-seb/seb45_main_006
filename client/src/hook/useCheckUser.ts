import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { getItemFromStorage } from "@util/localstorage-helper";

export const useCheckUser = ({ memberId, comparedMemberId }: { memberId: number; comparedMemberId?: number }) => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);

    const [isMine, setIsMine] = useState(false);
    const storedMemberId = getItemFromStorage("memberId");

    const [isSameUser, setIsSameUser] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            if (Number.parseInt(storedMemberId) === memberId) {
                setIsMine(true);
            }
        } else {
            setIsMine(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, memberId]);

    useEffect(() => {
        if (memberId && comparedMemberId) {
            setIsSameUser(memberId === comparedMemberId);
        }
    }, [comparedMemberId, memberId]);

    return { isLoggedIn, isMine, isSameUser };
};

import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { usePostAttendance } from "@api/member-activity/hook";
import { useToast } from "@hook/useToast";

import dayjs from "dayjs";

import CommonBtn from "@component/CommonBtn";
import Typography from "@component/Typography";

import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

import BgAttendance from "@assets/bg-attendance.jpg";

function Attendance() {
    const { mutate: postAttendance } = usePostAttendance();

    const [isAttended, setIsAttended] = useState(false);

    const { fireToast, errorToast, reqLoginToUserToast } = useToast();

    const isLoggedIn = useRecoilValue(isLoggedInAtom);

    useEffect(() => {
        const attendedDate = getItemFromStorage("attendedDate") || "";
        const today = dayjs().format("YYYY-MM-DD");

        if (attendedDate === today) {
            setIsAttended(true);
        }
    }, []);

    const onClickAttendance = () => {
        if (!isLoggedIn) {
            reqLoginToUserToast();
            return;
        }

        postAttendance(
            {},
            {
                onSuccess: () => {
                    setIsAttended(true);
                    setItemToStorage("attendedDate", dayjs().format("YYYY-MM-DD"));
                    fireToast({
                        content: "오늘의 출석을 완료하셨습니다!",
                        isConfirm: false,
                    });
                },
                onError: (err) => {
                    errorToast(err);
                    setItemToStorage("attendedDate", dayjs().format("YYYY-MM-DD"));
                },
            },
        );
    };

    return (
        <div className="relative flex items-center justify-center bg-[#fdf5ea]">
            <div className="absolute top-40">
                <Typography text="오늘도 같이 개발할 Squad를 구하러 가볼까요?" type="Label" />
            </div>
            <div className="mt-30 w-300">
                <img src={BgAttendance} alt="" />
            </div>
            {isAttended ? (
                <div className="absolute top-500">
                    <Typography text={`${dayjs().format("YYYY-MM-DD")} 오늘의 출석을 완료하였습니다!`} type="Label" />
                </div>
            ) : (
                <CommonBtn
                    color="MAIN"
                    styleType="FILLED"
                    size="LG"
                    onClick={onClickAttendance}
                    styles="absolute top-500"
                >
                    <Typography text={`${dayjs().format("YYYY-MM-DD")} 출석하기`} type="Label" />
                </CommonBtn>
            )}
        </div>
    );
}

export default Attendance;

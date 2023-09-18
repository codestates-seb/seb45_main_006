import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { authNicknameAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";
import { useAuthHelper } from "@hook/useCheckAuth";
import { usePatchMember } from "@api/member/hook";

import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "./component/SignInput";
import Button from "@component/Button";
import Typography from "@component/Typography";
import SignButton from "./component/SignButton";

import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

function SetProOauth() {
    const memberId = getItemFromStorage("memberId");

    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const authNickname = useRecoilValue(authNicknameAtom);

    const { postCheckNickname } = useAuthHelper();
    const { mutate: patchMember } = usePatchMember();
    const { fireToast, errorToast } = useToast();

    const onClickConfirm = () => {
        if (!nickname || !authNickname) {
            fireToast({
                content: "닉네임을 작성하고 인증해주세요!",
                isConfirm: false,
                isWarning: true,
            });
        }
        patchMember(
            {
                memberId,
                nickname: authNickname || nickname,
                introduction: "",
                profilePicture: "",
                githubId: "",
                stack: [],
                position: [],
                listEnroll: 0,
            },
            {
                onSuccess: () => {
                    setItemToStorage("nickname", authNickname || nickname);
                    // TODO: S3 업로드 구현 후 수정하기
                    setItemToStorage("profilePicture", "");
                    navigate("/signup/3");
                },

                onError: (err) => errorToast(err),
            },
        );
    };
    // localstorage 업데이트
    // 수정할때마다 해야할듯

    return (
        <SignLayout title="Google Oauth 회원가입">
            <div className="flex h-300 w-full flex-col items-center justify-center">
                <div className="flex h-30 w-full justify-center">
                    <Typography type="Label" text="Dev Squad" styles="mr-8" color="text-main" />
                    <Typography type="Label" text="서비스 이용을 위해" styles="mr-8" />
                </div>
                <Typography type="Label" text="닉네임을 설정해주세요." styles="mb-80" />
                <div className="flex h-200 w-full items-start justify-between">
                    <SignInput
                        label="닉네임"
                        value={nickname}
                        placeholder="닉네임 (공백없이 2자 ~ 8자)"
                        disabled={authNickname.length > 0}
                        onChange={(e) => setNickname(e.currentTarget.value)}
                        description="닉네임 형식이 맞지 않습니다."
                    />
                    {authNickname.length === 0 && (
                        <Button
                            type="STUDY"
                            styles={`px-8 py-6 rounded-sm ml-12 flex flex-col hover:font-bold`}
                            onClickHandler={() => postCheckNickname({ nickname })}
                        >
                            <Typography type="Description" text="중복 확인" styles="min-w-max" color="text-gray-700" />
                        </Button>
                    )}
                </div>
                <SignButton type="FILLED" onClickHandler={onClickConfirm}>
                    <Typography type="SmallLabel" text="확인" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </SignLayout>
    );
}

export default SetProOauth;

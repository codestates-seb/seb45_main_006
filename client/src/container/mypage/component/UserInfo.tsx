import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import { useRecoilValue } from "recoil";
import { authNicknameAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";
import { useAuthHelper } from "@hook/useCheckAuth";
import { useLoginInAndOut } from "@hook/useLogInAndOut";

import { usePatchMember, useDeleteMember } from "@api/member/hook";

import SignInput from "@container/sign/component/SignInput";
import Textarea from "@component/Textarea";
import Typography from "@component/Typography";
import AutoCompletionTags from "@component/AutoCompletionTags";
import { UserInfo as UserStackAndPos } from "@container/user/component/UserCardModal";

import { GetResMemberDetail } from "@type/member/member.res.dto";
import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

import { defaultStack, defaultPosition } from "@component/mockData";
import { Checkbox } from "@material-tailwind/react";

function UserInfo({ user }: { user: GetResMemberDetail }) {
    const navigate = useNavigate();
    const checkboxRef = useRef(null);

    const authNickname = useRecoilValue(authNicknameAtom);

    const email = getItemFromStorage("email");

    const [nickname, setNickname] = useState(user.nickname);
    const [githubId, setGithubId] = useState(user.githubId);
    const [introduction, setIntroduction] = useState(user.introduction);
    const [stacks, setStacks] = useState<Array<string>>(user.stack);
    const [position, setPosition] = useState<Array<string>>(user.position);
    const [isChecked, setIsChecked] = useState<boolean>(user.listEnroll);

    const [isEdit, setIsEdit] = useState(false);

    const { fireToast, errorToast, createToast } = useToast();
    const { postCheckNickname } = useAuthHelper();

    const onHandleCheckNickname = () => {
        postCheckNickname({ nickname });
    };
    const { mutate: patchMember } = usePatchMember();
    const { mutate: deleteMember } = useDeleteMember();

    const onHandleEditUser = () => {
        if (user.nickname !== nickname && authNickname !== nickname) {
            fireToast({
                content: "닉네임을 중복검사를 진행해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        // TODO: S3 업로드
        patchMember(
            {
                memberId: user.memberId,
                nickname: authNickname,
                profilePicture: user.profilePicture,
                githubId,
                introduction,
                listEnroll: isChecked ? 1 : 0,
                stack: stacks,
                position: position,
            },
            {
                onSuccess: () => {
                    setIsEdit(false);
                    fireToast({
                        content: "수정 완료하였습니다.",
                        isConfirm: false,
                    });

                    setItemToStorage("nickname", authNickname);
                    // TODO: S3 업로드 구현 후 수정하기
                    setItemToStorage("profilePicture", user.profilePicture);
                },
                onError: (err) => {
                    console.log(err);
                    errorToast();
                },
            },
        );
    };

    const { onHandleLogout } = useLoginInAndOut();

    const onHandleDeleteUser = () => {
        createToast({
            content: "탈퇴하시면 DevSquad에서 기록이 삭제됩니다. 정말 탈퇴하시겠습니까?🥺",
            isWarning: false,
            isConfirm: true,
            callback: () =>
                deleteMember(
                    { memberId: user.memberId },
                    {
                        onSuccess: () => {
                            onHandleLogout({ email });
                            fireToast({
                                content: "탈퇴 처리되었습니다.",
                                isConfirm: false,
                            });
                            navigate("/");
                        },
                        onError: (err) => {
                            console.log(err);
                            errorToast();
                        },
                    },
                ),
        });
    };

    const linkCss = "bg-tertiary px-8 py-4 hover:bg-light hover:font-bold";

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-col items-center rounded-md bg-white p-40 shadow-md">
                <div className="mb-32 min-w-400">
                    <SignInput
                        name="email"
                        label="이메일"
                        value={email}
                        onChange={() => {}}
                        disabled={true}
                        placeholder=""
                    />
                    <div className="flex items-center justify-between">
                        <SignInput
                            name="nickname"
                            label="닉네임"
                            value={nickname}
                            disabled={!isEdit}
                            onChange={(e) => setNickname(e.currentTarget.value)}
                            placeholder=""
                        />
                        {isEdit && (
                            <button
                                className={`${linkCss} mb-12 ml-8`}
                                onClick={onHandleCheckNickname}
                                disabled={!isEdit}
                            >
                                <Typography
                                    type="Description"
                                    text="중복 확인"
                                    styles="min-w-max"
                                    color="text-gray-700"
                                />
                            </button>
                        )}
                    </div>
                    <SignInput
                        name="githubId"
                        label="깃허브 ID"
                        value={githubId}
                        disabled={!isEdit}
                        onChange={(e) => setGithubId(e.currentTarget.value)}
                        placeholder=""
                    />

                    <div className="mb-4 flex w-full items-center">
                        <div className="min-w-88 p-4">
                            <Typography type="SmallLabel" text="자기소개" styles="font-bold" />
                        </div>
                        <Textarea
                            name="introduction"
                            value={introduction}
                            disabled={!isEdit}
                            maxlength={200}
                            onChange={(e) => setIntroduction(e.currentTarget.value)}
                            placeholder=""
                            borderStyle="border-1 border-borderline"
                        />
                    </div>

                    <div className="mb-4 flex w-full items-center">
                        {isEdit ? (
                            <>
                                <div className="min-w-88 p-4">
                                    <Typography type="SmallLabel" text="기술스택" styles="font-bold" />
                                </div>
                                <AutoCompletionTags
                                    placeholder="기술 스택을 입력해주세요."
                                    selectedTags={stacks}
                                    setSelectedTags={setStacks}
                                    defaultSuggestions={defaultStack}
                                />
                            </>
                        ) : (
                            <UserStackAndPos user={user} type="stack" />
                        )}
                    </div>

                    <div className="mb-4 flex w-full items-center">
                        {isEdit ? (
                            <>
                                <div className="min-w-88 p-4">
                                    <Typography type="SmallLabel" text="포지션" styles="font-bold" />
                                </div>
                                <AutoCompletionTags
                                    placeholder="포지션을 입력해주세요."
                                    selectedTags={position}
                                    setSelectedTags={setPosition}
                                    defaultSuggestions={defaultPosition}
                                />
                            </>
                        ) : (
                            <UserStackAndPos user={user} type="position" />
                        )}
                    </div>
                    <div className="mb-4 flex w-full items-center">
                        <div className="min-w-100 p-4">
                            <Typography type="SmallLabel" text="유저 리스트 페이지 공개 여부" styles="font-bold" />
                        </div>
                        <div onClick={() => setIsChecked(!isChecked)}>
                            <Checkbox
                                color="green"
                                checked={isChecked}
                                crossOrigin={undefined}
                                disabled={!isEdit}
                                className="h-20 w-20"
                                inputRef={checkboxRef}
                            />
                        </div>
                    </div>

                    <div className="mt-30 flex justify-center">
                        {isEdit ? (
                            <button className={linkCss} onClick={onHandleEditUser}>
                                <Typography type="SmallLabel" text="완료" />
                            </button>
                        ) : (
                            <button className={linkCss} onClick={() => setIsEdit(true)}>
                                <Typography type="SmallLabel" text="수정" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-20 flex flex-1 flex-col items-center rounded-md bg-white p-40 shadow-md">
                <div className="mb-32 flex w-full flex-col items-start">
                    <Typography type="SmallLabel" text="회원 탈퇴" styles="font-bold mb-8" />
                    <Typography type="Description" text="회원 탈퇴 시 작성된 글과 프로젝트는 모두 삭제처리됩니다🥺" />
                </div>
                <button className={linkCss} onClick={onHandleDeleteUser}>
                    <Typography type="SmallLabel" text="탈퇴하기" />
                </button>
            </div>
        </div>
    );
}

export default UserInfo;

// TODO: 자기소개 + input outline (초록색)

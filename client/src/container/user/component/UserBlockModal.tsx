import { useEffect, useState } from "react";
import { usePostBlockMember } from "@api/member/hook";

import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import Textarea from "@component/Textarea";
import Button from "@component/Button";

import { GetResMemberDetail } from "@type/member/member.res.dto";

function UserBlockModal({
    user,
    closeModal,
    setBlockedMemberId,
    refetchAllMembers,
}: {
    user: GetResMemberDetail;
    closeModal: () => void;
    setBlockedMemberId: (v: number) => void;
    refetchAllMembers: () => void;
}) {
    const [reportContent, setReportContent] = useState("");
    const [isEmptyInput, setIsEmptyInput] = useState(false);

    const { mutate: postBlockMember } = usePostBlockMember();
    const { fireToast, errorToast } = useToast();

    useEffect(() => {
        if (reportContent) {
            setIsEmptyInput(false);
        }
    }, [reportContent]);

    const onHandleBlock = () => {
        if (!reportContent) {
            setIsEmptyInput(true);
            return;
        }

        if (reportContent) {
            postBlockMember(
                { blockMemberId: user.memberId, reportContent: reportContent },
                {
                    onSuccess: () => {
                        closeModal();
                        setBlockedMemberId(user.memberId);
                        fireToast({
                            content: `${user.nickname} 유저를 차단하였습니다.`,
                            isConfirm: false,
                        });
                        refetchAllMembers();
                    },
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                },
            );
        }
    };

    const onHandleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReportContent(e.currentTarget.value);
    };

    return (
        <div className="flex flex-col p-30">
            <div className="flex flex-1 flex-col justify-between p-8">
                <Typography type="Label" text={`${user.nickname}님을 차단하시겠습니까?`} />
            </div>
            <div className="mb-20 flex flex-1 flex-col justify-between p-8">
                <Typography type="Body" text="차단 후 해당 유저의 활동(게시글)을 확인할 수 없습니다." />
            </div>
            <div className="mb-20 flex flex-1 flex-col justify-between p-8">
                <Typography type="Body" text="DevSquad 더 좋은 서비스 이용 환경을 만들기 위해" />
                <Typography
                    type="Body"
                    text="운영자에게 차단 사유를 전달해주시면 신속히 확인하여 악성유저일 경우 탈퇴처리하도록 하겠습니다!"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between p-8">
                <div className="flex">
                    <Typography type="Body" text="차단 사유" />
                    <Typography text="*" type="Body" color="text-warn" />
                </div>
                {isEmptyInput && <Typography text="차단 사유를 작성해주세요." type="SmallLabel" color="text-warn" />}
                <Textarea
                    maxlength={200}
                    placeholder={"차단 사유를 작성해주세요."}
                    value={reportContent}
                    onChange={onHandleContent}
                    borderStyle={`border-1 shadow-md ${isEmptyInput ? "border-warn" : "border-borderline"}`}
                />
            </div>
            <div className="flex justify-center">
                <Button type="WARN" onClickHandler={onHandleBlock}>
                    <Typography type="Highlight" text="차단하기" color="text-white" />
                </Button>
            </div>
        </div>
    );
}

export default UserBlockModal;

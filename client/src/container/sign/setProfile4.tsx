import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import progress from "@assets/sign/fg_4.png";
import SignButton from "@container/sign/component/SignButton";
import Button from "@component/Button";
import Textarea from "@component/Textarea";

import { useToast } from "@hook/useToast";

function SetPro4({
    setCurStage,
    introduce,
    setIntroduce,
}: {
    setCurStage: (v: number) => void;
    introduce: string;
    setIntroduce: (v: string) => void;
}) {
    const { fireToast } = useToast();
    return (
        <SignLayout2 title="간단한 자기소개를" subTitle="작성해주세요" progressImage={progress}>
            <>
                <div className="mb-8 flex flex-col items-center">
                    <Typography type="Highlight" text="자기소개를 작성할 경우" />
                    <Typography type="Highlight" text="나와 잘맞는 스터디/프로젝트와 매칭될 확률이 높아요!" />
                </div>
                <Textarea
                    maxlength={200}
                    name="introduce"
                    value={introduce}
                    onChange={(e) => setIntroduce(e.currentTarget.value)}
                    placeholder="200자 이내로 작성해주세요."
                    borderStyle="border-1 border-borderline"
                />
                <div className="mb-40 flex items-center justify-center">
                    <Button type="BLACK" isFullBtn={false} onClickHandler={() => setCurStage(5)}>
                        <Typography type="SmallLabel" text="완료" styles="font-bold" color="text-white" />
                    </Button>
                </div>
                <div className="flex justify-center">
                    <SignButton type="OUTLINED" styles="mr-20" onClickHandler={() => setCurStage(3)}>
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>

                    <SignButton
                        type="FILLED"
                        onClickHandler={() => {
                            if (!introduce) {
                                return fireToast({
                                    content: "자기소개를 입력해주세요.",
                                    isConfirm: false,
                                    isWarning: true,
                                });
                            }
                            setCurStage(5);
                        }}
                    >
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </div>
            </>
        </SignLayout2>
    );
}

export default SetPro4;

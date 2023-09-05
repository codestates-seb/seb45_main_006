import { useState } from "react";

import SignLayout from "@container/sign/component/SignLayout";
import SignButton from "@container/sign/component/SignButton";
import Typography from "@component/Typography";
import Textarea from "@component/Textarea";

import progress from "@assets/sign/progress_bar1.png";
import Button from "@component/Button";

const ProfileContent4 = () => {
    const [introduce, setIntroduce] = useState<string>("");

    return (
        <>
            <div className="flex flex-col items-center">
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
                <Button type="BLACK" isFullBtn={false}>
                    <Typography type="SmallLabel" text="완료" styles="font-bold" color="text-white" />
                </Button>
            </div>
            <div className="flex justify-center">
                <SignButton type="OUTLINED" onClickHandler={() => {}} styles="mr-20">
                    <Typography type="SmallLabel" text="이전" styles="font-bold" />
                </SignButton>
                <SignButton type="FILLED" onClickHandler={() => {}}>
                    <Typography type="SmallLabel" text="다음에 할게요" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </>
    );
};

function TempProfile4() {
    return (
        <SignLayout title="간단한 자기소개를" subTitle="작성해주세요!" progressImage={progress}>
            <ProfileContent4 />
        </SignLayout>
    );
}

export default TempProfile4;

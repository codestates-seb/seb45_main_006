import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import { Link } from "react-router-dom";
import { useState } from "react";
import progress from "@assets/sign/fg_4.png";
import SignButton from "@container/sign/component/SignButton";
import Button from "@component/Button";
import Textarea from "@component/Textarea";

function SetPro4() {
    return (
        <SignLayout2 title="간단한 자기소개를" subTitle="작성해주세요" progressImage={progress}>
            <ProfileContent4 />
        </SignLayout2>
    );
}

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
                <Link to={"/setpro/3"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>
                </Link>
                <Link to={"/setpro/5"}>
                    <SignButton type="FILLED">
                        <Typography type="SmallLabel" text="다음에 할게요" color="text-white" styles="font-bold" />
                    </SignButton>
                </Link>
            </div>
        </>
    );
};
export default SetPro4;

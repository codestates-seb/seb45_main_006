import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import { Link } from "react-router-dom";
import { useState } from "react";
import progress from "@assets/sign/fg_1.png";
import AutoCompletionTags from "@component/AutoCompletionTags";
import { defaultStack } from "@component/mockData";
import SignButton from "@container/sign/component/SignButton";

function SetPro1() {
    return (
        <SignLayout2 title="설희님의" subTitle="기술 스택을 입력해 주세요!" progressImage={progress}>
            <ProfileContent1 />
        </SignLayout2>
    );
}

const ProfileContent1 = () => {
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

    return (
        <>
            <AutoCompletionTags
                placeholder="기술 스택을 입력해주세요."
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                defaultSuggestions={defaultStack}
            />
            <div className="mt-200 flex justify-center">
                <Link to={"/"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="다음에 할게요" styles="font-bold" />
                    </SignButton>
                </Link>
                <Link to={"/setpro/2"}>
                    <SignButton type="FILLED">
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </Link>
            </div>
        </>
    );
};
export default SetPro1;

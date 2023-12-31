import { useState } from "react";

import { useRecoilValue } from "recoil";
import { defaultStackAtom } from "@feature/Global";

import SignLayout from "@container/sign/component/SignLayout";
import SignButton from "@container/sign/component/SignButton";
import Typography from "@component/Typography";

import progress from "@assets/sign/progress_bar1.png";
import AutoCompletionTags from "@component/AutoCompletionTags";

const ProfileContent1 = () => {
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const defaultStack = useRecoilValue(defaultStackAtom);

    return (
        <>
            <AutoCompletionTags
                placeholder="기술 스택을 입력해주세요."
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                defaultSuggestions={defaultStack}
            />
            <div className="mt-200 flex justify-center">
                <SignButton type="OUTLINED" onClickHandler={() => {}} styles="mr-20">
                    <Typography type="SmallLabel" text="다음에 할게요" styles="font-bold" />
                </SignButton>
                <SignButton type="FILLED" onClickHandler={() => {}}>
                    <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </>
    );
};

function TempProfile1() {
    return (
        <SignLayout title="설희님의" subTitle="기술 스택을 입력해 주세요!" progressImage={progress}>
            <ProfileContent1 />
        </SignLayout>
    );
}

export default TempProfile1;

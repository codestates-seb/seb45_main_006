import { useState } from "react";
import { Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { defaultPostionAtom } from "@feature/Global";

import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import AutoCompletionTags from "@component/AutoCompletionTags";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/fg_2.png";

function SetPro2() {
    return (
        <SignLayout2 title="설희님의" subTitle="포지션을 선택해 주세요!" progressImage={progress}>
            <ProfileContent1 />
        </SignLayout2>
    );
}

const ProfileContent1 = () => {
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const defaultPosition = useRecoilValue(defaultPostionAtom);

    return (
        <>
            <AutoCompletionTags
                placeholder="포지션을 입력해주세요."
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                defaultSuggestions={defaultPosition}
            />
            <div className="mt-200 flex justify-center">
                <Link to={"/setpro/1"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>
                </Link>
                <Link to={"/setpro/3"}>
                    <SignButton type="FILLED">
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </Link>
            </div>
        </>
    );
};
export default SetPro2;

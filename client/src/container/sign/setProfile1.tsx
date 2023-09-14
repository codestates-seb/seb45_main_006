import { Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { defaultStackAtom } from "@feature/Global";

import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import AutoCompletionTags from "@component/AutoCompletionTags";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/fg_1.png";

import { getItemFromStorage } from "@util/localstorage-helper";

function SetPro1({
    setCurStage,
    selectedTags,
    setSelectedTags,
}: {
    setCurStage: (v: number) => void;
    selectedTags: Array<string>;
    setSelectedTags: (tags: Array<string>) => void;
}) {
    const nickname = getItemFromStorage("nickname");
    const defaultStack = useRecoilValue(defaultStackAtom);

    return (
        <SignLayout2 title={`${nickname}님의`} subTitle="기술 스택을 입력해 주세요!" progressImage={progress}>
            <div className="flex h-280 flex-col justify-between">
                <AutoCompletionTags
                    placeholder="기술 스택을 입력해주세요."
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    defaultSuggestions={defaultStack}
                />
                <div className="flex justify-center">
                    <Link to={"/"}>
                        <SignButton type="OUTLINED" styles="mr-20">
                            <Typography type="SmallLabel" text="다음에 할게요" styles="font-bold" />
                        </SignButton>
                    </Link>

                    <SignButton type="FILLED" onClickHandler={() => setCurStage(2)}>
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </div>
            </div>
        </SignLayout2>
    );
}

export default SetPro1;

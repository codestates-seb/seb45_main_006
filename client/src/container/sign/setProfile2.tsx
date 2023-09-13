import { useRecoilValue } from "recoil";
import { defaultPostionAtom } from "@feature/Global";

import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import AutoCompletionTags from "@component/AutoCompletionTags";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/fg_2.png";

import { getItemFromStorage } from "@util/localstorage-helper";

function SetPro2({
    setCurStage,
    selectedTags,
    setSelectedTags,
}: {
    setCurStage: (v: number) => void;
    selectedTags: Array<string>;
    setSelectedTags: (tags: Array<string>) => void;
}) {
    const nickname = getItemFromStorage("nickname");
    const defaultPosition = useRecoilValue(defaultPostionAtom);

    return (
        <SignLayout2 title={`${nickname}님의`} subTitle="포지션을 선택해 주세요!" progressImage={progress}>
            <div className="flex h-280 flex-col justify-between">
                <AutoCompletionTags
                    placeholder="포지션을 선택해주세요."
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    defaultSuggestions={defaultPosition}
                />
                <div className="flex justify-center">
                    <SignButton type="OUTLINED" styles="mr-20" onClickHandler={() => setCurStage(1)}>
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>

                    <SignButton type="FILLED" onClickHandler={() => setCurStage(3)}>
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </div>
            </div>
        </SignLayout2>
    );
}

export default SetPro2;

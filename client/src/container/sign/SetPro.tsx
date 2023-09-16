import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePatchMember } from "@api/member/hook";
import { useToast } from "@hook/useToast";

import SetPro1 from "./setProfile1";
import SetPro2 from "./setProfile2";
import SetPro3 from "./setProfile3";
import SetPro4 from "./setProfile4";
import SetPro5 from "./setProfile5";
import { getItemFromStorage } from "@util/localstorage-helper";

function SetPro() {
    const navigate = useNavigate();
    const [curStage, setCurStage] = useState(1);

    const [selectedStack, setSelectedStack] = useState<Array<string>>([]);
    const [selectedPostion, setSelectedPostion] = useState<Array<string>>([]);
    const [githubId, setGithubId] = useState<string>("");
    const [introduce, setIntroduce] = useState<string>("");

    const memberId = getItemFromStorage("memberId");
    const nickname = getItemFromStorage("nickname");

    const { fireToast, errorToast } = useToast();
    const { mutate: patchMember } = usePatchMember();

    const onHandleEditUser = ({ isChecked }: { isChecked: boolean }) => {
        // TODO: S3 업로드
        patchMember(
            {
                memberId: memberId,
                nickname: nickname,
                profilePicture: "",
                githubId,
                introduction: introduce,
                listEnroll: isChecked ? 1 : 0,
                stack: selectedStack,
                position: selectedPostion,
            },
            {
                onSuccess: () => {
                    fireToast({
                        content: "등록 완료하였습니다.",
                        isConfirm: false,
                    });
                    navigate("/");
                },
                onError: (err) => {
                    console.log(err);
                    errorToast();
                },
            },
        );
    };

    const onHandleNextEditBtn = () => {
        // TODO: S3 업로드
        patchMember(
            {
                memberId: memberId,
                nickname: nickname,
                profilePicture: "",
                githubId: "",
                introduction: "",
                listEnroll: 1,
                stack: selectedStack,
                position: selectedPostion,
            },
            {
                onSettled: () => {
                    navigate("/");
                },
            },
        );
    };

    if (curStage === 1) {
        return (
            <SetPro1
                setCurStage={setCurStage}
                selectedTags={selectedStack}
                setSelectedTags={setSelectedStack}
                onHandleNextEditBtn={onHandleNextEditBtn}
            />
        );
    }

    if (curStage === 2) {
        return (
            <SetPro2 setCurStage={setCurStage} selectedTags={selectedPostion} setSelectedTags={setSelectedPostion} />
        );
    }

    if (curStage === 3) {
        return <SetPro3 setCurStage={setCurStage} githubId={githubId} setGithubId={setGithubId} />;
    }

    if (curStage === 4) {
        return <SetPro4 setCurStage={setCurStage} introduce={introduce} setIntroduce={setIntroduce} />;
    }

    if (curStage === 5) {
        return <SetPro5 onHandleEditUser={onHandleEditUser} />;
    }

    return <></>;
}

export default SetPro;

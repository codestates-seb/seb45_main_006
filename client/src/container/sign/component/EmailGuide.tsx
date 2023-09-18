import { useSetRecoilState } from "recoil";
import { authEmailAtom } from "@feature/Global";

import Typography from "@component/Typography";

function EmailGuide({ setIsRequestedAuthEmail }: { setIsRequestedAuthEmail: (v: boolean) => void }) {
    const setAuthEmail = useSetRecoilState(authEmailAtom);

    return (
        <div className="flex h-300 flex-col items-center justify-start">
            <Typography type="SmallLabel" text="이메일 인증을 위해 메일을 전송하였으며," />
            <Typography type="SmallLabel" text="메일 도착까지 1분 정도 소요될 수 있습니다." />
            <br />
            <Typography type="SmallLabel" text="수신한 메일이 없다면 스팸함 확인 부탁드립니다!" />
            <br />
            <br />
            <div className="mb-4 flex items-center justify-between">
                <Typography type="Description" text="혹시 이메일을 잘못 입력하셨다면?" color="text-gray-700" />
                <button
                    onClick={() => {
                        setAuthEmail("");
                        setIsRequestedAuthEmail(false);
                    }}
                >
                    <Typography
                        type="Description"
                        text="이메일 재입력"
                        styles="ml-8 font-bold underline"
                        color="text-blue-500 hover:text-blue-700"
                    />
                </button>
            </div>
        </div>
    );
}

export default EmailGuide;

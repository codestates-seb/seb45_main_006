import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import { Link } from "react-router-dom";
import progress from "@assets/sign/fg_5.png";

function SetPro5() {
    return (
        <SignLayout2 title="프로필을" subTitle="유저 리스트에 등록하시겠어요?" progressImage={progress}>
            <ProfileContent1 />
        </SignLayout2>
    );
}

const ProfileContent1 = () => {
    return (
        <>
            <div className="mb-75 flex flex-col items-center">
                <Typography type="Highlight" text="나와 비슷한 유저로부터" />
                <Typography type="Highlight" text="프로젝트/스터디 제안을 더 많이 받을 수 있어요!" />
            </div>

            <div className="flex flex-col items-center">
                <Link to={"/"}>
                    <a className="m-auto flex w-230 justify-center rounded bg-button-next p-9">
                        <Typography type="Highlight" text="네 좋아요!" color="text-white" />
                    </a>
                </Link>
                <div className="pb-50">
                    <Link to={"/"}>
                        <a className="m-auto mt-25 flex w-230 justify-center rounded border-1 border-solid border-black p-9">
                            <Typography type="Highlight" text="다음에 등록할래요" />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};
export default SetPro5;

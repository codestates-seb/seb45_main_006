import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import progress from "@assets/sign/fg_5.png";
import SignButton from "./component/SignButton";

function SetPro5({ onHandleEditUser }: { onHandleEditUser: ({ isChecked }: { isChecked: boolean }) => void }) {
    return (
        <SignLayout2 title="프로필을" subTitle="유저 리스트에 등록하시겠어요?" progressImage={progress}>
            <div className="mb-75 flex flex-col items-center">
                <Typography type="Highlight" text="나와 비슷한 유저로부터" />
                <Typography type="Highlight" text="프로젝트/스터디 제안을 더 많이 받을 수 있어요!" />
            </div>

            <div className="flex flex-col items-center">
                <SignButton type="FILLED" onClickHandler={() => onHandleEditUser({ isChecked: true })} styles="mb-30">
                    <Typography type="Highlight" text="네 좋아요!" color="text-white" />
                </SignButton>

                <SignButton type="OUTLINED" onClickHandler={() => onHandleEditUser({ isChecked: false })}>
                    <Typography type="Highlight" text="다음에 등록할래요" />
                </SignButton>
            </div>
        </SignLayout2>
    );
}

export default SetPro5;

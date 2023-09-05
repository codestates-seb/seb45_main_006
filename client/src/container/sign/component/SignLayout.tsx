import { ReactNode } from "react";
import Typography from "@component/Typography";
import IconPeople from "@assets/sign/icon_people.png";

type ISignLayout = {
    title: string;
    subTitle?: string;
    progressImage: string;
    children: ReactNode;
};

function SignLayout({ title, subTitle, progressImage, children }: ISignLayout) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-background">
            <div className="relative flex h-530 w-501 flex-col justify-between rounded-xl bg-white p-30">
                <img src={IconPeople} alt="사람 도트 이미지" className="absolute -top-56 left-0" />
                <div className="h-150 flex-col justify-center pt-25">
                    <div className="flex justify-center">
                        <img className="flex w-210 justify-center" src={progressImage} />
                    </div>
                    <div className="flex flex-col items-center justify-center pt-25">
                        <Typography type="SubHeading" text={title} />
                        {subTitle ? <Typography type="SubHeading" text={subTitle} /> : null}
                    </div>
                </div>
                <div className="relative flex-col justify-between">{children}</div>
            </div>
        </div>
    );
}

export default SignLayout;

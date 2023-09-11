import { ReactNode } from "react";
import Typography from "@component/Typography";

type ISignLayout = {
    title: string;
    subTitle?: string;
    progressImage?: string;
    children: ReactNode;
};

function SignLayout2({ title, subTitle, progressImage, children }: ISignLayout) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-background">
            <div className="relative flex h-max min-h-530 w-501 flex-col justify-between rounded-xl bg-white p-30">
                <div className="h-150 flex-col justify-center pt-10">
                    <div className="flex justify-center">
                        {progressImage && <img className="flex w-320 justify-center" src={progressImage} />}
                    </div>
                    <div className="flex flex-col items-center justify-center pt-50">
                        <Typography type="SubHeading" text={title} />
                        {subTitle ? <Typography type="SubHeading" text={subTitle} /> : null}
                    </div>
                </div>
                <div className="relative">{children}</div>
            </div>
        </div>
    );
}

export default SignLayout2;

import { useState } from "react";

import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";

import { IToast } from "@type/common";
import { AiFillCloseCircle } from "react-icons/ai";

function Toast({ toast }: { toast: IToast }) {
    const [isShow, setIsShow] = useState(true);
    const { removeToast } = useToast();

    const defaultCss = "flex justify-between min-w-500 w-max px-18 py-12 mb-6 bg-toast rounded-xl shadow-md";

    const handleCloseToast = () => {
        setIsShow(false);
        removeToast(toast);
    };

    const handleConfirmToast = () => {
        console.log(toast.callback);
        if (toast.callback) {
            toast.callback();
        }
        handleCloseToast();
    };

    return (
        <>
            {isShow ? (
                <div className={defaultCss}>
                    <div className="mr-64">{toast.content}</div>
                    {toast.isConfirm ? (
                        <div className="flex w-80 justify-between">
                            <button onClick={handleConfirmToast}>
                                <Typography type="SmallLabel" text="예" color="text-blue-600" />
                            </button>
                            <button onClick={handleCloseToast}>
                                <Typography type="SmallLabel" text="아니요" color="text-warn" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleCloseToast}>
                            <AiFillCloseCircle />
                        </button>
                    )}
                </div>
            ) : null}
        </>
    );
}

export default Toast;

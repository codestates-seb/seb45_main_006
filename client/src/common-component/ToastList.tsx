import { useRecoilValue } from "recoil";
import { toastState } from "@feature/Global";

import Toast from "@component/Toast";

function ToastList() {
    const toasts = useRecoilValue(toastState);

    return (
        <div className="fixed left-2/4 top-120 -translate-x-2/4">
            {toasts.map((v) => (
                <Toast key={v.id} toast={v} />
            ))}
        </div>
    );
}

export default ToastList;

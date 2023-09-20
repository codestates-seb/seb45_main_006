import { ReactNode } from "react";

function Modal({
    upperModal,
    closeModal,
    children,
}: {
    upperModal?: boolean;
    closeModal: () => void;
    children: ReactNode;
}) {
    return (
        <div
            onClick={closeModal}
            className={`fixed left-0 top-0 z-30 bg-modal ${upperModal ? "h-full w-full" : "h-screen w-screen"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`fixed left-2/4 top-2/4 max-h-4/5 w-11/12 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white xl:w-1120 ${
                    upperModal ? "overflow-hidden" : "overflow-y-auto"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;

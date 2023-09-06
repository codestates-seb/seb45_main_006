import { ReactNode } from "react";

function Modal({ closeModal, children }: { closeModal: () => void; children: ReactNode }) {
    return (
        <div onClick={closeModal} className="absolute left-0 top-0 z-40 h-screen w-screen bg-modal">
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-2/4 top-2/4 max-h-4/5 w-11/12 -translate-x-2/4 -translate-y-2/4 overflow-y-scroll rounded-xl bg-white xl:w-1120"
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;

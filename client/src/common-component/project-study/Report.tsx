import { useState } from "react";
import Button from "@component/Button";
import Typography from "@component/Typography";
import siren from "@assets/siren.png";

export default function Report() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleModalClick = (e: { target: unknown; currentTarget: unknown }) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    return (
        <div className="relative">
            <img
                src={siren}
                className="m-10 h-24 w-24 cursor-pointer"
                onClick={() => {
                    openModal();
                }}
            />
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleModalClick}
                >
                    <div className="w-full max-w-xl rounded-lg bg-project p-6 shadow-lg">
                        <Typography
                            text="신고해주신 내용을 토대로 담당자가 검토하여"
                            type="SubHeading"
                            styles="mx-20 mt-20"
                        />
                        <Typography
                            text="커뮤니티 가이드 위반 여부를 판단할 예정입니다."
                            type="SubHeading"
                            styles="mx-20"
                        />
                        <div className="mx-20 mb-40 mt-20 flex flex-col">
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="성적인 콘텐츠" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="폭력적 또는 혐오스러운 콘텐츠" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="증오 또는 악의적인 콘텐츠" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="괴롭힘 또는 폭력" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="유해하거나 위험한 행위" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="잘못된 정보" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="아동 학대" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="테러 조장" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="스팸 또는 혼동을 야기하는 콘텐츠" type="SmallLabel" />
                            </label>
                            <label className="mt-20 flex cursor-pointer items-center space-x-2">
                                <input type="checkbox" className="text-blue-500" />
                                <Typography text="법적 문제" type="SmallLabel" />
                            </label>
                        </div>
                        <div className="m-20 flex justify-center">
                            <Button type="WARN" styles="hover:bg-red-600" isFullBtn={false} onClickHandler={closeModal}>
                                <Typography text="신고하기" type="SmallLabel" styles="text-white font-bold" />
                            </Button>
                            <Button
                                type="WARN"
                                isFullBtn={false}
                                styles="bg-white hover:bg-gray-500"
                                onClickHandler={closeModal}
                            >
                                <Typography text="&times; 닫기" type="SmallLabel" styles="font-bold" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

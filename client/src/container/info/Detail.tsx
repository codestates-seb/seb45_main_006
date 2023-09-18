import { useParams, useNavigate } from "react-router-dom";

import { useDeleteInfo, useGetDetailQuestion } from "@api/info/hook";
import { useToast } from "@hook/useToast";

import InfoItem from "./component/InfoItem";
import Typography from "@component/Typography";
import HotBoard from "@component/board/HotBoard";

function Detail() {
    const { infoId } = useParams();
    const navigate = useNavigate();
    const boardId = Number.parseInt(infoId || "0");

    const { data: question } = useGetDetailQuestion({ boardId });
    const { createToast, fireToast, errorToast } = useToast();

    const { mutate: deleteInfo } = useDeleteInfo();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteInfo(
                    { infoId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "질문이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/infos");
                        },
                        onError: (err) => {
                            console.log(err);
                            errorToast();
                        },
                    },
                );
            },
        });
    };

    if (!question) {
        return <div>hello</div>;
    }

    return (
        <div className="mt-80 flex">
            <div className="flex flex-1 flex-col border-r-1 border-borderline">
                <div className="p-12">
                    <InfoItem
                        info={question}
                        key={boardId}
                        onClickDeleteHandler={onClickDeleteHandler}
                        isDetail={true}
                    />
                </div>
            </div>
            <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                <Typography type="Label" text="🔥 HOT 게시글" />
                <HotBoard board="question" />
            </div>
        </div>
    );
}

export default Detail;

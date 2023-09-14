import { useToggleLikeAndBookmark } from "@hook/useToggleLikeAnBookmark";

import { BsSuitHeartFill } from "react-icons/bs";

function LikeBtn({
    board,
    boardId,
    isLiked,
    setIsLiked,
}: {
    board: string;
    boardId: number;
    isLiked: boolean;
    setIsLiked: (v: boolean) => void;
}) {
    const { onClickLikeHandler } = useToggleLikeAndBookmark();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
                onClickLikeHandler({ board, boardId });
            }}
        >
            <BsSuitHeartFill size="1.2rem" color={isLiked ? "#FF2222" : "#E2E2E2"} />
        </button>
    );
}

export default LikeBtn;

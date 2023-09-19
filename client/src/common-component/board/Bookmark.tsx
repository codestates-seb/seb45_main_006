import { useToggleLikeAndBookmark } from "@hook/useToggleLikeAnBookmark";

import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";

function Bookmark({
    board,
    boardId,
    isBookmarked,
    setIsBookmarked,
    refetch,
}: {
    board: string;
    boardId: number;
    isBookmarked: boolean;
    setIsBookmarked: (v: boolean) => void;
    refetch: () => void;
}) {
    const { onClickBookmarkHandler } = useToggleLikeAndBookmark();

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                refetch();
                setIsBookmarked(!isBookmarked);
                onClickBookmarkHandler({ board, boardId });
            }}
        >
            <img src={isBookmarked ? bookmark_fill : bookmark_unfill} className="m-10 h-28 w-28" />
        </button>
    );
}

export default Bookmark;

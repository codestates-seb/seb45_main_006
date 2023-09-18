import { useToast } from "./useToast";
import { usePostToggleLike, usePostToggleBookmark } from "@api/board-common/hook";

export const useToggleLikeAndBookmark = () => {
    const { errorToast } = useToast();
    const { mutate: postToggleLike } = usePostToggleLike();
    const { mutate: postToggleBookmark } = usePostToggleBookmark();

    const onClickLikeHandler = ({ board, boardId }: { board: string; boardId: number }) => {
        postToggleLike(
            { board, boardId },
            {
                onSuccess: () => {},
                onError: (err) => errorToast(err),
            },
        );
    };

    const onClickBookmarkHandler = ({ board, boardId }: { board: string; boardId: number }) => {
        postToggleBookmark(
            { board, boardId },
            {
                onSuccess: () => {},
                onError: (err) => errorToast(err),
            },
        );
    };

    return { onClickLikeHandler, onClickBookmarkHandler };
};

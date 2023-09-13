import { useToast } from "./useToast";
import { usePostToggleLike } from "@api/info/hook";

export const useToggleLikeAndBookmark = () => {
    const { errorToast } = useToast();
    const { mutate: postToggleLike } = usePostToggleLike();

    const onClickLikeHandler = ({ board, boardId }: { board: string; boardId: number }) => {
        postToggleLike(
            { board, boardId },
            {
                onSuccess: () => {},
                onError: (err) => {
                    console.log(err);
                    errorToast();
                },
            },
        );
    };

    return { onClickLikeHandler };
};

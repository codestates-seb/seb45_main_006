import { useNavigate } from "react-router-dom";
import { useGetHottestBoard } from "@api/board-common/hook";

import Typography from "@component/Typography";

function HotBoard({ board }: { board: "information" | "question" }) {
    const navigate = useNavigate();
    const { data: hotList } = useGetHottestBoard({ board });

    return (
        <ol className="flex flex-col p-12">
            {hotList && Array.isArray(hotList) && hotList.length > 0 ? (
                hotList?.map((v, i) => {
                    return (
                        <li
                            className="mb-8 flex cursor-pointer hover:font-bold"
                            onClick={() => navigate(`/${board === "information" ? "infos" : "questions"}/${v.boardId}`)}
                        >
                            <div className="w-20">
                                <Typography text={`${i + 1}.`} type="SmallLabel" styles="mr-8" />
                            </div>
                            <Typography
                                text={v.title.length > 20 ? `${v.title.slice(0, 20)}...` : v.title}
                                type="SmallLabel"
                            />
                        </li>
                    );
                })
            ) : (
                <Typography text="최근 일주일 인기 게시글이 없어요🥹" type="SmallLabel" />
            )}
        </ol>
    );
}

export default HotBoard;

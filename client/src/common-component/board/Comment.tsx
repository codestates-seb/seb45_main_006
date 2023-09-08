import dayjs from "dayjs";
import { useGetMemberDetail } from "@api/member/hook";

import Textarea, { ITextarea } from "@component/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";

import { CommentDefaultType } from "@type/comment/comment.res.dto";

import { BiPencil } from "react-icons/bi";
import { RiReplyLine, RiDeleteBin5Line } from "react-icons/ri";

interface IComment extends ITextarea {
    onSubmitHanlder: () => void;
}

const dummyUser = {
    memberId: 5,
    profilePicture:
        "https://dszw1qtcnsa5e.cloudfront.net/community/20220519/453159ca-e328-429c-9b3f-460fc592d963/%EA%B7%80%EC%97%AC%EC%9A%B4%EB%AA%B0%EB%9D%BC%EB%AA%A8%EC%BD%94%EC%BD%94.png",
    nickname: "모코코",
    githubId: "mococo~",
    introduction: "update",
    listEnroll: true,
    position: ["Front", "Back"],
    stack: ["Javascript", "Typescript", "React.js", "Node.js", "Next.js", "BootStrap", "tailwindcss"],
};

export const EditComment = ({ value = "", onChange, onSubmitHanlder }: IComment) => {
    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                    <img src={dummyUser.profilePicture} alt="" />
                </div>
                <div className="flex-1">
                    <Textarea
                        name="comment"
                        maxlength={200}
                        placeholder="댓글을 입력해주세요."
                        value={value}
                        onChange={onChange}
                        borderStyle="border-1 border-borderline shadow-md"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="PROJECT_POINT" onClickHandler={onSubmitHanlder}>
                    <Typography type="Highlight" text="댓글 등록" color="text-white" />
                </Button>
            </div>
        </div>
    );
};

export const ShowComment = ({ comment }: { comment: CommentDefaultType }) => {
    // TODO: 내 아이디와 로컬스토리지에 저장된 member 아이디가 같은지 확인
    // const [isMine, setIsMine] = useState(true);
    const { data: user } = useGetMemberDetail({ memberId: comment.memberId });

    return (
        <div className="mb-8 flex flex-col border-b-1 border-borderline">
            <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                        {user && <img src={user.profilePicture} alt="" />}
                    </div>
                    <Typography type="Highlight" text={comment.nickname} />
                </div>
                <Typography
                    type="Description"
                    text={dayjs(comment.modifiedAt).format("YYYY-MM-DD")}
                    color="text-gray-600"
                />
                <div className="absolute right-0 top-32 flex w-70 justify-between">
                    <BiPencil size={"1.2rem"} />
                    <RiDeleteBin5Line size={"1.2rem"} />
                    <RiReplyLine size={"1.2rem"} />
                </div>
            </div>
            <div className="my-12">
                <div>{comment.content}</div>
            </div>
        </div>
    );
};

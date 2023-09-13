import { useState, useEffect } from "react";
import {
    useGetProjectOfMember,
    useGetStudyOfMember,
    useGetInfoOfMember,
    useGetQuestionOfMember,
} from "@api/member-activity/hook";
import { useDeleteInfo } from "@api/info/hook";
import { useDeleteQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";
import { TempProject, TempStudy } from "./UserCardModal";
// import ProjectItem from "@container/project/component/BoardList";
// import StudyItem from "@container/study/component/BoardList";
import InfoItem from "@container/info/component/InfoItem";
import QuestionItem from "@container/question/component/QuestionItem";
import Pagination from "@component/Pagination";

const ProjectOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: project } = useGetProjectOfMember({ memberId, page: curPage });

    useEffect(() => {
        if (project?.pageInfo.totalElements) {
            setTotalItems(project?.pageInfo.totalElements);
        }
    }, [project?.pageInfo.totalElements]);

    return (
        <>
            <div className="w-full">
                {Array.isArray(project?.data) &&
                    project?.data.map((v, i) => {
                        return <TempProject key={`member-${memberId}-project-${i}`} project={v} />;
                    })}
            </div>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </>
    );
};

const StudyOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: study } = useGetStudyOfMember({ memberId, page: curPage });

    useEffect(() => {
        if (study?.pageInfo.totalElements) {
            setTotalItems(study?.pageInfo.totalElements);
        }
    }, [study?.pageInfo.totalElements]);

    return (
        <>
            <div className="w-full">
                {Array.isArray(study?.data) &&
                    study?.data.map((v, i) => <TempStudy key={`member-${memberId}-study-${i}`} study={v} />)}
            </div>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </>
    );
};

const InfoOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: info, refetch: refetchInfo } = useGetInfoOfMember({ memberId, page: curPage });

    useEffect(() => {
        if (info?.pageInfo.totalElements) {
            setTotalItems(info?.pageInfo.totalElements);
        }
    }, [info?.pageInfo.totalElements]);

    const { fireToast, createToast, errorToast } = useToast();
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
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchInfo();
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

    return (
        <>
            <div className="w-full">
                {Array.isArray(info?.data) &&
                    info?.data.map((v, i) => (
                        <InfoItem
                            key={`member-${memberId}-info-${i}`}
                            info={v}
                            onClickDeleteHandler={onClickDeleteHandler}
                        />
                    ))}
            </div>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </>
    );
};

const QuestionOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: question, refetch: refetchQuestions } = useGetQuestionOfMember({ memberId, page: curPage });

    useEffect(() => {
        if (question?.pageInfo.totalElements) {
            setTotalItems(question?.pageInfo.totalElements);
        }
    }, [question?.pageInfo.totalElements]);

    const { fireToast, createToast, errorToast } = useToast();
    const { mutate: deleteQuestion } = useDeleteQuestion();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteQuestion(
                    { questionId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "질문이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchQuestions();
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

    return (
        <>
            <div className="w-full">
                {Array.isArray(question?.data) &&
                    question?.data.map((v, i) => (
                        <QuestionItem
                            key={`member-${memberId}-question-${i}`}
                            question={v}
                            onClickDeleteHandler={onClickDeleteHandler}
                        />
                    ))}
            </div>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </>
    );
};

function UserActivity({ memberId, tab }: { memberId: number; tab: "project" | "study" | "info" | "question" }) {
    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-12 shadow-md">
            {tab === "project" && <ProjectOfMember memberId={memberId} />}
            {tab === "study" && <StudyOfMember memberId={memberId} />}
            {tab === "info" && <InfoOfMember memberId={memberId} />}
            {tab === "question" && <QuestionOfMember memberId={memberId} />}
        </div>
    );
}

export default UserActivity;

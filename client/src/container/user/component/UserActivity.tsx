import { useState } from "react";
import {
    useGetProjectOfMember,
    useGetStudyOfMember,
    useGetInfoOfMember,
    useGetQuestionOfMember,
} from "@api/member-activity/hook";
import { useDeleteInfo } from "@api/info/hook";
import { useDeleteQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";
import ProjectItem from "@container/project/component/BoardList";
import StudyItem from "@container/study/component/BoardList";
import InfoItem from "@container/info/component/InfoItem";
import QuestionItem from "@container/question/component/QuestionItem";
import Pagination from "@component/Pagination";
import Typography from "@component/Typography";

const ProjectOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);

    const { data: project, refetch } = useGetProjectOfMember({ memberId, page: curPage });

    return (
        <>
            <div className="w-full">
                {project?.data && Array.isArray(project?.data) && project?.data.length > 0 ? (
                    <>
                        {project?.data.map((v, i) => (
                            <ProjectItem key={`member-${memberId}-study-${i}`} project={v} refetch={refetch} />
                        ))}
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography text={`작성한 프로젝트가 없습니다.`} type="Description" styles="mb-8" />
                    </div>
                )}
                {project?.data && Array.isArray(project.data) && project.data.length > 0 ? (
                    <Pagination
                        curPage={curPage}
                        setCurPage={setCurPage}
                        totalPages={project?.pageInfo.totalPages || 1}
                    />
                ) : null}
            </div>
        </>
    );
};

const StudyOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);

    const { data: study, refetch } = useGetStudyOfMember({ memberId, page: curPage });

    return (
        <>
            <div className="w-full">
                {study?.data && Array.isArray(study?.data) && study?.data.length > 0 ? (
                    <>
                        {study?.data.map((v, i) => (
                            <StudyItem key={`member-${memberId}-study-${i}`} study={v} refetch={refetch} />
                        ))}
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography text={`작성한 스터디가 없습니다.`} type="Description" styles="mb-8" />
                    </div>
                )}
                {study?.data && Array.isArray(study?.data) && study?.data.length > 0 && (
                    <Pagination
                        curPage={curPage}
                        setCurPage={setCurPage}
                        totalPages={study?.pageInfo.totalPages || 1}
                    />
                )}
            </div>
        </>
    );
};

const InfoOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);

    const { data: info, refetch: refetchInfo } = useGetInfoOfMember({ memberId, page: curPage });

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
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="w-full">
                {info?.data && Array.isArray(info?.data) && info.data.length > 0 ? (
                    info?.data.map((v, i) => (
                        <>
                            <InfoItem
                                key={`member-${memberId}-question-${i}`}
                                info={v}
                                onClickDeleteHandler={onClickDeleteHandler}
                            />
                        </>
                    ))
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography text={`작성한 질문게시글이 없습니다.`} type="Description" styles="mb-8" />
                    </div>
                )}
                {info?.data && Array.isArray(info?.data) && info.data.length > 0 && (
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={info?.pageInfo.totalPages || 1} />
                )}
            </div>
        </>
    );
};

const QuestionOfMember = ({ memberId }: { memberId: number }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);

    const { data: question, refetch: refetchQuestions } = useGetQuestionOfMember({ memberId, page: curPage });

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
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="w-full">
                {question?.data && Array.isArray(question?.data) && question.data.length > 0 ? (
                    question?.data.map((v, i) => (
                        <>
                            <QuestionItem
                                key={`member-${memberId}-question-${i}`}
                                question={v}
                                onClickDeleteHandler={onClickDeleteHandler}
                            />
                        </>
                    ))
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography text={`작성한 질문게시글이 없습니다.`} type="Description" styles="mb-8" />
                    </div>
                )}
                {question?.data && Array.isArray(question?.data) && question.data.length > 0 && (
                    <Pagination
                        curPage={curPage}
                        setCurPage={setCurPage}
                        totalPages={question?.pageInfo.totalPages || 1}
                    />
                )}
            </div>
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

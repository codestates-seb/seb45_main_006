import Typography from "@component/Typography";
import ProjectList from "@container/main/component/ProjectList";
import StudyList from "@container/main/component/StudyList";
import SkeletonUi from "./SkeletonUi";

import { useState } from "react";
import { useGetAllProjects } from "@api/project/hook";
import { useGetAllStudies } from "@api/study/hook";

const ChangeComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState("project");
    const { data: projects, isLoading: projectLoading } = useGetAllProjects({
        page: 1,
        size: 8,
        stack: "",
    });
    const { data: studies, isLoading: studyLoading } = useGetAllStudies({
        page: 1,
        size: 8,
        stack: "",
    });

    const handleProjectClick = () => {
        setSelectedComponent("project");
    };

    const handleStudyClick = () => {
        setSelectedComponent("study");
    };
    return (
        <>
            <div className="flex w-200 justify-around rounded-3xl border-2 border-solid border-borderline p-10">
                <span
                    className={`cursor-pointer ${
                        selectedComponent === "project" ? "text-project_point" : "hover:text-project_point"
                    }`}
                    onClick={handleProjectClick}
                >
                    프로젝트
                </span>
                <Typography type="Highlight" text="/" />
                <span
                    className={`cursor-pointer font-ganpan ${
                        selectedComponent === "study" ? "text-study_point" : "hover:text-study_point"
                    }`}
                    onClick={handleStudyClick}
                >
                    스터디
                </span>
            </div>
            <div className="flex flex-wrap">
                {(projectLoading || studyLoading) && (
                    <>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonUi key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
                {!projectLoading &&
                    selectedComponent === "project" &&
                    projects &&
                    projects.data &&
                    Array.isArray(projects.data) && (
                        <>
                            {projects.data.length > 0 ? (
                                projects.data
                                    .slice(0, 8)
                                    .map((v) => <ProjectList project={v} key={`project-${v.boardId}`} />)
                            ) : (
                                <div className="flex h-300 w-full items-center justify-center">
                                    <Typography
                                        type="Highlight"
                                        text="진행 중인 프로젝트가 없어요🥹 새로운 프로젝트를 만들어볼까요?"
                                    />
                                </div>
                            )}
                        </>
                    )}
                {selectedComponent === "study" && studies && studies.data && Array.isArray(studies.data) && (
                    <>
                        {studies.data.length > 0 ? (
                            studies.data.slice(0, 8).map((v) => <StudyList study={v} key={`study-${v.boardId}`} />)
                        ) : (
                            <div className="flex h-300 w-full items-center justify-center">
                                <Typography
                                    type="Highlight"
                                    text="진행 중인 스터디가 없어요🥹 새로운 스터디를 만들어볼까요?"
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ChangeComponent;

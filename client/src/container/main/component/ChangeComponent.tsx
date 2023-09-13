import Typography from "@component/Typography";
import ProjectList from "@container/main/component/ProjectList";
import StudyList from "@container/main/component/StudyList";
import { useState } from "react";
import { useGetAllProjects } from "@api/project/hook";
import { useGetAllStudies } from "@api/study/hook";

const ChangeComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState("project");
    const { projectsList } = useGetAllProjects();
    const { studiesList } = useGetAllStudies();

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
                    className={`cursor-pointer font-ganpan ${
                        selectedComponent === "project" ? "text-project_point" : "hover:text-project_point"
                    }`}
                    onClick={handleProjectClick}
                >
                    프로젝트
                </span>
                <Typography type="Highlight" text="/" styles="font-ganpan" />
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
                {selectedComponent === "project"
                    ? Array.isArray(projectsList) &&
                      projectsList.slice(0, 8).map((v) => <ProjectList project={v} key={`project-${v.boardId}`} />)
                    : Array.isArray(studiesList) &&
                      studiesList.slice(0, 8).map((v) => <StudyList study={v} key={`study-${v.boardId}`} />)}
            </div>
        </>
    );
};

export default ChangeComponent;

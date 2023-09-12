import Typography from "@component/Typography";
import ProjectList from "@container/main/component/ProjectList";
import StudyList from "@container/main/component/StudyList";
import { useState } from "react";
import { useGetAllProjects } from "@api/project/hook";
import { useGetAllStudies } from "@api/study/hook";

const ChangeComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState("project");
    const { data: projectsList } = useGetAllProjects();
    const { data: studiesList } = useGetAllStudies();

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
                    className={`cursor-pointer ${
                        selectedComponent === "study" ? "text-study_point" : "hover:text-study_point"
                    }`}
                    onClick={handleStudyClick}
                >
                    스터디
                </span>
            </div>
            <div className="flex">
                {selectedComponent === "project"
                    ? Array.isArray(projectsList) &&
                      projectsList.map((v) => <ProjectList project={v} key={`project-${v.boardId}`} />)
                    : Array.isArray(studiesList) &&
                      studiesList.map((v) => <StudyList study={v} key={`study-${v.boardId}`} />)}
            </div>
        </>
    );
};

export default ChangeComponent;

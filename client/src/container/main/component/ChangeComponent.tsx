import Typography from "@component/Typography";
import ProjectList from "@container/main/component/ProjectList";
import StudyList from "@container/main/component/StudyList";
import { useState } from "react";

const ChangeComponent = () => {
    const [selectedComponent, setSelectedComponent] = useState("project");
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
            {selectedComponent === "project" ? <ProjectList /> : <StudyList />}
        </>
    );
};

export default ChangeComponent;

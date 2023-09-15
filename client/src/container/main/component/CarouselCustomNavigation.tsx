import ProjectImg from "@assets/main/project_wide.jpg";
import StudyImg from "@assets/main/study_wide.jpg";
import BoardImg from "@assets/main/board_wide.jpg";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function CarouselCustomNavigation() {
    const navigate = useNavigate();
    const handleClickProject = () => {
        navigate("/projects");
    };
    const handleClickStudy = () => {
        navigate("/studies");
    };
    const handleClickBoard = () => {
        navigate("/infos");
    };
    return (
        <Carousel
            className="h-360 rounded-xl"
            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute left-4 top-150 h-40 w-80 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-32 w-32 text-main"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </IconButton>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 top-310 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "h-4 w-60 bg-main" : "h-4 w-30 bg-main/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute !right-4 top-150 h-40 w-80 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-32 w-32 text-main"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </IconButton>
            )}
        >
            <img
                src={ProjectImg}
                onClick={handleClickProject}
                className="h-300 w-full max-w-screen-xl cursor-pointer object-contain"
            />
            <img
                src={StudyImg}
                onClick={handleClickStudy}
                className="h-300 w-full max-w-screen-xl cursor-pointer object-contain"
            />
            <img
                src={BoardImg}
                onClick={handleClickBoard}
                className="h-300 w-full max-w-screen-xl cursor-pointer object-contain"
            />
        </Carousel>
    );
}

export default CarouselCustomNavigation;

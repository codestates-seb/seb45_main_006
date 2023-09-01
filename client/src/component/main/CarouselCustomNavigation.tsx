import ProjectImg from "@assets/main/project.svg";
import StudyImg from "@assets/main/study.svg";
import BoardImg from "@assets/main/board.svg";
import { Carousel, IconButton } from "@material-tailwind/react";

function CarouselCustomNavigation() {
    return (
        <Carousel
            className="rounded-xl"
            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute left-4 top-2/4 h-40 w-80 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-16 w-16 text-main"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </IconButton>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "h-4 w-40 bg-main" : "h-4 w-20 bg-main/50"
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
                    className="!absolute !right-4 top-2/4 h-40 w-80 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-16 w-16 text-main"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </IconButton>
            )}
        >
            <img src={ProjectImg} alt="image 1" className="h-300 w-full max-w-screen-xl object-cover" />
            <img src={StudyImg} alt="image 2" className="h-300 w-full max-w-screen-xl object-cover" />
            <img src={BoardImg} alt="image 3" className="h-300 w-full max-w-screen-xl object-cover" />
        </Carousel>
    );
}

export default CarouselCustomNavigation;

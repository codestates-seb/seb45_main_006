import CarouselCustomNavigation from "@container/main/component/CarouselCustomNavigation";
import ChangeComponent from "@container/main/component/ChangeComponent";
import { getRandomIDNotTracing } from "@util/random-helper";

function Main() {
    console.log(getRandomIDNotTracing());
    return (
        <>
            <CarouselCustomNavigation />
            <ChangeComponent />
        </>
    );
}

export default Main;

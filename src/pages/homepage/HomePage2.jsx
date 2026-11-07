import ArthiSchedule from "../../components/home2/ArthiSchedule";
import HeroBanner from "../../components/home2/Banner";
import DivinePresence from "../../components/home2/DivinePresence";
import Donation from "../../components/home2/Donation";
import Gallery from "../../components/home2/Gallery";
import Luminaries from "../../components/home2/Luminaries";
import UpcomingEvent from "../../components/home2/UpcomingEvent";

const HomePage2 = () => {
    return (
        <div>
            <HeroBanner />
            <ArthiSchedule />
            <DivinePresence />
            <Luminaries />
            <UpcomingEvent />
            <Gallery />
            <Donation />
        </div>
    );
};

export default HomePage2;
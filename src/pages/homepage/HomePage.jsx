import DivinePresence from "../../components/home/AboutShyama";
import ArthiSchedule from "../../components/home/ArthiSchedule";
import HeroBanner from "../../components/home/Banner";
import Donation from "../../components/home/Donation";
import Gallery from "../../components/home/Gallery";
import UpcomingEvent from "../../components/home/UpcomingEvent";

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <ArthiSchedule />
            <DivinePresence />
            <UpcomingEvent />
            <Gallery />
            <Donation />
        </div>
    );
};

export default HomePage;
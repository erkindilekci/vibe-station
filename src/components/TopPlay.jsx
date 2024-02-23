import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <div className="mb-2 flex w-full flex-row items-center rounded-lg p-4 py-2 hover:bg-[#ffb54c]">
        <h3 className="mr-3 text-base font-bold text-white">{i + 1}.</h3>
        <div className="flex flex-1 flex-row items-center justify-between">
            <img src={song?.images?.coverart} alt={song?.title} className="h-20 w-20 rounded-lg"/>
            <div className="mx-3 flex flex-1 h-full flex-col items-start justify-center">
                <Link to={`/songs/${song?.key}`}>
                    <p className="text-xl font-medium text-white">{song?.title}</p>
                </Link>
                <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                    <p className="text-base text-gray-200 mt-1">{song?.subtitle}</p>
                </Link>
            </div>
        </div>
        <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
        />
    </div>
);

const TopPlay = () => {
    const dispatch = useDispatch();
    const {
        activeSong,
        isPlaying
    } = useSelector(state => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef();

    useEffect(() => divRef.current.scrollIntoView({ behavior: 'smooth' }));

    const topPlays = data?.slice(0, 5);

    const handlePauseClick = () => dispatch(playPause(false));

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div ref={divRef} className="mb-6 ml-0 flex max-w-full flex-1 flex-col xl:max-w-[500px] xl:mb-0 xl:ml-6">
            <div className="flex w-full flex-col">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Top Charts</h2>
                    <Link to="/top-charts">
                        <p className="cursor-pointer text-base text-gray-200">See more</p>
                    </Link>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    {topPlays?.map((song, i) => (
                        <TopChartCard
                            key={song.key}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, i)}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-8 flex w-full flex-col">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Top Artists</h2>
                    <Link to="/top-artists">
                        <p className="cursor-pointer text-base text-gray-200">See more</p>
                    </Link>
                </div>

                <Swiper
                    slidesPerView="auto"
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className="mt-4"
                >
                    {topPlays?.map((song, i) => (
                        <SwiperSlide
                            key={song.key}
                            style={{ width: '25%', height: 'auto' }}
                            className="rounded-full shadow-lg animate-slideright"
                        >
                            <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                                <img src={song?.images?.background} alt="artist image"
                                     className="w-full rounded-full object-cover"/>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopPlay;

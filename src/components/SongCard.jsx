import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
    const dispatch = useDispatch();

    const handlePauseClick = () => dispatch(playPause(false));

    const handlePlayClick = () => {
        dispatch(setActiveSong({
            song,
            data,
            i
        }));
        dispatch(playPause(true));
    };

    return (
        <div
            className="flex flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm w-[250px] animate-slideup">
            <div className="relative h-56 w-full group">
                <div
                    className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img src={song.images?.coverart} alt="song image"/>
            </div>
            <div className="mt-4 flex flex-col">
                <p className="truncate text-lg font-semibold text-white">
                    <Link to={`/songs/${song?.key}`}>{song.title}</Link>
                </p>
                <p className="mt-1 truncate text-sm text-gray-300">
                    <Link
                        to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard;

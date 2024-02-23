import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid, id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

    if (isFetchingSongDetails && isFetchingRelatedSongs) return <Loader title="Searching song details"/>;

    if (error) return <Error/>;

    const handlePauseClick = () => dispatch(playPause(false));

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} songData={songData}/>

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Information</h2>
                <div className="mt-5">
                    <p className="text-gray-200 text-base my-1">
                        Album: {songData?.sections[0]?.metadata?.find((item) => item.title === 'Album')?.text}
                    </p>
                    <p className="text-gray-200 text-base my-1">
                        Label: {songData?.sections[0]?.metadata?.find((item) => item.title === 'Label')?.text}
                    </p>
                    <p className="text-gray-200 text-base my-1">
                        Released: {songData?.sections[0]?.metadata?.find((item) => item.title === 'Released')?.text}
                    </p>
                    <p className="text-gray-200 text-base my-1">
                        Genre: {songData?.genres?.primary}
                    </p>
                </div>
            </div>

            <RelatedSongs
                data={data}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default SongDetails;

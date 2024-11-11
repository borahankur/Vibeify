import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton"
import { useMusicStore } from "@/store/useMusicStore"
import PlayButton from "./PlayButton"

const FeaturedSection = () => {

    const { isLoading, error, featuredSongs } = useMusicStore()
    if (isLoading)
        return <FeaturedGridSkeleton />

    if (error)
        return <p className="text-red-500 mb-4 text-lg">{error}</p>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredSongs.map((song) => (
                <div
                    key={song._id}
                    className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
                >
                    <img src={song.imageUrl} alt={song.title} className="size-16 sm:size-20 object-cover flex-shrink-0" />
                    <div className="flex-1 p-4">
                        <div className="font-medium truncate">{song.title}</div>
                        <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                    </div>
                    
                    <PlayButton song={song} /> 
                </div>
            ))}
        </div>
    )
}

export default FeaturedSection
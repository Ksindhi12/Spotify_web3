import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const SongItem = ({name, image, desc, id}) => {

  const {playWithId} = useContext(PlayerContext);

  return (
    <div onClick={() => playWithId(id)} className="w-[204px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="w-[180px] h-[180px] rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1 w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
        <p className="text-slate-200 text-sm w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{desc}</p>
    </div>
  )
}

export default SongItem
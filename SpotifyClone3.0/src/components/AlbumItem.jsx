import { useNavigate } from "react-router-dom"

const AlbumItem = ({image, name, desc, id}) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/album/${id}`)} className="min-w-[180] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="w-[180px] h-[180px] rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1 w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
        <p className="text-slate-200 text-sm w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">{desc}</p>
    </div>
  )
}

export default AlbumItem
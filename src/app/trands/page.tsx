import TrandsMain from "./components/trands";
import { SongService } from "@/services/song.service"

async function getTopSongs() {

    const { data: topSongs } = await SongService.getMostPopular() 
  
    return { topSongs, revalidate: 60}      
}

async function Trands() {
  const data = await getTopSongs()

  return (      
      <TrandsMain topSongs={data.topSongs} />
  )    
}

export default Trands

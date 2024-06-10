import getUser from "@/components/getUser";
import ArtistMain from "./components/artist";
import { IPageIdParam, TypeParamId } from "@/interfaces/page-params";

async function ArtistPage({params}: IPageIdParam) {
  const data = await getUser(params)

  return (    
    <div className="mt-10">
      <ArtistMain artist={data.artist}/>      
    </div>
  )    
}

export default ArtistPage

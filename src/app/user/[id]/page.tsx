import getUser from "@/components/getUser";
import UserMain from "./components/user";
import { IPageIdParam, TypeParamId } from "@/interfaces/page-params";

async function ArtistPage({params}: IPageIdParam) {
  const data = await getUser(params)

  return (    
    <div className="mt-10">
      <UserMain artist={data.artist}/>      
    </div>
  )    
}

export default ArtistPage

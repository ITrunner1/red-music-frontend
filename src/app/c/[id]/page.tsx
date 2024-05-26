import ArtistMain from "./components/artist";
import { IPageIdParam, TypeParamId } from "@/interfaces/page-params";
import { UserService } from "@/services/user.service";

export async function generateStaticParams() {
  const users = await UserService.getAll()

  const paths = users.data.map(user => ({
    params: { id: user.id }
  }))

  return paths
}    

export async function getUserSongs(params: TypeParamId) {

  const { data: artist } = await UserService.getUser(params.id)  

  return { artist }        
}    

async function ArtistPage({params}: IPageIdParam) {
  const data = await getUserSongs(params)

  return (    
    <div className="mt-10">
      <ArtistMain artist = { data.artist }/>
    </div>
  )    
}

export default ArtistPage

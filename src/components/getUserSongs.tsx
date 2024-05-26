import { UserService } from "@/services/user.service";

export const getStaticPaths = async () => {

    const { data: users } = await UserService.getAll()
    const paths = users.map(user => ({
      params: { id: user.id }
    }))
  
    return { paths, fallback: 'blocking' }
  }    
  
export const getUserSongs = async ({ params }) => {
  
    const { data: artist } = await UserService.getUser(params.id)  
  
    return { artist }        
}    
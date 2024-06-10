
import { TypeParamId } from "@/interfaces/page-params";
import { UserService } from "@/services/user.service";

async function generateStaticParams() {
    const users = await UserService.getAll()

    const paths = users.data.map(user => ({
        params: { id: user.id }
    }))

    return paths
}

async function getUserSongs(params: TypeParamId) {

    const { data: artist } = await UserService.getUser(params.id)

    return { artist }
}    

export default getUserSongs
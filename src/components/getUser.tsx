
import { TypeParamId } from "@/interfaces/page-params";
import { UserService } from "@/services/user.service";

async function getUser(params: TypeParamId) {
    const { data: artist } = await UserService.getUser(params.id)

    return { artist }
}    

export default getUser
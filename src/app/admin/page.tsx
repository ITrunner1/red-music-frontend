import { PlaylistService } from "@/services/playlist.service";
import { SongService } from "@/services/song.service";
import AdminPanel from "./components/admin-panel";

export const revalidate = 60;

async function AdminPage() {
  return (
    <AdminPanel />
  )
}

export default AdminPage
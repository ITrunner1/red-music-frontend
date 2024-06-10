import getUserSongs from "@/components/getUserSongs";
import ArtistMain from "./components/artist";
import { IPageIdParam } from "@/interfaces/page-params";

async function ArtistPage({ params }: IPageIdParam) {
  const data = await getUserSongs(params)

  return (
    <div className="mt-10">
      {/* <ArtistMain user={data.artist} /> */}
    </div>
  )
}

export default ArtistPage

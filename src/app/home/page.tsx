import getSongs from "@/components/getSongs";
import Home from "./components/home";

async function HomePage() {
  const data = await getSongs()

  return (
    <main className="">
      <Home
        songs={data.songs}
        randomSong={data.randomSong}
        topSong={data.topSong}
        playlists={data.playlists} 
        length={data.length}
        />
    </main>
  )
}

export default HomePage

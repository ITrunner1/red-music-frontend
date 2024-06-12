import getSongs from "@/components/getSongs";
import Home from "./components/home";

async function HomePage() {
  const data = await getSongs()

  return (
    <main className="min-h-[calc(100vh-57px-97px)]">
      <Home
        songs={data.songs}
        randomSong={data.randomSong}
        topSong={data.topSong}
        newPlaylists={data.newPlaylists} 
        length={data.length}
        />
    </main>
  )
}

export default HomePage

import RecentBlog from "@/components/RecentBlog"
import HeroSection from "../components/HeroSection"
import PopularAuthors from "@/components/PopularAuthors"

function Home (){
  return (
    <div className='pt-20'>
     <HeroSection/>
     <RecentBlog/>
     <PopularAuthors/>
    </div>
  )
}

export default Home

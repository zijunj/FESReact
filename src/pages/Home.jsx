import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import homePagePicture from "../assets/homePagePicture.png";

function Home() {
  return (
    <section id="header home">
      <Nav variant="home" />

      <div className="search home">
        <h1 className="search-title home">
          Find Your Movie Here. Movies are provided by OMDb API
        </h1>
        <SearchBar />
      </div>
      <div className="homepagePicture">
        <img src={homePagePicture} alt="homePagePicture" />
      </div>
    </section>
  );
}

export default Home;

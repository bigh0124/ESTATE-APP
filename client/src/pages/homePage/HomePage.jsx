import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Welcome to our platform! Here, you can easily find the ideal real estate and secure your dream place to
            live. Whether you're looking to buy, rent, or invest, we offer a wide range of real estate options,
            including houses, apartments, villas, and commercial properties
          </p>
          <SearchBar />
          <div className="info">
            <div className="info-item">
              <h2>16+</h2>
              <span>Years of Experience</span>
            </div>
            <div className="info-item">
              <h2>200</h2>
              <span>Award Gained</span>
            </div>
            <div className="info-item">
              <h2>1200+</h2>
              <span>Property Ready</span>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;

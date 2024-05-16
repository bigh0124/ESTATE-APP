import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import "./singlePage.scss";
import { singlePostData, userData } from "../../lib/dummyData";

const SinglePage = () => {
  const { images, title, address, description, price, latitude, longitude } = singlePostData;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{title}</h1>
                <p>
                  <img src="/pin.png" />
                  {address}
                </p>
                <span className="price">${price}</span>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="item">
              <img src="/utility.png" alt="" />
              <div className="text">
                <h3 className="sub-title">Utilities</h3>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="item">
              <img src="/pet.png" alt="" />
              <div className="text">
                <h3 className="sub-title">Pet Policy</h3>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="item">
              <img src="/fee.png" alt="" />
              <div className="text">
                <h3 className="sub-title">Property Fees</h3>
                <p>must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="infoBoxes">
            <div className="box">
              <img src="/size.png" alt="" />
              <p>80sqm(861sqft)</p>
            </div>
            <div className="box">
              <img src="/bed.png" alt="" />
              <p>2 bedroom</p>
            </div>
            <div className="box">
              <img src="/bath.png" alt="" />
              <p>1 bathroom</p>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="item">
              <img src="/school.png" alt="" />
              <div className="text">
                <h3 className="sub-title">School</h3>
                <p>250m away</p>
              </div>
            </div>
            <div className="item">
              <img src="/bus.png" alt="" />
              <div className="text">
                <h3 className="sub-title">Bus Stop</h3>
                <p>100m away</p>
              </div>
            </div>
            <div className="item">
              <img src="/fee.png" alt="" />
              <div className="text">
                <h3 className="sub-title">Restaurant</h3>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" /> Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" /> Save a Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;

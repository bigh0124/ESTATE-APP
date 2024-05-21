import "./card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const { id, title, images, address, price, bedroom, bathroom } = item;
  return (
    <div className="card">
      <Link to={`/${id}`} className="imgContainer">
        <img src={images[0]} alt="img" />
      </Link>
      <div className="infoContainer">
        <h1>
          <Link to={`/${id}`}>{title}</Link>
        </h1>
        <p>
          <img src="/pin.png" alt="" />
          {address}
        </p>
        <span className="price">${price}</span>
        <div className="button-wrapper">
          <div className="rooms">
            <span>
              <img src="/bed.png" alt="" />
              {bedroom}
              <span>bedroom</span>
            </span>
            <span>
              <img src="/bath.png" alt="" />
              {bathroom}
              <span>bathroom</span>
            </span>
          </div>
          <div className="buttons">
            <button>
              <img src="/save.png" alt="" />
            </button>
            <button>
              <img src="/chat.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

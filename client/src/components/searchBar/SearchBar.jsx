import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = (e) => {
    setQuery((prev) => ({
      ...prev,
      type: e.target.name,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("type", query.type);
    urlParams.set("city", query.city);
    urlParams.set("minPrice", query.minPrice);
    urlParams.set("maxPrice", query.maxPrice);
    const searchQuery = urlParams.toString();
    navigate(`/list?${searchQuery}`);
  };

  return (
    <div className="searchBar">
      <div className="type">
        <button name="buy" onClick={handleClick} className={query.type === "buy" ? "active" : ""}>
          Buy
        </button>
        <button name="rent" onClick={handleClick} className={query.type === "rent" ? "active" : ""}>
          Rent
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="city" placeholder="City Location" onChange={handleFormChange} value={query.city} />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={100000000}
          placeholder="Min Price"
          onChange={handleFormChange}
          value={query.minPrice}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={100000000}
          placeholder="Max Price"
          onChange={handleFormChange}
          value={query.maxPrice}
        />
        <button>
          <img src="/search.png" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

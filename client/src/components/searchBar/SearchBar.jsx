import { useState } from "react";
import "./searchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleClick = (e) => {
    setQuery((prev) => ({
      ...prev,
      type: e.target.name,
    }));
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
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input type="number" name="minPrice" min={0} max={100000000} placeholder="Min Price" />
        <input type="number" name="maxPrice" min={0} max={100000000} placeholder="Max Price" />
        <button>
          <img src="/search.png" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

import { useState } from "react";
import "./filter.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ filterQuery: filterQueryFromParent }) => {
  const [filterQuery, setFilterQuery] = useState({
    ...filterQueryFromParent,
    property: "",
    bedroom: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFilterQuery((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(filterQuery);
    searchParams.set("type", filterQuery.type);
    searchParams.set("city", filterQuery.city);
    searchParams.set("property", filterQuery.property);
    searchParams.set("bedroom", filterQuery.bedroom);
    searchParams.set("minPrice", filterQuery.minPrice);
    searchParams.set("maxPrice", filterQuery.maxPrice);
    console.log(searchParams.toString());
    navigate(`/list?${searchParams.toString()}`);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{filterQuery.city}</b>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="location">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            placeholder="City Location"
            id="city"
            name="city"
            onChange={handleFormChange}
            value={filterQuery.city}
          />
        </div>
        <div className="details">
          <div className="item">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" onChange={handleFormChange} value={filterQuery.type}>
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select id="property" name="property" onChange={handleFormChange} value={filterQuery.property}>
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              max={100000000}
              min={0}
              placeholder="any"
              onChange={handleFormChange}
              value={filterQuery.minPrice}
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              max={100000000}
              min={0}
              placeholder="any"
              onChange={handleFormChange}
              value={filterQuery.maxPrice}
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              max={100000000}
              min={0}
              placeholder="any"
              onChange={handleFormChange}
              value={filterQuery.bedroom}
            />
          </div>
          <button type="submit">
            <img src="/search.png" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;

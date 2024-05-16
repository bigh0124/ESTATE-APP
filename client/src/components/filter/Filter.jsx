import "./filter.scss";

const Filter = () => {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <form>
        <div className="location">
          <label htmlFor="city">Location</label>
          <input type="text" placeholder="City Location" id="city" name="city" />
        </div>
        <div className="details">
          <div className="item">
            <label htmlFor="type">Type</label>
            <select id="type" name="type">
              <option value="">any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select id="property" name="property">
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" id="minPrice" name="minPrice" max={100000000} min={0} placeholder="any" />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" id="maxPrice" name="maxPrice" max={100000000} min={0} placeholder="any" />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input type="number" id="bedroom" name="bedroom" max={100000000} min={0} placeholder="any" />
          </div>
          <button>
            <img src="/search.png" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;

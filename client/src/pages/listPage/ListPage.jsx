import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import { listData } from "../../lib/dummyData.js";
import Map from "../../components/map/Map.jsx";

const ListsPage = () => {
  const lists = listData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {lists.map((list) => {
            return <Card key={list.id} item={list} />;
          })}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={lists} />
      </div>
    </div>
  );
};

export default ListsPage;

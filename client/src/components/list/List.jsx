import { listData } from "../../lib/dummyData";
import Card from "../card/Card";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      {listData.map((item) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
};

export default List;

import Card from "../card/Card";
import "./list.scss";

const List = ({ posts }) => {
  return (
    <div className="list">
      {posts.map((item) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
};

export default List;

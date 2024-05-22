import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map.jsx";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest.js";

const ListsPage = () => {
  const {
    data: lists,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["getPosts"],
    queryFn: async () => {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        const res = await apiRequest.get(`/post/getPosts?${searchQuery}`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(lists);
  if (isPending) return <div>Loading...</div>;

  return (
    lists &&
    isSuccess && (
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
    )
  );
};

export default ListsPage;

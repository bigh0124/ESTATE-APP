import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map.jsx";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest.js";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ListsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterQuery, setFilterQuery] = useState({
    type: searchParams.get("type"),
    city: searchParams.get("city"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    property: searchParams.get("property"),
    bedroom: searchParams.get("bedroom"),
  });

  const {
    data: lists,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: async () => {
      try {
        const res = await apiRequest.get(`/post/getPosts?${searchParams.toString()}`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    queryKey: ["getPosts"],
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  if (isPending) return <div>Loading...</div>;

  return (
    lists &&
    isSuccess && (
      <div className="listPage">
        <div className="listContainer">
          <div className="wrapper">
            <Filter filterQuery={filterQuery} />
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

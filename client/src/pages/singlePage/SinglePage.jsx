import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import "./singlePage.scss";
import { singlePostData, userData } from "../../lib/dummyData";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SinglePage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: "getPost",
    mutationFn: async () => {
      try {
        const res = await apiRequest.get(`/post/getPost/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  if (isPending) return <div>Loading...</div>;

  return (
    isSuccess &&
    post && (
      <div className="singlePage">
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <p>
                    <img src="/pin.png" />
                    {post.address}
                  </p>
                  <span className="price">${post.price}</span>
                </div>
                <div className="user">
                  <img src={post.user.avatar || "/noavatar.jpg"} alt="" />
                  <span>{post.user.username}</span>
                </div>
              </div>
              <div className="bottom">{post.postDetail.desc}</div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="item">
                <img src="/utility.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">Utilities</h3>
                  <p>{post.postDetail.utilities}</p>
                </div>
              </div>
              <div className="item">
                <img src="/pet.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">Pet Policy</h3>
                  <p>{post.postDetail.pet}</p>
                </div>
              </div>
              <div className="item">
                <img src="/fee.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">Property Fees</h3>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <p className="title">Room Sizes</p>
            <div className="infoBoxes">
              <div className="box">
                <img src="/size.png" alt="" />
                <p>{post.postDetail.size} sqm</p>
              </div>
              <div className="box">
                <img src="/bed.png" alt="" />
                <p>{post.bedroom} bedroom</p>
              </div>
              <div className="box">
                <img src="/bath.png" alt="" />
                <p>{post.bathroom} bathroom</p>
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="item">
                <img src="/school.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">School</h3>
                  <p>{post.postDetail.school}m away</p>
                </div>
              </div>
              <div className="item">
                <img src="/bus.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">Bus Stop</h3>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="item">
                <img src="/fee.png" alt="" />
                <div className="text">
                  <h3 className="sub-title">Restaurant</h3>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" /> Send a Message
              </button>
              <button>
                <img src="/save.png" alt="" /> Save a Place
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SinglePage;

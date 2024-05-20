import "./newPostPage.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    address: "",
    description: "",
    city: "",
    bedroom: 0,
    bathroom: 0,
    latitude: "",
    longitude: "",
    type: "rent", // default value
    property: "apartment", // default value
    utilities: "owner", // default value
    pet: "allowed", // default value
    income: "",
    size: 0,
    school: 0,
    bus: 0,
    restaurant: 0,
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "number") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: parseInt(value, 10),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  function handleQuillChange(value, delta, source, editor) {
    if (source === "user") {
      setFormData((prevState) => ({
        ...prevState,
        description: editor.getHTML(),
      }));
    }
  }

  const { mutate, isPending, isError } = useMutation({
    mutationKey: "addPost",
    mutationFn: async () => {
      const { description, size, school, bus, restaurant, income, utilities, pet, ...postData } = formData;
      try {
        const res = await apiRequest.post("/post/addPost", {
          postData: {
            ...postData,
            images,
          },
          postDetail: {
            desc: description,
            size: Number(size),
            school: Number(school),
            bus,
            restaurant,
            income,
            utilities,
            pet,
          },
        });
        navigate(`/${res.data.id}`);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    mutate();
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleFormSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" value={formData.description} onChange={handleQuillChange} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                value={formData.bedroom}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                value={formData.bathroom}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" value={formData.latitude} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property" value={formData.property} onChange={handleInputChange}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" value={formData.utilities} onChange={handleInputChange}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" value={formData.pet} onChange={handleInputChange}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                value={formData.income}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" value={formData.size} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                id="school"
                name="school"
                type="number"
                value={formData.school}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" value={formData.bus} onChange={handleInputChange} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                value={formData.restaurant}
                onChange={handleInputChange}
              />
            </div>
            <button className="sendButton" disabled={isPending}>
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((img) => (
          <img src={img} alt="" key={img} />
        ))}
        <UploadWidget
          uwConfig={{
            cloudName: "dtkepckgq",
            uploadPreset: "ESTATEAPP",
            multiple: true,
            maxImageFileSize: 2000000,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;

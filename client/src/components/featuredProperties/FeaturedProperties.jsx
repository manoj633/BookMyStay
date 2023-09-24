import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4"
  );
  console.log(data);
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/355820658.webp?k=3041bfcb323c4d25dfc4af5807eb7ff64d87fec57a18131daa085ed5abed8f16&o=",
    "https://cf.bstatic.com/xdata/images/hotel/square600/484047777.webp?k=06267c6643465c4de525bd9e5ff5f1513f50ef3b4afac5a031def7bedf5b5d85&o=",
  ];
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item, index) => (
            <div className="fpItem" key={index}>
              <img src={images[index]} alt="" className="fpImg" />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">
                Starting from ${item?.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

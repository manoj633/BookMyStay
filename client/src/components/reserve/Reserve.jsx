import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import "./reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reserve({ setOpen, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavilableDates?.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/api/rooms/availability/${roomId}`, {
            dates: allDates,
          });
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => {
            setOpen(false);
          }}
        />
        {loading ? (
          "Loading..."
        ) : (
          <>
            <span>Select your rooms:</span>
            {data.map((item, i) => {
              return (
                <>
                  <div className="rItem" key={i}>
                    <div className="rItemInfo">
                      <div className="rTitle">{item.title}</div>
                      <div className="rDesc">{item.description}</div>
                      <div className="rMax">
                        Max people : <b>{item.maxPeople}</b>
                      </div>
                      <div className="rPrice">{item.price}$</div>
                    </div>
                    <div className="rSelectRooms">
                      {item.roomNumbers.map((roomNumber) => (
                        <div className="room" key={roomNumber._id}>
                          <label>{roomNumber.number}</label>
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })}
            <button className="rButton" onClick={handleClick}>
              Reserve Now!
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Reserve;

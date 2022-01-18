import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    const response = await axios.get(
      "https://coded-task-axios-be.herokuapp.com/rooms"
    );
    setRooms(response.data);
  };

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms(response.data);
    } catch (error) {
      alert("soory it wasnt added");
    }
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      setRooms(rooms.filter((Element) => Element.id !== id));
    } catch (error) {
      alert("soory it wasnt deleted");
    }
  };
  const updateRoom = async (room) => {
    // to do : call BE to update a room
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${room.id}`,
        room
      );
      let updatedData = rooms.map((Element) =>
        Element.id === room.id ? response.data : Element
      );
      setRooms(updatedData);
    } catch (error) {
      alert("soory it wasnt deleted");
    }
  };
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

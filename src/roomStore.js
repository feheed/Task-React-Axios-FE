import axios from "axios";
import { makeObservable, observable, action } from "mobx";

class RoomStore {
  rooms = [];

  constructor() {
    makeObservable(this, {
      rooms: observable,
      fetchRooms: action,
      createRoom: action,
      deleteRoom: action,
      updateRoom: action,
      messageRoom: action,
    });
  }

  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
    } catch (error) {
      alert("error fetching");
    }
  };

  createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.rooms.push(response.data);
    } catch (error) {
      alert("soory it wasnt added");
    }
  };

  deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      this.rooms = this.rooms.filter((Element) => Element.id !== id);
    } catch (error) {
      alert("soory it wasnt deleted");
    }
  };
  updateRoom = async (room) => {
    // to do : call BE to update a room
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${room.id}`,
        room
      );
      let updatedData = this.rooms.map((Element) =>
        Element.id === this.rooms.id ? response.data : Element
      );
      this.rooms = updatedData;
    } catch (error) {
      alert("soory it wasnt deleted");
    }
  };
  messageRoom = async (msg, roomId) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`,
        msg
      );
      this.rooms.map((Element) =>
        Element.id === roomId ? Element.messages.push(response.data) : Element
      );
    } catch (error) {
      alert("soory it wasnt deleted");
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;

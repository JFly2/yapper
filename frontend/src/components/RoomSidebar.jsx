import "../styles/RoomSideBar.css";
import { useNavigate } from "react-router-dom";

export function RoomSidebar({roomInput, setRoomInput, joinRoom, joinedRooms, activeRoomId, isConnected}) {

    const navigate = useNavigate();

    function handleJoinRoom(event) {
        event.preventDefault();

        if (roomInput.trim() !== "") {
            joinRoom(roomInput.trim());
            setRoomInput("");
        }
    }

    function handleLogOut(){
        localStorage.removeItem("jwt-token");
        navigate("/login")
    }

    return (

        <aside
            className="room-sidebar"
        >

            <h2 className="sidebar-heading">
                Rooms
            </h2>

            <input

                className="room-input"

                type="text"

                value={roomInput}

                onChange={(event) =>

                    setRoomInput(
                        event.target.value
                    )
                }
            />

            <button

                className="join-button"

                onClick={
                    handleJoinRoom
                }

                disabled={
                    !roomInput.trim()
                }
            >
                {isConnected ? "Join Room": "Connecting..."}
            </button>

            <div>

                <p
                    className="joined-rooms"
                >
                    JOINED ROOMS
                </p>

                {joinedRooms.map((room) => (
                    <button
                        key={room}
                        className={
                            room === activeRoomId
                                ? "room-item active-room"
                                : "room-item"
                        }
                    onClick={() => joinRoom(room)}
                >
                        Room {room}
                    </button>
                        ))}
            </div>

            <button className={"logout-button"} onClick={handleLogOut}>Log Out</button>
        </aside>
    );
}

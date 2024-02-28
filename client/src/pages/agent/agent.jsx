import "./agent.css";
import Sidebar from "./sidebar";
import Conversation from "./conversation";
import Chatbox from "./chatbox";
import CustomerDetail from "./customerDetail";

function ChatRoom() {
  return (
    <div className="layout">
      <Sidebar />
      <Conversation />
      <Chatbox />
      <CustomerDetail />
    </div>
  );
}

export default ChatRoom;

import {
  faBarsStaggered,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Conversation() {
  const handleClick = () => {
    document.getElementById("conversation").classList.toggle("expand");
  };
  const handleRefresh = () => {
    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.classList.add("fa-spin");
    setTimeout(() => {
      refreshBtn.classList.remove("fa-spin");
    }, 3000);
  };
  return (
    <aside id="conversation" className="expand">
      <div className="d-flex justify-content-between conversation-header">
        <div className="d-flex">
          <FontAwesomeIcon
            type="button"
            id="toggle-btn"
            icon={faBarsStaggered}
            onClick={handleClick}
            size="lg"
          />
          <div className="conversation-logo">Conversation</div>
        </div>
        <FontAwesomeIcon
          type="button"
          icon={faRotateRight}
          size="lg"
          id="refresh-btn"
          onClick={handleRefresh}
        />
      </div>
      <div className="conversation-body text-center">Messages</div>
    </aside>
  );
}

export default Conversation;

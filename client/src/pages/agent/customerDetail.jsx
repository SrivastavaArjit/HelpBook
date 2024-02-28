import { faCircle, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomerDetail() {
  return (
    <div className="customer-container">
      <div className="customer-header">
        <img
          src="./avatar.jpg"
          className="rounded-circle"
          style={{ width: "60px", marginBottom: "20px" }}
          alt="Avatar"
        />
        <div className="about-customer text-center ">
          <h5>Username</h5>
          <p>
            <FontAwesomeIcon icon={faCircle} className="status-icon" />
            Offline
          </p>
        </div>
        <div className="btn-container">
          <button type="button" className="btn btn-outline-secondary btn-sm">
            <FontAwesomeIcon
              icon={faPhone}
              rotation={90}
              size="sm"
              style={{ marginRight: "5px" }}
            />
            Call
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm">
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              style={{ marginRight: "6px" }}
            />
            Profile
          </button>
        </div>
      </div>
      <div className="customer-footer">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Customer details</h6>
            <p className="card-text"></p>
            <a href="#" style={{ textDecoration: "none" }}>
              View more details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;

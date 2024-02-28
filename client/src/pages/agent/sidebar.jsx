import {
  faComments,
  faUserGroup,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";

function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const handleClick = (index) => {
    setActiveLink(index);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="icon-container">
          <img
            src="./logo.webp"
            alt="logo"
            width={33}
            height={33}
            style={{ borderRadius: "3px" }}
          />
        </div>
        <Navlink index={0} activeLink={activeLink} onClick={handleClick}>
          <FontAwesomeIcon icon={faComments} size="lg" />
        </Navlink>
        <Navlink
          index={1}
          activeLink={activeLink}
          onClick={handleClick}
          faIcon={faUserGroup}
        >
          <FontAwesomeIcon icon={faUserGroup} size="lg" />
        </Navlink>
        <Navlink
          index={2}
          activeLink={activeLink}
          onClick={handleClick}
          faIcon={faChartLine}
        >
          <FontAwesomeIcon icon={faChartLine} size="lg" />
        </Navlink>
      </div>
      <div className="sidebar-footer">
        <div className="icon-container">
          <img
            src="./avatar.jpg"
            className="rounded-circle"
            style={{ width: "40px" }}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
}

const Navlink = ({ index, activeLink, onClick, children }) => {
  const handleClick = () => {
    onClick(index);
  };
  return (
    <div
      className={
        index === activeLink ? "icon-container bg-white" : "icon-container"
      }
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Navlink.propTypes = {
  index: PropTypes.number.isRequired,
  activeLink: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Sidebar;

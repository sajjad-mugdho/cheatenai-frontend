import React from "react";

const SingleRightPanel = ({ RightPanelData }) => {
  console.log(RightPanelData);

  return (
    <>
      {RightPanelData.map((item, index) => (
        <li
          className={`history-box ${item.isActive ? "active" : ""}`}
          key={index}
        >
          {item.title}
          <div className="dropdown history-box-dropdown">
            <button
              type="button"
              className="more-info-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="feather-more-horizontal"></i>
            </button>
            <ul className="dropdown-menu">
              {item?.Blog.map((innerItem, innerIndex) => (
                <li key={innerIndex}>
                  <a className="dropdown-item" href="#">
                    <i className={`feather-${innerItem.icon}`}></i>{" "}
                    {innerItem.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </>
  );
};

export default SingleRightPanel;

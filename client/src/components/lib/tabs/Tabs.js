import React, { useEffect, useState } from "react";
import qs from "qs";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsersPictures, getUsersFavorites } from "../../actions/user";

const Tabs = ({ id, paths }) => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    switch (currentTab) {
      case "favorites":
        dispatch(getUsersFavorites(id));
        break;
      default:
        dispatch(getUsersPictures(id));
    }
  }, [currentTab, id, dispatch]);

  return (
    <div className="tabs">
      <ul>
        {paths.map((path, i) => {
          return (
            <li key={path}>
              <NavLink
                to={{
                  pathname: `/users/${id}/`,
                  search: `tab=${path}`
                }}
                className="unselected"
                activeClassName="selected"
                isActive={(match, location) => {
                  const queries = qs.parse(location.search.slice(1));
                  setCurrentTab(queries.tab);
                  if (queries.tab === path) return true;
                }}
              >
                {path}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;

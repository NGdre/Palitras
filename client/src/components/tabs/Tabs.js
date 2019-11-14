import React from "react";
import qs from "qs";
import { NavLink } from "react-router-dom";

const Tabs = ({ pathname, paths }) => {
  return (
    <div className="tabs">
      <ul>
        {paths.map((path, i) => {
          return (
            <li key={path}>
              <NavLink
                to={{
                  pathname,
                  search: `tab=${path}`
                }}
                className="unselected"
                activeClassName="selected"
                isActive={(match, location) => {
                  const queries = qs.parse(location.search.slice(1));

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

import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <div className="d-flex justify-content-center m-3">
      <div className="input-group  w-50 ">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm thiết bị..."
          aria-label="Tìm kiếm thiết bị..."
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-dark" type="button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

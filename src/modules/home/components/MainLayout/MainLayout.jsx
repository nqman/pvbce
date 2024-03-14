import React, { useEffect } from "react";
import Header from "../Header";

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getProfile } from "../../../../store/reducers/authReducer";

export default function MainLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div>
      <Toaster position="top-right" />
      <Header />
      <Outlet />
    </div>
  );
}

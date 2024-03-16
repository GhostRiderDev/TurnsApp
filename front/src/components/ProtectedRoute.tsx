import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const user = useSelector((state: { user: object }) => state.user);
  const navigate = useNavigate();

  return user ? children : <>{navigate("/home")}</>;
}

export default ProtectedRoute;

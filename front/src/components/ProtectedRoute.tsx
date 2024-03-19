import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const user = useSelector((state: { user: object }) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;

import React from "react";
import { useCurrentQuery } from "../../app/services/auth";

type Props = {
  children: React.ReactNode;
};

// ! лучше сделать контекстом, что бы не было возможности перейти на регистрацию , если уже есть токен

const Auth: React.FC<Props> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    // return <span>Loading...</span>;
    return null;
  }

  return <div>{children}</div>;
};

export default Auth;

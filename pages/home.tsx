import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  if (!data) {
    return <>Loading...</>;
  }
  return (
    <>
      <div>users:</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.id} - {user.username}
            </li>
          );
        })}
      </ul>
    </>
  );
};

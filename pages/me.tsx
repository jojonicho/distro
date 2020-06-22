import React from "react";
import { useMeQuery } from "../generated/graphql";

interface MeProps {}

export const Me: React.FC<MeProps> = () => {
  const { data, error, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const Container = loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : data ? (
    <div>{data.me}</div>
  ) : (
    <div>No data</div>
  );
  return Container;
};

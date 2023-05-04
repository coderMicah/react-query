import { useQuery } from "@tanstack/react-query";
import React from "react";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await fetch("https://swapi.dev/api/planets/");
  const data = await res.json();
  return data;
};

function Planets() {
  const { data, status, isError, isLoading, isFetched } = useQuery(
    ["planets"],
    fetchPlanets
  );

  if (isError) return <div>Error Fetching Data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isFetched)
    return (
      <div>
        <h2>Planets</h2>
        {data.results.map((planet) => (
          <Planet key={planet.name} planet={planet} />
        ))}
      </div>
    );
}

export default Planets;

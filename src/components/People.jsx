import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Person from "./Person";

// const fetchPeople = async ({ queryKey }) => {
//   const [_, page] = queryKey;
//   const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
//   const data = await res.json();
//   return data;
// };

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await res.json();
  return data;
};

function Peoples() {
  const [page, setPage] = useState(1);
  const { data, isPreviousData, isError, isLoading, isFetched } = useQuery({
    queryKey: ["people", page],
    queryFn: () => fetchPeople(page),
    keepPreviousData: true,
  });
 


  if (isError) return <div>Error Fetching Data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isFetched)
    return (
      <div>
        <h2>People</h2>

        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPreviousData && data.next) {
              setPage((old) =>  old + 1 );
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.next}
        >
          Next Page
        </button>
        {data.results.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </div>
    );
}

export default Peoples;

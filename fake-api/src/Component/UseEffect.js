import React, { useState, useEffect } from "react";

function UseEffect() {
  
  const [data, setData] = useState(null);

  // 4. Fetching data with useEffect
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/2"
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []); // Empty array ensures this effect runs only once (when component mounts)

  return (
    <div>
      <h1>useEffect Demo</h1>

     
      {/* Display fetched data */}
      <div>
        <h2>Fetched Data:</h2>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default UseEffect;
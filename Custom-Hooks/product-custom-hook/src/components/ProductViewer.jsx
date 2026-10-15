import { useState } from "react";
import useFetch from "../hooks/useFetch";

function ProductViewer() {
  const [id, setId] = useState(1);
  const url = `https://dummyjson.com/products/${id}`;
  const { data, loading, error } = useFetch(url);

  const handleProductSelect = (idNum) => {
    if (idNum <= 0 || idNum > 5) return;
    setId(idNum);
  };

  return (
    <>
      <div className="product-buttons">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleProductSelect(num)}
            disabled={id === num && loading}
          >
            Product ID: {num}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && data && (
        <div className="product-container">
          <small>ID: {data.id}</small>
          <img src={data.thumbnail} alt={data.title} />
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>
            <strong>Category:</strong> {data.category}
          </p>
          <p>
            <strong>Price:</strong> ${data.price}
          </p>
          <p>
            <strong>Ratings:</strong> {data.rating}
          </p>
          <p>
            <strong>Availability Status:</strong> {data.availabilityStatus}
          </p>
        </div>
      )}
    </>
  );
}

export default ProductViewer;

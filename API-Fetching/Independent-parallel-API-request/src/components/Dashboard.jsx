import { useEffect, useState } from "react";

function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [userData, setUserData] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [initialError, setInitialError] = useState(null);

  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialData() {
      try {
        setLoadingInitial(true);
        setInitialError(null);

        const [usersRes, productsRes] = await Promise.all([
          fetch("https://dummyjson.com/users?limit=20", {
            signal: controller.signal,
          }),
          fetch("https://dummyjson.com/products?limit=50", {
            signal: controller.signal,
          }),
        ]);

        if (!usersRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch initial data from server");
        }

        const usersJson = await usersRes.json();
        const productsJson = await productsRes.json();

        setAllUsers(usersJson.users || []);

        const categories = [
          ...new Set((productsJson.products || []).map((p) => p.category)),
        ];
        setAllCategories(categories);
      } catch (err) {
        if (err.name !== "AbortError") setInitialError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoadingInitial(false);
      }
    }

    loadInitialData();
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!selectedUserId) {
      setUserData(null);
      return;
    }
    const controller = new AbortController();

    async function loadUser() {
      try {
        setLoadingDetail(true);
        setDetailError(null);
        const res = await fetch(
          `https://dummyjson.com/users/${selectedUserId}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error("Could not fetch user details");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        if (err.name !== "AbortError") setDetailError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoadingDetail(false);
      }
    }

    loadUser();
    return () => controller.abort();
  }, [selectedUserId]);

  useEffect(() => {
    if (!selectedCategory) {
      setCategoryProducts([]);
      return;
    }
    const controller = new AbortController();

    async function loadCategory() {
      try {
        setLoadingDetail(true);
        setDetailError(null);
        const res = await fetch(
          `https://dummyjson.com/products/category/${selectedCategory}?limit=4`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Could not fetch category products");
        const data = await res.json();
        setCategoryProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") setDetailError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoadingDetail(false);
      }
    }

    loadCategory();
    return () => controller.abort();
  }, [selectedCategory]);

  if (loadingInitial)
    return <p style={{ padding: 20 }}>Loading users and products...</p>;
  if (initialError)
    return <p style={{ padding: 20, color: "red" }}>Error: {initialError}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a User</option>
          {allUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loadingDetail && <p>Updating selected data...</p>}
      {detailError && <p style={{ color: "red" }}>{detailError}</p>}

      {userData && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <h3>User Profile</h3>
          <p>
            <strong>Name:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </div>
      )}
      {categoryProducts.length > 0 && (
        <div>
          <h3>Category Products</h3>
          <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
            {categoryProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  padding: 10,
                  borderRadius: 6,
                  width: 140,
                }}
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  style={{ width: "100%", height: 90, objectFit: "cover" }}
                />
                <strong
                  style={{ fontSize: 13, display: "block", marginTop: 5 }}
                >
                  {p.title}
                </strong>
                <p style={{ margin: "5px 0 0" }}>${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;

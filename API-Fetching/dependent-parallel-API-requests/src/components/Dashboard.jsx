import { useEffect, useState } from "react";
import "./dashboard-style.css";

function Dashboard() {
  const [userId, setUserId] = useState(1);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const [userPost, setUserPost] = useState(null);
  const [userTodos, setUserTodos] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSequence = async () => {
      setUserLoading(true);
      setUserError(null);
      setInfoError(null);
      setUser(null);
      setUserPost(null);
      setUserTodos(null);

      const userURL = `https://dummyjson.com/users/${userId}`;
      let id = null;

      try {
        const userRes = await fetch(userURL, { signal: controller.signal });
        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        setUser(userData);
        id = userData.id;
      } catch (err) {
        if (err.name === "AbortError") return;
        setUserError(err.message);
        setUserLoading(false);
        return;
      } finally {
        if (!controller.signal.aborted) {
          setUserLoading(false);
        }
      }

      if (!id) return;

      try {
        setInfoLoading(true);
        const postURL = `https://dummyjson.com/posts/user/${id}`;
        const todoURL = `https://dummyjson.com/todos/user/${id}`;

        const [postsRes, todosRes] = await Promise.all([
          fetch(postURL, { signal: controller.signal }),
          fetch(todoURL, { signal: controller.signal }),
        ]);

        if (!postsRes.ok || !todosRes.ok) {
          throw new Error("User activity info not found");
        }

        const [posts, todos] = await Promise.all([
          postsRes.json(),
          todosRes.json(),
        ]);

        setUserPost(posts);
        setUserTodos(todos);
      } catch (err) {
        if (err.name === "AbortError") return;
        setInfoError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setInfoLoading(false);
        }
      }
    };

    fetchSequence();
    return () => controller.abort();
  }, [userId]);

  const handleIDChange = (num) => {
    if (userId === 1 && num < 0) return;
    setUserId((prev) => prev + num);
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>

      {userLoading && <h2 className="loadings">Fetching User Data...</h2>}
      {!userLoading && userError && (
        <h2 className="errors">Error: {userError}</h2>
      )}

      {!userLoading && !userError && user && (
        <div className="user-card">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <div className="buttons">
            <button onClick={() => handleIDChange(-1)} disabled={userId <= 1}>
              Previous
            </button>
            <span>User ID: {user.id}</span>
            <button onClick={() => handleIDChange(1)}>Next</button>
          </div>
        </div>
      )}

      {infoLoading && <h3 className="loadings">Loading Posts & Todos...</h3>}
      {!infoLoading && infoError && (
        <h3 className="errors">Error: {infoError}</h3>
      )}

      {!infoLoading && !infoError && (userPost || userTodos) && (
        <div className="user-activity">
          {userPost && (
            <div className="post-container">
              <h4 className="total-activity">Total Posts: {userPost.total}</h4>
              <hr />
              {userPost.posts.map((post) => (
                <div key={post.id} className="post-item">
                  <strong className="activity-heading">{post.title}</strong>
                  <p>{post.body}</p>
                  <small>
                    Views: {post.views} | Likes: {post.reactions?.likes ?? 0} |
                    Dislikes: {post.reactions?.dislikes ?? 0}
                  </small>
                </div>
              ))}
            </div>
          )}

          {userTodos && (
            <div className="todo-container">
              <h4 className="total-activity">Total Todos: {userTodos.total}</h4>
              <hr />
              {userTodos.todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                  <p
                    className="activity-heading"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.todo}
                  </p>
                  <small>
                    Completed: <b>{todo.completed ? "Yes" : "No"}</b>
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

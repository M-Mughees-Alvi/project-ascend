import { useTheme } from "../Context/ThemeContext";
function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className="dashboard"
        style={{
          height: "100dvh",
          width: "100%",
          backgroundColor: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h1>Your Dashboard</h1>
        <p>
          Current Theme: <strong>{theme}</strong>
        </p>
        <button
          style={{
            backgroundColor: theme === "light" ? "black" : "white",
            color: theme === "light" ? "white" : "black",
            height: "100px",
            width: "200px",
            padding: "10px",
          }}
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </div>
    </>
  );
}
export default Dashboard;

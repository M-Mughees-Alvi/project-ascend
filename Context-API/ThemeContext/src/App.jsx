import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./Provider/ThemeProvider";
function App() {
  return (
    <>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </>
  );
}

export default App;

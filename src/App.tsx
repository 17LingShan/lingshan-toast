import "./App.css";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import ToastContainer, {
  toast,
} from "./components/ToastContainer/ToastContainer.tsx";

function App() {
  return (
    <>
      <ToastContainer />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => toast.current?.info(new Date().getTime())}>
          add
        </button>
      </div>
    </>
  );
}

export default App;

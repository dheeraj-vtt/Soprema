import "./App.css";
import FileDispay from "./components/FileDispay";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="max-w-[900px] flex justify-center items-center flex-col my-10 mx-auto">
        <Header />
        <FileDispay/>
      </div>
    </>
  );
}

export default App;

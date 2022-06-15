import { Routes, Route } from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import CharacterCardPage from "./pages/CharacterCardPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/character/:id" element={<CharacterCardPage />} />
        <Route path="*" element={<CharactersPage />} />
      </Routes>
    </div>
  );
}

export default App;

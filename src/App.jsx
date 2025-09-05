import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import IframeTest from "./components/IframeTest";
import ModalTest from "./components/ModalTest";
import FullscreenTest from "./components/FullscreenTest";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const handleModeSelect = (mode) => {
    console.log(`*** MODE SELECTED: ${mode} ***`);
    setCurrentScreen(mode);
  };

  const handleBackToHome = () => {
    console.log("*** BACK TO HOME CALLED ***");
    setCurrentScreen("home");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onModeSelect={handleModeSelect} />;
      case "iframe":
        return <IframeTest onBack={handleBackToHome} />;
      case "modal":
        return <ModalTest onBack={handleBackToHome} />;
      case "fullscreen":
        return <FullscreenTest onBack={handleBackToHome} />;
      default:
        return <HomeScreen onModeSelect={handleModeSelect} />;
    }
  };

  return <div className="app-container">{renderCurrentScreen()}</div>;
}

export default App;

import logoHome from '../assets/logo-home.svg';

function HomeScreen({ onModeSelect }) {
  return (
    <div className="home-screen">
      <div className="home-header">
        <img src={logoHome} alt="Unico Logo" className="unico-logo" />
        <h1 className="home-title">Unico PoC By Unico - React</h1>
        <p className="home-subtitle">
          Choose the display mode to test the Unico SDK integration
        </p>
      </div>

      <div className="mode-selection">
        <button
          className="mode-button modal-button"
          onClick={() => {
            console.log("*** MODAL BUTTON CLICKED ***");
            onModeSelect("modal");
          }}
        >
          <div className="button-icon">🪟</div>
          <h3>Modal Test</h3>
          <p>SDK displayed in overlay modal on page</p>
        </button>

        <button
          className="mode-button fullscreen-button"
          onClick={() => {
            console.log("*** FULLSCREEN BUTTON CLICKED ***");
            onModeSelect("fullscreen");
          }}
        >
          <div className="button-icon">📺</div>
          <h3>Fullscreen Test</h3>
          <p>SDK taking up the entire browser screen</p>
        </button>

        <button
          className="mode-button iframe-button"
          onClick={() => {
            console.log("*** IFRAME BUTTON CLICKED ***");
            onModeSelect("iframe");
          }}
        >
          <div className="button-icon">🖼️</div>
          <h3>Iframe Box Test</h3>
          <p>SDK embedded in a box on the page</p>
        </button>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <p>
            For detailed implementation guide, visit our{' '}
            <a 
              href="https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/controlando-a-experiencia/sdk#como-comecar"
              target="_blank"
              rel="noopener noreferrer"
              className="documentation-link"
            >
              Official Documentation
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;

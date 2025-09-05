import { ByUnicoSDK } from "idpay-b2b-sdk";
import { useCallback, useState, useEffect } from "react";
import logoHome from '../assets/logo-home.svg';

function FullscreenTest({ onBack }) {
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleChangeTransactionId = (evt) => {
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setToken(evt.target.value);
  };

  const initIframe = () => {
    console.log("*** STARTING SDK in FULLSCREEN mode ***");
    ByUnicoSDK.init({
      env: "uat",
      token,
    });
  };

  const onFinish = useCallback(
    (transaction) => {
      console.log(">>>>>> onFinish Fullscreen", transaction);
      // Exit fullscreen mode when finished
      setIsFullscreen(false);
    },
    []
  );

  const openFullscreen = () => {
    console.log("*** OPENING SDK in FULLSCREEN ***");
    
    // First activate fullscreen mode
    setIsFullscreen(true);
    
    // Wait a bit for CSS to be applied before opening
    setTimeout(() => {
      ByUnicoSDK.open({
        transactionId,
        token,
        onFinish,
      });
    }, 100);
  };

  // No escape key functionality in fullscreen - let the flow complete naturally

  return (
    <div className="test-screen">
      <div className="test-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <img src={logoHome} alt="Unico Logo" className="test-logo" />
        <h1>Fullscreen Test</h1>
        <p>SDK taking up the entire browser screen</p>
        {isFullscreen ? (
          <p className="fullscreen-hint">
            Fullscreen mode active - flow will close automatically when complete
          </p>
        ) : (
          <p className="fullscreen-ready">
            Fill in the fields below and click "Open Fullscreen" to start
          </p>
        )}
      </div>

      <div className={`test-controls ${isFullscreen ? 'hidden-in-fullscreen' : ''}`}>
        <div className="input-group">
          <label htmlFor="fullscreenTransactionId">Transaction ID:</label>
          <input
            id="fullscreenTransactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className="test-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fullscreenToken">Token:</label>
          <input
            id="fullscreenToken"
            onChange={handleChangeToken}
            placeholder="Enter the token"
            type="text"
            value={token}
            className="test-input"
          />
        </div>

        <div className="button-group">
          <button
            data-testid="init"
            className="action-button init-button"
            onClick={initIframe}
            disabled={!token}
          >
            Initialize SDK
          </button>
          <button
            data-testid="open"
            className="action-button fullscreen-open-button"
            onClick={openFullscreen}
            disabled={!transactionId || !token}
          >
            Open Fullscreen
          </button>
        </div>

        {!isFullscreen && (
          <div className="fullscreen-instructions">
            <p><strong>Instructions:</strong> Enter your Token and Transaction ID above, then click "Open Fullscreen" to start the SDK in full screen mode.</p>
          </div>
        )}
      </div>

      <div className="fullscreen-container">
        <div 
          id="unico_iframe" 
          className={`fullscreen-iframe ${isFullscreen ? 'fullscreen' : ''}`}
        >
          <div id="unico_iframe_embedded"></div>
        </div>
      </div>
    </div>
  );
}

export default FullscreenTest;

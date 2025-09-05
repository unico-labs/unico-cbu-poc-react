import { ByUnicoSDK } from "idpay-b2b-sdk";
import { useCallback, useState } from "react";
import logoHome from '../assets/logo-home.svg';

function IframeTest({ onBack }) {
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");

  const handleChangeTransactionId = (evt) => {
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setToken(evt.target.value);
  };

  const initIframe = () => {
    ByUnicoSDK.init({
      env: "uat",
      token,
    });
  };

  const onFinish = useCallback(
    (transaction) => console.log(">>>>>> onFinish", transaction),
    []
  );

  const open = () => {
    ByUnicoSDK.open({
      transactionId,
      token,
      onFinish,
    });
  };

  const close = () => {
    ByUnicoSDK.close();
  };

  return (
    <div className="test-screen">
      <div className="test-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <img src={logoHome} alt="Unico Logo" className="test-logo" />
        <h1>Iframe Box Test</h1>
        <p>SDK displayed in embedded iframe on the page</p>
      </div>

      <div className="test-controls">
        <div className="input-group">
          <label htmlFor="transactionId">Transaction ID:</label>
          <input
            id="transactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className="test-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="token">Token:</label>
          <input
            id="token"
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
            className="action-button open-button" 
            onClick={open}
            disabled={!transactionId || !token}
          >
            Open Flow
          </button>
          <button 
            data-testid="close" 
            className="action-button close-button" 
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>

      <div className="iframe-container">
        <div id="unico_iframe" className="iframe">
          <div id="unico_iframe_embedded"></div>
        </div>
      </div>
    </div>
  );
}

export default IframeTest;

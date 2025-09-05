import { ByUnicoSDK } from "idpay-b2b-sdk";
import { useState, useCallback, useRef, useEffect } from "react";
import logoHome from '../assets/logo-home.svg';

function ModalTest({ onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [token, setToken] = useState("");
  const [iframeKey, setIframeKey] = useState(0);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  const unicoIframeRef = useRef(null);

  const closeByUnicoSDKSession = useCallback(() => {
    // Only try to close if SDK was initialized
    if (!sdkInitialized) {
      console.log("*** SDK not initialized yet, skipping close ***");
      return;
    }

    console.log("*** EXECUTING closeByUnicoSDKSession ***");
    try {
      if (
        typeof ByUnicoSDK !== "undefined" &&
        ByUnicoSDK &&
        typeof ByUnicoSDK.close === "function"
      ) {
        console.log("*** CALLING ByUnicoSDK.close() ***");
        ByUnicoSDK.close();
        console.log("ByUnicoSDK session closed successfully.");
        setSdkInitialized(false); // Reset state
      } else {
        console.warn(
          "ByUnicoSDK.close method not fully available for calling, skipping close."
        );
      }
    } catch (e) {
      console.error(
        "Error closing ByUnicoSDK session (likely ByUnicoSDK not fully initialized or active):",
        e
      );
    }
  }, [sdkInitialized]);

  const handleCloseModal = useCallback(() => {
    console.log("*** CLOSING MODAL - starting cleanup process ***");
    setShowModal(false);
    closeByUnicoSDKSession();
    setIframeKey((prevKey) => prevKey + 1);
  }, [closeByUnicoSDKSession]);

  const onFinishSdk = useCallback((result) => {
    console.log("Finish SDK:", result);
    console.log("*** SDK FINISHED - closing modal automatically ***");
    handleCloseModal();
  }, [handleCloseModal]);

  const initializeAndOpenByUnicoSDK = useCallback(() => {
    if (!unicoIframeRef.current) {
      console.warn(
        "initializeAndOpenByUnicoSDK called but unicoIframeRef.current is null."
      );
      return;
    }

    const startInitialization = () => {
      console.log("*** STARTING ByUnicoSDK... ***");
      ByUnicoSDK.init({
        type: "IFRAME",
        env: "uat",
        token,
        element: unicoIframeRef.current,
      });

      // Mark as initialized
      setSdkInitialized(true);

      // 2. Delay ByUnicoSDK.open call for 0.5 seconds (500ms)
      setTimeout(() => {
        console.log("*** OPENING ByUnicoSDK after 0.5s delay... ***");
        ByUnicoSDK.open({
          transactionId,
          token,
          onFinish: onFinishSdk,
        });
      }, 500);
    };

    // 1. Only close previous session if it was already initialized
    if (sdkInitialized) {
      console.log("*** SDK already initialized, closing previous session ***");
      closeByUnicoSDKSession();
      // Wait a bit before reinitializing
      setTimeout(startInitialization, 200);
    } else {
      // First initialization
      startInitialization();
    }
  }, [token, transactionId, onFinishSdk, closeByUnicoSDKSession, sdkInitialized]);

  const handleOpenModal = () => {
    setError("");

    if (!token.trim()) {
      setError("Error: Token is required");
      return;
    }
    if (!transactionId.trim()) {
      setError("Error: Transaction ID is required");
      return;
    }

    setShowModal(true);
  };

  // useEffect to orchestrate SDK initialization/opening
  // This useEffect will only trigger when modal is visible AND iframe ref is available
  useEffect(() => {
    if (showModal && unicoIframeRef.current) {
      console.log(
        "Modal is visible and iframe ref is ready. Attempting to initialize and open SDK."
      );
      initializeAndOpenByUnicoSDK();
    } else if (!showModal && unicoIframeRef.current) {
      console.log("Modal closed, iframe ref might still exist briefly.");
    }
  }, [showModal, unicoIframeRef.current, initializeAndOpenByUnicoSDK]);

  const handleChangeTransactionId = (evt) => {
    setError("");
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setError("");
    setToken(evt.target.value);
  };

  return (
    <div className="test-screen">
      <div className="test-header">
        <button className="back-button" onClick={() => {
          console.log("*** BACK BUTTON CLICKED - ModalTest ***");
          onBack();
        }}>
          ← Back
        </button>
        <img src={logoHome} alt="Unico Logo" className="test-logo" />
        <h1>Modal Test</h1>
        <p>SDK displayed in overlay modal on page</p>
      </div>

      <div className="test-controls">
        <div className="input-group">
          <label htmlFor="modalTransactionId">Transaction ID:</label>
          <input
            id="modalTransactionId"
            onChange={handleChangeTransactionId}
            placeholder="Enter the transaction ID"
            type="text"
            value={transactionId}
            className={`test-input ${
              error.includes("Transaction ID") ? "error" : ""
            }`}
          />
        </div>

        <div className="input-group">
          <label htmlFor="modalToken">Token:</label>
          <input
            id="modalToken"
            onChange={handleChangeToken}
            placeholder="Enter the token"
            type="text"
            value={token}
            className={`test-input ${error.includes("Token") ? "error" : ""}`}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button
            className="action-button modal-open-button"
            onClick={handleOpenModal}
            disabled={!transactionId || !token}
          >
            Open SDK in Modal
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>
              ×
            </button>
            <div className="modal-iframe-wrapper">
              <div
                id="unico_iframe_embedded"
                ref={unicoIframeRef}
                key={iframeKey}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalTest;

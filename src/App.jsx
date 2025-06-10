import { ByUnicoSDK } from "idpay-b2b-sdk";
import { useCallback, useState } from "react";

const SDKIntegration = () => {
  // const [initialized, setInitialized] = useState();
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
    // setInitialized(true);
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
    <div
      style={{
        height: "99%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Unico Poc CBU React</h1>
        <input
          onChange={handleChangeTransactionId}
          placeholder="ID da transação"
          type="text"
          value={transactionId}
        />
        <input
          onChange={handleChangeToken}
          placeholder="Token"
          type="text"
          value={token}
        />
        {/* {initialized ? (
          <span>Inicializado</span>
        ) : ( */}
        <>
          <button data-testid="init" className="init" onClick={initIframe}>
            Iniciar
          </button>
        </>
        {/* )} */}
        <button data-testid="open" onClick={open}>
          Abrir
        </button>
        <button data-testid="close" onClick={close}>
          Fechar
        </button>
      </div>
      <hr />
      <div id="unico_iframe" className="iframe">
        <div id="unico_iframe_embedded"></div>
      </div>
    </div>
  );
};

export default SDKIntegration;

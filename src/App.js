import { IDPaySDK } from 'idpay-b2b-sdk';
import { useCallback, useState } from 'react';

const SDKIntegration = () => {
  // const [initialized, setInitialized] = useState();
  const [transactionId, setTransactionId] = useState('');
  const [token, setToken] = useState('');

  const handleChangeTransactionId = (evt) => {
    setTransactionId(evt.target.value);
  };

  const handleChangeToken = (evt) => {
    setToken(evt.target.value);
  };

  const init = () => {
    IDPaySDK.init({
      type: 'IFRAME',
      env: 'uat',
      token,
    });
    // setInitialized(true);
  };


  const onFinish = useCallback(
    (transaction) => console.log('>>>>>> onFinish', transaction),
    []
  );

  const open = () => {
    IDPaySDK.open({
      transactionId,
      token,
      onFinish,
    });
  };

  const close = () => {
    IDPaySDK.close();
  };

  return (
    <div
      style={{
        height: '99%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div> 
        <input class='box'
          onChange={handleChangeTransactionId}
          placeholder="ID da transação"
          type="text"
          value={transactionId}
        />
        <input class='box'
          onChange={handleChangeToken}
          placeholder="Token"
          type="text"
          value={token}
          /> 
{/*           
          {initialized ? ( 
            <span>Inicializado</span>
          ) : (  */}

            <>
            <button data-testid="init" class='init' onClick={init}>
              Iniciar
            </button>
          </>
              {/* )}  */}
        <button data-testid="open" class='open' onClick={open}>
          Abrir
        </button>
        <button data-testid="close" class='close' onClick={close}>
          Fechar
        </button>
      </div>
      <hr />
      <div id="unico_iframe" class='iframe' style={{ height: '100%', width: '100%' }}> 
        <div id="unico_iframe_embedded"></div>
      </div>
    </div>
  );
};

export default SDKIntegration;
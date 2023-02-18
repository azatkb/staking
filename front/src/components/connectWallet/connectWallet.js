function ConnectWallet({ onConnectMetamask, onWalletConnect, onCoinbaseConnect, translator}){
    return(
        <div className="modal modal__addWallet" data-modal="add-wallet">
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt=""/>
            </div>
            <div className="small-title">{ translator.t('connect_wallet') }</div>
            <div className="wallet__buttons">
                <div className="t-btn transparent wallet__button" onClick={onConnectMetamask}><span>Metamask</span>
                    <div className="button__bg-hover"></div>
                </div>
                <div className="t-btn transparent wallet__button" onClick={onWalletConnect}><span>WalletConnect</span>
                    <div className="button__bg-hover"></div>
                </div>
                <div className="t-btn transparent wallet__button" onClick={onCoinbaseConnect}><span>Coinbase Wallet</span>
                    <div className="button__bg-hover"></div>
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;
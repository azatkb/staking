import imgUrl from "../../img/Group 670.svg"
import imgUrl2 from "../../img/Group 634.svg"
import "./modal.css";

function ConnectWallet({ onConnectMetamask, onWalletConnect, onCoinbaseConnect , onCloseModal}){
    return(
        <div className="modal modal_menu modal_wallet">
            <button className="close_modal" onClick={onCloseModal}>
                <img src={imgUrl2}/>
            </button>
            <img src={imgUrl} className="modal_log"/>
            <div className="small-title">Подключение 
кошелька</div>
            <div className="wallet__buttons">
                <div className="wallet__button" onClick={onConnectMetamask}><span>Metamask</span>
                </div>
                <div className="wallet__button" onClick={onWalletConnect}><span>WalletConnect</span>
                </div>
                <div className="wallet__button" onClick={onCoinbaseConnect}><span>Coinbase Wallet</span>
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;
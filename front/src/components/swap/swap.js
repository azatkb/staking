
import { useState } from "react";
import Comunity from "../comunity/comunity";
import LoginBig from "../loginBig/loginBig";
import Exchange from "../exchange/exchange";
import Fiat from "../fiat/fiat";

function Swap({ auth, translator, web3, account, ovpPrice, balance, ovpEth}) {

    const [chainError, setChainError] = useState(null);

    if(web3){
        web3.eth.getChainId().then((chain)=>{
            if(chain != 1){
             setChainError("Please switch Etherium Mainnet")
            }
         });
    }

    return (
       <div>
           <section className="swap-section">
            <div className="container">
            {
                chainError &&
                <div>
                     {
                        chainError
                     }
                </div>
           }
                <div className="swap__box">
                    <div className="swap__left swap__column">
                        <Exchange translator={translator} web3={web3} account={account} ovpPrice={ovpPrice}></Exchange>
                    </div>
                    <div className="swap__right swap__column">
                        {
                            !auth &&
                            <LoginBig translator={translator}></LoginBig>
                        }{
                            auth &&
                            <Fiat translator={translator} balance={balance} ovpPrice={ovpPrice} ovpEth={ovpEth}></Fiat>
                         }
                    </div>
                </div>
            </div>
        </section>
        <Comunity translator={translator}></Comunity>
        <div className="modal video center" data-modal="video">
            <div className="video-content"></div>
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt="Close"/>
            </div>
        </div>
       </div>
    );
 }
 
 export default Swap;
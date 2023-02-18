import { useState, useEffect} from "react";
import { toast } from 'react-toastify';
import config from '../../config';
import { Transfer, TransferERC20 } from "../../transfer";
import { TokenAddresses } from "../../erc20";
import Tokens from "../tokens/tokens";
import axios from "axios";

function Exchange({ translator, web3, account, ovpPrice }){

    const [busy, setBusy] = useState(false);
    const [prices, setPrices] = useState({ "ETH": 0, "AAVE": 0, "1INCH": 0});
    const [fromSymbol, setFromSymbol] = useState("ETH");

    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,1INCH,AAVE&tsyms=USD').then(res => {
            if(res.data){
               let data = res.data;
               setPrices({
                   "ETH": data["ETH"]["USD"],
                   "AAVE": data["AAVE"]["USD"],
                   "1INCH": data["1INCH"]["USD"],
               });
            }
          });
    },[]);

    let exchangeRate = ovpPrice / prices[fromSymbol];

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [fromError, setFromError] = useState('');
    const [toError, setToError] = useState('');

    const changeFromSymbol = (symbol)=>{
        setFromSymbol(symbol);
        setFrom(0);
        setTo(0);
    }

    const onFromChange = (e)=>{
        let value = e.target.value;
        setFrom(value);
        if(!Number.isNaN(value)){
            let eth = value;
            let ovp = eth / exchangeRate;
            setTo(ovp.toFixed(5));
        }
        setFromError(null);
    }

    const onToChange = (e)=>{
        let value = e.target.value;
        setTo(value);
        if(!Number.isNaN(value)){
           let ovp = value;
           let eth = ovp * exchangeRate;
           setFrom(eth.toFixed(5));
        }
        setToError(null);
    }

    const onExchange = (e)=>{

        e.preventDefault();

        if(web3){

            if((!from) || (from <= 0)){
                setFromError(translator.t('too_low'));
                return;
            }
            if((!to) || (to <= 0)){
                setToError(translator.t('too_low'));
                return;
            }

            setBusy(true);

            const ownerAddress = config.ownerAddress;

            if(fromSymbol === "ETH"){

                web3.eth.sendTransaction({
                    from: account,
                    to: ownerAddress, 
                    value: web3.utils.toWei(from.toString(), "ether"), 
                }, function(err, transactionHash) {

                    if(!err){

                        toast.success(translator.t('please_wait'), {
                            position: toast.POSITION.TOP_CENTER
                        });

                        setFrom(0);
                        setTo(0);

                        setBusy(false);

                        Transfer(account, to).then((reciept)=>{
                            toast.success(translator.t('done'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }).catch((error)=>{
                            toast.error(translator.t('error'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        });

                        axios.post(`${config.api}/transactions/exchange`, { type: "exchange", amount: to, wallet: account}).then(res => {});

                    }else{
                        setBusy(false);
                        if(err.code){
                            if(err.code === 4001){
                                toast.error(translator.t('rejected_by_user'), {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            }else{
                                toast.error(translator.t('error'), {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            }
                        }else{
                            toast.error(translator.t('error'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                    }

                });
            }else{

                TransferERC20(account, web3, from, TokenAddresses[fromSymbol]).then((receipt)=>{

                    toast.success(translator.t('please_wait'), {
                        position: toast.POSITION.TOP_CENTER
                    });

                    setFrom(0);
                    setTo(0);

                    setBusy(false);

                    Transfer(account, to).then((reciept)=>{
                        toast.success(translator.t('done'), {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }).catch((error)=>{
                        toast.error(translator.t('error'), {
                            position: toast.POSITION.TOP_CENTER
                        });
                    });

                }).catch((error)=>{
                    toast.error(translator.t('error'), {
                        position: toast.POSITION.TOP_CENTER
                    });
                });

            }


        }else{

            toast.error(translator.t('please_connect_wallet'), {
                position: toast.POSITION.TOP_CENTER
            });

            document.getElementById("add-wallet").click();
        }
    }

    return(
        <div>
            <img className="swap__column-icon" src="img/landing/coinswap.png" alt=""/>
                <h1 className="small-title main-title">{ translator.t('exchange_for_crypto')}</h1>
                <div className="subtitle">{ translator.t('exchange_for_crypto_desc')}</div>
                <div className="instruction__box">
                    <div className="intsruction__left">
                        <div className="small-title">{ translator.t('no_cypto_wallet')}</div>
                        <div className="subtitle">{ translator.t('no_cypto_wallet_desc')}</div>
                    </div>
                    <div className="intsruction__video" style={{ backgroundImage: "url('img/landing/how.jpg')"}}>
                        <div className="intsruction__video-play modal__open" data-modal="video" data-src="EadeOYFAzJ4">
                            <img className="img-svg" src="img/icons/play.svg" alt=""/>
                        </div>
                    </div>
                </div>
                
                <div className="swap__form dark t-form wallet__form" onSubmit={onExchange}>
                        
                    <div className="swap__item swap__send">
                        <div className="swap__item-column">
                            <div className="swap__title">{ translator.t('give')}</div>
                            <div className="swap__currency-box">
                                <input className="swap__currency-input" type="hidden" name="" value="ETH"/>
                                <div className="swap__currency-name" data-swap="send">{ fromSymbol }</div>
                                <div className="swap__currency-change modal__open" data-modal="token" data-swap="send">
                                   <img className="img-svg" src="img/icons/currency-dropdown.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="swap__item-column">
                            <div className="swap__title">{ translator.t('amount')}</div>
                                <div className="swap__count-box">
                                    <input value={from} onChange={onFromChange} className="swap__count-input" type="number" />
                                 </div>
                                {fromError && <div className="error_text">{fromError}</div>  }
                        </div>
                    </div>
                        
                    <div className="swap__item swap__get">
                        <div className="swap__item-column">
                            <div className="swap__title">{ translator.t('recieve')}</div>
                            <div className="swap__currency-box">
                            <input className="swap__currency-input" type="hidden" name="" value="GIC"/>
                            <div className="swap__currency-name" data-swap="get">OVP</div>
                            <div className="swap__currency-change" data-modal="token" data-swap="get">
                                <img className="img-svg" src="img/icons/currency-dropdown.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="swap__item-column">
                        <div className="swap__title">{ translator.t('amount')}</div>
                            <div className="swap__count-box">
                                <input min={0} value={to} onChange={onToChange} className="swap__count-input" type="number"  />
                                {/* <div className="swap__count-max">max</div> */}
                            </div>
                            { toError && <div className="error_text">{toError}</div>  }
                        </div><span className="swap__description">{ translator.t('whole')} 13 000 000 000</span>
                    </div>
                        
                    <div className="swap__form-footer">
                        <div className="swap__form-info">
                            <div className="description">{ translator.t('commision')}</div>
                            <div className="description">{ translator.t('transaction_time')}</div>
                        </div>
                        <div className="swap__form-price">
                            <div className="title">{ translator.t('price')}</div>
                            <div className="value">{ exchangeRate.toFixed(6) } {fromSymbol} { translator.t('for')} 1 OVP</div>
                        </div>
                   </div>
                    
                    {
                        ((!busy) && (ovpPrice > 0)) &&
                        <button className="t-btn blue icon-left" onClick={onExchange}>
                            <img className="img-svg" src="img/icons/add-wallet.svg" alt=""/><span>{ translator.t('exchange')}</span>
                            <div className="button__bg-hover"></div>
                        </button>
                    }
              </div>
              <Tokens changeFromSymbol={changeFromSymbol} translator={translator}></Tokens>
        </div>
    )
}
    
export default Exchange;
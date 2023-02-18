import { useState, useEffect } from "react";
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import { toast } from 'react-toastify';
import CryptoJS from "crypto-js";
import Currencies from "../currencies/currencies";

function Fiat({ translator, balance, ovpEth }){

    let mexes = {
        "USD": 5000, "EUR": 5000, "RUB": 10000
    }

    const [prices, setPrices] = useState({ "USD": 0, "EUR": 0, "RUB": 0});


    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [symbol, setSymbol] = useState("USD");

    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,RUB').then(res => {
            if(res.data){
               let data = res.data;
               setPrices(data);
            }
        });
        if(translator.locale == "ru"){
            setSymbol("RUB");
        }
    },[]);

    const [fromError, setFromError] = useState('');
    const [toError, setToError] = useState('');

    let max = mexes[symbol];

    const onChangeCurrency = (currency)=>{
        setSymbol(currency);
        window.$(".modal__close").click();
        setFrom(0);
        setTo(0);
    }

    let exchangeRate = prices[symbol] / ovpEth;

    const onFromChange = (e)=>{
        let value = e.target.value;
        setFrom(value);
        if(!Number.isNaN(value)){
            let gic = value / exchangeRate;
            setTo(gic.toFixed(5));
        }
        setFromError(null);
    }

    const onToChange = (e)=>{
        let value = e.target.value;
        setTo(value);
        if(!Number.isNaN(value)){
           let usd = value * exchangeRate;
           setFrom(usd.toFixed(5));
        }
        setToError(null);
    }

    const onSubmit = ()=>{

        if((!from) || (from <= 0)){
            setFromError(translator.t('too_low'));
            return;
        }

        if(from > max){
            setFromError(translator.t('too_mach'));
            return;
        }

        if((!to) || (to <= 0)){
            setToError(translator.t('too_low'));
            return;
        }

        let data = {
            amount: to
        }

        axios.post(`${config.api}/transactions/create-order`, data, headers).then(res => {
            const response = res.data;
            let m = "18875";
            let oa = from;
            let o = response._id;
            let s = CryptoJS.MD5(`${m}:${from}:Y!5yrcIv?&xB=KA:${symbol}:${o}`).toString(CryptoJS.enc.Hex);
            let url = `https://pay.freekassa.ru?m=${m}&oa=${oa}&currency=${symbol}&o=${o}&s=${s}`;
            window.location.href = url;
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        });

    }

    return(
       <div>
           <img className="swap__column-icon" src="img/landing/coinswap.png" alt=""/>
                    <h2 className="small-title main-title">{ translator.t('buy_for_fiat') }</h2>
                    <p className="subtitle">{ translator.t('do_buy_for_fiat_desc') }</p>
                    <div className="swap__balance">
                        <div className="balance__left">
                            <div className="balance__title">{ translator.t('on_your_balance')}</div>
                            <div className="balance__value">{balance} OVP</div>
                        </div><a className="t-btn transparent small" href="/balance"><span>{ translator.t('withdraw')}</span><div className="button__bg-hover"></div></a>
                    </div>
                    <div className="swap__form dark t-form">
                     
                        <div className="swap__item swap__send">
                            <div className="swap__item-column">
                                <div className="swap__title">{ translator.t('give')}</div>
                                <div className="swap__currency-box">
                                    <input className="swap__currency-input" type="hidden" name="" value="USD"/>
                                    <div className="swap__currency-name" data-swap="send">{symbol}</div>
                                    <div className="swap__currency-change modal__open" data-modal="fiat" data-swap="send">
                                        <img className="img-svg" src="img/icons/currency-dropdown.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="swap__item-column">
                                <div className="swap__title">{ translator.t('amount')}</div>
                                <div className="swap__count-box">
                                    <input onChange={onFromChange} value={from} className="swap__count-input " type="text" name="swap__count-send" placeholder="0" required=""/>
                            
                                </div>
                                { fromError && <div className="error_text">{fromError}</div>  }
                            </div><span className="swap__description">Max {max}</span>
                        </div>
                  
                        <div className="swap__item swap__get">
                            <div className="swap__item-column">
                                <div className="swap__title">{ translator.t('recieve')}</div>
                                <div className="swap__currency-box">
                                    <input className="swap__currency-input" type="hidden" name="" value="GIC"/>
                                    <div className="swap__currency-name">OVP</div>
                                </div>
                            </div>
                            <div className="swap__item-column">
                                <div className="swap__title">{ translator.t('amount')}</div>
                                <div className="swap__count-box">
                                    <input onChange={onToChange} value={to} className="swap__count-input" type="text" name="swap__count-get" placeholder="0.00000" required=""/>
                                </div>
                                { toError && <div className="error_text">{toError}</div>  }
                            </div>
                        </div>
                
                        <div className="swap__form-footer">
                            <div className="swap__form-info">
                                <div className="description">{ translator.t('fiat_commision') } $0.0065</div>
                                <div className="description">{ translator.t('fiat_waite_time')}</div>
                            </div>
                        </div>

                        {
                            (ovpEth > 0) &&
                            <button onClick={onSubmit} className="t-btn blue" type="submit"><span>{ translator.t('do_buy_for_fiat') }</span>
                                <img className="img-svg" src="img/icons/right-arrow.svg" alt=""/>
                                <div className="button__bg-hover"></div>
                            </button>
                        }
            
                    </div>
                    <div className="login__footer">
                        <div className="login__footer-payments">
                            <img className="login__payments-icon icon1" src="img/icons/payments/visa.svg" alt=""/>
                            <img className="login__payments-icon icon2" src="img/icons/payments/mastercard.svg" alt=""/>
                            <img className="login__payments-icon icon3" src="img/icons/payments/paypal.svg" alt=""/>
                            <img className="login__payments-icon icon4" src="img/icons/payments/undefined.svg" alt=""/>
                        </div>
                    </div>

                    <Currencies onChangeCurrency={onChangeCurrency} translator={translator}></Currencies>
       </div>
    )
}

export default Fiat;
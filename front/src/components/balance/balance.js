
import Sidebar  from "../sidebar/sidebar";
import { useState, useEffect} from "react";
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from "../../date";
import { Transfer } from "../../transfer";


function Balance({ rate, translator, balance, getBalance}){

    const [profites, setProfits] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [total, setTotal] = useState(0);
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [amount, setAmount] = useState(0);
    const [busy, setBusy] = useState(false);

    const onAmountChange = (e)=>{
        let value = e.target.value;
        setAmount(value);
    }

    const onWithdrawClick =()=>{

        if(!wallets.length){
            toast.error(translator.t('no_wallets_saved'), {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if((amount <= 0) || (amount > balance)){
            toast.error(translator.t('not_valide_amount'), {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        setBusy(true);

        let data = {
            type: "withdrawed_to_wallet",
            amount: -amount,
            wallet: wallets[0]["address"]
        }
        
        axios.post(`${config.api}/transactions/withdraw`, data, headers).then(res => {

            getBalance();

            setBusy(false);
            setAmount(0);
            setOpenWithdraw(false);

            toast.success(translator.t('please_wait'), {
                position: toast.POSITION.TOP_CENTER
            });

            Transfer(wallets[0]["address"], amount).then((reciept)=>{
                toast.success(translator.t('done'), {
                    position: toast.POSITION.TOP_CENTER
                });
            }).catch((error)=>{
                toast.error(translator.t('error'), {
                    position: toast.POSITION.TOP_CENTER
                });
            });

        }).catch((err)=>{
            setBusy(false);
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        });
    }

    const onOpenClick = ()=>{
        setOpenWithdraw(!openWithdraw);
    }

    useEffect(()=>{
        axios.get(`${config.api}/wallets/profit`, headers).then(res => {
            let data = res.data;
            setProfits(data.profits);
            setTotal(data.total);
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
        axios.get(`${config.api}/wallets/wallets`, headers).then(res => {
            setWallets(res.data);
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
    },[]);

    let profit = profites ? profites.map((price, i)=>{
        let change = price.change;
        let uiPercents = 66 +(change/3);
        var date = new Date(price.time * 1000);
        return(
            <div key={i} className="chart__item" style={{ height: uiPercents + "%"}}>
                <div className="item__percent">{price.change.toFixed(1)} %</div>
                <div className="item__dollars">$ {price.cash.toFixed(1)}</div>
                <div className={change > 0 ? "item__shape": "item__shape down"}></div>
                <div className="item__date">{ formatDate(date) }</div>
            </div> 
        );
    }): [];

    let start = "";
    let end = "";

    if(profit.length > 1){
        start = formatDate(profites[0]["time"]* 1000);
        end = formatDate(profites[profites.length-1]["time"] *1000);
    }

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <Sidebar translator={translator}></Sidebar>
                    <div className="cabinet__content">
                        <div className="cabinet__control cabinet__control-balance gray">
                            <img className="cabinet__control-icon" src="img/landing/coinswap.png" alt=""/>
                            <h1 className="t-title">{translator.t('balance')}</h1>
                            <h2 className="t-subtitle">{translator.t('tokens_on_balance')}</h2>
                            <div className="cabinet__control-box">
                                <div className="cabinet__control-input dark">
                                    <input type="text" readOnly required value={balance + " OVP"}/>
                                    <div className="cabinet__control-description">{translator.t('by_current_rate')} = { (balance * rate).toFixed(1) } $</div>
                                </div>
                                <button className="t-btn transparent cabinet__control-button" onClick={onOpenClick}><span>{ translator.t('withdraw_to_wallet') }</span>
                                    <div className="button__bg-hover"></div>
                                </button>
                            </div>
                            {
                                openWithdraw && 
                                <div className="withdraw_box">
                                    <h1 className="small-title">{translator.t('withdraw_to_wallet')}</h1>
                                    <div className="cabinet__control-box">
                                        <div className="cabinet__control-input dark">
                                            <input type="number" min={0}  max={balance} value={amount} onChange={onAmountChange}/>
                                        </div>
                                        <button className="t-btn transparent cabinet__control-button" onClick={onWithdrawClick}><span>{ translator.t('withdraw') }</span>
                                            <div className="button__bg-hover"></div>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="cabinet__chart cabinet__chart-balance gray">
                            <h2 className="small-title">{translator.t('tokens_price_on_balance')}</h2>
                            <div className="chart__box">
                                <div className="chart__bg" style={{ background: "url('img/icons/chart__bg.svg')"}}></div>
                                {
                                    profit
                                }                          
                            </div>
                            <div className="chart__description"><span className="blue">{total.toFixed(2)} %</span> {translator.t('grows_from')} {start} {translator.t('grows_to')} {end}</div>
                        </div>
                    </div>
                </div>
           </section>
           <ToastContainer></ToastContainer>
       </div>
    );
 }
 
 export default Balance;
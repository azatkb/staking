import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import WithdrawModal from "./withdraw";
import config from "../../config";
import InputRange from 'react-input-range';
import { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from './canvasjs/canvasjs.react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import "react-input-range/lib/bundle/react-input-range.css";
import "./staking.css";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        overflow: "visible",
        background: "transparent"
    },
};

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const calculate = (val, percent)=>{
	return (val * percent) / 100;
}


export const Staking = ({ web3, account, balance, rate, updateBalance })=>{

    const [days, setDays] = useState(10);
    const [amount, setAmount] = useState(10);
    const [total, setTotal] = useState(0);
    const [available, setAvailable] = useState(0);
    const [options, setOptions] = useState(null);
    const [busy, setBusy] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);
    
    const getBalance = ()=>{
        axios.get(`${config.api}/transactions/balance?wallet=${account}`).then((res)=>{
            let data = res.data;
            setTotal(data.total);
            setAvailable(data.available);
        });
    }

    const onCloseModal = ()=>{
        setIsOpen(false);
    }

    const onOpenModal = ()=>{
        setIsOpen(true);
    }

    const onAmountChange = (e)=>{
        setAmount(e.target.value);
    }

    const onDaysChange = (e)=>{
        setDays(e);
    }

    const onCreate = ()=>{

        if(amount > balance){

            toast.error("Не достаточно средств!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        
        setBusy(true);

        web3.eth.sendTransaction({
            from: account,
            to: config.contract, 
            value: web3.utils.toWei(amount.toString(), "ether"), 
        }, function(err, transactionHash) {

            setBusy(false);

            if(!err){

                updateBalance();

                let data = {
                    wallet: account,
                    amount: parseFloat(amount),
                    days: days,
                    percents: config.percents,
                    type: "deposit",
                    hash: transactionHash
                 };
        
                 axios.post(`${config.api}/transactions/invest`, data).then((response)=>{
                    toast.success("Отправлено!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    getBalance();
                 });
            }else{

                toast.error("Отменено!", {
                    position: "top-center",
                    autoClose: 5000
                });
            }

        });

    }

    useEffect(()=>{

        if(account){
            getBalance();
        }
     },[account]);

     useEffect(()=>{
        if(balance){
            setAmount(balance);
        }
     },[balance]);

     useEffect(()=>{

        if(account){
            axios.get(`${config.api}/transactions/dividents?wallet=${account}`).then((response)=>{

                let data = response.data;

                data.forEach((it)=>{
                    it.y = parseFloat((rate * it.y).toFixed(1));
                });

                const options = {
                    height: 293,
                    width: 425,
                    animationEnabled: true,
                    backgroundColor: '#FAFAFA',
                    axisX: {
                        gridThickness: 1,
                        gridColor: '#E3E0EB',
                        lineColor: '#E3E0EB',
                        labelFontColor: '#777679',
                        valueFormatString: "DD.MM"
                    },
                    axisY: {
                        gridThickness: 0,
                        lineColor: '#E3E0EB',
                        labelFontColor: '#777679',
                        labelFontSize: 0,
                        tickThickness: 0,
                        lineThickness: 0,
                        labelFormatter: function () {
                            return ' ';
                        }
                    },
                    toolTip: {
                        backgroundColor: '#fff',
                        cornerRadius: 10,
                        borderThickness: 0,
                        fontSize: 16
                    },
                    data: [
                        {
                            type: "spline",
                            color: '#FF4848',
                            toolTipContent: "{y} $",
                            dataPoints: data
                        }
                    ]
                }
    
                setOptions(options);
            });
        }
     },[account]);

    document.body.style.background = "#fff";

    return(
        <div className="cabinet_page">
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={onCloseModal}
                >
                <WithdrawModal getBalance={getBalance} onClose={onCloseModal} web3={web3} available={available} total={total} account={account}></WithdrawModal>
            </Modal>
           <Header account={account} rate={rate}></Header>
           <Sidebar balance={balance}></Sidebar>
           <div class="cabinet__main js_cabinet-page js_cabinet-page-staking">
            <div class="container">
                <div class="cabinet__main-cnt">
                    <div class="cabinet__staking">
                        <div class="cabinet__staking-ttl font-35">
                            Стейкинг
                        </div>
                        <div class="cabinet__staking-calculator _item js_calculator" data-ethusd="{{ $data['etherscan']['ethusd'] }}" data-plans="{{ json_encode(array_reverse($data['plans'])) }}">
                            <div class="cabinet__staking-calculator-top">
                                <div class="cabinet__staking-calculator-top-l">
                                    <div class="cabinet__staking-calculator-top-l-ttl">
                                        Введите сумму Ethereum
                                    </div>
                                    <input value={amount} onChange={onAmountChange} type="number" class="cabinet__staking-calculator-top-l-input"/>
                                </div>
                                <div class="cabinet__staking-calculator-top-r">
                                    <div class="cabinet__staking-calculator-top-r-percent font-35">
                                        <span class="js_calculator-rate">{config.percents}</span>%
                                    </div>
                                    <div class="cabinet__staking-calculator-top-r-txt font-14">
                                        Ежедневно
                                    </div>
                                </div>
                            </div>
                            <div class="cabinet__staking-calculator-btm">
                                <div class="cabinet__staking-calculator-btm-txt">
                                    Выберите срок стейкинга
                                </div>
                                <InputRange
                                    maxValue={30}
                                    minValue={1}
                                    value={days}
                                    onChange={onDaysChange}
                                    formatLabel={value => `${value} дней`}
                                 />
                            </div>
                        </div>
                        <div class="cabinet__staking-data">
                            <div class="cabinet__staking-data-itm _item">
                                <div class="cabinet__staking-data-itm-txt">
                                    Ежедневный доход
                                </div>
                                <div class="cabinet__staking-data-itm-eth">
                                    <span class="js_calculator-profit-daily-eth"></span>{ calculate(amount, config.percents).toFixed(2) } <span> Eth</span>
                                </div>
                                <div class="cabinet__staking-data-itm-usd">
                                    { (calculate(amount, config.percents) * rate).toFixed(2)}
                                    $<span class="js_calculator-profit-daily-usd"></span>
                                </div>
                            </div>
                            <div class="cabinet__staking-data-itm _item">
                                <div class="cabinet__staking-data-itm-txt">
                                    За весь срок вы заработаете
                                </div>
                                <div class="cabinet__staking-data-itm-eth">
                                    <span class="js_calculator-profit-total-eth"></span>{ (calculate(amount, config.percents) * days).toFixed(2) } <span> Eth</span>
                                </div>
                                <div class="cabinet__staking-data-itm-usd">
                                { ((calculate(amount, config.percents) * days) * rate).toFixed(2)}
                                    $<span class="js_calculator-profit-total-usd"></span>
                                </div>
                            </div>
                        </div>
                        <div class="cabinet__staking-notes">
                            <div class="cabinet__staking-notes-itm">
                                <img src="img/check.svg" alt="" class="cabinet__staking-notes-itm-img"/>
                                <div class="cabinet__staking-notes-itm-txt">
                                    Вывод вознаграждения в любой момент
                                </div>
                            </div>
                            <div class="cabinet__staking-notes-itm">
                                <img src="img/check.svg" alt="" class="cabinet__staking-notes-itm-img"/>
                                <div class="cabinet__staking-notes-itm-txt">
                                    Возможность реинвестирования
                                </div>
                            </div>
                        </div>
                        {
                            !busy &&
                            <button onClick={onCreate} class="btn btn_red cabinet__staking-btn js_cabinet-wallet-deposit">
                                Разместить в стейкинг
                            </button>
                        }
                    </div>
                    <div class="cabinet__balance">
                        <div class="cabinet__balance-ttl font-35">
                            Баланс
                        </div>
                        <div class="cabinet__balance-current _item">
                            <div class="cabinet__balance-current-l">
                                <div class="cabinet__balance-current-l-txt">
                                    Всего Ethereum на балансе
                                </div>
                                <div class="cabinet__balance-current-l-val">
                                    <span class="js_check-result-current-balance"></span>{ total }<span>Eth</span>
                                </div>
                            </div>
                            <div class="cabinet__balance-current-r">
                                <div class="cabinet__balance-current-r-txt">
                                    По текущему<br/>
                                    курсу
                                </div>
                                <div class="cabinet__balance-current-r-val">
                                    $<span class="js_check-result-current-balance-usd">{ (total * rate).toFixed(4)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cabinet__balance-available _item js_cabinet-hide-for-new">
                            <div class="cabinet__balance-available-l">
                                <div class="cabinet__balance-available-l-txt">
                                    Из них доступно<br/>
                                    для вывода
                                </div>
                                <div class="cabinet__balance-available-l-val">
                                    <span class="js_check-result-current-balance"></span>{ available }<span>Eth</span>
                                </div>
                            </div>
                            <div class="cabinet__balance-available-r">
                                <div class="cabinet__balance-available-r-itm js_cabinet-wallet-withdraw" onClick={onOpenModal}>
                                    Вывести
                                </div>
                            </div>
                        </div>
                        <div class="cabinet__balance-graph js_cabinet-hide-for-new">
                            <div class="cabinet__balance-graph-ttl">
                                Стоимость активов на балансе
                            </div>
                            <div class="cabinet__balance-graph-main" id="js_graph">
                               {
                                  options &&
                                  <CanvasJSChart options = {options}></CanvasJSChart>
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    )
}

export default Staking;
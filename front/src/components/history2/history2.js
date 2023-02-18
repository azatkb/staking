import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import AdminSidebar from "../adminSidebar/adminSidebar";
import { formatDate } from "../../date";

let map ={
    "buy_for_fiat2":"Покупка за фиат",
    "withdrawed_to_wallet":"Выведено на криптокошелек",
    "admin_transaction":"Депозит админом"
}

export function History2() {

    const [balance, setBalance] = useState(0);
    const [list, setList] = useState([]);
    const params = useParams();

    const getBalance = ()=>{
        axios.get(`${config.api}/wallets/balance?id=${params.id}`, headers).then(res => {
          if(res.data){
            setBalance(res.data.balance);
          }
        });
    }

    let history = list.map((transaction)=>{
        return(
            <div className="list__item" key={transaction._id}>
                <div className="list__item-flexbox">
                    <div className="item__left">
                        <div className="date"><span className="white-text">{ formatDate(transaction.createdAt)}</span>
                        </div>
                        <div className="title">{map[transaction.type]} {transaction.by}</div>
                    </div>
                    <div className="item__right"> <span className="blue-text">{ transaction.amount > 0 ? '+' + transaction.amount : transaction.amount  } OVP</span>
                    </div>
                </div>
            </div>
        )
    });

    useEffect(()=>{
        getBalance();
        axios.get(`${config.api}/transactions/list?id=${params.id}`, headers).then(res => {
            setList(res.data);
        });
    },[]);

    return (
        <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt="" />
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    <div className="cabinet__control cabinet__control-wallet gray cabinet_balance">
                        <h1 className="t-title">Баланс</h1>
                        <div className="cabinet__control-box">
                            <div className="cabinet__control-input dark">
                                <input type="text" readOnly required value={balance + " OVP"}/>
                            </div>
                        </div>
                    </div>
                    <div className="cabinet__control cabinet__control-wallet gray cabinet_balance">
                        <h1 className="t-title">История</h1>
                        <div className="list__box">
                            { history }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default History2;
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
    "admin_transaction":"Депозит админом",
    "exchange":"Покупка за криптовалюту",
}

export function Logs() {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(0);

    const onPageChange =(p)=>{
        setPage(p);
        fetch(p);
    }

    let history = data.map((transaction)=>{

        let user = transaction.user_id;

        return(
            <div className="" key={transaction._id}>
                <div className="history_item">
                    <div className="history_left"><span className="white-text">{ formatDate(transaction.createdAt)}</span></div>
                    <div className="history_right"> <span className="blue-text">{ transaction.amount > 0 ? '+' + transaction.amount : transaction.amount  } OVP</span>    </div>
                    <div className="history_center">
                        {
                            (transaction.type !== 'exchange') && (transaction.type !== 'withdrawed_to_wallet') && (transaction.type !== 'admin_transaction') &&
                            <div className="title">{map[transaction.type]} {transaction.by}</div>
                        }
                        {
                            transaction.type === 'withdrawed_to_wallet' &&
                            <div className="title">{ user ? user["email"]: ''} {map[transaction.type]} {transaction.wallet}</div>
                        }
                        {
                            transaction.type === 'admin_transaction' &&
                            <div className="title">{ user ? user["email"]: ''} {map[transaction.type]} {transaction.by}</div>
                        }
                        {
                            transaction.type === 'exchange' &&
                            <div className="title">{map[transaction.type]} {transaction.wallet}</div>
                        }
                
                    </div>
                </div>
            </div>
        )
    });

    const fetch = (p)=>{
        axios.get(`${config.api}/transactions/logs?page=${p}`, headers).then(res => {
            let response = res.data;
            setData(response.list);
            if(!count){
                setCount(response.count);
            }
        })
    }

    useEffect(()=>{
        fetch(page);
    },[]);

    let pagination = null;

    if(count && count > 10){
        let pages = count/10;
        let numbs = [];
        for(let i = 0; i < pages; i++){
            numbs.push(i)
        }
        pagination = numbs.map((i)=>{
            return(
                <li><a className={page == i ? "active": ""} onClick={()=>{ onPageChange(i); }}>{i +1}</a></li>
            )
        });
    }

    return (
        <div className="cabinet__control cabinet__control-wallet gray cabinet_balance">
                <h1 className="t-title">История</h1>
                <div className="list__box">
                    { history }
                </div>
                <div>
                    <ul className="pagination">
                        {pagination}
                    </ul>
                </div>
        </div>

    );
}

export default Logs;
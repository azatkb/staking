
import { useState, useEffect} from "react";
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import Sidebar  from "../sidebar/sidebar";
import { toast } from 'react-toastify';
import { formatDate } from "../../date";

function History({ translator }){

    const [list, setList] = useState([]);

    useEffect(()=>{
        axios.get(`${config.api}/transactions/list`, headers).then(res => {
            setList(res.data);
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
    },[]);


    let history = list.map((transaction)=>{
        return(
            <div className="list__item" key={transaction._id}>
                <div className="list__item-flexbox">
                    <div className="item__left">
                        <div className="date"><span className="white-text">{ formatDate(transaction.createdAt)}</span>
                        </div>
                        <div className="title">{ translator.t(transaction.type)}</div>
                    </div>
                    <div className="item__right"> <span className="blue-text">{ transaction.amount > 0 ? '+' + transaction.amount : transaction.amount  } OVP</span>
                    </div>
                </div>
            </div>
        )
    });

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <Sidebar translator={translator}></Sidebar>
                    <div className="cabinet__content">
                        <div className="cabinet__list cabinet__list-history gray">
                            <h1 className="t-title">{translator.t('history')}</h1>
                            <div className="list__box">
                                 { history }
                            </div>
                        </div>
                    </div>
                </div>
           </section>
       </div>
    );
 }
 
 export default History;
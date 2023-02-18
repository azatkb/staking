import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";

export const History = ({ account, balance, rate })=>{

    document.body.style.background = "#fff";

    const [list, setList] = useState([]);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(0);

    const fetch = (p)=>{
        axios.get(`${config.api}/transactions/list?wallet=${account}&page=${p}`).then((res)=>{
            let data = res.data;
            setList(data.list);
            if(!count){
                setCount(data.count);
            }
        });
    }

    const onPageChange =(p)=>{
        setPage(p);
        fetch(p);
    }

    useEffect(()=>{
       if(account){
           fetch(page);
       }
    },[account]);

    let etherscan = config.prod ? "https://etherscan.io/tx/" : "https://goerli.etherscan.io/tx/";

    let logs = list.map((l, i)=>{
        let date = new Date();
        let day = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
        let hour = date.getHours() + "." + date.getMinutes();
        return(
            <div key={i}  class="cabinet__history-lst-itm _item js_cabinet-history-lst-itm js_cabinet-history-lst-itm-1">
                <div class="cabinet__history-lst-itm-l">
                    <div class="cabinet__history-lst-itm-l-top">Дата</div>
                    <div class="cabinet__history-lst-itm-l-btm"><span>{day}</span>{hour}</div>
                </div>
                {
                    l.amount > 0 && 
                    <div class="cabinet__history-lst-itm-m">Депозит</div>
                }
                {
                    l.amount < 0 && 
                    <div class="cabinet__history-lst-itm-m">Вывод</div>
                }
                {
                    l.amount > 0 && 
                    <div class="cabinet__history-lst-itm-m">
                        <a target="_blank" href={etherscan + l.hash}>Etherscan</a>
                    </div>
                }
                <div class="cabinet__history-lst-itm-r"><span>{l.amount}</span> Eth</div>
            </div>
        )
    });

    let pagination = null;

    if(count && count > 10){
        let pages = count/10;
        let numbs = [];
        for(let i = 0; i < pages; i++){
            numbs.push(i)
        }
        pagination = numbs.map((i)=>{
            return(
                <a key={i} className={page == (i)? "cabinet__pagination-itm _active": "cabinet__pagination-itm"} onClick={()=>{ onPageChange(i); }}>{i +1}</a>
            )
        });
    }

    return(
        <div className="cabinet_page">
            <Header account={account} rate={rate}></Header>
            <Sidebar balance={balance}></Sidebar>
            <div class="cabinet__main js_cabinet-page js_cabinet-page-security">
            <div class="container">
                <div class="cabinet__main-cnt">
                    <div class="cabinet__security">
                        <div class="cabinet__security-ttl font-35">
                            История
                        </div>
                        <div class="cabinet__security-lst js_security-log">
                            {
                                logs
                            }
                        </div>
                        <div class="cabinet__pagination js_cabinet-security-pagination">
                            {
                                pagination
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    )
}

export default History;
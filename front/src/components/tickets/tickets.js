import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar/adminSidebar";
import { formatDate } from "../../date";
import { getId } from "../../auth";

function Message({ data, user_id}){
    return(
        <div className="ticket">
            <a href={`/ticket2/${data._id}/${data.user_id.email}`}>
                <div className="item__header">
                    <div className="item__title">{formatDate(data.createdAt)}
                    </div>
                </div>
                <div className="item__content" style={{ display: 'block'}}>
                    <div className="request__text gray-text">{data.text}</div>
                </div>
            </a>
            {
                (data.changed) && (data.changed !== user_id) &&
                <div className="new_message"></div>
            }
        </div>
    );
}


export function Tickets() {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(0);

    let user_id = getId();

    const onPageChange =(p)=>{
        setPage(p);
        fetch(p);
    }

    const fetch = (p)=>{
        axios.get(`${config.api}/messages/tickets-admin?page=${p}`, headers).then(res => {
            let response = res.data;
            setData(response.list);
            if(!count){
                setCount(response.count);
            }
        }).catch((err)=>{
            toast.error("Unknown error!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    useEffect(()=>{
        fetch(page);
    },[]);

    let messages = data.map((message)=>{
        return(
            <Message key={message._id} data={message} user_id={user_id}></Message>
        );
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
                <li><a className={page == i ? "active": ""} onClick={()=>{ onPageChange(i); }}>{i +1}</a></li>
            )
        });
    }

    return (
        <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt="" />
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    <div className="cabinet__control cabinet__control-wallet gray">
                        <h1 className="t-title">Тикеты</h1>
                        <div className="tickets">
                        {
                            messages
                        }
                        </div>
                        <div>
                            <ul className="pagination">
                                {pagination}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tickets;
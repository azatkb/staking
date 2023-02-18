import { useState, useEffect} from "react";
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import AdminSidebar from "../adminSidebar/adminSidebar";
import Select from 'react-select';

export const Users = ()=>{

    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'banned', label: 'Banned' }
    ]

    const [list, setData] = useState([]);
    const [role, setRole] = useState(options[0]);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(0);

    const onPageChange =(p)=>{
        setPage(p);
        fetch(role.value, p);
    }

    const fetch = (r,p)=>{
        axios.get(`${config.api}/users/users?role=${r}&page=${p}`, headers).then(res => {
            let response = res.data;
            setData(response.list);
            setCount(response.count);
        });
    }

    const onChangeRole = (e)=>{
        setRole(e);
        fetch(e.value, page);
    }

    useEffect(()=>{
        fetch(role.value);
    },[]);

    let users = list.map((user)=>{
        return(
            <tr key={user._id}>
                <td> {user.email}</td>
                <td> {user.firstname}</td>
                <td> {user.lastname}</td>
                <td> {user.ip}</td>
                <td> {user.balance}</td>
                <td> {user.fiat}</td>
                <td>
                    <a href={`history2/${user._id}`}>
                        <img className="img-svg" src="/img/landing/book.svg" style={{ width: "20px"}}></img>
                    </a>
                </td>
                <td>
                    <a href={`user/${user._id}`}>
                         <img  className="img-svg"src="/img/landing/pen.svg" style={{ width: "20px"}}></img>
                    </a>
                </td>
            </tr>
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
                <li><a className={page == i ? "active": ""} onClick={()=>{ onPageChange(i); }}>{i +1}</a></li>
            )
        });
    }

    return(
        <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    <div className="cabinet__list cabinet__list-history gray relative">
                        <h1 className="t-title">Пользователи</h1>
                        <div className="control_bar">
                           <div className="control_bar_item">
                            <label>Роль</label>
                            <Select options={options} value={role} onChange={onChangeRole}/>
                           </div>
                        </div>
                        <div className="users_table_wrapper">
                            <table className="users_table">
                                <thead>
                                    <tr>
                                        <td>Email</td>
                                        <td>Имя</td>
                                        <td>Фамилия</td>
                                        <td>Ip</td>
                                        <td>Баланс</td>
                                        <td>За фиат</td>
                                        <td>История</td>
                                        <td>Редактировать</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users
                                    }
                                </tbody>
                            </table>
                            <div>
                                <ul className="pagination">
                                    {pagination}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </section>
    )
}

export default Users;
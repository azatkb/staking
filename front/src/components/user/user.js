import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import { Edit } from "../edit/edit";
import { Password } from "../password/password";
import AdminSidebar from "../adminSidebar/adminSidebar";

export const User = ()=>{

    const [data, setData] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [canChangePermisiions, setCanChangePermisiions] = useState(false);
    const [canTransact, setCantTransact] = useState(false);
    const [canBan, setCanBan] = useState(false);
    const params = useParams();

    useEffect(()=>{
        axios.get(`${config.api}/users/user?id=${params.id}`, headers).then(res => {
            let data = res.data;
            if(data.birthday){
                let birthday = new Date(data.birthday).toLocaleDateString()
                data.birthday = birthday;
            }
            setData(data);
        });
        axios.get(`${config.api}/users/get-permisssions`, headers).then(res => {
            let data = res.data;
            setCanChangePermisiions(data.can_change_permissions);
            setCantTransact(data.can_transact);
            setCanBan(data.can_ban);
        });
        axios.get(`${config.api}/wallets/wallets-admin?id=${params.id}`, headers).then(res => {
            setWallet(res.data);
        });
    },[]);

    let wallets = wallet ? wallet.map((wallet)=>{
        return(
            <div className="list__item" key={wallet._id}>
                <div className="list__item-flexbox">
                    <div className="item__left">
                        <div className="title">{ wallet.address }</div>
                    </div>
                </div>
            </div>
        )
    }): [];

    return(
        <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    {
                        data && 
                        <Edit data={data} canBan={canBan} canChangePermisiions={canChangePermisiions}></Edit>
                    }
                    <Password _id={params.id}></Password>
                    <div className="cabinet__control cabinet__control-wallet gray">
                        <h1 className="t-title">Кошелек</h1>
                        {
                            wallets
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default User;
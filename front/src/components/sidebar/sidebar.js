import { useState, useEffect } from "react";
import axios from "axios";
import config from '../../config';
import { headers } from "../../auth";
import { getId } from "../../auth";

function Sidebar({ translator }){

    const [changed, setData] = useState(false);

    let user_id = getId();

    const fetch = ()=>{
        axios.get(`${config.api}/messages/tickets`, headers).then(res => {
            res.data.forEach((t)=>{
                if((t.changed) && (t.changed !== user_id)){
                    setData(true)
                }
            })
        })
    }

    useEffect(()=>{
        fetch();
    },[]);

    let location = window.location.href;
    
    return(
        <div className="cabinet__sidebar">
            <div className="cabinet__menu gray">
               <a className={ location.indexOf('balance') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/balance">{translator.t('balance')}
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('wallet') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/wallet">{translator.t('wallet')}
                  <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('personal') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/personal">{translator.t('personal')}
                 <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('history') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"}href="/history">{translator.t('history')}
                  <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('security') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/security">{translator.t('security')}
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
                </a>
                <a className={ location.indexOf('support') > 0 ? "cabinet__menu-link active cabinet__menu-link_support" : "cabinet__menu-link cabinet__menu-link_support"} href="/support">{translator.t('support')}
                    <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
                    {
                        changed &&
                        <div className="new_message"></div>
                    }
                 </a>
            </div>
       </div>
    )
}

export default Sidebar;
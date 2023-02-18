
import { useState, useEffect} from "react";
import Sidebar  from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

function Wallet({ translator }){

    const [list, setList] = useState([]);

    const fetch = ()=>{
        axios.get(`${config.api}/wallets/wallets`, headers).then(res => {
            setList(res.data);
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    const onDeleteClick = (e)=>{
        axios.post(`${config.api}/wallets/delete`,{ _id: e.target.value}, headers).then(res => {
            fetch();
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    useEffect(()=>{
        fetch();
    },[]);

    let wallets = list.map((wallet)=>{
        return(
            <div className="" key={wallet._id}>
                <div className="">
                    <div className="">
                        <div className="">
                            { wallet.address } 
                            <button onClick={onDeleteClick} value={wallet._id} style={{ float: "right"}} className="t-btn header-transparent">{ translator.t('delete')}</button>
                        </div>
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
                        <div className="cabinet__control cabinet__control-wallet gray">
                        <h1 className="t-title">{translator.t('wallet')}</h1>
                        <h2 className="t-subtitle">{translator.t('wallet_label')}</h2>
                        <Formik
                            initialValues={{ address: "" }}
                             onSubmit={(values, { resetForm }) => {
                                axios.post(`${config.api}/wallets/create`, values, headers).then(res => {
                                    toast.success(translator.t('wallet_create'), {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                    resetForm();
                                    fetch();
                                }).catch((err)=>{
                                    toast.error(translator.t('already_exists'), {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                });
                              }}
                              validationSchema={Yup.object().shape({
                                address: Yup.string().required(translator.t('required'))
                              })}
                               >
                              {props => {
                                 const {
                                  values,
                                  touched,
                                  errors,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit
                               } = props;
                                    return (
                                    <form onSubmit={handleSubmit} className="cabinet__control-box">
                                        <div className="cabinet__control-input dark">
                                        
                                                <input
                                                    type="text"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="address"
                                                    placeholder="0XA5E262EC733051B14B38901901A82F2684637E78"
                                                />
                                            {errors.address && touched.address && (
                                                <div className="form_error">{errors.address}</div>
                                            )}
                                            </div>
                    
                                            <button className="t-btn transparent cabinet__control-button" type="submit"><span>{translator.t('save_wallet')}</span>
                                                    <div className="button__bg-hover"></div>
                                            </button>

                                    </form>
                                   );
                                }}
                                
                            </Formik>

                            <div className="saved_wallets">
                                <h1 className="small-title">{translator.t('saved_wallets')}</h1>
                                <div className="list__box">
                                    { wallets }
                                </div>
                            </div>

                        </div>
                        <div className="cabinet__wallets gray">
                        <h2 className="small-title">{translator.t('supported_wallet')}</h2>
                        <div className="subtitle">{translator.t('supported_wallet_desc')}</div>
                        <div className="wallets__box">

                        <a className="wallets__item item1" href="https://metamask.io/" target="_blank">
                        <div className="item__img-box">
                              <img className="item__img img-svg" src="img/landing/wallets/metamask.svg" alt=""/>
                        </div>
                        <div className="item__link">metamask.io</div>
                        </a>
                        <a className="wallets__item item1" href="https://walletconnect.com/" target="_blank">
                            <div className="item__img-box">
                                <img className="item__img img-svg" src="img/landing/wallets/walletconnect.svg" alt=""/>
                            </div>
                            <div className="item__link">walletconnect.com</div>
                        </a>
                        <a className="wallets__item item1" href="https://www.coinbase.com/ru/" target="_blank">
                            <div className="item__img-box">
                                <img className="item__img img-svg" src="img/landing/wallets/coinbase.svg" alt=""/>
                            </div>
                            <div className="item__link">coinbase.com</div>
                        </a>
                        
                        </div>
                      </div>
                    </div>
                </div>
           </section>
           <ToastContainer></ToastContainer>
       </div>
    );
 }
 
 export default Wallet;
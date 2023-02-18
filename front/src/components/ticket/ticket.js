
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Sidebar  from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { formatDate } from "../../date";
import { getId } from "../../auth";

function Message({ data , user_id}){
    return(
        <div className="message_row">
            <div className={ data.user_id === user_id ? "message": "message response"}>
                  <div className="message_date">{formatDate(data.createdAt)}</div>
                  <div className="message_text">{data.text}</div>
            </div>
        </div>
    );
}


function Ticket({ translator }){

    const [data, setData] = useState([]);
    const params = useParams();
    const user_id = getId();

    const fetch = ()=>{
        axios.get(`${config.api}/messages/list?id=${params.id}`, headers).then(res => {
            setData(res.data);
        }).catch((err)=>{
            toast.error("Unknown error!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    const closeTicket = ()=>{
        axios.post(`${config.api}/messages/close-ticket`, { _id: params.id }, headers).then(res => {
            window.location.href = '/support';
        }).catch((err)=>{
            toast.error("Unknown error!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    useEffect(()=>{
        fetch();
    },[]);

    let messages = data.map((message)=>{
        return(
            <Message key={message._id} data={message} translator={translator} user_id={user_id}></Message>
        );
    });

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <Sidebar translator={translator}></Sidebar>
                    <div className="cabinet__content">
                   
                        <div className="cabinet__support gray">
                            <h1 className="t-title">{translator.t('chat')}</h1>
                            <div className="requests__box"> 
                                { messages }
                            </div>
                            <Formik
                                initialValues={{ text: "" }}
                                onSubmit={(values, { resetForm }) => {
                                    values.ticket = params.id;
                                    axios.post(`${config.api}/messages/create`, values , headers).then(res => {
                                        toast.success(translator.t('message_send'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                        resetForm();
                                        fetch();
                                    }).catch((err)=>{
                                        toast.error(translator.t('error'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    });
                                }}
                                validationSchema={Yup.object().shape({
                                    text: Yup.string().required(translator.t('required'))
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
                                            <form onSubmit={handleSubmit} className="cabinet__support-form">
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('explane_problem')}</div>
                                                    <textarea
                                                        type="text"
                                                        value={values.text}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="text"
                                                        className="label__input"
                                                    />
                                                    {errors.text && touched.text && (
                                                        <div className="form_error">{errors.text}</div>
                                                    )}
                                                </label>
                                                <button className="t-btn transparent small" type="submit"><span>{translator.t('send')}</span>
                                                    <div className="button__bg-hover"></div>
                                                </button>
                                                <a onClick={closeTicket} className="t-btn header-transparent small close_ticket" type="submit"><span>{translator.t('close_ticket')}</span>
                                                    
                                                </a>
                                                                    
                                            </form>
                                            
                                        );
                                    }}
                                    
                                </Formik>

                            </div>
                     
                    </div>
                </div>
           </section>
       </div>
    );
 }
 
 export default Ticket;
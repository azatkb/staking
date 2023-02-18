
import { useState, useEffect } from "react";
import Sidebar  from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from "../../date";
import { getId } from "../../auth";

function Message({ data , translator, user_id}){

    return(
        <div className={"requiest__item active"}>
            <a href={`/ticket/${data._id}`}>
            <div className="item__header">
                <div className="item__title">{ translator.t('question')} {formatDate(data.createdAt)}
                </div>
                {
                    data.closed &&
                    <span className="closed_ticket">{ translator.t('closed_ticket')}</span>
                }
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


function Support({ translator }){

    const [data, setData] = useState([]);

    let user_id = getId();

    const fetch = ()=>{
        axios.get(`${config.api}/messages/tickets`, headers).then(res => {
            setData(res.data);
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
                            <h1 className="t-title">{translator.t('support')}</h1>
                            <Formik
                                initialValues={{ text: "" }}
                                onSubmit={(values, { resetForm }) => {
                                   
                                    axios.post(`${config.api}/messages/create-ticket`, values , headers).then(res => {
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
                                                <button className="t-btn transparent small" type="submit"><span>{translator.t('ask_question')}</span>
                                                    <div className="button__bg-hover"></div>
                                                </button>
                                                                    
                                            </form>
                                            
                                        );
                                    }}
                                    
                                </Formik>
                                <div className="requests__box"> 
                                    { messages }
                                </div>
                            </div>
                     
                    </div>
                </div>
           </section>
           <ToastContainer></ToastContainer>
       </div>
    );
 }
 
 export default Support;
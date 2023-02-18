
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import AdminSidebar from "../adminSidebar/adminSidebar";
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


function TicketAdmin(){

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

    useEffect(()=>{
        fetch();
    },[]);

    let messages = data.map((message)=>{
        return(
            <Message key={message._id} data={message}  user_id={user_id}></Message>
        );
    });

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <AdminSidebar></AdminSidebar>
                    <div className="cabinet__content">
                   
                        <div className="cabinet__support gray">
                            <h1 className="t-title">Чат c {params.user}</h1>
                            <div className="requests__box"> 
                                { messages }
                            </div>
                            <Formik
                                initialValues={{ text: "" }}
                                onSubmit={(values, { resetForm }) => {
                                    values.ticket = params.id;
                                    axios.post(`${config.api}/messages/admin-create`, values , headers).then(res => {
                                        toast.success("Отправленно", {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                        resetForm();
                                        fetch();
                                    })
                                }}
                                validationSchema={Yup.object().shape({
                                    text: Yup.string().required("Обязательно")
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
                                                    <div className="label__title">Текст</div>
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
                                                <button className="t-btn transparent small" type="submit"><span>Отправить</span>
                                                    <div className="button__bg-hover"></div>
                                                </button>
                                                                    
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
 
 export default TicketAdmin;
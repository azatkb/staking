
import { useState, useEffect} from "react";
import Sidebar  from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { DatePickerField } from "../datepicker/datepicker";
import "yup-phone";

function Personal({ translator }){

    const [data, setData] = useState(null);

    useEffect(()=>{
        axios.get(`${config.api}/users/user-profile`, headers).then(res => {
            let data = res.data;
            if(data.birthday){
                let birthday = new Date(data.birthday).toLocaleDateString()
                data.birthday = birthday;
            }
            setData(data);
        }).catch((err)=>{
            toast.error(translator.t('error'), {
                position: toast.POSITION.TOP_CENTER
            });
        })
    },[]);

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <Sidebar translator={translator}></Sidebar>
                    <div className="cabinet__content">
                        {
                             data &&
                             <div className="cabinet__control cabinet__control-wallet gray">
                                <h1 className="t-title">{translator.t('personal')}</h1>
                            <Formik
                                initialValues={{ firstname: data.firstname, lastname: data.lastname, middlename: data.middlename, phone: data.phone, address: data.address,  birthday: data.birthday, email: data.email }}
                                onSubmit={(values, { resetForm }) => {
                                    values._id = data._id;
                                    axios.post(`${config.api}/users/update-user`, values, headers).then(res => {
                                        toast.success(translator.t('updated'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    }).catch((err)=>{
                                        toast.error(translator.t('error'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    });
                                }}
                                validationSchema={Yup.object().shape({
                                    // firstname: Yup.string().required(translator.t('required')),
                                    // lastname: Yup.string().required(translator.t('required')),
                                    // middlename: Yup.string().required(translator.t('required')),
                                    // phone: Yup.string().phone("Invalid phone").required(translator.t('required')),
                                    // address: Yup.string().required(translator.t('required')),
                                    // birthday: Yup.string().required(translator.t('required')),
                                    email: Yup.string().email().required(translator.t('required'))
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
                                            <form onSubmit={handleSubmit} className="cabinet__personal-form">
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('firstname')}</div>
                                                    <input
                                                            type="text"
                                                            value={values.firstname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="firstname"
                                                            className="label__input"
                                                        />
                                                    {errors.firstname && touched.firstname && (
                                                        <div className="form_error">{errors.firstname}</div>
                                                    )}
                                                </label>
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('lastname')}</div>
                                                    <input
                                                            type="text"
                                                            value={values.lastname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="lastname"
                                                            className="label__input"
                                                        />
                                                    {errors.lastname && touched.lastname && (
                                                        <div className="form_error">{errors.lastname}</div>
                                                    )}
                                                </label>
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('middlename')}</div>
                                                    <input
                                                            type="text"
                                                            value={values.middlename}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="middlename"
                                                            className="label__input"
                                                        />
                                                    {errors.lastname && touched.lastname && (
                                                        <div className="form_error">{errors.lastname}</div>
                                                    )}
                                                </label>
                                                <label className="form__label long">
                                                    <div className="label__title">{translator.t('address')}</div>
                                                    <input
                                                            type="text"
                                                            value={values.address}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="address"
                                                            className="label__input"
                                                        />
                                                    {errors.address && touched.address && (
                                                        <div className="form_error">{errors.address}</div>
                                                    )}
                                                </label>
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('birthday')}</div>
                                                    <DatePickerField name="birthday" />
                                                    {errors.birthday && touched.birthday && (
                                                        <div className="form_error">{errors.birthday}</div>
                                                    )}
                                                </label>
                                                <label className="form__label">
                                                    <div className="label__title">{translator.t('phone')}</div>
                                                    <input
                                                            type="text"
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="phone"
                                                            className="label__input"
                                                        />
                                                    {errors.phone && touched.phone && (
                                                        <div className="form_error">{errors.phone}</div>
                                                    )}
                                                </label>
                                                <label className="form__label last__input">
                                                    <div className="label__title">E-mail</div>
                                                    <input
                                                            type="text"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="email"
                                                            readOnly={true}
                                                            className="label__input"
                                                        />
                                                    {errors.email && touched.email && (
                                                        <div className="form_error">{errors.email}</div>
                                                    )}
                                                </label>
                                                <div className="w100"></div>
                                                <button className="t-btn transparent small" type="submit"><span>{translator.t('save')}</span>
                                                    <div className="button__bg-hover"></div>
                                                </button>
                                            </form>
                                        );
                                    }}
                                    
                                </Formik>

                            </div>
                        }
                    </div>
                </div>
           </section>
           <ToastContainer></ToastContainer>
       </div>
    );
 }
 
 export default Personal;
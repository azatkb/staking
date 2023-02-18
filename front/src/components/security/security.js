
import Sidebar  from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

const equalTo = (ref, msg) => {
    return Yup.mixed().test({
        name: 'equalTo',
        exclusive: false,
        message: msg,
        params: {
            reference: ref.path,
        },
        test: function (value) {
            return value === this.resolve(ref);
        },
    });
}

Yup.addMethod(Yup.string, 'equalTo', equalTo);

function Security({ translator }){

    return (
       <div>
           <section className="cabinet-section">
                <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
                <div className="container">
                    <Sidebar translator={translator}></Sidebar>
                    <div className="cabinet__content">
                   
                        <div className="cabinet__control cabinet__control-wallet gray">
                            <h1 className="t-title">{translator.t('security')}</h1>
                            <Formik
                                initialValues={{ old_password: "", password: "", new_password: "" }}
                                onSubmit={(values, { resetForm }) => {

                                    let data = {
                                        password: values.old_password,
                                        new_password: values.password,
                                    }
                                   
                                    axios.post(`${config.api}/users/change-password`, data , headers).then(res => {
                                        toast.success(translator.t('updated'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                        resetForm();
                                    }).catch((err)=>{
                                        toast.error(translator.t('wrong_password'), {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    });
                                }}
                                validationSchema={Yup.object().shape({
                                    old_password: Yup.string().required(translator.t('required')),
                                    password: Yup.string().required(translator.t('required')),
                                    new_password: Yup.string().equalTo(Yup.ref('password'), translator.t('must_match')).required(translator.t('required')),
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
                                            <form onSubmit={handleSubmit} className="cabinet__safety-form">
                                                <div className="safety-form__left">
                                                    <label className="form__label">
                                                        <div className="label__title">{translator.t('old_password')}</div>
                                                        <input
                                                                type="text"
                                                                value={values.old_password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="old_password"
                                                                className="label__input"
                                                            />
                                                        {errors.old_password && touched.old_password && (
                                                            <div className="form_error">{errors.old_password}</div>
                                                        )}
                                                    </label>
                                                    <label className="form__label">
                                                        <div className="label__title">{translator.t('new_password')}</div>
                                                        <input
                                                                type="text"
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="password"
                                                                className="label__input"
                                                            />
                                                        {errors.password && touched.password && (
                                                            <div className="form_error">{errors.password}</div>
                                                        )}
                                                    </label>
                                                    <label className="form__label">
                                                        <div className="label__title">{translator.t('retype_password')}</div>
                                                        <input
                                                                type="text"
                                                                value={values.new_password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="new_password"
                                                                className="label__input"
                                                            />
                                                        {errors.new_password && touched.new_password && (
                                                            <div className="form_error">{errors.new_password}</div>
                                                        )}
                                                    </label>
                                                    <button className="t-btn transparent small" type="submit"><span>{translator.t('save')}</span>
                                                        <div className="button__bg-hover"></div>
                                                    </button>
                                                </div>
                                                <div className="safety-form__right">
                                                    <p>{translator.t('passwor_requirment_1')}</p>
                                                    <p>{translator.t('passwor_requirment_2')}</p>
                                                    <p>{translator.t('passwor_requirment_3')}</p>
                                                </div>
                                                                    
                                            </form>
                                        );
                                    }}
                                    
                                </Formik>

                            </div>
                     
                    </div>
                </div>
           </section>
           <ToastContainer></ToastContainer>
       </div>
    );
 }
 
 export default Security;
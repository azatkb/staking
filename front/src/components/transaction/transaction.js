import { useState } from "react";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AdminSidebar from "../adminSidebar/adminSidebar";

export function Transaction() {

    const [canTransact, setCantTransact] = useState(false);

    axios.get(`${config.api}/users/get-permisssions`, headers).then(res => {
        let data = res.data;
        setCantTransact(data.can_transact);
    });

    return (
        <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt="" />
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    <div className="cabinet__control cabinet__control-wallet gray">
                        <h1 className="t-title">Зачислить на счет</h1>
                        {
                            canTransact === false &&
                            <p>У вас нет прав на зачисление</p>
                        }
                        {
                            canTransact === true &&
                            <Formik
                                initialValues={{ email: "", amount: 0 }}
                                onSubmit={(values) => {

                                    let data = {
                                        email: values.email,
                                        amount: values.amount
                                    }

                                    axios.post(`${config.api}/transactions/admin-transaction`, data, headers).then(res => {
                                        toast.success("Updated", {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    }).catch(() => {
                                        toast.success("User not found", {
                                            position: toast.POSITION.TOP_CENTER
                                        });
                                    })
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email().required("required"),
                                    amount: Yup.number().required("required"),
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
                                                    <div className="label__title">Email</div>
                                                    <input
                                                        type="text"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="email"
                                                        className="label__input"
                                                    />
                                                    {errors.email && touched.email && (
                                                        <div className="form_error">{errors.email}</div>
                                                    )}
                                                </label>
                                                <label className="form__label">
                                                    <div className="label__title">Количество Ovp</div>
                                                    <input
                                                        type="text"
                                                        value={values.amount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="amount"
                                                        className="label__input"
                                                    />
                                                    {errors.amount && touched.amount && (
                                                        <div className="form_error">{errors.amount}</div>
                                                    )}
                                                </label>
                                                <button className="t-btn transparent small" type="submit"><span>Отправить</span>
                                                    <div className="button__bg-hover"></div>
                                                </button>
                                            </div>

                                        </form>
                                    );
                                }}

                            </Formik>
                        }
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Transaction;
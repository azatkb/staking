
import Sidebar from "../sidebar/sidebar";
import { headers } from "../../auth";
import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';

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

export function Password({ _id }) {

    return (
        <div>
            <div className="cabinet__control cabinet__control-wallet gray">
                <h1 className="t-title">Задать пароль</h1>
                <Formik
                    initialValues={{ password: "", new_password: "" }}
                    onSubmit={(values) => {

                        let data = {
                            _id: _id,
                            password: values.password
                        }

                        axios.post(`${config.api}/users/change-password-admin`, data, headers).then(res => {
                            toast.success("Updated", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().required("required"),
                        new_password: Yup.string().equalTo(Yup.ref('password'), "must_match").required("required"),
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
                                        <div className="label__title">Пароль</div>
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
                                        <div className="label__title">Повторите пароль</div>
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
                                    <button className="t-btn transparent small" type="submit"><span>Задать</span>
                                        <div className="button__bg-hover"></div>
                                    </button>
                                </div>

                            </form>
                        );
                    }}

                </Formik>

            </div>
        </div>
    );
}

export default Password;
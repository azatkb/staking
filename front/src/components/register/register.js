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

function Register({ translator }){

    return(
        <div className="modal modal__signup" data-modal="signup">
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt=""/>
            </div>
            <div className="small-title">{translator.t('register')}</div>
                <Formik
                    initialValues={{ email: "", password: "", confirm: ""}}
                    onSubmit={values => {
                        axios.post(`${config.api}/users/register`, values)  .then(res => {
                            if (res.data) {
                                axios.post(`${config.api}/users/login`, values)  .then(res => {
                                    if (res.data) {
                                        localStorage.setItem("token", res.data.token);
                                        localStorage.setItem('profile', JSON.stringify(res.data.profile));
                                        window.location.href = '/balance';
                                    }
                                })
                            }
                        }).catch(()=>{
                            toast.error(translator.t('user_exists'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                     }}
                     validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(translator.t('required')),
                        password: Yup.string().required(translator.t('required')),
                        confirm: Yup.string().equalTo(Yup.ref('password'), translator.t('must_match')).required(translator.t('required')),
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
                     <form onSubmit={handleSubmit} >
                         <div className="modal__label">
                            <div className="label__title">E-mail</div>
                                <input
                                     type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    placeholder="Email"
                                    className="label__input"
                                />
                              {errors.email && touched.email && (
                                 <div className="form_error">{errors.email}</div>
                             )}
                            </div>
                            <div className="modal__label">
                                <div className="label__title">{translator.t('password')}</div>
                                <input
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    placeholder="Password"
                                    className="label__input input__password"
                                />
                                {errors.password && touched.password && (
                                    <div className="form_error">{errors.password}</div>
                                )}
                            </div>

                            <div className="modal__label">
                                <div className="label__title">{translator.t('retype_password')}</div>
                                <input
                                    type="password"
                                    value={values.confirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="confirm"
                                    placeholder="Password"
                                    className="label__input input__password"
                                />
                                {errors.confirm && touched.confirm && (
                                    <div className="form_error">{errors.confirm}</div>
                                )}
                            </div>
     
                            <button className="t-btn blue" type="submit"><span>{translator.t('do_register')}</span>
                                <div className="button__bg-hover"></div>
                            </button>

                     </form>
                   );
                }}
            </Formik>
        </div>
    )
}

export default Register;
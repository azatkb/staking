import { Formik  } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';

function LoginBig({ translator }){

    return(
        <div>
                <img className="swap__column-icon" src="img/landing/coinswap.png" alt=""/>
                <h2 className="small-title main-title">{ translator.t('buy_tokens_for_fiat')}</h2>
                <p>{ translator.t('buy_for_fiat_desc') }</p>
                <div className="t-btn transparent modal__open small" data-modal="signup"><span>{translator.t('register')}</span>
                    <div className="button__bg-hover"></div>
                </div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={values => {
                        axios.post(`${config.api}/users/login`, values)  .then(res => {
                            if (res.data) {
                                localStorage.setItem("token", res.data.token);
                                localStorage.setItem('profile', JSON.stringify(res.data.profile));
                                if(res.data.profile.role === 'user'){
                                    window.location.href = '/swap';
                                }else{
                                    window.location.href = '/purchases';
                                }
                            }
                        }).catch((err)=>{
                            toast.error(translator.t('wrong_password_email'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                     }}
                     validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(translator.t('required')),
                        password: Yup.string().required(translator.t('required'))
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
                     <form onSubmit={handleSubmit} className="login__form dark t-form" >
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
     
                            <button className="t-btn blue" type="submit"><span>{translator.t('login')}</span>
                                <div className="button__bg-hover"></div>
                            </button>

                            <div className="login__footer">
                                <div className="login__footer-payments">
                                    <img className="login__payments-icon icon1" src="img/icons/payments/visa.svg" alt=""/>
                                    <img className="login__payments-icon icon2" src="img/icons/payments/mastercard.svg" alt=""/>
                                    <img className="login__payments-icon icon3" src="img/icons/payments/paypal.svg" alt=""/>
                                    <img className="login__payments-icon icon4" src="img/icons/payments/undefined.svg" alt=""/>
                                </div>
                                <div className="login__footer-link modal__open" data-modal="reset">{ translator.t('i_forgot_password')}</div>
                            </div>
                     </form>

                     
                   );
                }}
                
            </Formik>
        </div>
    )
}

export default LoginBig;
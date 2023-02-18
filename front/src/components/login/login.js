import { Formik } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';

function Login({ translator }){

    return(
        <div className="modal modal__login" data-modal="login">
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt=""/>
            </div>
            <div className="small-title">{ translator.t('enter_to_profile') }</div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={values => {
                        axios.post(`${config.api}/users/login`, values)  .then(res => {
                            if (res.data) {
                                localStorage.setItem("token", res.data.token);
                                localStorage.setItem('profile', JSON.stringify(res.data.profile));
                                if(res.data.profile.role === 'user'){
                                    window.location.href = '/balance';
                                }else{
                                    window.location.href = '/purchases';
                                }
                            }
                        }).catch((err)=>{
                            if(err.response.data){
                                if(err.response.data.code === 405){
                                    toast.error(translator.t('banned'), {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                }else{
                                    toast.error(translator.t('wrong_password_email'), {
                                        position: toast.POSITION.TOP_CENTER
                                    });
                                }
                            }else{
                                toast.error(translator.t('error'), {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            }
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

                            <div className="t-btn transparent modal__open small register_button" data-modal="signup"><span>{translator.t('register')}</span>
                                <div className="button__bg-hover"></div>
                            </div>
     
                            <button className="t-btn blue" type="submit"><span>{translator.t('login')}</span>
                                <div className="button__bg-hover"></div>
                            </button>

                     </form>
                   );
                }}
            </Formik>
        </div>
    )
}

export default Login;
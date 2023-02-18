import { Formik  } from "formik";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword({ translator }){

    return(
        <div className="modal modal__reset" data-modal="reset">
            <div className="modal__close">
                <img className="img-svg" src="img/icons/close.svg" alt=""/>
            </div>
            <div className="small-title">{ translator.t('forgot_password') }</div>
            <div className="subtitle">{ translator.t('forgot_instruction') }</div>
            <Formik
                    initialValues={{ email: ""}}
                    onSubmit={values => {
                        axios.post(`${config.api}/users/reset`, values).then(res => {
                            toast.success(translator.t('send_link'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }).catch((err)=>{
                            toast.success(translator.t('wrong_password_email'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                     }}
                     validationSchema={Yup.object().shape({
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
                     <form onSubmit={handleSubmit} className="reset__form">
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
     
                            <button className="t-btn blue" type="submit"><span>{translator.t('sent_link')}</span>
                                <div className="button__bg-hover"></div>
                            </button>
                     </form>
                   );
                }}
            </Formik>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default ResetPassword;
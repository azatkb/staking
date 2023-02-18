import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
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

function Reset({ translator }){

    const [access, setAccess] = useState(false);
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            axios.get(`${config.api}/users/check-reset?id=${params.id}`).then(res => {
               setAccess(true);
            }).catch((err)=>{
                toast.error(translator.t('wrong_link'), {
                    position: toast.POSITION.TOP_CENTER
                });
            })
        }else{
            toast.error(translator.t('wrong_link'), {
                position: toast.POSITION.TOP_CENTER
            });
        }
    },[]);

    return(
       <div>
          {
             access &&
             <div className="reset_form">
                 <div className="small-title">{translator.t('change_password')}</div>
                <Formik
                    initialValues={{ password: "", confirm: ""}}
                    onSubmit={values => {
                        values._id = params.id;
                        axios.post(`${config.api}/users/reset-password`, values)  .then(res => {
                            window.location.href = '/';
                        }).catch(()=>{
                            toast.error(translator.t('wrong_link'), {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                     }}
                     validationSchema={Yup.object().shape({
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
                                <div className="label__title">{ translator.t('retype_password') }</div>
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
                            <div className="modal__label">
                                <button className="t-btn blue" type="submit"><span>{ translator.t('do_change_password') }</span>
                                    <div className="button__bg-hover"></div>
                                </button>
                            </div>

                     </form>
                   );
                }}
            </Formik>
 
             </div>
          }
          <ToastContainer></ToastContainer>
       </div>
    );
}

export default Reset;
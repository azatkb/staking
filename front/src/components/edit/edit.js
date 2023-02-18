import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { DatePickerField } from "../datepicker/datepicker";
import { Formik, Field } from "formik";
import Select from 'react-select';

function FormikSelect({
    options,
    field,
    form,
    canBan
  }) {
    return (
      <Select
        name={field.name}
        onBlur={field.onBlur}
        onChange={( value ) => {
            if((value.value === 'banned') && !canBan){
                return;
            }else{
                form.setFieldValue(field.name, value);
            }
        }}
        options={options}
        value={field.value}
      />
    );
  }

export const Edit = ({ data, canBan, canChangePermisiions }) => {

    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'banned', label: 'Banned' }
    ]

    options.forEach((option)=>{
        if(option.value === data.role){
           data.role = option;
        }
    });
    
    return (
        <div className="edit_form cabinet__control cabinet__control-wallet gray">
            <h1 className="t-title">Редактировать</h1>
            <Formik
                initialValues={{
                    firstname: data.firstname,
                    lastname: data.lastname,
                    middlename: data.middlename,
                    phone: data.phone,
                    address: data.address,
                    birthday: data.birthday,
                    email: data.email,
                    can_change_permissions: data.can_change_permissions,
                    can_transact: data.can_transact,
                    can_ban: data.can_ban,
                    role: data.role,
                }}
                onSubmit={(values) => {
                    values._id = data._id;
                    values.role = values.role.value;
                    axios.post(`${config.api}/users/update-user-admin`, values, headers).then(res => {
                        toast.success("Обновлено", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }).catch((err) => {
                        toast.error("", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    });
                }}
                validationSchema={Yup.object().shape({
                    // firstname: Yup.string().required("required"),
                    // lastname: Yup.string().required("required"),
                    // middlename: Yup.string().required("required"),
                    // phone: Yup.string().phone("Invalid phone").required("required"),
                    // address: Yup.string().required("required"),
                    // birthday: Yup.string().required("required"),
                    email: Yup.string().email().required("required")
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
                                <div className="label__title">Имя</div>
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
                                <div className="label__title">Фамилия</div>
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
                                <div className="label__title">Отчество</div>
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
                                <div className="label__title">Адресс</div>
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
                                <div className="label__title">Дата рождения</div>
                                <DatePickerField name="birthday" />
                                {errors.birthday && touched.birthday && (
                                    <div className="form_error">{errors.birthday}</div>
                                )}
                            </label>
                            <label className="form__label">
                                <div className="label__title">Телефон</div>
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
                            <label className="form__label">
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
                            <label className="form__label">
                                <div className="label__title">Ролъ</div>
                                <Field name="role" component={FormikSelect} options={options} canBan={canBan}/>
                            </label>
                            {
                                canChangePermisiions && values.role.value === 'admin' &&
                                <label className="form__label">
                                    <div className="label__title">Может редактировать разрешения</div>
                                    <Field type="checkbox" name="can_change_permissions" />
                                    <div className="label__title">Может зачислять на счет</div>
                                    <Field type="checkbox" name="can_transact" />
                                    <div className="label__title">Может заблокировать</div>
                                    <Field type="checkbox" name="can_ban" />
                                </label>
                            }
                            <div className="w100"></div>
                            <button className="t-btn transparent small" type="submit"><span>Сохранить</span>
                                <div className="button__bg-hover"></div>
                            </button>
                        </form>
                    );
                }}

            </Formik>

        </div>
    )
}
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { add, callApi } from "../../Reduxs/Action/index.js"
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Formik } from "formik";
import * as Yup from "yup";
import Header from '../../CommonComponent/Header/Header';
function AddData() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callApi())
    }, [])

    return (
        <div className='main'>
            <Formik
                initialValues={{
                    userId: '',
                    id: '',
                    title: '',
                    body: ''
                }}
                onSubmit={(values, action) => {
                    dispatch(add(values))
                    action.resetForm();
                }}
                validationSchema={Yup.object().shape({
                    body: Yup.string().required("Required body"),
                    userId: Yup.string().required("Required States"),
                    title: Yup.string().required("Required title"),
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    console.log(values)
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className='inner'>
                                <Header buttonName="Show Table" title="Add Your Data" pathName="/" />
                                <section className="vh-100">
                                    <div className="container-fluid h-custom">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-md-9 col-lg-6 col-xl-5">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                                    className="img-fluid" alt="Sample image" />
                                            </div>
                                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                                {/* <FormControl fullWidth className='mb-3'>
                                                    <InputLabel id="demo-simple-select-label">Enter State</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        label='userId'
                                                        placeholder='Enter State'
                                                        name='userId'
                                                        id="userId"
                                                        error={(errors.userId && touched.userId)}
                                                        value={values.userId}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={
                                                            errors.userId && touched.userId
                                                                ? "text-input error"
                                                                : "text-input"
                                                        }
                                                    >
                                                        <MenuItem value={0}>panding</MenuItem>
                                                        <MenuItem value={1}>susses</MenuItem>
                                                        <MenuItem value={2}>rejected</MenuItem>
                                                    </Select>
                                                    {errors.userId && touched.userId && (
                                                        <div className="input-feedback">{errors.userId}</div>
                                                    )}
                                                </FormControl> */}
                                                <div className='form-outline mb-3'>
                                                    <label for="userId">Enter State</label>

                                                    <select name='userId'
                                                        value={values.userId}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id="userId"
                                                        className={
                                                            errors.userId && touched.userId
                                                                ? "text-input form-control form-control-lg error"
                                                                : "text-input form-control form-control-lg"
                                                        }
                                                        placeholder="Enter State"
                                                    >
                                                        <option value="">Select State</option>
                                                        <option value="0">panding</option>
                                                        <option value="1">susses</option>
                                                        <option value="2">rejected</option>
                                                    </select>
                                                    {errors.userId && touched.userId && (
                                                        <div className="input-feedback">{errors.userId}</div>
                                                    )}
                                                </div>
                                                <div className="form-outline mb-3">
                                                    <input type="text" id="form3Example4" name='title' value={values.title}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={
                                                            errors.title && touched.title
                                                                ? "text-input error form-control form-control-lg"
                                                                : "text-input form-control form-control-lg"
                                                        }
                                                        placeholder="Enter title"
                                                    />
                                                    {errors.title && touched.title && (
                                                        <div className="input-feedback">{errors.title}</div>
                                                    )}
                                                </div>
                                                <div className="form-outline mb-3">
                                                    <input type="text" id="form3Example4" name='body' value={values.body}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Enter body"
                                                        className={
                                                            errors.body && touched.body
                                                                ? "text-input error form-control form-control-lg"
                                                                : "text-input form-control form-control-lg"
                                                        }
                                                    />
                                                    {errors.body && touched.body && (
                                                        <div className="input-feedback">{errors.body}</div>
                                                    )}
                                                </div>
                                                <div className="text-center text-lg-start mt-4 pt-2">
                                                    <button type="submit" className="btn btn-primary btn-lg"
                                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Add Data</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section >
                            </div >
                        </form>
                    );
                }}
            </Formik>
        </div >
    )
}
export default AddData
import React from "react";
import {Formik} from "formik";
import {Input, Button, Tag} from "antd";
import {addNewStudent} from "../client";

/*
Custom style for the form
*/

const inputBottomMargin = {marginBottom: "10px"};
const tagStyle = {backgroundColor: "#f50", color: "white", ...inputBottomMargin};

/*

Student form adds new students data to the backend

*/

const AddStudentForm = (props) => (
            <Formik
                initialValues={{firstName: "", lastName: "", email: "", gender: ""}}
                validate={values => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = "First name is required!";
                    }
                    if (!values.lastName) {
                        errors.lastName = "Last name is required!";
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.gender) {
                        errors.gender = "Gender is required!";
                    } else if (!["MALE", "male", "FEMALE", "female"].includes(values.gender)) {
                        errors.gender = "Gender must be Male OR Female";
                    }
                    return errors;
                }}
                onSubmit={(student, {setSubmitting}) => {
                    addNewStudent(student).then(() => {
                        props.onSuccess();
                    }).catch(err => {
                        props.onFailure(err);
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitForm,
                      isValid
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputBottomMargin}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder="First name. E.g Tommy"
                        />
                        {errors.firstName && touched.firstName &&
                        <Tag style={tagStyle}>
                            {errors.firstName}
                        </Tag>
                        }
                        <Input
                            style={inputBottomMargin}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder="Last name. E.g Smith"
                        />
                        {errors.lastName && touched.lastName &&
                        <Tag style={tagStyle}>
                            {errors.lastName}
                        </Tag>}
                        <Input
                            style={inputBottomMargin}
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Your email. E.g tommy.smith@yahoo.com"
                        />
                        {errors.email && touched.email && <Tag style={tagStyle}>
                            {errors.email}
                        </Tag>}
                        <Input
                            style={inputBottomMargin}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder="Your gender E.g Male OR Female"
                        />
                        {errors.gender && touched.gender && <Tag style={tagStyle}>
                            {errors.gender}
                        </Tag>}
                        <Button
                            type="submit"
                            disabled={isSubmitting | (touched && !isValid)}
                            onClick={() => submitForm()}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        );

export default AddStudentForm;

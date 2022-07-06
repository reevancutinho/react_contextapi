import React from "react";
import { Formik } from "formik";
import axios from "axios";

function Teacher() {
    const [product, setProduct] = React.useState([])
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        if (!load) {
            axios.get('https://62c5391ba361f725127d8eed.mockapi.io/teachers').then(res => setProduct(res.data));
        }
        setLoad(true);
    })

    const initialValue = {id: '',name: '',age: '',school: ''}

    const handleSubmit = (formData,{resetForm}) => {
        if (formData.id !== undefined && formData.id !== '') {
            axios.put(`https://62c5391ba361f725127d8eed.mockapi.io/teachers/${formData.id}`,
                {
                    name: formData.name,
                    age: formData.age,
                    school: formData.school,
                }
            ).then(res => {
                var index = product.findIndex((row) => row.id === res.data.id);
                var products = product;
                products[index] = res.data;
                setProduct(products);
                setLoad(false)
            });
            
        }
        else {
            console.log("post");
            axios.post(`https://62c5391ba361f725127d8eed.mockapi.io/teachers`,
                {
                    name: formData.name,
                    age: formData.age,
                    school: formData.school,
                }
            ).then(res => {
                var products = product;
                products.push(res.data);
                setProduct(products);
                setLoad(false)
            });
        }


    }

    const handleDelete = (id) => {
        axios.delete(`https://62c5391ba361f725127d8eed.mockapi.io/teachers/${id}`);
        var products = product.filter((row) => row.id !== id);
        setProduct(products);
    }
    // const onPopulateData = (id) => {
    //     const selectedData = product.filter((row) => row.id === id)[0];
    //     console.log(selectedData.id, selectedData.name);
    //     initialValue = selectedData;

    // }

    const validate = (formData) => {
        var errors = {};
        if (formData.name === '') errors.name = 'Name is Required';
        if (formData.age === '') errors.age = 'Age is Required';
        if (formData.school === '') errors.school = 'School is Required';
        return errors;
    };

    return (
        <>
            <h2>Teacher data</h2>
            <Formik
                initialValues={initialValue}
                enableReinitialize
                validate={(formData) => validate(formData)}
                onSubmit={(formData,{resetForm}) => {handleSubmit(formData,{resetForm})}}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    isSubmitting,
                    setValues,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label> Name </label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <span style={{ color: 'red' }}>
                            {touched.name && errors.name}
                        </span><br />
                        <div>
                            <label> Age </label>
                            <input
                                type="text"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <span style={{ color: 'red' }}>
                            {touched.age && errors.age}
                        </span><br />
                        <div>
                            <label> School </label>
                            <input
                                type="text"
                                name="school"
                                value={values.school}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <span style={{ color: 'red' }}>
                            {touched.school && errors.school}
                        </span><br />
                        <div>
                            <button type="submit"> Submit </button> &nbsp; &nbsp;
                            <button type="button" onClick={handleReset}> Reset </button> &nbsp; &nbsp;
                        </div>
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <table border={1}>
                                <thead>
                                    <tr>
                                        <td> Id </td>
                                        <td> Name </td>
                                        <td> Age </td>
                                        <td> School </td>
                                        <td> Actions </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((row) => (
                                        <tr>
                                            <td> {row.id} </td>
                                            <td> {row.name} </td>
                                            <td> {row.age} </td>
                                            <td> {row.school} </td>
                                            <td>
                                                <button onClick={() => setValues({id:row.id,name:row.name,age:row.age,school:row.school})}>Edit</button>{' '}
                                                &nbsp;
                                                <button onClick={() => handleDelete(row.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )

}

export default Teacher;
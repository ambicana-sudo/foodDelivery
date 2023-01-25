import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import Userimage from '../../images/dummy.svg'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import 'antd/dist/antd.min.css';

const AddFood = (props) => {
	const { name } = useSelector(state => state.users)
	const { restaurantList } = useSelector(state => state.restaurant)
	const [foodImg, setImage] = useState()
	const [initialValues, setInitialValues] = useState({
		foodName: '',
		foodCategory: '',
		restaurantName: '',
		foodPrice: '',
		foodType: '',
		foodImage:'',
	})

	useEffect(()=>{
		if(props.flag){
			setInitialValues(props.selectedItem)
		}
	}, [props.selectedItem])

	const saveImage = (e)=>{
		setImage(e.target.files[0])
	}

	const saveFood = async (values) => {
		const formData = new FormData();
		formData.append('file', foodImg)
		formData.append('foodName', values.foodName)
		formData.append('foodCategory', values.foodCategory)
		formData.append('restaurantName', values.restaurantName)
		formData.append('foodType', values.foodType)
		formData.append('foodPrice', values.foodPrice)

		let requestOptions
		if(!props.flag){
			requestOptions = {
				method: 'POST',
				body: formData,
				dataType: 'jsonP',
			}
		}else{
			requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			}
		}
		const response = await fetch('http://localhost:3000/food', requestOptions);
		const data = await response.json();

		if (data) {
			console.log(data)
			message.success(data.message)
			await props.fetchFood()
		}else{
			message.success(data.errDetail)
		}
	}

	const SignupSchema = Yup.object().shape({
		foodName: Yup.string().required('Required'),
		restaurantName: Yup.string().required('Required'),
		foodCategory: Yup.string().required('Required'),
		foodPrice: Yup.string().required('Required')
	});

	return (
		<>
			{/* <Header /> */}
			<div id='additem_section'>
				<div className='form_section'>
					<div className='text_block'>
						<div className='user_info'>
							<img src={Userimage} alt='user'/>
							<span> Hi, {name}</span>
						</div>
					</div>

					<div className='form_content transparent_bg'>
						<Formik
							initialValues={props.selectedItem || initialValues}
							enableReinitialize={true}
							validationSchema={SignupSchema}
							onSubmit={values => {
								saveFood(values)
								props.handleCancel()
								// same shape as initial values
								// console.log('clicked');
							}}
						>
							{({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
								<Form onSubmit={handleSubmit}>
									<Field name="foodName" placeholder="Enter Restaurant Name" value={values.foodName} onChange={handleChange} onBlur={handleBlur} />
									{errors.foodName && touched.foodName ? (<div className="error">{errors.name}</div>) : null}

									<Field name="foodPrice" placeholder="Enter Price" value={values.foodPrice} onChange={handleChange} onBlur={handleBlur} />
									{errors.foodPrice && touched.foodPrice ? (<div className="error">{errors.foodPrice}</div>) : null}

									<select name="foodCategory" value={values.foodCategory} onChange={handleChange} onBlur={handleBlur}>
										<option value="" disabled="disabled" label="Select Food Category"></option>
										<option label="Momo">Momo</option>
										<option label="Pizza">Pizza</option>
										<option label="Dessert">Dessert</option>
										<option label="Pasta">Snaks</option>
										<option label="Chwomein">Chowmein</option>
									</select>
									{errors.foodCategory && touched.foodCategory ? <div className="error">{errors.foodCategory}</div> : null}

									<select name="restaurantName" value={values.restaurantName} onChange={handleChange} onBlur={handleBlur}>
										<option value="" disabled="disabled" label="Select Restaurants"></option>
										{restaurantList.map((options, id)=>{
											return(
												<option value={options.name} label={options.name} key={id}/>	
											)
										})}
									</select>
									{errors.restaurantName && touched.restaurantName ? <div className="error">{errors.restaurantName}</div> : null}

									<select name="foodType" value={values.foodType} onChange={handleChange} onBlur={handleBlur}>
										<option value="" disabled="disabled" label="Select Food Type"></option>
										<option label="Veg">Veg</option>
										<option label="Non Veg">Non Veg</option>
									</select>
									{errors.foodCategory && touched.foodCategory ? <div className="error">{errors.foodCategory}</div> : null}

									<input type="file" onChange={(e)=> saveImage(e)}></input>

									<button type="submit">Submit</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	)
}
export default AddFood 
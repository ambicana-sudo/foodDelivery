import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ShowHidePassword = (props)=>{
    const [showPassword, setShowPassword] = useState(false)

    return(
        <>
            <div className="input_wrap">
                <i onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}</i>

                <input name={props.name} type={showPassword ? 'text': 'password'} placeholder={props.placeholder} value={props.value} onChange={props.onChange} onBlur={props.onBlur}></input>
            </div>
        </> 
    )
}
export default ShowHidePassword
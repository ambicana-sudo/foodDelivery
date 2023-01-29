import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({fetchdata})=>{
    
    return(
        <div className='search transparent_bg'>
            <input type="search" placeholder="Enter restaurant name or cuisine" onKeyUp={(e)=> fetchdata(e.target.value)}/>
            <button><i><FontAwesomeIcon icon={faSearch}/></i></button>
        </div>
    )
}
export default Search
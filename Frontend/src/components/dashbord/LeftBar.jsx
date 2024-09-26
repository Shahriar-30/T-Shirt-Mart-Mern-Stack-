import React from 'react'
import { Link } from 'react-router-dom'

function LeftBar() {
  return (
    <div className='w-[300px] bg-pink-500 text-white h-screen' >
        <ul>
            <li className='cursor-pointer p-3 font-semibold border-b-2 hover:pl-5 duration-300'><Link to={"/admin/DU/user"}>User</Link></li>
            <li className='cursor-pointer p-3 font-semibold border-b-2 hover:pl-5 duration-300'><Link to={"/admin/DU/catagory"}>Catagory</Link></li>
            <li className='cursor-pointer p-3 font-semibold border-b-2 hover:pl-5 duration-300'><Link to={"/admin/DU/item"}>Item</Link></li>
        </ul>
    </div>
  )
}

export default LeftBar
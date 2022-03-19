import React, {useState} from 'react';

export default function NavBar({search}){
    const[text,setText] = useState('')

    const onSearch= (q)=>{
        setText(q)
        search(q)
    }
    return (
        <nav className="navbar navbar-light bg-dark">
        <a className="navbar-brand text-white">Marvel</a>
        <div className="search">
                    <input type="text" name="search" className="input-search" />
                </div>
      </nav>
    )
}
import React, { useState } from 'react';

export default function NavBar({ search }) {
  const [text, setText] = useState('')

  const onSearch = (q) => {
    setText(q)
    search(q)
  }
  return (
    <nav className="navbar">
      <a className="navbar-brand text-white">
      <svg width="62" height="28" viewBox="0 0 62 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="58" height="24.0415" fill="#EC111A"/>
      <path d="M3.95312 4.4043V23.6375H7.40908L7.55934 15.0727L9.06193 23.6375H11.0153L12.5179 15.0727V23.6375H19.1293L19.5801 20.7825H22.2847L22.7355 23.6375H29.4972V17.4768H30.2485L31.7511 23.6375H35.207L33.1034 16.425C34.2876 15.2355 34.847 14.4378 35.207 12.2178L37.1604 23.6375H41.3676L44.0723 6.65818V23.6375H50.6837V20.1815H47.5283V15.824H50.6837V12.2178H47.5283V8.01051H50.6837V4.4043H40.9169L39.264 16.7255L37.9117 4.4043H34.0049L34.3055 7.25922C33.7044 5.75663 31.7511 4.4043 30.549 4.4043H25.891V21.2333L23.4868 4.4043H18.6785L16.1241 21.8343V4.4043H11.6163L9.96349 13.8706L8.31064 4.4043H3.95312Z" fill="white"/>
      <path d="M51.2847 23.6375V4.4043H54.7407V20.3318H57.7459V23.6375H51.2847Z" fill="white"/>
      <path d="M21.0831 9.66333L20.0312 17.3265H22.1349L21.0831 9.66333Z" fill="#EC111A"/>
      <path d="M29.4976 13.7203V7.70996C30.8815 8.1469 31.7515 8.91203 31.7515 10.8654C31.7515 12.2177 30.9046 13.53 29.4976 13.7203Z" fill="#EC111A"/>
      </svg>

      </a>
      
      <div className="search">
      
        <input type="text" onChange={(e) => onSearch(e.target.value)} value={text} name="search" className="input-search"  placeholder="Search Hero here"  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
        <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"/>
      </div>
    </nav>
  )
}
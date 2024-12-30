import React, { useEffect, useState } from 'react'

function MainFile() {

  //setting initial value

  const [text, SetText] = useState("")
  const [isnumber, Setisnumber] = useState(false)
  const [issymbol, Setissymbol] = useState(false)


  //change value on trigger of event

  const isnumchange = (event) => {
    Setisnumber(event.target.checked)
  }

  const issymbolchange = (event) => {
    Setissymbol(event.target.checked)
  }

  const my_function = (event) => {
    SetText(event.target.value)
  }

  const [num, setnum] = useState(10)


  //initate two array one for password and another dummy array
  const dummy = []
  const mylist = []

  //starting of function
  const password = () => {
    mylist.length = 0

    //slider value extracted
    const therange = document.getElementById('therange').value
    setnum(therange)

    //password lenght output shown
    const thepara = document.getElementById('thePara')
    thepara.textContent = `Password Length: ${therange}`

    //initate for loop to genereate password
    for (let i = 1; i <= therange; i++) {
      const letter1 = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65))
      const letter2 = String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97))
      dummy.push(letter1)
      dummy.push(letter2)

      //add other character is password only if user click in checkbox
      if (isnumber === true) {
        const mynumber = Math.floor(Math.random() * 10)
        dummy.push(mynumber)
      }

      if (issymbol === true) {
        const str = '!@#$%&*'
        const thenum = Math.floor(Math.random() * 7)
        const mysymbol = str.charAt(thenum)
        dummy.push(mysymbol)
      }

      //extracting values from dummy array on basis of requirement of user
      //default value is 2 means from dummy array either index 0 will be added to mylist or index 1. but if user clicked on is number or issymbol then
      //their boolen value will be converted to now const(num) will genreate number from 0 to 3 and one of the index will be removed from 
      //dummy array and added to mylist

      const numindex = 2 + Number(isnumber) + Number(issymbol)

      const num = Math.floor(Math.random() * numindex)

      mylist.push(dummy[num])
      dummy.length = 0

    }
    const thetext = mylist.slice().join('')
    SetText(thetext)
  }

  //function to copy value inside the input box
  const copyText = () => {
    const theid = document.getElementById('theid')

    theid.select();
    const texttocopy = theid.value
    navigator.clipboard.writeText(texttocopy)
  }


  useEffect(() => {
    password()
  }, [isnumber, issymbol])


  return (
    <>
      <div className="container bg-blue-950 p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
        <div className="innercontainer bg-white rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Password Generator</h1>
          <div className="textarea mb-4">
            <input type="text" name="" id="theid" placeholder='your password' readOnly className="border border-gray-300 rounded-lg w-full px-4 py-2 text-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" value={text} onChange={my_function} />
          </div>
          <div className="btn flex space-x-4 justify-center mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full h-12 w-40 transition ease-in-out duration-200" onClick={password} >Generate Password</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full h-12 w-40 transition ease-in-out duration-200" onClick={copyText}>Copy Password</button>
          </div>
          <div className="slider mt-6">
            <h2 id='thePara'className='text-lg font-semibold text-gray-700 mb-2'>Password Length</h2>
            <input type="range" className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer" min={4} max={100} id="therange" value={num} onChange={password} />
          </div>
          <div className="other mt-6 flex justify-start space-x-4">
            <div className="flex items-center">
            <input type="checkbox" name="" id="" className='mr-2' defaultChecked={isnumber} onChange={isnumchange} />
            <label htmlFor="isnumber" className='text-gray-700'>Number</label>
            </div>
            <div className="flex items-center">
            <input type="checkbox" name="" id="" className='mr-2' defaultChecked={issymbol} onChange={issymbolchange} />
            <label htmlFor="issymbol" className='text-gray-700'>Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainFile
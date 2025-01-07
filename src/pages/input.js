import React, { useState, useEffect } from "react";



export default function Input () {
        let one = document.getElementById("one");

        const [oneChecked, setOneChecked] = useState(false);


        useEffect(() => {

                oneChecked ? one.style.backgroundColor = "red" : one.style.backgroundColor = "blue";

        });

        function handleChange(e) {
        console.log(e.target.checked, e.target.value);
        e.target.checked ? setOneChecked(true) : setOneChecked(false)

        }
























return (<div className="text-center flex flex-col items-center  h-screen bg-[--black] text-white">

<h1>Styling checkboxes and radio buttons</h1>


<label  onChange={handleChange} value="1" id="one" className="px-10 py-5 rounded-full w-[20%] my-10 " >
        <input type="checkbox"  value="1" className="appearance-none checked:bg-red-400" />
        One
</label>





</div>)};
import { useState } from "react";
import "./calculator.css";
const Calculator = function(){

    const [inputText, setInputText] = useState("");
    const [hrs, sethrs] = useState("0 Hours, 0 Minutes");
    const [mins, setMins] = useState("0 Minutes");

    return(
        <div className="calculator">
            <h1>Hour Calulator</h1>
            <textarea className="input" placeholder="Paste the Attendance hours here :" value={inputText} onChange={(e)=>{setInputText(e.target.value)}}/>
            <br></br>
            <button onClick={()=>{
                if(inputText!==""){
                    let t = calculation(inputText);
                    setMins(t.mins);
                    sethrs(t.hrs);
                }
            }}>Calculate</button>
            <button onClick={()=>{
                setInputText("");
                setMins("0 Minutes");
                sethrs("0 Hours, 0 Minutes");}}>clear</button>
            <h2 className="result" id="mins">{ (mins.toString()==='0 Minutes')?'Lagging/Ahead By :': (mins.toString().includes('-')) ? 'Lagging By : ' : 'Ahead By : '} {mins.replaceAll('-','')}</h2>
            <h2 className="result" id="hrmins">{ (mins.toString()==='0 Minutes')?'Lagging/Ahead By :': (mins.toString().includes('-')) ? 'Lagging By : ' : 'Ahead By : '} {hrs.replaceAll('-','')}</h2>
        </div>
    )
}

function calculation(str){
    // console.log("str=",str);
    var arr = str.trim().split("	");
    var mins = 0;
    
    
    for(let i=0; i<arr.length; i++){
        if(arr[i].includes('hrs')){
            if(Number(arr[i].split(' ')[0])>8){
                // arr[i].split(' ')[0]-8;         // extra hrs
                // console.log(arr[i].split(' '))
                // console.log('+',((Number(arr[i].split(' ')[0])-8) * 60) + Number(arr[i].split(' ')[2]))
                mins += ((Number(arr[i].split(' ')[0])-8) * 60) + Number(arr[i].split(' ')[2]) //extra min
            }
            else if(Number(arr[i].split(' ')[0])<8){
                // console.log(arr[i].split(' '))
                // console.log('-',((7-Number(arr[i].split(' ')[0])) * 60) + (60-Number(arr[i].split(' ')[2])));
                mins -= ((7-Number(arr[i].split(' ')[0])) * 60) + (60-Number(arr[i].split(' ')[2])) //negative min
            }
            else{
                // console.log(arr[i].split(' '))
                // console.log("++",Number(arr[i].split(' ')[2]));
                mins += Number(arr[i].split(' ')[2]) //extra min
            }
        }
        // else if(arr[i].split(' ')[0]!=='0'){
        //     console.log(arr[i],((7*60)+ 60-Number(arr[i].split(' ')[0])))
        //     mins -= ((7*60)+ 60-Number(arr[i].split(' ')[0]))   //negative mins
        // }
    }
    // console.log("Minutes: ",mins);
    // ( mins.toString().includes('-') ) ? console.log('Lagging') : console.log('Ahead');
    // console.log(Math.trunc(mins/60),"hrs,",mins%60,"mins");
    return {mins:mins+" Minutes",hrs:Math.trunc(mins/60)+" Hours, "+mins%60+" Minutes"}
}

export default Calculator;
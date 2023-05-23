import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [get, setGet] = useState("")

 
  
  const [state, setState] = useState({
    name:"",
    info:[]
  })

  const {name, age ,info} = state

  const [count, setCount] = useState(0)


  const handleName = () =>{
    setState((prev) =>({...prev, name : "Gemma" }))
  }
  
  useEffect(() =>{
    async function callApi(){
      try{
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setGet(result.data)
      }catch(error){
        alert("Something went wrong!")
        console.log(error)
      }
    }
   
    callApi()

     const interval = setInterval(() => {
      setCount(count + 1)
    },1000)

    return () => {
      clearInterval(interval)
    }
  },[count])

  
  return (
    <>
    <div>
      <table style={{width:"800px", margin:"50px auto", border:"1px solid #222"}}>
        <thead style={{background:"#333", color:"#fff"}}>
          <tr>
            <th style={{padding:"10px"}}>Id</th>
            <th style={{padding:"10px"}}>Title</th>
            <th style={{padding:"10px"}}>Body</th>
          </tr>
        </thead>
        <tbody style={{background:"#eee"}}>
          {get ?
            get.map((dets,index)=>{
              return(
                <tr key={index}>
                  <td>{dets.id}</td>
                  <td>{dets.title}</td>
                  <td style={{textAlign:"justify"}}>{dets.body}</td>
                </tr>
              )
            }):<tr><td>No Records Found</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div>
      <h1>{name}</h1>
      <button onClick={handleName}>Change</button>
      <h1>{count}</h1>
    </div>
   
    </>
  )
}

export default App
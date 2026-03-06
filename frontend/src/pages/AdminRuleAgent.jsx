import { useState, useEffect } from "react"

export default function AdminRuleAgent(){

const [message,setMessage] = useState("")
const [chat,setChat] = useState([])
const [rules,setRules] = useState([])

useEffect(()=>{
loadRules()
},[])

const loadRules = async()=>{

const res = await fetch("http://localhost:8000/rules/")
const data = await res.json()

setRules(data)

}

const sendMessage = async () => {

    if(!message.trim()) return
    
    const userMessage = {type:"user",text:message}
    
    setChat(prev=>[...prev,userMessage])
    
    const res = await fetch("http://localhost:8000/rules/agent",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({
    prompt: message,
    overwrite: false
    })
    
    })
    
    const data = await res.json()
    
    const aiMessage = {
    type:"ai",
    text:data.message
    }
    
    setChat(prev=>[...prev,aiMessage])
    
    setMessage("")
    
    loadRules()

}

return(

<div className="flex flex-col flex-1 h-full">

{/* HEADER */}

<div className="flex items-center gap-2 mb-4 text-sm text-gray-500">

<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

AI Rule Assistant

</div>


{/* CHAT WINDOW */}

<div className="flex-1 flex flex-col p-8 overflow-hidden">

{chat.length === 0 && (

<p className="text-gray-400 text-sm text-center mt-8">
Ask AI to create or modify triage rules.
<br/>
Example: "If oxygen falls below 88 send patient to ICU"
</p>

)}

{chat.map((msg,index)=>(

<div
key={index}
className={`flex ${
msg.type === "user" ? "justify-end" : "justify-start"
}`}
>

<div
className={`px-4 py-3 rounded-lg max-w-[70%] text-sm shadow-sm
${
msg.type === "user"
? "bg-blue-600 text-white"
: "bg-white border border-gray-200 text-gray-700"
}
`}
>

{msg.text}

</div>

</div>

))}

</div>


{/* INPUT AREA */}

<div className="flex gap-3 mt-4">

<input
placeholder="Example: If oxygen falls below 88 assign ICU"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="flex-1 px-4 py-3 rounded-lg border border-gray-300
focus:ring-2 focus:ring-blue-500 outline-none"
/>

<button
className="bg-gradient-to-r from-blue-600 to-cyan-500
text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
onClick={sendMessage}
>
Send
</button>

</div>

</div>

)

}
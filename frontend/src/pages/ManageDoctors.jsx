import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

export default function ManageDoctors(){

const [doctors,setDoctors] = useState([])
const [wards,setWards] = useState([])

const [name,setName] = useState("")
const [ward,setWard] = useState("")

const loadDoctors = async()=>{

const res = await fetch("http://localhost:8000/doctors")
const data = await res.json()

setDoctors(data)

}

const loadWards = async()=>{

const res = await fetch("http://localhost:8000/wards")
const data = await res.json()

setWards(data)

}

useEffect(()=>{

loadDoctors()
loadWards()

},[])


const addDoctor = async()=>{

if(!name || !ward) return

await fetch("http://localhost:8000/doctors/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
ward:ward

})

})

setName("")
setWard("")

window.location.reload()

}


const deleteDoctor = async(id)=>{

if(!window.confirm("Delete this doctor?")) return

await fetch(`http://localhost:8000/doctors/${id}`,{
method:"DELETE"
})

window.location.reload()

}


return(

<div className="space-y-6">

<h1 className="text-2xl font-bold text-gray-800">
Doctor Management
</h1>


{/* ADD DOCTOR */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm p-6">

<h2 className="text-lg font-semibold mb-4">
Add Doctor
</h2>

<div className="flex gap-4 max-w-xl">

<input
className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="Doctor Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
value={ward}
onChange={(e)=>setWard(e.target.value)}
>

<option value="">Select Ward</option>

{wards.map(w=>(
<option key={w.id} value={w.name}>
{w.name}
</option>
))}

</select>

<button
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow"
onClick={addDoctor}
>
Add Doctor
</button>

</div>

</div>


{/* DOCTOR TABLE */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm p-6">

<h2 className="text-lg font-semibold mb-4">
Doctors
</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="text-gray-500 text-sm border-b">

<th className="py-3 text-left">ID</th>
<th className="py-3 text-left">Name</th>
<th className="py-3 text-left">Ward</th>
<th className="py-3 text-left">Active Patients</th>
<th className="py-3 text-center">Action</th>

</tr>

</thead>

<tbody>

{doctors.map(doc => (

<tr
key={doc.id}
className="border-b hover:bg-blue-50 transition"
>

<td className="py-4">{doc.id}</td>

<td className="py-4 font-medium">{doc.name}</td>

<td className="py-4">{doc.ward}</td>

<td className="py-4">

<span className={`doctorLoad 
${doc.active_patients > 5 ? "highLoad" : ""}
${doc.active_patients > 2 && doc.active_patients <=5 ? "mediumLoad" : ""}
`}>

{doc.active_patients}

</span>

</td>

<td className="py-4 text-center">

<button
onClick={()=>deleteDoctor(doc.id)}
className="p-2 rounded-lg hover:bg-red-100 transition"
>

<Trash2 size={18} className="text-red-500 hover:text-red-700"/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}
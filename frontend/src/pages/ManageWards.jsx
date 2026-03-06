import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

export default function ManageWards(){

const [wards,setWards] = useState([])
const [wardName,setWardName] = useState("")

const loadWards = async()=>{

const res = await fetch("http://localhost:8000/wards")
const data = await res.json()

setWards(data)

}

useEffect(()=>{
loadWards()
},[])


const addWard = async()=>{

    if(!wardName.trim()) return
    
    await fetch("http://localhost:8000/wards",{
    
    method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({
    name:wardName
    })
    
    })
    
    setWardName("")
    
    window.location.reload()
    
    }


    const deleteWard = async(id)=>{

        if(!window.confirm("Delete this ward?")) return
        
        await fetch(`http://localhost:8000/wards/${id}`,{
        method:"DELETE"
        })
        
        window.location.reload()
        
        }


return(

<div className="space-y-6">

<h1 className="text-2xl font-bold text-gray-800">
Ward Management
</h1>

{/* ADD WARD */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm p-6">

<h2 className="text-lg font-semibold mb-4">
Add Ward
</h2>

<div className="flex gap-4 max-w-xl">

<input
className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="Ward Name (ICU, ER, Ward A)"
value={wardName}
onChange={(e)=>setWardName(e.target.value)}
/>

<button
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow"
onClick={addWard}
>
Add Ward
</button>

</div>

</div>


{/* WARD TABLE */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm p-6">

<h2 className="text-lg font-semibold mb-4">
Existing Wards
</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="text-gray-500 text-sm border-b">

<th className="py-3 text-left">ID</th>
<th className="py-3 text-left">Ward Name</th>
<th className="py-3 text-center">Action</th>

</tr>

</thead>

<tbody>

{wards.map(ward=>(
<tr
key={ward.id}
className="border-b hover:bg-blue-50 transition"
>

<td className="py-4">
{ward.id}
</td>

<td className="py-4 font-medium text-gray-800">
{ward.name}
</td>

<td className="py-4 text-center">

<button
onClick={()=>deleteWard(ward.id)}
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
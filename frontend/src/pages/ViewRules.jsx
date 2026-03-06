import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

export default function ViewRules(){

const [rules,setRules] = useState([])

useEffect(()=>{
loadRules()
},[])

const loadRules = async()=>{

const res = await fetch("http://localhost:8000/rules/")
const data = await res.json()

setRules(data)

}

const deleteRule = async(id)=>{

    if(!window.confirm("Delete this rule?")) return
    
    await fetch(`http://localhost:8000/rules/${id}`,{
    method:"DELETE"
    })
    
    window.location.reload()
    
    }

return(

<div className="bg-white/80 backdrop-blur-xl border border-white/40
rounded-2xl shadow-xl p-8">

<h2 className="text-xl font-semibold text-gray-800 mb-6">
Current AI Triage Rules
</h2>

<div className="overflow-x-auto">

<table className="w-full text-left">

<thead>

<tr className="text-gray-500 text-sm border-b">

<th className="py-3 px-4">ID</th>
<th className="py-3 px-4">Parameter</th>
<th className="py-3 px-4">Operator</th>
<th className="py-3 px-4">Threshold</th>
<th className="py-3 px-4">Category</th>
<th className="py-3 px-4 text-center">Action</th>

</tr>

</thead>

<tbody>

{rules.map((rule)=>{

const badgeColor =
rule.category === "Critical"
? "bg-red-100 text-red-600"
: "bg-green-100 text-green-600"

return(

<tr
key={rule.id}
className="border-b hover:bg-blue-50 transition"
>

<td className="py-4 px-4 text-gray-700">
{rule.id}
</td>

<td className="py-4 px-4 font-medium text-gray-800">
{rule.parameter}
</td>

<td className="py-4 px-4 text-gray-700">
{rule.operator}
</td>

<td className="py-4 px-4 text-gray-700">
{rule.threshold}
</td>

<td className="py-4 px-4">

<span className={`px-3 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
{rule.category}
</span>

</td>

<td className="py-4 px-4 text-center">

<button
onClick={()=>deleteRule(rule.id)}
className="p-2 rounded-lg hover:bg-red-100 transition"
>

<Trash2
size={18}
className="text-red-500 hover:text-red-700"
/>

</button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

)

}
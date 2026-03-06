import { useEffect, useState } from "react"
import { Activity, Users, Hospital, ClipboardList } from "lucide-react"

export default function AdminStats(){

const [stats,setStats] = useState({
rules:0,
doctors:0,
wards:0,
patients:0
})

useEffect(()=>{
loadStats()
},[])

const loadStats = async ()=>{

try{

const [rulesRes,doctorsRes,wardsRes,patientsRes] = await Promise.all([

fetch("http://localhost:8000/rules/"),
fetch("http://localhost:8000/doctors/"),
fetch("http://localhost:8000/wards/"),
fetch("http://localhost:8000/patients/")

])

const rules = await rulesRes.json()
const doctors = await doctorsRes.json()
const wards = await wardsRes.json()
const patients = await patientsRes.json()

setStats({
rules: rules.length || 0,
doctors: doctors.length || 0,
wards: wards.length || 0,
patients: patients.length || 0
})

}catch(error){

console.error("Failed to load stats",error)

}

}

const statsList = [
{title:"AI Rules",value:stats.rules,icon:ClipboardList},
{title:"Doctors",value:stats.doctors,icon:Users},
{title:"Wards",value:stats.wards,icon:Hospital},
{title:"Active Patients",value:stats.patients,icon:Activity}
]

return (

<div className="grid grid-cols-4 gap-6 mb-8">

{statsList.map((stat,index)=>{

const Icon = stat.icon

return(

<div
key={index}
className="bg-white/90 backdrop-blur-lg border border-gray-200
rounded-xl p-6 shadow-sm hover:shadow-md transition"
>

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500 text-sm">
{stat.title}
</p>

<h3 className="text-2xl font-bold text-gray-800 mt-1">
{stat.value}
</h3>

</div>

<Icon className="text-blue-600"/>

</div>

</div>

)

})}

</div>

)

}
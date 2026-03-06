import { useEffect, useState } from "react";
import ManagerSidebar from "../components/ManagerSidebar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ManagerDashboard(){

const [name, setName] = useState("")
const [age, setAge] = useState("")
const [gender, setGender] = useState("")
const [doctor, setDoctor] = useState("")
const [ward, setWard] = useState("")

const [heartRate, setHeartRate] = useState("")
const [oxygen, setOxygen] = useState("")
const [temperature, setTemperature] = useState("")
const [bp, setBp] = useState("")
const [symptoms,setSymptoms] = useState("")

const [patients,setPatients] = useState([])
const [triageResult, setTriageResult] = useState(null)

const loadPatients = () => {
fetch("http://localhost:8000/patients")
.then(res => res.json())
.then(data => setPatients(data))
}

useEffect(()=>{
loadPatients()
},[])

const runTriage = async () => {

const res = await fetch("http://localhost:8000/ai/triage",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
age:Number(age),
gender:gender,

heart_rate:Number(heartRate),
oxygen_level:Number(oxygen),
temperature:Number(temperature),
blood_pressure:bp,

symptoms:symptoms

})

})

const data = await res.json()

setTriageResult(data)

loadPatients()

setName("")
setAge("")
setGender("")
setDoctor("")
setWard("")
setHeartRate("")
setOxygen("")
setTemperature("")
setBp("")
}

const critical = patients.filter(p=>p.severity==="Critical").length
const moderate = patients.filter(p=>p.severity==="Moderate").length
const stable = patients.filter(p=>p.severity==="Stable").length

const chartData=[
{ name:"Critical", value:critical },
{ name:"Moderate", value:moderate },
{ name:"Stable", value:stable }
]

const COLORS=["#ef4444","#f59e0b","#22c55e"]

return(

<div className="relative min-h-screen flex overflow-hidden">

<div
className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-90"
style={{ backgroundImage: "url('adminDashboardBackground.png')" }}
/>

{/* BACKGROUND */}

<div
className="absolute inset-0 -z-20 bg-cover bg-center"
style={{backgroundImage:"url('/ai-medical-bg2.jpg')"}}
/>

<div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/70 via-white/60 to-blue-100/70"/>

{/* SIDEBAR */}

<ManagerSidebar/>

{/* MAIN AREA */}

<div className="flex-1 flex flex-col p-10 overflow-y-auto">

{/* HEADER */}

<div className="mb-8">



</div>


{/* BACKGROUND IMAGE */}



{/* STAT CARDS */}

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-6 shadow">

<div className="flex items-center gap-3">

<div className="w-2 h-12 bg-red-500 rounded"></div>

<div>
<p className="text-gray-500 text-sm">Critical</p>
<p className="text-2xl font-bold text-gray-800">{critical}</p>
</div>

</div>

</div>


<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-6 shadow">

<div className="flex items-center gap-3">

<div className="w-2 h-12 bg-yellow-500 rounded"></div>

<div>
<p className="text-gray-500 text-sm">Moderate</p>
<p className="text-2xl font-bold text-gray-800">{moderate}</p>
</div>

</div>

</div>


<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-6 shadow">

<div className="flex items-center gap-3">

<div className="w-2 h-12 bg-green-500 rounded"></div>

<div>
<p className="text-gray-500 text-sm">Stable</p>
<p className="text-2xl font-bold text-gray-800">{stable}</p>
</div>

</div>

</div>

</div>


{/* GRID */}

<div className="grid grid-cols-2 gap-10">

{/* PATIENT FORM */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-8 shadow">

<h2 className="text-xl font-semibold mb-6">
Patient Intake
</h2>

<div className="grid grid-cols-2 gap-4">

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Gender"
value={gender}
onChange={(e)=>setGender(e.target.value)}
/>

</div>

<h3 className="mt-6 mb-3 font-semibold">
Vitals
</h3>

<div className="grid grid-cols-2 gap-4">

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Heart Rate"
value={heartRate}
onChange={(e)=>setHeartRate(e.target.value)}
/>

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Oxygen %"
value={oxygen}
onChange={(e)=>setOxygen(e.target.value)}
/>

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Temperature"
value={temperature}
onChange={(e)=>setTemperature(e.target.value)}
/>

<input
className="px-4 py-3 rounded-lg border border-gray-300"
placeholder="Blood Pressure"
value={bp}
onChange={(e)=>setBp(e.target.value)}
/>

<input
className="col-span-2 px-4 py-3 rounded-lg border border-gray-300"
placeholder="Symptoms (e.g. chest pain, breathing difficulty)"
value={symptoms}
onChange={(e)=>setSymptoms(e.target.value)}
/>

</div>

<button
className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
onClick={runTriage}
>
Run AI Triage
</button>


{triageResult && (

<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">

<h3 className="font-semibold">
Severity: {triageResult.severity}
</h3>

<p>Ward: {triageResult.ward}</p>

<p>Doctor: {triageResult.doctor}</p>

<p className="text-sm text-gray-600 mt-2">
Reason: {triageResult.reason}
</p>

</div>

)}

</div>


{/* PIE CHART */}

<div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl p-8 shadow">

<h2 className="text-xl font-semibold mb-6">
Severity Distribution
</h2>

<PieChart width={380} height={300}>

<Pie
data={chartData}
dataKey="value"
cx="50%"
cy="50%"
outerRadius={120}
label
>

{chartData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</div>

</div>

</div>

</div>

)
}
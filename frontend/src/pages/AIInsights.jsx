import { useEffect, useState } from "react"
import ManagerSidebar from "../components/ManagerSidebar"

export default function AIInsights(){

const [insights,setInsights] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

fetch("http://localhost:8000/ai/hospital-insights")
.then(res=>res.json())
.then(data=>{

const points = data.insights.split("\n").filter(p=>p.trim() !== "")

setInsights(points)
setLoading(false)

})

},[])

return(

<div className="appLayout">

<ManagerSidebar/>

<div className="mainArea">

    <div
className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-90"
style={{ backgroundImage: "url('adminDashboardBackground.png')" }}
/>

<h1 className="pageTitle">MediCareCommand Center</h1>

<div className="card">

{loading && (
<p>Generating AI insights...</p>
)}

{!loading && insights.length === 0 && (

<p>No insights detected.</p>

)}

{insights.map((insight,index)=>(

<div key={index} className="insightCard">

<div className="insightIcon">⚠</div>

<div className="insightText">
{insight}
</div>

</div>

))}

</div>

</div>

</div>

)

}
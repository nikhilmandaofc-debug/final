import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
Activity,
HeartPulse,
Brain,
LogOut,
ChevronLeft,
ChevronRight
} from "lucide-react"

export default function ManagerSidebar(){

const [collapsed,setCollapsed] = useState(false)

const menu = [
{ label:"Care Metrics", icon:Activity, path:"/manager-dashboard" },
{ label:"Patient Monitor", icon:HeartPulse, path:"/patients" },
{ label:"MIRA Insights", icon:Brain, path:"/ai-insights" }
]

return(


<div className={`
${collapsed ? "w-20" : "w-72"}
transition-all duration-300
bg-white/80 backdrop-blur-xl
border-r border-gray-200
shadow-lg flex flex-col
relative
`}>

{/* BACKGROUND GLOW */}

<div className="absolute -top-20 -left-20 w-72 h-72
bg-blue-200 opacity-40 blur-[120px] rounded-full pointer-events-none"/>


{/* HEADER */}

<div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-xl
bg-gradient-to-br from-blue-600 to-cyan-500
flex items-center justify-center text-white font-bold shadow">

AI

</div>

{!collapsed && (
<span className="font-semibold text-lg text-gray-800 tracking-tight">
Manager
</span>
)}

</div>


<button
onClick={()=>setCollapsed(!collapsed)}
className="text-gray-400 hover:text-blue-600 transition"
>
{collapsed ? <ChevronRight/> : <ChevronLeft/>}
</button>

</div>


{/* MENU */}

<div className="flex flex-col gap-2 mt-6 px-3">

{menu.map((item,index)=>{

const Icon = item.icon

return(
<NavLink
key={index}
to={item.path}
className={({isActive})=>`
relative flex items-center gap-4 px-4 py-3 rounded-xl
transition-all duration-200
${isActive
? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
: "text-gray-600 hover:bg-gray-100"}
`}
>

<div className={`
flex items-center justify-center
w-9 h-9 rounded-lg
${({isActive}) => isActive ? "bg-white/20" : "bg-gray-100"}
`}>
<Icon size={18}/>
</div>

{!collapsed && (
<span className="font-medium text-sm tracking-wide">
{item.label}
</span>
)}

</NavLink>

)

})}

</div>


{/* LOGOUT */}

<div className="mt-auto p-4 border-t border-gray-100">

<NavLink
to="/"
className="flex items-center gap-3 text-gray-600 hover:text-red-500"
>

<LogOut size={18}/>
{!collapsed && "Logout"}

</NavLink>

</div>

</div>

)

}
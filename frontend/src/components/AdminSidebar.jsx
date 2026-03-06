import { useState } from "react"
import {
    Settings,
    ClipboardList,
    Users,
    Hospital,
    FileDown,
    ChevronLeft,
    ChevronRight,
    LogOut
    } from "lucide-react"

export default function AdminSidebar({activeMenu,setActiveMenu}){

const [collapsed,setCollapsed] = useState(false)

const menu = [

{ id:"viewRules", label:"Manage Rules", icon:ClipboardList },
{ id:"wards", label:"Manage Wards", icon:Hospital },
{ id:"doctors", label:"Manage Doctors", icon:Users },
{ id:"export", label:"Generate Reports", icon:FileDown },
{ id:"rules", label:"MIRA Rule Engine", icon:Settings }
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

{/* GRADIENT BACKGROUND GLOW */}

<div className="absolute -top-20 -left-20 w-72 h-72
bg-blue-200 opacity-40 blur-[120px] rounded-full pointer-events-none"/>


{/* LOGO */}

<div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-xl
bg-gradient-to-br from-blue-600 to-cyan-500
flex items-center justify-center text-white font-bold shadow">

AI

</div>

{!collapsed && (
<span className="font-semibold text-lg text-gray-800 tracking-tight">
Admin
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

{menu.map((item)=>{

const Icon = item.icon
const active = activeMenu === item.id

return(

<button
key={item.id}
onClick={()=>setActiveMenu(item.id)}
className={`
relative flex items-center gap-4 px-4 py-3 rounded-xl
transition-all duration-200
${active
? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
: "text-gray-600 hover:bg-gray-100"}
`}
>

{/* ACTIVE SIDE BAR */}

{active && (
<div className="absolute left-0 top-2 bottom-2 w-1
bg-white rounded-r-full"/>
)}

{/* ICON */}

<div className={`
flex items-center justify-center
w-9 h-9 rounded-lg
${active
? "bg-white/20"
: "bg-gray-100"}
`}>
<Icon size={18}/>
</div>


{/* LABEL */}

{!collapsed && (
<span className="font-medium text-sm tracking-wide">
{item.label}
</span>
)}

</button>

)

})}

</div>


{/* FOOTER */}

<div className="mt-auto border-t border-gray-100 p-4">

<button
onClick={() => window.location.href="/"}
className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition w-full"
>

<LogOut size={18}/>

{!collapsed && (
<span className="font-medium text-sm">
Logout
</span>
)}

</button>

</div>



</div>

)

}
import { useState } from "react"
import { motion } from "framer-motion"

import AdminSidebar from "../components/AdminSidebar"
import AdminRuleAgent from "./AdminRuleAgent"
import ManageWards from "./ManageWards"
import ManageDoctors from "./ManageDoctors"
import ViewRules from "./ViewRules"
import AdminExport from "./AdminExport"
import AdminStats from "../components/AdminStats"

export default function AdminDashboard(){

    const [activeMenu,setActiveMenu] = useState(
        localStorage.getItem("activeMenu") || "rules"
        )
        const handleMenuChange = (menu)=>{
            setActiveMenu(menu)
            localStorage.setItem("activeMenu",menu)
            }

return(

<div className="relative min-h-screen flex overflow-hidden">

{/* BACKGROUND IMAGE */}

<div
className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-90"
style={{ backgroundImage: "url('adminDashboardBackground.png')" }}
/>

{/* SOFT DARK OVERLAY */}

<div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/40 via-white/20 to-blue-100/30"/>

{/* FLOATING GLOW */}

<div className="absolute -z-10 w-[500px] h-[500px] bg-blue-300/20 blur-3xl rounded-full top-20 left-40 animate-pulse"></div>

<div className="absolute -z-10 w-[400px] h-[400px] bg-cyan-300/20 blur-3xl rounded-full bottom-10 right-20 animate-pulse"></div>



{/* SIDEBAR */}

<AdminSidebar
activeMenu={activeMenu}
setActiveMenu={handleMenuChange}
/>



{/* MAIN AREA */}

<div className="flex-1 flex flex-col p-10 overflow-y-auto">



{/* HEADER */}

<div className="mb-6">





</div>



{/* STATS */}

<AdminStats/>



{/* CONTENT AREA */}

<motion.div
key={activeMenu}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.4}}
className="mt-6 bg-white/80 backdrop-blur-xl border border-white/40
rounded-2xl shadow-xl p-8"
>



{/* CONTENT SWITCH */}

{activeMenu === "rules" && (

<div className="h-[50vh] flex flex-col">

<h2 className="text-xl font-semibold mb-6 text-gray-800">
Create AI Triage Rule
</h2>

<div className="flex-1">
<AdminRuleAgent/>
</div>

</div>

)}

{activeMenu === "viewRules" && (
<ViewRules/>
)}

{activeMenu === "wards" && (
<ManageWards/>
)}

{activeMenu === "doctors" && (
<ManageDoctors/>
)}

{activeMenu === "export" && <AdminExport />}

</motion.div>

</div>

</div>

)

}
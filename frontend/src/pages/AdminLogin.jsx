import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeartPulse, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleLogin = async () => {

    setError("");

    if(!email || !password){
      setError("Please enter both email and password");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role:"admin"
        })
      });

      const data = await res.json();

      if(res.ok){

        navigate("/admin-dashboard");
      
      }else{
      
        setError("Invalid username or password. If you don't have an account, please sign up.");
      
      }

    }catch(error){

      setError("Server connection failed");

    }finally{

      setLoading(false);

    }

  };


  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{backgroundImage:"url('/ai-medical-bg.png')"}}
      />

<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_60%)] animate-pulse"></div>

      {/* SOFT OVERLAY */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/85 via-white/80 to-blue-100/80"/>


      {/* BACK BUTTON */}

      <div className="absolute top-6 left-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-blue-600 transition font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">

<div className="absolute w-72 h-72 bg-blue-200/20 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>

<div className="absolute w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>

</div>
      {/* LOGIN CARD */}

      <motion.div
        initial={{opacity:0,scale:0.95,y:40}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{duration:0.5}}
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl
        p-10 w-[420px] border border-gray-200"
      >

        {/* HEADER */}

        <div className="text-center mb-6">

          <motion.div
            initial={{scale:0}}
            animate={{scale:1}}
            transition={{delay:0.2,type:"spring"}}
            className="flex justify-center mb-3"
          >
            <motion.div
animate={{ scale: [1, 1.08, 1] }}
transition={{ repeat: Infinity, duration: 3 }}
>
<HeartPulse size={36} className="text-blue-600"/>
</motion.div>
          </motion.div>
          

          <h2 className="text-2xl font-bold text-gray-800">
            Administrator Login
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Access the triage administration portal
          </p>

        </div>


        {/* ERROR MESSAGE */}

        {error && (

<motion.div
  initial={{opacity:0,y:-10}}
  animate={{opacity:1,y:0}}
  className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4"
>
  <AlertCircle size={18}/>

  <div>

    <p>{error}</p>

    <button
      onClick={() => navigate("/signup")}
      className="text-blue-600 underline ml-1 hover:text-blue-800"
    >
      Sign up here
    </button>

  </div>

</motion.div>

)}


        {/* EMAIL */}

        <div className="mb-4">

          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            type="email"
            placeholder="admin@hospital.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg
            border border-gray-300 bg-white
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 outline-none transition"
          />

        </div>


        {/* PASSWORD */}

        <div className="mb-6">

          <label className="text-sm text-gray-600">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg
            border border-gray-300 bg-white
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 outline-none transition"
          />

        </div>


        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg
          font-semibold hover:bg-blue-700
          transition flex items-center justify-center"
        >

          {loading ? (

            <span className="flex items-center gap-2">

              <motion.span
                animate={{rotate:360}}
                transition={{repeat:Infinity,duration:1}}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />

              Logging in...

            </span>

          ) : "Login"}

        </button>


        {/* SECURITY TEXT */}

        <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm">
          <ShieldCheck size={16}/>
          Secure Healthcare System Access
        </div>

      </motion.div>

    </div>

  );

}
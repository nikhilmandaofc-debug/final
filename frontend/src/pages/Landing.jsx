import { Link } from "react-router-dom";
import { Shield, BarChart3, Activity, ShieldCheck, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen">

      {/* BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/ai-medical-bg.png')" }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-white/70"></div>

      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-12 py-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Activity size={26} />
            MediCare
          </div>

          <div className="flex gap-10 text-gray-700 font-medium">
            <a href="#platform" className="hover:text-blue-600 cursor-pointer">
              Platform
            </a>
            <a href="#about" className="hover:text-blue-600 cursor-pointer">
              About
            </a>
            <a href="#contact" className="hover:text-blue-600 cursor-pointer">
              Contact
            </a>
          </div>
        </nav>


        {/* HERO */}
        <div className="text-center mt-10 px-6">

          <h1 className="text-6xl font-extrabold text-gray-800 tracking-tight">
            Welcome to{" "}
            <span className="text-blue-600 drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]">
              MIRA
            </span>
          </h1>

          <p className="text-xl text-blue-600 mt-4 font-semibold">
            Medical Intelligent Response Assistant
          </p>

          <p className="max-w-3xl mx-auto text-gray-700 mt-6 text-lg leading-relaxed">
            AI-powered platform designed to help hospitals classify and
            prioritize patients efficiently using configurable triage rules
            and intelligent decision systems.
          </p>

        </div>


        {/* LOGIN CARDS */}
        <div className="flex justify-center gap-16 mt-20 flex-wrap">

          {/* ADMIN */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 
          rounded-2xl p-10 w-96 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <Shield size={26} />
              <h2 className="text-xl font-semibold">
                Administrator Portal
              </h2>
            </div>

            <p className="text-gray-600 mb-8">
              Configure triage rules, manage platform settings,
              and control system intelligence.
            </p>

            <Link to="/admin-login">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                Login
              </button>
            </Link>

          </div>


          {/* MANAGER */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 
          rounded-2xl p-10 w-96 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <BarChart3 size={26} />
              <h2 className="text-xl font-semibold">
                Manager Dashboard
              </h2>
            </div>

            <p className="text-gray-600 mb-8">
              Monitor prioritized patients, view operational insights,
              and export reports.
            </p>

            <Link to="/manager-login">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                Login
              </button>
            </Link>

          </div>

        </div>


        {/* PLATFORM FEATURES */}
        <section id="platform" className="mt-32 py-24">

          <div className="max-w-6xl mx-auto text-center px-16">

            <h2 className="text-3xl font-bold text-gray-800">
              Platform Capabilities
            </h2>

            <div className="grid md:grid-cols-3 gap-10 mt-16">

              <Feature
                icon={<ShieldCheck size={24} />}
                title="AI Rule Engine"
                text="Configurable triage rules enabling intelligent patient prioritization."
              />

              <Feature
                icon={<Activity size={24} />}
                title="Operational Monitoring"
                text="Track healthcare operations and patient flow through dashboards."
              />

              <Feature
                icon={<Users size={24} />}
                title="Role-Based Access"
                text="Separate access for administrators and healthcare managers."
              />

            </div>

          </div>

        </section>


        {/* ABOUT */}
        <section id="about" className="py-24">

          <div className="max-w-4xl mx-auto text-center px-16">

            <h2 className="text-3xl font-bold text-gray-800">
              About the Platform
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed">
              AI Smart Triage assists healthcare institutions in prioritizing
              patient treatment using intelligent systems. The platform
              integrates rule-based decision models with enterprise dashboards
              to help hospitals improve operational efficiency.
            </p>

          </div>

        </section>


        {/* CONTACT */}
        <section id="contact" className="py-24">

          <div className="max-w-4xl mx-auto text-center px-16">

            <h2 className="text-3xl font-bold text-gray-800">
              Contact
            </h2>

            <p className="mt-4 text-gray-700">
              For platform information or technical inquiries.
            </p>

            <div className="mt-8 text-gray-700">
              Email: support@aismattriage.com
              <br />
              Phone: +1 800 123 4567
            </div>

          </div>

        </section>


        {/* FOOTER */}
        <div className="text-center text-gray-500 mt-24 pb-10">
          © 2026 MediCare AI Platform
        </div>

      </div>
    </div>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-sm border border-gray-100">

      <div className="flex justify-center mb-4 text-blue-600">
        {icon}
      </div>

      <h3 className="font-semibold text-lg text-gray-800">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {text}
      </p>

    </div>
  );
}
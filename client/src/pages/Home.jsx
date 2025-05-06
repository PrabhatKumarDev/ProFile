import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication state
import { ArrowRight, Monitor, Cpu, Layout, Code, Award,Briefcase } from 'lucide-react';

const Home= () => {
  const {user}=useAuth(); // Mocked authentication state

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Create your professional</span>{' '}
                  <span className="block text-blue-600 xl:inline">portfolio in minutes</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Showcase your skills, projects and experience with a beautiful portfolio website. Choose from stunning templates, customize with your information, and share with the world.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={user ? "/dashboard" : "/register"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                    >
                      {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/templates"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                    >
                      View Templates
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Person working on portfolio"
          />
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for a stunning portfolio
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools you need to create a professional portfolio that stands out.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {[
              { Icon: Layout, title: "Professional Templates", desc: "Choose from a variety of professionally designed templates to match your style and industry." },
              { Icon: Code, title: "Easy Customization", desc: "No coding required. Just fill in your information and customize to your liking." },
              { Icon: Monitor, title: "Responsive Design", desc: "Your portfolio will look great on any device, from mobile phones to desktop computers." },
              { Icon: Cpu, title: "Instant Hosting", desc: "Get a unique URL to share your portfolio with potential employers or clients instantly." },
            ].map(({ Icon, title, desc }, idx) => (
              <div key={idx} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                  <p className="mt-2 text-base text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Trusted by professionals worldwide
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Turner", role: "UI/UX Designer", quote: "This platform made creating my portfolio so simple. I was able to showcase my work professionally without any design skills." },
              { name: "Samantha Lee", role: "Full Stack Developer", quote: "As a developer, I needed a clean portfolio to showcase my projects. This tool delivered exactly what I needed in under an hour." },
              { name: "James Wilson", role: "Graphic Designer", quote: "I received multiple job offers after creating my portfolio here. The professional templates really help you stand out." },
            ].map(({ name, role, quote }, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-600">"{quote}"</p>
                <div className="mt-4 flex items-center">
                  <div className="text-blue-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to showcase your work?</span>
            <span className="block text-blue-200">Create your portfolio today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">PortfolioBuilder</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

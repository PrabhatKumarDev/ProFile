import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { pictures } from "../data";

const Home = () => {
  return (
    <>
      {/* Main Container */}
      <div className="w-full min-h-screen bg-gradient-to-br from-background to-muted">
        
        {/* Header Section */}
        <header className="bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              ProFile
            </div>
            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </button>
              <button asChild>
                <Link
                  className="bg-[#3576e0] text-[black] px-4 py-3 rounded-[5px] signup_button"
                  to="/register"
                >
                  Sign up
                </Link>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="w-[100vw] pt-15 pb-20 bg-[#111a2a]">
          <div className="text-center flex flex-col items-center justify-center">
            {/* Hero Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Build Your Professional Portfolio in Minutes
            </h1>
            {/* Hero Description */}
            <p className="text-center text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Create stunning, responsive portfolios with our drag-and-drop
              builder. Showcase your work, skills, and experience to stand out
              in your industry.
            </p>
            {/* Hero Buttons */}
            <div className="flex justify-center mt-8">
              <button className="flex gap-2 bg-[#3b82f6] text-[black] px-[50px] py-[10px] rounded-[20px] cursor-pointer hover:bg-[#3677e0]">
                <Link to="/register">Get Started</Link>
                <MoveRight />
              </button>
              <button className="ml-4 flex gap-2 bg-[#020817] text-[white] px-[50px] py-[10px] rounded-[20px] hover:bg-[#1e293b] hover:text-[#fff] cursor-pointer">
                See Examples
              </button>
            </div>
            {/* Hero Image */}
            <div className="w-[45%] md:mt-0 flex justify-center">
              <img
                src={pictures.portfolio}
                alt="Portfolio illustration"
                className="max-w-full h-auto mt-10"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-[#020817] text-center py-10">
          <h1 className="text-3xl">
            Everything You Need to Showcase Your Work
          </h1>
          <div className="flex align-center justify-center mt-8 mb-10">
            {/* Feature 1 */}
            <div className="grid gap-8 mx-4">
              <div className="bg-white text-start flex flex-col dark:bg-[#020817] p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-[300px]">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  {/* Replace with a simple SVG icon or emoji for now */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-layers h-6 w-6 text-blue-600 dark:text-blue-400"
                  >
                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Drag & Drop Builder
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Easily build your portfolio with our intuitive drag and drop
                  interface. No coding required.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="grid gap-8 mx-4">
              <div className="bg-white dark:bg-[#020817] text-start flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-[300px]">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  {/* Replace with a simple SVG icon or emoji for now */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-file-pen h-6 w-6 text-purple-600 dark:text-purple-400"
                  >
                    <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Customizable Templates
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from dozens of professional templates and customize
                  them to match your personal brand.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="grid gap-8 mx-4">
              <div className="bg-white dark:bg-[#020817] text-start flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-[300px]">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  {/* Replace with a simple SVG icon or emoji for now */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-folders h-6 w-6 text-green-600 dark:text-green-400"
                  >
                    <path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"></path>
                    <path d="M2 8v11a2 2 0 0 0 2 2h14"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Multiple Portfolios
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create different portfolios for different purposes or
                  audiences. All managed in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Your Professional Portfolio?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of professionals who have elevated their online
              presence with PortfolioBuilder.
            </p>
            <a
              href="/register"
              className="inline-block text-white bg-[#020817] px-[50px] py-[10px] rounded-[20px] hover:bg-[#1e293b] hover:text-[#fff] cursor-pointer"
            >
              Get Started for Free
            </a>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-4 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Footer Left */}
              <div>
                <div className="font-bold text-xl text-white mb-4">
                  MyPortfolio
                </div>
                <p className="text-sm text-slate-400">
                  Showcasing my work, skills, and projects in one place.
                </p>
              </div>
              {/* Footer Right */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#projects" className="hover:text-white">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-white">
                      About Me
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-6 text-sm text-slate-400 text-center">
              <p>© {new Date().getFullYear()} MyPortfolio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
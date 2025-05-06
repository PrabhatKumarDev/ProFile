import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { templates } from '../templates/templateData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [portfolioName, setPortfolioName] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();
  console.log(selectedTemplate, portfolioName);
  const createPortfolio = (name, templateId) => {
    const portfolioData = {
        name,
        templateId,
        createdAt: new Date().toISOString(),
      };
    
      // Save to local storage (or replace with an API call)
      
    
  }
    // Function to create a portfolio with the selected template and name
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!portfolioName.trim()) {
      setNameError("Portfolio name is required");
      return;
    }
  
    if (!selectedTemplate) {
      return;
    }
  
    try {
      console.log("Checking portfolio name:", portfolioName);
    const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
      const response = await fetch(`${apiUrl}/api/portfolio/check-name/${portfolioName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log("Portfolio name check response:", data);
  
      if (data.exists) {
        toast.error("Portfolio name already exists. Please choose a different name.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
  
      // If name doesn't exist, create the portfolio
      createPortfolio(portfolioName, selectedTemplate);
      navigate("/editor", { state: { selectedTemplate, portfolioName } });
    } catch (error) {
      console.error("Error checking portfolio name:", error);
      toast.error("An error occurred while checking the portfolio name.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="px-4 sm:px-0">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Choose a Template</h1>
            <p className="mt-2 text-gray-600">
              Select a template that best represents your professional style.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label htmlFor="portfolioName" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Name
              </label>
              <div className="text-black flex flex-col sm:flex-row">
                <input
                  type="text"
                  id="portfolioName"
                  value={portfolioName}
                  onChange={(e) => {
                    setPortfolioName(e.target.value);
                    setNameError('');
                  }}
                  placeholder="My Professional Portfolio"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className={`relative border-2 rounded-lg overflow-hidden shadow-sm transition-all cursor-pointer hover:shadow-lg ${
                    selectedTemplate === template.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={!selectedTemplate || !portfolioName.trim()}
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue with Selected Template
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
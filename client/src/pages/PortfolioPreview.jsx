import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, ExternalLink } from "lucide-react";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";

const PortfolioPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  // Extract portfolio data from location.state
  const {
    _id,
    portfolioName,
    basicInfo,
    socialLinks,
    selectedTemplate,
    skills,
    education,
    experience,
    projects,
  } = location.state || {};

  
  
  // Handle missing state (e.g., user directly navigates to /preview)
  if (!location.state) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-4">Portfolio Preview</h1>
        <p>No portfolio data available. Please go back to the dashboard.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "minimal":
        return (
          <TemplateOne
            portfolioName={portfolioName}
            basicInfo={basicInfo}
            socialLinks={socialLinks}
            skills={skills}
            education={education}
            experience={experience}
            projects={projects}
          />
        );
      case "professional":
        return (
          <TemplateTwo
            portfolioName={portfolioName}
            basicInfo={basicInfo}
            socialLinks={socialLinks}
            skills={skills}
            education={education}
            experience={experience}
            projects={projects}
          />
        );
        case "creative":
          return (
            <TemplateThree
            portfolioName={portfolioName}
            basicInfo={basicInfo}
            socialLinks={socialLinks}
            skills={skills}
            education={education}
            experience={experience}
            projects={projects}
            />
          )
      default:
        return <p>No template selected.</p>;
    }
  };

  const handlePublish = async () => {
    console.log("Publishing portfolio with ID:", _id);
  
    try {
      const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
      const response = await fetch(`${apiUrl}/api/portfolio/${_id}/publish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Portfolio published successfully:", data);
  
        // Redirect to the public URL of the portfolio
        navigate(`/portfolio/${data.slug}`);
  
        // Refresh the dashboard state
      } else {
        const errorText = await response.text();
        console.error("Failed to publish portfolio:", errorText);
        alert(`Failed to publish portfolio: ${errorText}`);
      }
    } catch (error) {
      console.error("Error publishing portfolio:", error);
      alert("An error occurred while publishing the portfolio.");
    }
  };

  const handleEdit = () => {
    navigate(`/editor/${_id}`, {
      state: {
        _id,
        portfolioName,
        basicInfo,
        socialLinks,
        selectedTemplate,
        skills,
        education,
        experience,
        projects,
      },
    });
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/Dashboard")}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </button>
              <span className="ml-4 text-sm font-medium text-gray-500">
                Previewing: {portfolioName}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={handlePublish}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold mb-4">Portfolio Preview</h1> */}
      {renderTemplate()}
    </div>
  );
};

export default PortfolioPreview;
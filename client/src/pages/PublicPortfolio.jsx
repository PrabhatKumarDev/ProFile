import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree"; // Import additional templates as needed

const PublicPortfolio = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
        const response = await fetch(`${apiUrl}/api/portfolio/slug/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch portfolio:", errorText);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, [slug]);

  if (!portfolio) {
    return <p>Loading portfolio...</p>;
  }

  const { portfolioName, basicInfo, socialLinks, selectedTemplate, skills, education, experience, projects } = portfolio;

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
        );
      default:
        return <p>Template not found</p>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {renderTemplate()}
    </div>
  );
};

export default PublicPortfolio;
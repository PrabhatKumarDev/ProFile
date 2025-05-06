import React, { useState, useEffect } from "react";
import { Trash2, Plus, Save, Eye, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PortfolioEditor = () => {
  const [selectedSection, setSelectedSection] = useState("basic");
  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    title: "",
    summary: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: "",
    github: "",
  });
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTemplate, portfolioName } = location.state || {}; // Get portfolioId from state if available

  const _id = location.state._id; // Get portfolioId from state if available
  console.log(location.state);
  useEffect(() => {
    if (location.state) {
      setBasicInfo(location.state.basicInfo || {});
      setSocialLinks(location.state.socialLinks || {});
      setSkills(location.state.skills || []);
      setEducation(location.state.education || []);
      setExperience(location.state.experience || []);
      setProjects(location.state.projects || []);
    }
  }, []);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { role: "", company: "", duration: "" }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  const handlePreview = () => {
    console.log(basicInfo);
    navigate("/preview", {
      state: {
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

  const handleSave = async () => {
    const portfolioData = {
      portfolioName,
      selectedTemplate,
      basicInfo,
      socialLinks,
      skills,
      education,
      experience,
      projects,
    };
  
    try {
      const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
      const url = _id
        ? `${apiUrl}/api/portfolio/${_id}` // Update existing portfolio
        : `${apiUrl}/api/portfolio/create`; // Create new portfolio
  
      const method = _id ? "PUT" : "POST"; // Use PUT for update, POST for create
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify(portfolioData),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success(
          _id
            ? "Portfolio updated successfully!"
            : "Portfolio created successfully!",
          {
            position: "top-right",
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        console.log("Saved Portfolio:", data);
        if (!data._id) {
          console.error("No _id returned from the server.");
        } else {
          location.state._id = data._id; // Update _id in the state
        }
        // setTimeout(()=>{
        //   navigate("/dashboard"); // Redirect to dashboard after saving

        // },5000)
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save portfolio: ${errorData.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      toast.error("An error occurred while saving the portfolio.", {
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

  const handlePublish = async () => {
    if (!_id) {
      toast.error("Please save the portfolio before publishing!", {
        position: "top-right",
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
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
        toast.success("Portfolio published successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(()=>{
          navigate(`/portfolio/${portfolioName.toLowerCase()}`); // Redirect to public portfolio URL

        },5000)
      } else {
        const errorData = await response.json();
        toast.error(`Failed to publish portfolio: ${errorData.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error publishing portfolio:", error);
      toast.error("An error occurred while publishing the portfolio.", {
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

  const renderSection = () => {
    switch (selectedSection) {
      case "basic":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={basicInfo.fullName}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, fullName: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Title
              </label>
              <input
                type="text"
                value={basicInfo.title}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                rows={4}
                value={basicInfo.summary}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, summary: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a brief professional summary..."
              ></textarea>
            </div>
          </>
        );

      case "social":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              {console.log(socialLinks.linkedIn)}
              <input
                type="text"
                value={socialLinks.linkedIn}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedIn: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="text"
                value={socialLinks.github}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, github: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </>
        );

      case "skills":
        return (
          <>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <button
                  onClick={handleAddSkill}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4" />
                  Add Skill
                </button>
              </div>
              <div className="space-y-4 mt-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 relative"
                  >
                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSkills = skills.filter(
                          (_, i) => i !== index
                        );
                        setSkills(updatedSkills);
                      }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Skill Name Input */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor={`skill-${index}-name`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Skill Name
                        </label>
                        <input
                          type="text"
                          id={`skill-${index}-name`}
                          value={skill.name || ""}
                          onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[index] = {
                              ...updatedSkills[index],
                              name: e.target.value,
                            };
                            setSkills(updatedSkills);
                          }}
                          className=" text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. JavaScript"
                        />
                      </div>

                      {/* Proficiency Level Input */}
                      <div>
                        <label
                          htmlFor={`skill-${index}-level`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Proficiency Level: {skill.level || 0}%
                        </label>
                        <input
                          type="range"
                          id={`skill-${index}-level`}
                          min="0"
                          max="100"
                          value={skill.level || 0}
                          onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[index] = {
                              ...updatedSkills[index],
                              level: e.target.value,
                            };
                            setSkills(updatedSkills);
                          }}
                          className="mt-1 block w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "experience":
        return (
          <>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Work Experience
                </label>
                <button
                  onClick={handleAddExperience}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4" />
                  Add Experience
                </button>
              </div>
              {experience.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">
                  No work experience added yet. Click "Add Experience" to get
                  started.
                </p>
              ) : (
                <div className="space-y-4 mt-4">
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-4 relative"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedExperience = experience.filter(
                            (_, i) => i !== index
                          );
                          setExperience(updatedExperience);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Experience Inputs */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`exp-${index}-company`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Company
                            </label>
                            <input
                              type="text"
                              id={`exp-${index}-company`}
                              value={exp.company || ""}
                              onChange={(e) => {
                                const updatedExperience = [...experience];
                                updatedExperience[index] = {
                                  ...updatedExperience[index],
                                  company: e.target.value,
                                };
                                setExperience(updatedExperience);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`exp-${index}-position`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Position
                            </label>
                            <input
                              type="text"
                              id={`exp-${index}-position`}
                              value={exp.position || ""}
                              onChange={(e) => {
                                const updatedExperience = [...experience];
                                updatedExperience[index] = {
                                  ...updatedExperience[index],
                                  position: e.target.value,
                                };
                                setExperience(updatedExperience);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`exp-${index}-startDate`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Start Date
                            </label>
                            <input
                              type="text"
                              id={`exp-${index}-startDate`}
                              value={exp.startDate || ""}
                              onChange={(e) => {
                                const updatedExperience = [...experience];
                                updatedExperience[index] = {
                                  ...updatedExperience[index],
                                  startDate: e.target.value,
                                };
                                setExperience(updatedExperience);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Jan 2020"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`exp-${index}-endDate`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              End Date
                            </label>
                            <input
                              type="text"
                              id={`exp-${index}-endDate`}
                              value={exp.endDate || ""}
                              onChange={(e) => {
                                const updatedExperience = [...experience];
                                updatedExperience[index] = {
                                  ...updatedExperience[index],
                                  endDate: e.target.value,
                                };
                                setExperience(updatedExperience);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Present"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={`exp-${index}-description`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id={`exp-${index}-description`}
                            rows={3}
                            value={exp.description || ""}
                            onChange={(e) => {
                              const updatedExperience = [...experience];
                              updatedExperience[index] = {
                                ...updatedExperience[index],
                                description: e.target.value,
                              };
                              setExperience(updatedExperience);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );

      case "education":
        return (
          <>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <button
                  onClick={handleAddEducation}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4" />
                  Add Education
                </button>
              </div>
              {education.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">
                  No education added yet. Click "Add Education" to get started.
                </p>
              ) : (
                <div className="space-y-4 mt-4">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-4 relative"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedEducation = education.filter(
                            (_, i) => i !== index
                          );
                          setEducation(updatedEducation);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Education Inputs */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            htmlFor={`edu-${index}-institution`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Institution
                          </label>
                          <input
                            type="text"
                            id={`edu-${index}-institution`}
                            value={edu.institution || ""}
                            onChange={(e) => {
                              const updatedEducation = [...education];
                              updatedEducation[index] = {
                                ...updatedEducation[index],
                                institution: e.target.value,
                              };
                              setEducation(updatedEducation);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`edu-${index}-degree`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Degree
                            </label>
                            <input
                              type="text"
                              id={`edu-${index}-degree`}
                              value={edu.degree || ""}
                              onChange={(e) => {
                                const updatedEducation = [...education];
                                updatedEducation[index] = {
                                  ...updatedEducation[index],
                                  degree: e.target.value,
                                };
                                setEducation(updatedEducation);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Bachelor of Science"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`edu-${index}-field`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Field of Study
                            </label>
                            <input
                              type="text"
                              id={`edu-${index}-field`}
                              value={edu.field || ""}
                              onChange={(e) => {
                                const updatedEducation = [...education];
                                updatedEducation[index] = {
                                  ...updatedEducation[index],
                                  field: e.target.value,
                                };
                                setEducation(updatedEducation);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Computer Science"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`edu-${index}-startDate`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Start Date
                            </label>
                            <input
                              type="text"
                              id={`edu-${index}-startDate`}
                              value={edu.startDate || ""}
                              onChange={(e) => {
                                const updatedEducation = [...education];
                                updatedEducation[index] = {
                                  ...updatedEducation[index],
                                  startDate: e.target.value,
                                };
                                setEducation(updatedEducation);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Sep 2016"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`edu-${index}-endDate`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              End Date
                            </label>
                            <input
                              type="text"
                              id={`edu-${index}-endDate`}
                              value={edu.endDate || ""}
                              onChange={(e) => {
                                const updatedEducation = [...education];
                                updatedEducation[index] = {
                                  ...updatedEducation[index],
                                  endDate: e.target.value,
                                };
                                setEducation(updatedEducation);
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Jun 2020"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );

      case "projects":
        return (
          <>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Projects
                </label>
                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4" />
                  Add Project
                </button>
              </div>
              {projects.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">
                  No projects added yet. Click "Add Project" to get started.
                </p>
              ) : (
                <div className="space-y-4 mt-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-4 relative"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedProjects = projects.filter(
                            (_, i) => i !== index
                          );
                          setProjects(updatedProjects);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Project Inputs */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            htmlFor={`project-${index}-name`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Name
                          </label>
                          <input
                            type="text"
                            id={`project-${index}-name`}
                            value={project.name || ""}
                            onChange={(e) => {
                              const updatedProjects = [...projects];
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                name: e.target.value,
                              };
                              setProjects(updatedProjects);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`project-${index}-description`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id={`project-${index}-description`}
                            rows={3}
                            value={project.description || ""}
                            onChange={(e) => {
                              const updatedProjects = [...projects];
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                description: e.target.value,
                              };
                              setProjects(updatedProjects);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>

                        <div>
                          <label
                            htmlFor={`project-${index}-link`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Link
                          </label>
                          <input
                            type="url"
                            id={`project-${index}-link`}
                            value={project.link || ""}
                            onChange={(e) => {
                              const updatedProjects = [...projects];
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                link: e.target.value,
                              };
                              setProjects(updatedProjects);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. https://github.com/yourusername/project"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`project-${index}-image`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Image URL
                          </label>
                          <input
                            type="url"
                            id={`project-${index}-image`}
                            value={project.image || ""}
                            onChange={(e) => {
                              const updatedProjects = [...projects];
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                image: e.target.value,
                              };
                              setProjects(updatedProjects);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. https://example.com/project-image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };
  const renderTemplate = () => {
    console.log(selectedTemplate);
    switch (selectedTemplate) {
      case "minimal":
        return <TemplateOne />;
      case "professional":
        return <TemplateTwo />;
      case "creative":
        return <TemplateThree />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ToastContainer/>
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </button>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Portfolio: {portfolioName}
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={handlePreview}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="md:grid md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1 bg-gray-50 p-4 border-r border-gray-200">
              <nav className="space-y-1">
                {[
                  { id: "basic", name: "Basic Information" },
                  { id: "social", name: "Social Links" },
                  { id: "skills", name: "Skills" },
                  { id: "experience", name: "Experience" },
                  { id: "education", name: "Education" },
                  { id: "projects", name: "Projects" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      selectedSection === item.id
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button onClick={handlePublish} className="w-full px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  Publish Portfolio
                </button>
                <p className="mt-2 text-xs text-center text-gray-500">
                  Publish to make your portfolio visible to everyone
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3 p-6 space-y-6">{renderSection()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor;

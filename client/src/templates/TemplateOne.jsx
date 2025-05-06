import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Instagram, ExternalLink } from 'lucide-react';

const TemplateOne = ({ portfolioName, basicInfo, socialLinks, skills, education, experience, projects }) => {
  console.log(socialLinks)
    return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white py-12 shadow-sm">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">{basicInfo.fullName}</h1>
          <p className="mt-2 text-xl text-blue-600">{basicInfo.title}</p>

          {basicInfo.summary && (
            <p className="mt-6 text-gray-600 leading-relaxed">{basicInfo.summary}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            {basicInfo.email && (
              <div className="flex items-center text-gray-700">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${basicInfo.email}`} className="hover:text-blue-600">
                  {basicInfo.email}
                </a>
              </div>
            )}

            {basicInfo.phone && (
              <div className="flex items-center text-gray-700">
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${basicInfo.phone}`} className="hover:text-blue-600">
                  {basicInfo.phone}
                </a>
              </div>
            )}

            {basicInfo.location && (
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{basicInfo.location}</span>
              </div>
            )}

            {basicInfo.website && (
              <div className="flex items-center text-gray-700">
                <Globe className="h-4 w-4 mr-2" />
                <a href={basicInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {basicInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
          {socialLinks && (
          <div className="mt-4 flex gap-4">
            
            {socialLinks.linkedIn && (
              <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <Github className="h-5 w-5" />
              </a>
            )}
            
          </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {exp.startDate} – {exp.endDate}
                      </p>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-blue-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {project.image && (
                        <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <p className="mt-2 text-gray-700 text-sm">{project.description}</p>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            View Project <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-10">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto px-6">
          <p>© {new Date().getFullYear()} {basicInfo.fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateOne;
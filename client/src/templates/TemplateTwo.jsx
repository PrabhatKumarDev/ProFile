import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Instagram, ExternalLink } from 'lucide-react';

const TemplateTwo = ({ portfolioName, basicInfo, socialLinks, skills, education, experience, projects }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gray-900 text-white py-12 shadow-md">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold">{basicInfo.fullName}</h1>
          <p className="mt-2 text-xl text-blue-400">{basicInfo.title}</p>

          {basicInfo.summary && (
            <p className="mt-6 text-gray-300 leading-relaxed">{basicInfo.summary}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-6">
            {basicInfo.email && (
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <a href={`mailto:${basicInfo.email}`} className="hover:text-blue-400">
                  {basicInfo.email}
                </a>
              </div>
            )}

            {basicInfo.phone && (
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <a href={`tel:${basicInfo.phone}`} className="hover:text-blue-400">
                  {basicInfo.phone}
                </a>
              </div>
            )}

            {basicInfo.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <span>{basicInfo.location}</span>
              </div>
            )}

            {basicInfo.website && (
              <div className="flex items-center text-gray-300">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                <a href={basicInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  {basicInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>

          {socialLinks && (
            <div className="mt-6 flex gap-4">
              {socialLinks.linkedIn && (
                <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
                  <Instagram className="h-6 w-6" />
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Experience Section */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-gray-300 pl-4 ml-2">
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

            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-gray-300 pl-4 ml-2">
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
          </div>

          {/* Skills Section */}
          <div className="space-y-10">
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

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="py-12 border-t border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {project.image && (
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        View Project <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} {basicInfo.fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateTwo;
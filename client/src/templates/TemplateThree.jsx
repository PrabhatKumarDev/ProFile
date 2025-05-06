import React from 'react';
import {
  Mail, Phone, MapPin, Globe,
  Linkedin, Github, Twitter, Instagram, ExternalLink
} from 'lucide-react';

const TemplateThree = ({ portfolioName, basicInfo, socialLinks, skills, education, experience, projects }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-5xl font-bold">{basicInfo.fullName}</h1>
          <p className="mt-4 text-2xl text-blue-200">{basicInfo.title}</p>
          {basicInfo.summary && (
            <p className="mt-6 max-w-3xl mx-auto text-lg text-blue-100 leading-relaxed">{basicInfo.summary}</p>
          )}
          <div className="mt-10 flex justify-center flex-wrap gap-6 text-sm">
            {basicInfo.email && (
              <a href={`mailto:${basicInfo.email}`} className="flex items-center gap-2 text-blue-200 hover:text-white">
                <Mail size={18} /> {basicInfo.email}
              </a>
            )}
            {basicInfo.phone && (
              <a href={`tel:${basicInfo.phone}`} className="flex items-center gap-2 text-blue-200 hover:text-white">
                <Phone size={18} /> {basicInfo.phone}
              </a>
            )}
            {basicInfo.location && (
              <div className="flex items-center gap-2 text-blue-200">
                <MapPin size={18} /> {basicInfo.location}
              </div>
            )}
            {basicInfo.website && (
              <a href={basicInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-200 hover:text-white">
                <Globe size={18} /> {basicInfo.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
          <div className="mt-6 flex justify-center gap-4 text-blue-300">
            {socialLinks?.linkedIn && <a href={socialLinks.linkedIn} target="_blank"><Linkedin className="hover:text-white" /></a>}
            {socialLinks?.github && <a href={socialLinks.github} target="_blank"><Github className="hover:text-white" /></a>}
            {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank"><Twitter className="hover:text-white" /></a>}
            {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank"><Instagram className="hover:text-pink-400" /></a>}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Experience</h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-xl transition hover:scale-[1.02]">
                      <h3 className="text-xl font-semibold text-blue-900">{exp.position}</h3>
                      <p className="text-blue-700">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{exp.startDate} – {exp.endDate}</p>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Education</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-md shadow-md p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-blue-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-blue-700">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mt-1">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Section - Skills */}
          <div>
            {skills.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2.5 rounded-full">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
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

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:-translate-y-1">
                  {project.image && (
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-900">{project.name}</h3>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800"
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
      <footer className="bg-blue-900 text-blue-200 py-6 text-center">
        <p>© {new Date().getFullYear()} {basicInfo.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TemplateThree;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Default templates
const defaultTemplates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and minimalist design that puts your work front and center',
    thumbnail: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A traditional layout perfect for job seekers and professionals',
    thumbnail: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design to showcase creative talents',
    thumbnail: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Empty portfolio data template
const emptyPortfolioData = {
  basic: {
    fullName: '',
    title: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  social: {
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

// Create context
const PortfolioContext = createContext({
  portfolios: [],
  currentPortfolio: null,
  templates: defaultTemplates,
  createPortfolio: () => {},
  updatePortfolio: () => {},
  publishPortfolio: () => {},
  deletePortfolio: () => {},
  loadPortfolio: () => {},
  clearCurrentPortfolio: () => {},
});

// Custom hook
export const usePortfolio = () => useContext(PortfolioContext);

// Provider component
export const PortfolioProvider = (props) => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [templates] = useState(defaultTemplates);

  useEffect(() => {
    if (user) {
      const storedPortfolios = localStorage.getItem(`portfolios-${user.id}`);
      if (storedPortfolios) {
        setPortfolios(JSON.parse(storedPortfolios));
      }
    } else {
      setPortfolios([]);
      setCurrentPortfolio(null);
    }
  }, [user]);

  useEffect(() => {
    if (user && portfolios.length > 0) {
      localStorage.setItem(`portfolios-${user.id}`, JSON.stringify(portfolios));
    }
  }, [portfolios, user]);

  const createPortfolio = (name, templateId) => {
    if (!user) return;

    const newPortfolio = {
      id: 'portfolio-' + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      name,
      templateId,
      data: { ...emptyPortfolioData },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    };

    setPortfolios(prev => [...prev, newPortfolio]);
    setCurrentPortfolio(newPortfolio);
  };

  const updatePortfolio = (id, data) => {
    setPortfolios(prev =>
      prev.map(portfolio =>
        portfolio.id === id
          ? {
              ...portfolio,
              data: { ...portfolio.data, ...data },
              updatedAt: new Date().toISOString(),
            }
          : portfolio
      )
    );

    if (currentPortfolio && currentPortfolio.id === id) {
      setCurrentPortfolio(prev =>
        prev
          ? {
              ...prev,
              data: { ...prev.data, ...data },
              updatedAt: new Date().toISOString(),
            }
          : null
      );
    }
  };

  const publishPortfolio = (id) => {
    setPortfolios(prev =>
      prev.map(portfolio =>
        portfolio.id === id
          ? { ...portfolio, published: true, updatedAt: new Date().toISOString() }
          : portfolio
      )
    );

    if (currentPortfolio && currentPortfolio.id === id) {
      setCurrentPortfolio(prev =>
        prev
          ? { ...prev, published: true, updatedAt: new Date().toISOString() }
          : null
      );
    }
  };

  const deletePortfolio = (id) => {
    setPortfolios(prev => prev.filter(portfolio => portfolio.id !== id));
    if (currentPortfolio && currentPortfolio.id === id) {
      setCurrentPortfolio(null);
    }
  };

  const loadPortfolio = (id) => {
    const portfolio = portfolios.find(p => p.id === id);
    if (portfolio) {
      setCurrentPortfolio(portfolio);
    }
  };

  const clearCurrentPortfolio = () => {
    setCurrentPortfolio(null);
  };

  const value = {
    portfolios,
    currentPortfolio,
    templates,
    createPortfolio,
    updatePortfolio,
    publishPortfolio,
    deletePortfolio,
    loadPortfolio,
    clearCurrentPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {props.children}
    </PortfolioContext.Provider>
  );
};

import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit, ExternalLink, 
  Calendar, CheckCircle, AlertCircle,
  Eye, Award, Briefcase, Layout,
  TrendingUp, Clock, Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const {user,logout}=useAuth();
  console.log(user);
  const [publishedPortfolios, setPublishedPortfolios] = useState(0);
  const [draftPortfolios, setDraftPortfolios] = useState(0);
  const [recentlyUpdated, setRecentlyUpdated] = useState(0);
  const [portfolios, setPortfolios] = useState([]); // State to store portfolios
  const navigate = useNavigate();
  console.log(portfolios);
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
        const response = await fetch(`${apiUrl}/api/portfolio/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPortfolios(data); // Store fetched portfolios in state

          // Calculate counts
          const publishedCount = data.filter((portfolio) => portfolio.published).length;
          const draftCount = data.filter((portfolio) => !portfolio.published).length;
          const recentlyUpdatedCount = data.filter((portfolio) => {
            const updatedDate = new Date(portfolio.updatedAt);
            const now = new Date();
            const diffInDays = (now - updatedDate) / (1000 * 60 * 60 * 24); // Difference in days
            return diffInDays <= 7; // Updated within the last 7 days
          }).length;

          setPublishedPortfolios(publishedCount);
          setDraftPortfolios(draftCount);
          setRecentlyUpdated(recentlyUpdatedCount);
        } else {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  
  const clearCurrentPortfolio = () => {
    // Clear current portfolio logic here
    }

  const handleCreateNew = () => {
    clearCurrentPortfolio();
    navigate('/templates');
  };

  const handleEdit = (portfolio) => {
    navigate(`/editor/${portfolio._id}`,{state:{_id:portfolio._id,...portfolio}});
  };

  const handlePreview = (portfolio) => {
    navigate(`/preview?id=${portfolio._id}`,{state:{_id:portfolio._id,...portfolio}});
  };

  const confirmDelete = (id) => {
    setPortfolioToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async() => {
    console.log("Hello")
    if (portfolioToDelete) {
      try {
        console.log("Deleting portfolio with ID:", portfolioToDelete);
        const apiUrl = import.meta.env.VITE_BASE_URL; // Access the environment variable
        const response = await fetch(
          `${apiUrl}/api/portfolio/${portfolioToDelete}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          setPortfolios((prev) =>
            prev.filter((portfolio) => portfolio._id !== portfolioToDelete)
          );
          setShowDeleteModal(false);
          setPortfolioToDelete(null);
        } else {
          console.error("Failed to delete portfolio");
        }
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate statistics
  

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 sm:px-0 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your portfolios and track their performance
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Portfolios</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolios.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{publishedPortfolios}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Edit className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">{draftPortfolios}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recently Updated</p>
                  <p className="text-2xl font-bold text-gray-900">{recentlyUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleCreateNew}
                className="flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Portfolio
              </button>
              
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Layout className="h-5 w-5 mr-2" />
                Browse Templates
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio List */}
        <div className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Portfolios</h2>
          </div>

          {portfolios.length === 0 ? (
            <div className="bg-white overflow-hidden shadow rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Create your first portfolio</h3>
              <p className="mt-2 text-base text-gray-500">
                You don't have any portfolios yet. Start creating your professional portfolio in minutes.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Portfolio
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {portfolios.map((portfolio) => (
                  <li key={portfolio.id} className="hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            {console.log(portfolio)}
                            <h3 className="text-lg font-medium text-blue-600 truncate">{portfolio.portfolioName}</h3>
                            {portfolio.published && (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>Updated on <time dateTime={portfolio.updatedAt}>{formatDate(portfolio.updatedAt)}</time></p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Layout className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>Template: {portfolio.selectedTemplate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handlePreview(portfolio)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </button>
                          {portfolio.published && (
                            <button
                            onClick={() => window.open(`/portfolio/${portfolio.portfolioName.toLowerCase()}`, "_blank")}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </button>
                          )}
                          <button
                            onClick={() => confirmDelete(portfolio._id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Portfolio
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this portfolio? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
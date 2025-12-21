// src/components/admin/CategoryManager.jsx
'use client';

import { useState } from 'react';

const CategoryManager = () => {
  const [categories] = useState([
    {
      id: 1,
      name: "Plumbing",
      icon: "🔧",
      subcategories: ["Emergency Plumber", "Pipe Repair", "Drain Cleaning", "Water Heater Installation"],
      gradient: ["#4F46E5", "#7C3AED"]
    },
    {
      id: 2,
      name: "Electrical",
      icon: "⚡",
      subcategories: ["Electrical Repair", "Lighting Installation", "Panel Upgrade", "Outlet Installation"],
      gradient: ["#F59E0B", "#EF4444"]
    },
    {
      id: 3,
      name: "Cleaning",
      icon: "🧹",
      subcategories: ["House Cleaning", "Office Cleaning", "Carpet Cleaning", "Window Cleaning"],
      gradient: ["#10B981", "#3B82F6"]
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "🔧",
    subcategories: "",
    gradientFrom: "#4F46E5",
    gradientTo: "#7C3AED"
  });

  const handleAddCategory = () => {
    console.log("Adding new category:", newCategory);
    // In a real app, this would update the database
  };

  const handleDeleteCategory = (id) => {
    console.log(`Deleting category ${id}`);
    // In a real app, this would update the database
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Category Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="flex-shrink-0 text-2xl mr-4">
                      {category.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {category.subcategories.length} subcategories
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <p>
                            {category.subcategories.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={newCategory.icon}
                onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="🔧">🔧 Plumbing</option>
                <option value="⚡">⚡ Electrical</option>
                <option value="🧹">🧹 Cleaning</option>
                <option value="🔨">🔨 Carpentry</option>
                <option value="🎨">🎨 Painting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategories (comma separated)</label>
              <input
                type="text"
                value={newCategory.subcategories}
                onChange={(e) => setNewCategory({...newCategory, subcategories: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gradient From</label>
                <input
                  type="color"
                  value={newCategory.gradientFrom}
                  onChange={(e) => setNewCategory({...newCategory, gradientFrom: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gradient To</label>
                <input
                  type="color"
                  value={newCategory.gradientTo}
                  onChange={(e) => setNewCategory({...newCategory, gradientTo: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleAddCategory}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
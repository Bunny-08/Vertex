import React, { useState, useEffect } from 'react';
import { TaskStatus, TaskPriority } from '../types';

export const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate.split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">{task ? 'Edit Mission' : 'New Mission'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Mission Title</label>
            <input
              type="text"
              required
              autoFocus
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-bold text-sm shadow-md transition-all uppercase tracking-wide"
            >
              Confirm Mission
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-2.5 rounded-md font-bold text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-200 transition-all uppercase tracking-wide"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

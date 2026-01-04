import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { TaskStatus, TaskPriority } from '../types';
import { TaskModal } from '../components/TaskModal';

export const Dashboard = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(undefined);

  const loadTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const result = await mockApi.getTasks(token);
    if (result.success) setTasks(result.data || []);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const onSave = async (data) => {
    if (!token) return;
    if (editingTask) {
      await mockApi.updateTask(token, editingTask.id, data);
    } else {
      await mockApi.createTask(token, data);
    }
    setIsModalOpen(false);
    loadTasks();
  };

  const onDelete = async (id) => {
    if (!token) return;
    // Humanized touch: instant removal from UI
    setTasks(prev => prev.filter(task => task.id !== id));
    // Silent background sync
    await mockApi.deleteTask(token, id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Missions</h1>
          <p className="text-gray-500 font-medium">Keep track of your active objectives.</p>
        </div>
        <button
          onClick={() => { setEditingTask(undefined); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-bold text-sm shadow-sm transition-all"
        >
          Create New Task
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
          <p className="text-gray-400 font-semibold italic">No missions currently deployed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm ${
                  task.priority === TaskPriority.HIGH ? 'bg-red-50 text-red-600' : 
                  task.priority === TaskPriority.MEDIUM ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {task.priority} Priority
                </span>
                <div className="flex space-x-3 text-[11px] font-bold">
                  <button onClick={() => { setEditingTask(task); setIsModalOpen(true); }} className="text-indigo-600 hover:text-indigo-700">EDIT</button>
                  <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-600">DELETE</button>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1 leading-tight">{task.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                {task.description || 'No description provided.'}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{task.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
        task={editingTask}
      />
    </div>
  );
};

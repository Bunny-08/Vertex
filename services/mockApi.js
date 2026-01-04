// Helper to get data from local storage
const getData = (key) => JSON.parse(localStorage.getItem(key) || '[]');

// Helper to save data to local storage
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const mockApi = {
  // Authentication
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 500));
    const users = getData('nova_users');
    const user = users.find((u) => u.email === email && u.password === password);
    
    if (!user) return { success: false, error: 'Invalid email or password' };
    
    const { password: _, ...userInfo } = user;
    return { success: true, data: { user: userInfo, token: `token-${user.id}` } };
  },

  register: async (name, email, password) => {
    await new Promise(r => setTimeout(r, 500));
    const users = getData('nova_users');
    
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };

    users.push({ ...newUser, password });
    saveData('nova_users', users);

    return { success: true, data: { user: newUser, token: `token-${newUser.id}` } };
  },

  getProfile: async (token) => {
    const userId = token.replace('token-', '');
    const users = getData('nova_users');
    const user = users.find((u) => u.id === userId);
    return user ? { success: true, data: user } : { success: false, error: 'User not found' };
  },

  updateProfile: async (token, updates) => {
    const userId = token.replace('token-', '');
    const users = getData('nova_users');
    const index = users.findIndex((u) => u.id === userId);
    
    if (index === -1) return { success: false, error: 'User not found' };
    
    users[index] = { ...users[index], ...updates };
    saveData('nova_users', users);
    return { success: true, data: users[index] };
  },

  // Task Management
  getTasks: async (token) => {
    const userId = token.replace('token-', '');
    const tasks = getData('nova_tasks');
    return { success: true, data: tasks.filter((t) => t.userId === userId) };
  },

  createTask: async (token, task) => {
    const userId = token.replace('token-', '');
    const tasks = getData('nova_tasks');
    const newTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      userId,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveData('nova_tasks', tasks);
    return { success: true, data: newTask };
  },

  updateTask: async (token, id, updates) => {
    const tasks = getData('nova_tasks');
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return { success: false, error: 'Task not found' };
    tasks[index] = { ...tasks[index], ...updates };
    saveData('nova_tasks', tasks);
    return { success: true, data: tasks[index] };
  },

  deleteTask: async (token, id) => {
    const tasks = getData('nova_tasks');
    const filteredTasks = tasks.filter((t) => t.id !== id);
    saveData('nova_tasks', filteredTasks);
    return { success: true };
  }
};

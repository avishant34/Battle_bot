import { useState, useEffect } from 'react';
import type { Task, Priority, FilterType } from './types';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import FilterBar from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your work and life, finally.
          </p>
        </header>

        <TaskForm onAddTask={addTask} />
        
        <FilterBar 
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-4">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === 'completed' 
                ? 'No completed tasks yet'
                : filter === 'active'
                ? 'No active tasks'
                : 'No tasks yet'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Add a task to get started!'
                : `Switch to "All" to see your tasks`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            {taskCounts.completed} of {taskCounts.all} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

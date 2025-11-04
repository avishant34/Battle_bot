import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const priorityColors = {
    low: 'border-l-green-500 bg-green-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    high: 'border-l-red-500 bg-red-50',
  };

  const priorityBadgeColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-l-4 ${priorityColors[task.priority]} p-5 transition-all hover:shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 transition-all ${
            task.completed
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {task.completed && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                priorityBadgeColors[task.priority]
              }`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>

          {task.description && (
            <p
              className={`mt-2 text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

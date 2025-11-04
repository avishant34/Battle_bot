import type { FilterType } from '../types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function FilterBar({ currentFilter, onFilterChange, taskCounts }: FilterBarProps) {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'active', label: 'Active' },
    { type: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex gap-2">
        {filters.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              currentFilter === type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
            <span className="ml-2 text-sm opacity-75">
              ({taskCounts[type]})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

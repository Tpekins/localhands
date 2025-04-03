import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/DataContext';
import { useUser } from '../contexts/userContext';

const categories = ['tech', 'creative', 'service'];

interface JobFormData {
  title: string;
  description: string;
  category: string;
  budget: number;
  numberOfSlots: number;
}

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, addJob, updateJob } = useJobs();
  const { user } = useUser();

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    category: 'tech',
    budget: 0,
    numberOfSlots: 1
  });

  useEffect(() => {
    if (id) {
      const job = jobs.find(j => j.id === id);
      if (job) {
        setFormData({
          title: job.title,
          description: job.description,
          category: job.category,
          budget: job.budget,
          numberOfSlots: job.numberOfSlots
        });
      }
    }
  }, [id, jobs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      id: id || `job${Date.now()}`, // Generate a new ID if not editing
      clientId: user?.id || '',
      title: formData.title,
      description: formData.description,
      category: formData.category,
      budget: formData.budget,
      numberOfSlots: formData.numberOfSlots,
      acceptedSlots: 0,
      status: 'open',
      createdAt: new Date()
    };

    if (id) {
      updateJob(newJob);
    } else {
      addJob(newJob);
    }

    navigate('/dashboard/offers');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {id ? 'Edit Job' : 'Create New Job'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 shadow-sm focus:border-[#155b33] focus:ring-[#155b33] sm:text-sm h-12 outline-gray-200 outline-1"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#155b33] focus:ring-[#155b33] sm:text-sm outline-gray-200 outline-1 min-h-[120px]"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#155b33] focus:ring-[#155b33] sm:text-sm h-12 outline-gray-200 outline-1"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget (FCFA)
          </label>
          <input
            type="number"
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 shadow-sm focus:border-[#155b33] focus:ring-[#155b33] sm:text-sm h-12 outline-gray-200 outline-1"
            required
          />
        </div>

        <div>
          <label htmlFor="slots" className="block text-sm font-medium text-gray-700">
            Number of Slots
          </label>
          <input
            type="number"
            id="slots"
            value={formData.numberOfSlots}
            onChange={(e) => setFormData({ ...formData, numberOfSlots: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 shadow-sm focus:border-[#155b33] focus:ring-[#155b33] sm:text-sm h-12 outline-gray-200 outline-1"
            required
            min={1}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#155b33] hover:bg-[#498965] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a694f]"
          >
            {id ? 'Update Job' : 'Create Job'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/offers')}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#155b33]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;

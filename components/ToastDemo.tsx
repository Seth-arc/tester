'use client';
import toast from 'react-hot-toast';

export default function ToastDemo() {
  return (
    <div className="space-y-4 p-4">
      <button
        onClick={() => toast.success('Successfully saved!')}
        className="block px-4 py-2 bg-green-500 text-white rounded"
      >
        Show Success Toast
      </button>
    </div>
  );
}
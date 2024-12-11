"use client";

import { FC } from "react";

interface ResultSearchProps {
  onClose: () => void;
}

export const ResultSearch: FC<ResultSearchProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg">
      <div className="max-h-96 overflow-y-auto">
        <div className="py-2">
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            EC2 Instances
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            S3 Buckets
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

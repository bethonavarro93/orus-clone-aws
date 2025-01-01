// src/app/(dashboard)/home/components/ActivityCard.tsx
"use client";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";

interface ActivityCardProps {
  id: string;
  title: string;
  time: string;
  description: string;
  userImage?: string;
  contentImage?: string;
  type: 'announcement' | 'update' | 'achievement' | 'project';
  department?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export function ActivityCard({
  title,
  time,
  description,
  userImage = "/avatars/default.png",
  contentImage,
  department,
  likes,
  comments,
  isLiked,
}: ActivityCardProps) {
  return (
    <div className="bg-[#232f3e] rounded-lg shadow">
      <div className="p-4">
        {/* Activity Header */}
        <div className="flex items-center space-x-3">
          <Image
            src={userImage}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-white font-medium">{title}</h3>
            <div className="flex items-center text-sm text-gray-400 space-x-2">
              <span>{time}</span>
              {department && (
                <>
                  <span>•</span>
                  <span>{department}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Activity Content */}
        <div className="mt-4">
          <p className="text-gray-300">{description}</p>
          {contentImage && (
            <div className="mt-4">
              <Image
                src={contentImage}
                alt=""
                width={600}
                height={300}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Activity Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          <button
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-[#ec7211]' : 'text-gray-400'
            } hover:text-[#ec7211]`}
          >
            <Icon name="thumbsUp" className="h-5 w-5" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="messageCircle" className="h-5 w-5" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="share2" className="h-5 w-5" />
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
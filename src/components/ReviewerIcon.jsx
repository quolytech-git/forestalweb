import React from 'react';
import { UserRound } from 'lucide-react';

// Neutral reviewer avatar: an icon instead of a photo of a person.
// Pass the avatar's size class (e.g. "cluster-avatar") so it fits the existing layout.
export default function ReviewerIcon({ className = '', size = 18 }) {
  return (
    <span className={`reviewer-icon ${className}`} aria-hidden="true">
      <UserRound size={size} strokeWidth={2.2} />
    </span>
  );
}

import React from "react";

const RatingBadge = ({ rating = "4.2", size = 30 }) => {
  const parsedRating = parseFloat(rating);
  const badgeColor =
    parsedRating >= 4 ? "#258d4e" : parsedRating >= 3 ? "#db7c38" : "#e54848";

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill={badgeColor} />

      <path
        d="M12 6.5L13.9 10.5H18L14.7 13.1L15.9 17L12 14.5L8.1 17L9.3 13.1L6 10.5H10.1L12 6.5Z"
        fill="white"
      />

      <text
        x="12"
        y="20"
        textAnchor="middle"
        fontSize="8"
        fill="#fff"
        fontWeight="bold"
      >
      </text>
    </svg>
  );
};

export default RatingBadge;

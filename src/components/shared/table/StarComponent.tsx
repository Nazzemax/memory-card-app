import React, { useState } from "react";
import { useActions } from "../../../app/hooks/useActions";

const StarComponent: React.FC<{
  rating: number;
}> = ({ rating}) => {
  const [hover, setHover] = useState(0);
  const { setRating } = useActions()

  return (
    <div>
      {[...Array(5)].map((_star, index) => {
        index += 1;
        const isFullStar = index <= (hover || rating);
        const isHalfStar = hover > rating && index - 0.5 === hover;

        return (
          <button
            type="button"
            key={index}
            className={
              isFullStar || isHalfStar ? "text-yellow-500" : "text-gray-500"
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-lg">
              {isHalfStar ? "\u00BD" : "\u2605"}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarComponent;

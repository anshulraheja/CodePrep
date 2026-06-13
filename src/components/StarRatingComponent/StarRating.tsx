import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import './StarRating.css';

interface StarRatingProps {
  total?: number;
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean; // Real rating components need a display-only mode (showing average rating, no interaction)
  label?: string;
}

const StarRating = ({
  total = 5,
  value,
  onChange,
  readOnly = false,
  label = "Rating",
}: StarRatingProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Explicit null check
  // It will tell how many stars need to be filled based if star is hovered or not.
  const filled = hoverIndex !== null ? hoverIndex : value;


  // For a small component, useCallback affect is negligible
  const handleClick = useCallback(
    (rating: number) => {
      if (readOnly || !onChange) return;
      onChange(rating); // parent decides what to do with it
    },
    [readOnly, onChange]
  );

  // Fill till the hovered star
  const handleMouseEnter = useCallback(
    (rating: number) => {
      if (readOnly) return;
      setHoverIndex(rating);
    },
    [readOnly]
  );

  // Remove hoverIndex value
  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  return (
    // stars are semantically a radio group.
    <div role="radiogroup" aria-label={label} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: total }).map((_, index) => {
        const rating = index + 1; // 1-based index
        return (
          // accessible implementation
          <span
            key={rating}
            role="radio"
            aria-label={`${rating} out of ${total}`}
            aria-checked={rating === value}
            tabIndex={readOnly ? -1 : 0}
            style={{ cursor: readOnly ? "default" : "pointer" }}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick(rating);
            }}
          >
            <FontAwesomeIcon icon={rating <= filled ? faStarFilled : faStar} />
          </span>
        );
      })}
    </div>
  );
};



export default StarRating;

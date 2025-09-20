import { useState } from 'react';
import StarRating from './StarRating';

/**
- Controlled component = parent owns state (value, onChange
- Component itself doesn’t store selection → only hover is local.
- Useful in forms (parent can send value to API, reset it, validate it).
- Makes widget predictable and testable (no hidden internal state).
 */
function StarRatingComponent() {
  const [rating, setRating] = useState(3);

  return <StarRating max={5} rating={rating} onChange={setRating} />;
}

export default StarRatingComponent;

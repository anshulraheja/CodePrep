import { useState } from 'react';
import StarRating from './StarRating';

/**
- Controlled component = parent owns state (value, onChange)
- Component itself doesn’t store selection → only hover is local.
- Useful in forms (parent can send value to API, reset it, validate it).
- Makes widget predictable and testable (no hidden internal state).
- passing callback function instead of setter so parent has control over its state variable
 */

/**
  NEXT LEVEL
  - Add support for half star
 */
function StarRatingComponent() {
  const [rating, setRating] = useState(3);

  // parent controls update
  return <StarRating total={5} value={rating} onChange={(rating) => setRating(rating)} />;
}

export default StarRatingComponent;

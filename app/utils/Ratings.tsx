import { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

interface Props {
  rating: number;
}

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full star
      stars.push(
        <AiFillStar
          key={i}
          size={18} // Adjusted size
          color="#ffd700" // Golden color
          className="mr-1 cursor-pointer hover:text-yellow-500 transition-colors duration-300"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // Half star
      stars.push(
        <BsStarHalf
          key={i}
          size={18} // Adjusted size
          color="#ffd700" // Golden color
          className="mr-1 cursor-pointer hover:text-yellow-500 transition-colors duration-300"
        />
      );
    } else {
      // Empty star
      stars.push(
        <AiOutlineStar
          key={i}
          size={18} // Adjusted size
          color="#dcdcdc" // Light gray color for empty stars
          className="mr-1 cursor-pointer hover:text-yellow-500 transition-colors duration-300"
        />
      );
    }
  }

  return <div className="flex mt-1">{stars}</div>;
};

export default Ratings;

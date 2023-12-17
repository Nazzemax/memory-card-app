import { Link } from 'react-router-dom';
import leftArrow from "../../../assets/leftArrow.svg";

interface EmptyPackProps {
  name: string;
  id: string | null; // Replace with the actual type of your ID
  handleAddCard: (id: string, question: string, answer: string) => void;
}

const EmptyPack: React.FC<EmptyPackProps> = ({ name, id, handleAddCard }) => (
  <div className="max-w-full px-[8rem] grow">
    <Link className="flex items-center mt-6 w-40" to="/cards">
      <img src={leftArrow} alt="" />
      <span className="align-left pl-2 text-sm leading-6">
        Back to Packs List
      </span>
    </Link>
    <div className="flex pt-6 text-xl font-semibold">{name}</div>
    <p className="pt-20 text-center text-sm font-medium opacity-50 mb-8">
      This pack is empty. Click add new card to fill this pack
    </p>
    <div className="flex justify-center">
      <button
        onClick={() => handleAddCard(id || '', 'html', 'is not a programming language')}
        className="bg-accent-blue hover:bg-blue-700 text-base
        text-center text-white shadow-btn-shadow
        rounded-3xl w-40 h-9"
      >
        Add new card
      </button>
    </div>
  </div>
);

export default EmptyPack;

import { Link } from "react-router-dom";

const Button: React.FC = (): React.JSX.Element => {
  return (
    <Link to="/login">
      <button
        className="bg-accent-blue hover:bg-blue-700 text-base
     text-center text-white shadow-btn-shadow
      rounded-3xl w-32 h-9"
      >
        Sign in
      </button>
    </Link>
  );
};

export default Button;

import { FC } from "react";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader"; // Import your Loader component
import StarComponent from "./StarComponent"; // Import your StarComponent
import LearnSvg from "../../../assets/learnCard.svg?react"; // Replace with the actual path to LearnSvg
import EditCard from "../../../assets/editCard.svg?react"; // Replace with the actual path to EditCard
import DeleteCard from "../../../assets/deleteCard.svg?react"; // Replace with the actual path to DeleteCard
import { CardPacks, CardsList, User } from "../../../app/types";

interface TableBodyProps {
  isLoading: boolean;
  error: string | null;
  cardsPacks?: CardPacks;
  cards?: CardsList;
  user?: User; // Replace with the actual type of your user object
  updatePack: (id: string, updateType: string, userId: string) => void;
  handleRemovePack: (id: string, userId: string) => void;
  changeDateFormat: (date: string) => string;
  updatingCard: (id: string, newQuestion: string, newAnswer: string) => void;
  removeCard: (id: string) => void;
}

const TableBody: FC<TableBodyProps> = ({
  isLoading,
  error,
  cardsPacks,
  cards,
  user,
  updatePack,
  handleRemovePack,
  changeDateFormat,
  updatingCard,
  removeCard,
}) => (
  <tbody className="text-[0.8125rem]">
    {isLoading ? (
      <tr>
        <td colSpan={5}>
          <Loader h="min-h-fit max-h-fit" />
        </td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan={5}>Some error {error}</td>
      </tr>
    ) : cardsPacks?.length === 0 ? (
      <tr>
        <td colSpan={5} className="text-lg p-4 font-medium text-center">
          No such card pack found
        </td>
      </tr>
    ) : cardsPacks ? (
      cardsPacks.map((card) => (
        <tr key={card._id} className="h-12">
          <td className="pl-9">
            <Link to={`/pack/${card?._id}`}>{card?.name}</Link>
          </td>
          <td>{card?.cardsCount}</td>
          <td>{changeDateFormat(card?.updated || "")}</td>
          <td>{card?.user_name}</td>
          <td className="relative w-20 mx-auto flex justify-between pt-4">
            <button className="">
              <LearnSvg className="stroke-black hover:stroke-red-500" />
            </button>
            <button
              onClick={() =>
                updatePack(card._id || "", "All update", user?._id || "")
              }
              className=""
            >
              {card?.user_id !== user?._id ? (
                ""
              ) : (
                <EditCard className="hover:fill-red-500 fill-black" />
              )}
            </button>
            <button
              onClick={() =>
                handleRemovePack(card._id || "", card.user_id || "")
              }
              className=""
            >
              {card?.user_id !== user?._id ? (
                ""
              ) : (
                <DeleteCard className="hover:fill-red-500" />
              )}
            </button>
          </td>
        </tr>
      ))
    ) : cards?.length === 0 ? (
      <tr>
        <td colSpan={5} className="text-lg p-4 font-medium text-center">
          No such card found
        </td>
      </tr>
    ) : cards ? (
      cards.map((card) => (
        <tr key={card?._id} className="h-12">
          <td className="pl-9">
            <Link to={`/pack/${card?._id}`}>{card?.question}</Link>
          </td>
          <td>{card?.answer}</td>
          <td>{changeDateFormat(card?.updated || "")}</td>
          <td>
            <div>
              <StarComponent rating={card?.grade || 0} />
            </div>
          </td>
          <td>
            <div className="flex w-20 justify-end flex space-x-3 items-center">
              {card?.user_id !== user?._id ? (
                ""
              ) : (
                <button
                  onClick={() =>
                    updatingCard(card?._id || "", "new question", "new answer")
                  }
                  className="w-4"
                >
                  <EditCard className="hover:fill-red-500 fill-black" />
                </button>
              )}
              {card?.user_id !== user?._id ? (
                ""
              ) : (
                <button
                  onClick={() => removeCard(card?._id || "")}
                  className="w-4"
                >
                  <DeleteCard className="hover:fill-red-500" />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))
    ) : (
      ""
    )}
  </tbody>
);

export default TableBody;

import LearnSvg from "../../../assets/learnCard.svg";
import EditCard from "../../../assets/editCard.svg";
import DeleteCard from "../../../assets/deleteCard.svg";
import Loader from "../../utils/Loader";
import Pagination from "./Pagination";
import { Action } from "@reduxjs/toolkit";
import { CardPacks } from "../../../app/types";

const Table: React.FC<{
  cards: CardPacks;
  page: number;
  pageCount: number;
  error: string;
  isLoading: boolean;
  cardPacksTotalCount: number;
  setPage: (page: number) => Action;
  setItemsPerPage: (pages: number) => Action;
}> = ({
  cards,
  page,
  pageCount,
  error,
  isLoading,
  cardPacksTotalCount,
  setPage,
  setItemsPerPage,
}) => {
  function changeDateFormat(date: string) {
    return new Date(date).toLocaleDateString("rus");
  }

  return (
    <>
      <table className="mt-6 text-sm not-italic w-full mb-9">
        <thead className="h-12">
          <tr className="bg-[#EFEFEF] text-justify font-medium">
            <th className="pl-9">Name</th>
            <th>Cards</th>
            <th>
              <div className="flex items-center justify-start">
                <div className="flex items-center cursor-pointer ">
                  Last Updated
                  <svg
                    width="10"
                    className="ml-1.5 self-middle"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 6L0.669872 0L9.33013 0L5 6Z" fill="black" />
                  </svg>
                </div>
              </div>
            </th>
            <th>Created by</th>
            <th className="pr-9">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[0.8125rem]">
          {error && (
            <tr>
              <td colSpan={5}>Some error</td>
            </tr>
          )}

          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <Loader h="min-h-fit max-h-fit" />
              </td>
            </tr>
          ) : (
            cards.map((card) => (
              <tr key={card._id} className="h-12">
                <td className="pl-9">{card.name}</td>
                <td>{card.cardsCount}</td>
                <td>{changeDateFormat(card.updated)}</td>
                <td>{card.user_name}</td>
                <td className="relative flex space-x-3 pt-4">
                  <button className="">
                    <img src={LearnSvg} alt="Learn svg icon" />
                  </button>
                  <button className="">
                    <img src={EditCard} alt="Edit svg icon" />
                  </button>
                  <button className="">
                    <img src={DeleteCard} alt="Delete svg icon" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        page={page}
        total={cardPacksTotalCount}
        itemsPerPage={pageCount}
        setPage={setPage}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default Table;

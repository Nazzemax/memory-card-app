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
  isSorting: string;
  setSorting: (fieldName: string) => Action;
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
  isSorting,
  setSorting,
}) => {
  function changeDateFormat(date: string) {
    return new Date(date).toLocaleDateString("rus");
  }

  const filterBy = async (fieldName: string) => {
    try {
      const newSortOrder = isSorting === `0${fieldName}` ? "1" : "0";
      const sortingParam = `${newSortOrder}${fieldName}`;

      setSorting(sortingParam);
    } catch (error) {
      // Handle the error, log it, or show an error message to the user
      console.error("Error while fetching cards:", error);
    }
  };

  return (
    <>
      <table className="mt-6 text-sm not-italic w-full mb-9 table-auto">
        <thead className="h-12">
          <tr className="bg-[#EFEFEF] text-justify font-medium">
            <th className="pl-9 cursor-pointer">
              <button disabled={isLoading} onClick={() => filterBy("name")}>
                Name
              </button>
            </th>
            <th className="cursor-pointer">
              <button
                disabled={isLoading}
                onClick={() => filterBy("cardsCount")}
              >
                Cards
              </button>
            </th>
            <th>
              <div className="flex items-center justify-start">
                <div className="flex items-center cursor-pointer ">
                  <button
                    disabled={isLoading}
                    onClick={() => filterBy("updated")}
                  >
                    Last Updated
                  </button>
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
            <th className="pr-9 pl-6 text-center">Actions</th>
          </tr>
        </thead>
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
          ) : cards.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-lg p-4 font-medium text-center">
                No such card pack found
              </td>
            </tr>
          ) : (
            cards.map((card) => (
              <tr key={card._id} className="h-12">
                <td className="pl-9">{card.name}</td>
                <td>{card.cardsCount}</td>
                <td>{changeDateFormat(card.updated)}</td>
                <td>{card.user_name}</td>
                <td className="relative flex justify-end pr-9 space-x-3 pt-4">
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
        isLoading={isLoading}
      />
    </>
  );
};

export default Table;

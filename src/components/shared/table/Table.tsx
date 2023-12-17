import Pagination from "./Pagination";
import { Action } from "@reduxjs/toolkit";
import { CardPacks, CardsList } from "../../../app/types";
import { useAppSelector } from "../../../app/hooks/hooks";
import { changeDateFormat } from "../../utils/FormatDate";
import React from "react";
import { useActions } from "../../../app/hooks/useActions";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table: React.FC<{
  cardsPacks?: CardPacks;
  cardsPack_id?:string;
  cards?:CardsList;
  page: number;
  pageCount: number;
  error: string;
  isLoading: boolean;
  cardPacksTotalCount?: number;
  cardsTotalCount?:number;
  isSorting: string;
  setSorting: (fieldName: string) => Action;
  setPage: (page: number) => Action;
  setItemsPerPage: (pages: number) => Action;
  toggleState?:string;
}> = ({
  cardsPacks,
  cardsPack_id,
  cards,
  page,
  cardsTotalCount,
  pageCount,
  error,
  isLoading,
  cardPacksTotalCount,
  setPage,
  setItemsPerPage,
  isSorting,
  setSorting,
  toggleState,
}) => {
  const { user } = useAppSelector((state) => state.auth.user)

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

  const {
    cardQuestion,
    isSorted,
    minGrade,
    maxGrade
  } = useAppSelector((state) => state.cards);

  const { deleteCardPack, getPackCards, updateCardPack, getCard, updateCard, deleteCard } = useActions()

  const handleRemovePack = (_id:string, user:string) => {
    deleteCardPack(_id)
    if(toggleState === 'My') {
      getPackCards({user_id:user})
    } else if (toggleState === 'All') {
      getPackCards({})
    }
  }

  const updatePack = async (id:string, name:string, user:string) => {
      await updateCardPack({_id:id, name})
    if(toggleState === 'My') {
      await getPackCards({user_id:user})
    } else if (toggleState === 'All') {
      await getPackCards(
        {
          page,
          pageCount,
        }
      )
    }
  }

const removeCard = (id: string) => {
    deleteCard(id);
if(cardsTotalCount && cards) {
  if (cardsTotalCount > 0 && cards.length > 0) {
    getCard({
      cardsPack_id: cardsPack_id,
      cardQuestion,
      pageCount,
      page,
      min: minGrade,
      max: maxGrade,
      sortCards: isSorted,
    })
  }
}
};

  const updatingCard = async (id:string, question:string, answer:string) => {
    await updateCard({_id: id, question, answer})

    await getCard({
      cardsPack_id: cardsPack_id,
      cardQuestion,
      pageCount,
      page,
      min: minGrade,
      max: maxGrade,
      sortCards: isSorted,
    })
  
 }

  return (
    <>
      <table className="mt-6 text-sm not-italic w-full mb-9 table-auto">
        <thead className="h-12">
         <TableHeader cardsPacks={cardsPacks || ''} filterBy={filterBy} isLoading={isLoading} />
  
        </thead>
        <TableBody
          cardsPacks={cardsPacks} 
          cards={cards}
          isLoading={isLoading}
          error={error} 
          handleRemovePack={handleRemovePack}
          updatePack={updatePack}
          removeCard={removeCard}
          user={user}
          changeDateFormat={changeDateFormat}
          updatingCard={updatingCard} />
      </table>

      <Pagination
        page={page}
        total={cardPacksTotalCount || cardsTotalCount || 0}
        itemsPerPage={pageCount}
        setPage={setPage}
        setItemsPerPage={setItemsPerPage}
        isLoading={isLoading}
      />
    </>
  );
};

export default Table;

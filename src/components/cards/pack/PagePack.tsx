import { Link, useParams } from "react-router-dom";
import leftArrow from "../../../assets/leftArrow.svg";
import { useAppSelector } from "../../../app/hooks/hooks";
import { useActions } from "../../../app/hooks/useActions";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../../utils/Loader";
import SearchInput from "../search/SearchInput";
import { debounce } from "lodash";
import Table from "../../shared/table/Table";
import EmptyPack from "./EmptyPack";
import Learn from "../../../assets/learnCard.svg?react";
import Edit from "../../../assets/editCard.svg?react";
import Delete from "../../../assets/deleteCard.svg?react";

const PagePack = () => {
  const [searchText, setSearchText] = useState<string>("");
  const {
    setQuestionName,
    getCard,
    setPage,
    setItemsPerPage,
    setSorting,
    addCard,
  } = useActions();
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    cards,
    cardPacks,
    isLoading,
    cardQuestion,
    page,
    pageCount,
    error,
    isSorted,
    cardsTotalCount,
    minGrade,
    maxGrade,
    name,
  } = useAppSelector((state) => state.cards);

  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => {
      setQuestionName(query);
    }, 500),
    [setQuestionName, debounce]
  );

  useEffect(() => {
    getCard({
      cardsPack_id: id,
      cardQuestion,
      pageCount,
      page,
      min: minGrade,
      max: maxGrade,
      sortCards: isSorted,
    });
  }, [
    id,
    getCard,
    cardQuestion,
    page,
    pageCount,
    minGrade,
    maxGrade,
    isSorted,
  ]);

  useEffect(() => {
    if (searchText) {
      setSearchPerformed(true); // Set searchPerformed to true when searching
      debouncedSearch(searchText);
    } else if (searchText === "" && searchPerformed) {
      setQuestionName("");
      setSearchPerformed(false);
    }

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [
    searchText,
    debouncedSearch,
    cardQuestion,
    getCard,
    id,
    searchPerformed,
    setQuestionName,
  ]);

  const handleAddCard = (card_id: string, question: string, answer: string) => {
    addCard({ cardsPack_id: card_id, question, answer });
    getCard({
      cardsPack_id: id,
      cardQuestion,
      pageCount,
      page,
      min: minGrade,
      max: maxGrade,
      sortCards: isSorted,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader h="h-screen" />
      ) : !searchPerformed && cardsTotalCount === 0 ? (
        <EmptyPack
          name={name || ""}
          id={id || ""}
          handleAddCard={handleAddCard}
        />
      ) : (
        <div className=" px-[8rem]">
          <Link className="flex items-center mt-6 w-40" to="/cards">
            <img src={leftArrow} alt="" />
            <span className="align-left pl-2 text-sm leading-6">
              Back to Packs List
            </span>
          </Link>
          <div className="flex justify-between mb-7">
            <div className=" pt-[1.6rem] text-xl font-semibold">
              {user.user._id !== cardPacks[0].user_id ? (
                "Friend's pack"
              ) : (
                <div className="flex space-x-1 items-center">
                  <span>My Pack</span>

                  {isEditing ? (
                    <>
                      <div ref={tooltipRef} className="relative">
                        <div
                          onClick={() => setIsEditing(false)}
                          className="cursor-pointer relative bg-white w-6 h-6 text-white rounded-full border-[#0D0C0B] border-2"
                        >
                          <div className="absolute text-[#0D0C0B] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 text-[15px] leading-[3px]">
                            •••
                          </div>
                        </div>
                        <div className="flex flex-col absolute z-10 right-0 top-7">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9d232688d0e9668ed53a7bba1e48ab20c99290847a53b5bc54bb61252b9470a?apiKey=38999e2c159c4a31b1c36e16ffb5fa01&"
                            className="aspect-[0.85] object-contain object-center w-full fill-white stroke-[1px] stroke-stone-300 overflow-hidden min-w-[117px] max-w-[117px]"
                          />
                          <div className="absolute w-full flex items-center flex-col">
                            <Link
                              to="/profile"
                              className="z-20 pt-5 stroke-black-50 pr-4 hover:stroke-red-500 hover:text-red-500 cursor-pointer flex justify-between items-center"
                            >
                              <Edit className="fill-black w-6 h-6" />
                              <div className="w-11 text-sm pl-3.5">Edit</div>
                            </Link>
                            <Link
                              to="/profile"
                              className="z-20 pr-4 pt-4 hover:stroke-red-500 hover:text-red-500 cursor-pointer  flex justify-between items-center"
                            >
                              <Delete className="fill-black w-6 h-6" />
                              <div className="w-11 text-sm pl-3.5">Delete</div>
                            </Link>
                            <Link
                              to="/profile"
                              className="z-20 pr-4 pt-4 stroke-black hover:stroke-red-500 hover:text-red-500 cursor-pointer flex justify-between items-center"
                            >
                              <Learn className="w-6 h-6" />
                              <div className="w-11 text-sm pl-3.5">Learn</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      onClick={() => setIsEditing(true)}
                      className=" cursor-pointer relative bg-white w-6 h-6 text-white rounded-full "
                    >
                      <div className="absolute text-[#0D0C0B] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 text-[15px] leading-[3px]">
                        •••
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link className="mt-6" to="">
              <button
                className="bg-accent-blue hover:bg-blue-700 text-base
            text-center text-white shadow-btn-shadow
              rounded-3xl w-40 h-9"
              >
                {user._id !== cardPacks[0].user_id
                  ? "Learn pack"
                  : "Add new pack"}
              </button>
            </Link>
          </div>
          <SearchInput
            searchText={searchText}
            debouncedSearch={(e) =>
              setSearchText((e.target as HTMLInputElement).value)
            }
            isLoading={isLoading}
          />

          <Table
            cardsPack_id={id}
            isLoading={isLoading}
            cardsTotalCount={cardsTotalCount}
            cards={cards}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            setItemsPerPage={setItemsPerPage}
            error={error || ""}
            isSorting={isSorted || ""}
            setSorting={setSorting}
          />
        </div>
      )}
    </>
  );
};

export default PagePack;

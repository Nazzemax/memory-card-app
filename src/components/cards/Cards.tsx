import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks/hooks";
import { useActions } from "../../app/hooks/useActions";
import SearchInput from "./search/SearchInput";
import Slider from "./search/Slider";
import Table from "../shared/table/Table";
import filterSvg from "../../assets/filter.svg";
import { Link } from "react-router-dom";

const Cards = () => {
  const [searchText, setSearchText] = useState("");
  const [toggleState, setToggleState] = useState("My");

  const {
    cardPacks,
    minCardsCount,
    maxCardsCount,
    error,
    isLoading,
    page,
    pageCount,
    cardPacksTotalCount,
  } = useAppSelector((state) => state.cards);

  const [sliderValues, setSliderValues] = useState([
    minCardsCount,
    maxCardsCount,
  ]);

  const { getCards, setPage, setItemsPerPage, setMaxCards, setMinCards } =
    useActions();

  useEffect(() => {
    getCards({
      min: minCardsCount,
      max: maxCardsCount,
      page: page,
      pageCount: pageCount,
    });
  }, [minCardsCount, maxCardsCount, page, pageCount, getCards]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleToggleChange = () => {
    setToggleState(toggleState === "My" ? "All" : "My");
  };

  const handleSliderChange = (values: number[]) => {
    setMinCards(values[0]);
    setMaxCards(values[1]);
    setSliderValues(values);
  };

  return (
    <>
      <div className="w-screen ml-[8.5rem] mr-[8.5rem] mt-10 ">
        <div className="flex max-w-full justify-between mb-10">
          <h2 className="font-semibold text-xl">Packs list</h2>
          <Link to=''>
            <button className="bg-accent-blue hover:bg-blue-700 text-base
     text-center text-white shadow-btn-shadow
      rounded-3xl w-40 h-9">
                Add new pack
            </button>
          </Link>
        </div>
        <div className="mb-9">
          <div className="flex items-start md:flex-wrap sm:flex-wrap lg:flex-wrap xl:flex-wrap">
            <SearchInput
              searchText={searchText}
              onChange={handleSearchChange}
            />

            <div className="flex flex-col mr-12 shrink-0">
              <label className="text-sm font-medium pb-2">
                Show packs cards
              </label>
              <div className="buttons">
                <button
                  onClick={handleToggleChange}
                  className={`p-2 ${
                    toggleState === "My" ? "bg-blue-500" : "bg-gray-200"
                  } w-24`}
                >
                  My
                </button>
                <button
                  onClick={handleToggleChange}
                  className={`p-2 ${
                    toggleState === "All" ? "bg-blue-500" : "bg-gray-200"
                  } w-24`}
                >
                  All
                </button>
              </div>
            </div>

            <Slider
              min={sliderValues[0]}
              max={sliderValues[1]}
              onSliderChange={handleSliderChange}
            />

            <button className="border-2 border-gray-200 p-2 mt-[1.7rem] ml-9 shrink-0">
              <img src={filterSvg} alt="Reset/Apply" />
            </button>

            <Table
              cardPacksTotalCount={cardPacksTotalCount}
              setPage={setPage}
              setItemsPerPage={setItemsPerPage}
              isLoading={isLoading}
              error={error || ""}
              cards={cardPacks}
              page={page}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;

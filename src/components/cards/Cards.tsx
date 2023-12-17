import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks/hooks";
import { useActions } from "../../app/hooks/useActions";
import SearchInput from "./search/SearchInput";
import Slider from "./search/Slider";
import Table from "../shared/table/Table";
import filterSvg from "../../assets/filter.svg";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const Cards = () => {
  const {
    cardPacks,
    minCardsCount,
    maxCardsCount,
    error,
    isLoading,
    page,
    pageCount,
    cardPacksTotalCount,
    packName,
    isSorted,
    toggleState,
    id
  } = useAppSelector((state) => state.cards);

  const { user } = useAppSelector((state) => state.auth.user);

  const [sliderValues, setSliderValues] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);

  const {
    getPackCards,
    setPage,
    setItemsPerPage,
    setMaxCards,
    setMinCards,
    setPackName,
    setSorting,
    addCardPack,
    setToggleState,
    setUserId
  } = useActions();

  const [searchText, setSearchText] = useState<string>("");


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => {
      setPackName(query);
    }, 500),
    [setPackName, debounce]
  );

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    } else {
      debouncedSearch("");
    }

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, debouncedSearch]);

  useEffect(() => {
    getPackCards({
      user_id: id,
      packName: packName,
      min: minCardsCount,
      max: maxCardsCount,
      page: page,
      pageCount: pageCount,
      sortPacks: isSorted,
    });
  }, [
    id,
    minCardsCount,
    maxCardsCount,
    page,
    pageCount,
    getPackCards,
    packName,
    isSorted,
  ]);

  const handleSliderChange = (values: number[]) => {
    setMinCards(values[0]);
    setMaxCards(values[1]);
    setSliderValues(values);
  };

  const handleReset = () => {
    setMinCards(2);
    setMaxCards(10);
    setSliderValues([2, 10]);
    setToggleState("All");
    setSearchText("");
    setSorting("");
  };

  const handleAddPack = async (id: string) => {
    try {
      await addCardPack({ name: 'Bossero' });
  
      if (toggleState === 'My') {
        await getPackCards({
          user_id: id,
          min: minCardsCount,
          max: maxCardsCount,
          page: page,
          pageCount: pageCount,
          sortPacks: isSorted,
        });
      } else if (toggleState === 'All') {
        await getPackCards({
          min: minCardsCount,
          max: maxCardsCount,
          page: page,
          pageCount: pageCount,
          sortPacks: isSorted,
        });
      }
  
      // Continue with any additional logic after fetching pack cards
    } catch (error) {
      // Handle errors from adding card pack or fetching pack cards
      console.error('Error:', error);
    }
  };
  
  

  return (
    <>
      <div className="flex ml-[8rem] mr-[8rem] mt-10 justify-between mb-10">
        <h2 className="font-semibold text-xl">Packs list</h2>
        <Link to="">
          <button
          onClick={() => handleAddPack(user._id || '')}
            className="bg-accent-blue hover:bg-blue-700 text-base
     text-center text-white shadow-btn-shadow
      rounded-3xl w-40 h-9"
          >
            Add new pack
          </button>
        </Link>
      </div>
      <div className="mb-9 ml-[8rem] mr-[8rem]">
        <div className="flex items-start md:flex-wrap sm:flex-wrap lg:flex-wrap xl:flex-wrap">
          <SearchInput
            searchText={searchText}
            debouncedSearch={(e) =>
              setSearchText((e.target as HTMLInputElement).value)
            }
            isLoading={isLoading}
          />

          <div className="md:ml-6 lg:ml-6 flex flex-col mr-12 shrink-0">
            <label className="text-sm font-medium pb-2">Show packs cards</label>
            <div className="buttons">
              <button
                disabled={isLoading}
                onClick={() => {
                 setUserId(user._id)
                 setToggleState("My");
                }}
                className={`p-2 ${
                  toggleState === "My" ? "bg-blue-500" : "bg-gray-200"
                } w-24`}
              >
                My
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  setUserId('')
                  setToggleState("All");
                }}
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
            isLoading={isLoading}
          />

          <button
            onClick={handleReset}
            className="border-2 border-gray-200 p-2 mt-[1.7rem] ml-9 shrink-0"
          >
            <img src={filterSvg} alt="Reset all" />
          </button>

          <Table
            toggleState={toggleState}
            cardPacksTotalCount={cardPacksTotalCount}
            setPage={setPage}
            isSorting={isSorted || ""}
            setSorting={setSorting}
            setItemsPerPage={setItemsPerPage}
            isLoading={isLoading}
            error={error || ""}
            cardsPacks={cardPacks}
            page={page}
            pageCount={pageCount}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;

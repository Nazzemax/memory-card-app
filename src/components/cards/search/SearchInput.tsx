import searchIcon from '../../../assets/searchIcon.svg'

const SearchInput:React.FC<{
    searchText:string;
     debouncedSearch:(e:React.ChangeEvent<HTMLElement>) => void
     isLoading:boolean
    }> = ({searchText, debouncedSearch, isLoading}) => {

  return (
    <label className='flex-1 relative flex flex-col justify-center text-sm font-medium' htmlFor="search">Search       
    <input
      type="search"
      id='search'
      placeholder="Provide your text"
      value={searchText}
      onChange={debouncedSearch}
      disabled={isLoading}
      className="border-2 outline-none border-gray-200 p-2 pl-10 min-w-min max-w-full mt-2 md:mr-6 lg:mr-6"
    />
    <img className='absolute bottom-3 left-5 w-4 h-4' src={searchIcon} alt="Search icon" />
      </label>
  )
}

export default SearchInput
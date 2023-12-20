import { FC } from 'react'
import { CardPacks } from '../../../app/types';

interface TableProps {
    cardsPacks: CardPacks | '';
    isLoading: boolean;
    filterBy: (type: string) => void;
  }

  const TableHeader: FC<TableProps> = ({ cardsPacks, isLoading, filterBy }) => (
    <tr className="bg-[#EFEFEF] text-justify font-medium">
      <th className="pl-9 cursor-pointer">
        <button disabled={isLoading} onClick={() => filterBy(cardsPacks ? 'name' : 'question')}>
          {cardsPacks ? 'Name' : 'Question'}
        </button>
      </th>
      <th className="cursor-pointer">
        <button
          disabled={isLoading}
          onClick={() => filterBy(cardsPacks ? 'cardsCount' : 'answer')}
        >
          {cardsPacks ? 'Cards' : 'Answer'}
        </button>
      </th>
      <th>
        <div className="flex w-32 items-center justify-start">
          <div className="flex items-center cursor-pointer ">
            <button disabled={isLoading} onClick={() => filterBy('updated')}>
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
      <th>{cardsPacks ? 'Created by' : 'Grade'}</th>
      {cardsPacks ? <th className="pr-9 pl-4 text-center">Actions</th> : <th className="pr-9 pl-4 text-center"></th> }
    </tr>
  );
  
  export default TableHeader;
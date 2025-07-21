"use-client";
import { createQueryString } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

interface SearchBarProps {
  searchParams: any;
}

const SearchBar: React.FC<SearchBarProps> =({
    searchParams
  }) => {
  const router = useRouter();
  const path = usePathname();
  const [searchItem, setSearchItem] = useState<string>("");

    const handleSearch = () => {
        const query = createQueryString({
            ...searchParams,
            search: searchItem,
          });
          router.push(`${path}${query}`);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event.target.value);
    }

    const handleClearSearch = () => {
      const query = createQueryString({
        ...searchParams,
        search: "", 
      });
      router.push(`${path}${query}`);
      setSearchItem(""); 
    }
      
  return (
    <div className="flex items-center justify-end relative w-full">
    <input
      type="text"
      placeholder="Search..."
      className="searchInput text-xsmall --font-poppins"
      value={searchItem}
      onChange={handleChange}
    />
    <FiSearch className="absolute text-xmedium right-[10px] cursor-pointer text-[#5e5e5e]" onClick={handleSearch}/>
    {searchItem && <IoMdClose className='absolute text-medium right-[35px] cursor-pointer text-[#000]' onClick={handleClearSearch} />}
  </div>
  )
}

export default SearchBar
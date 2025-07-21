import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Select from "react-select";

interface CommonReactSelectInterface {
  isMulti?: boolean;
  list?: { label: string; value: string }[];
  placeholder: string;
  value?: string[] | string;
  onSelectChange?: (e: any) => void;
  isSearchable?: Boolean;
  minMenuListHeight?: number;
  maxMenuListHeight?: number;
  onFocus?: () => void;
  isPlanStyle?: boolean;
  isFilterDropdown?: boolean;
  isDisabled?: boolean,
}

const CommonReactSelect: React.FC<CommonReactSelectInterface> = ({
  isMulti = false,
  list = [],
  value,
  placeholder = "Select Options",
  onSelectChange,
  isSearchable = true,
  minMenuListHeight = 230,
  maxMenuListHeight = 230,
  isPlanStyle = false,
  onFocus,
  isFilterDropdown = false,
  isDisabled = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!isMulti) {
      const foundOption = list.find((item) => item.value === value);
      if (foundOption) {
        setSelectedOptions([foundOption]);
      } else {
        setSelectedOptions([]);
      }
    } else {
      let initialSelectedOptions =
        list.filter((option) => value?.includes(option.value)) || [];
      setSelectedOptions(initialSelectedOptions);
    }
  }, [value, isMulti, list]);

  const handleChange = (selectedValue: any) => {
    if (isMulti) {
      // Toggle selection for multi-select
      const isAlreadySelected = selectedOptions.some(
        (option) => option.value === selectedValue.value
      );

      if (isAlreadySelected) {
        // If already selected, remove from the selection
        const newSelectedOptions = selectedOptions.filter(
          (option) => option.value !== selectedValue.value
        );
        let selectedValueStrings = newSelectedOptions.map(
          (option) => option.value
        );
        onSelectChange?.(selectedValueStrings);
        setSelectedOptions(newSelectedOptions);
      } else {
        // If not selected, add to the selection
        const newSelectedOptions = [...selectedOptions, selectedValue];
        let selectedValueStrings = newSelectedOptions.map(
          (option) => option.value
        );
        onSelectChange?.(selectedValueStrings);
        setSelectedOptions(newSelectedOptions);
      }
    } else {
      setSelectedOptions([selectedValue]);
      onSelectChange?.(selectedValue.value);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (!isSearchable && event.key === "Tab") {
    console.log("tab")
    event.preventDefault();
  }
	if (event.key === "ArrowDown") {
	  event.preventDefault();
	  setFocusedOptionIndex((prevIndex) =>
		prevIndex === null ? 0 : Math.min(prevIndex + 1, list.length - 1)
	  );
	} else if (event.key === "ArrowUp") {
	  event.preventDefault();
	  setFocusedOptionIndex((prevIndex) =>
		prevIndex === null ? list.length - 1 : Math.max(prevIndex - 1, 0)
	  );
	} else if (event.key === "Enter" && focusedOptionIndex !== null) {
	  event.preventDefault();
	  handleChange(list[focusedOptionIndex]);
	}
  };

  const CustomOption = ({
    label,
    innerProps,
    options,
  }: {
    label: any;
    innerProps: any;
    options: any;
  }) => {
    const selectedOption = selectedOptions?.find(
      (option) => option.label === label
    );
  const findIndex = options?.findIndex((item: any) =>  item?.label === label)
    
    return (
      <div
        {...innerProps}
        className={`flex items-center px-2 py-1 text-xsmall --fonts-poppins hover:bg-[#F1F5F9] cursor-pointer ${
          findIndex === focusedOptionIndex && "bg-[#F1F5F9]"
        } ${selectedOption && "bg-[#F1F5F9]"}`}
      >
        <div className="w-[25px] max-w-[25px] flex-1 mr-0.5">
          {selectedOption && <FaCheck className="mt-[1px]" />}
        </div>
        <p className="max-w-full text-xsmall text-left --fonts-poppins flex-1 break-words cursor-pointer font-normal w-[70%]">
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="custom-react-combbox --fonts-poppins">
      {/* {list.length ? ( */}
      <Select
        onFocus={onFocus}
        onKeyDown={(e: any) => handleKeyDown(e)}
        isSearchable={isSearchable as boolean}
        placeholder={
          isFilterDropdown ? (
            <div className="flex items-center">
              {placeholder}
              {selectedOptions.length ? (
                <div className="w-2 ml-2 h-2 bg-blue rounded-full" />
              ) : null}
            </div>
          ) : isMulti && selectedOptions.length > 1 ? (
            "Multiple"
          ) : (
            selectedOptions?.[0]?.label || placeholder
          )
        }
        classNamePrefix={`${
          isPlanStyle ? "plane-mutliSelect" : "style-multiSelector"
        }`}
        menuPlacement="auto"
        maxMenuHeight={minMenuListHeight}
        minMenuHeight={maxMenuListHeight}
        isDisabled={isDisabled}
        components={{
          Option: (props: any) => {
            return (
              <CustomOption
                {...props}
              />
            );
          },
          NoOptionsMessage: () => (
            <p className="flex items-center justify-center p-2 text-xsmall --fonts-poppins mobileMax:text-[13.5px]">
              No Data Found
            </p>
          ),
        }}
        options={list}
        onChange={handleChange}
        isMulti={false}
        isClearable={false}
        formatOptionLabel={(data) => {
          if (isFilterDropdown) {
            return (
              <div className="flex items-center uppercase !text-xsmall">
                {placeholder}
                {selectedOptions.length ? (
                  <div className="w-2 ml-2 h-2 bg-blue rounded-full" />
                ) : null}
              </div>
            );
          }
          return isMulti && selectedOptions.length > 1
            ? "Multiple"
            : selectedOptions?.[0]?.label || placeholder;
        }}
      />
      {/* ) : null} */}
    </div>
  );
};

export default CommonReactSelect;

"use client";
import { DrupalNode } from "next-drupal";
import React from "react";

interface CustomRadioButtonProps {
  data: DrupalNode[];
  onChange: (key: string, value: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  data,
  onChange,
}) => {
  return (
    <>
      {data.map((option: DrupalNode, index: number) => (
        <label key={index} className="custom-radio mb-8 mobileMax:mb-5">
          <input
            type="radio"
            name="donut"
            onChange={(e) =>
              onChange(option.field_form_field_key_name, option.title)
            }
          />
          <span className="checkmark"></span>
          <div className="donut ml-3 text-white text-midSmall --font-poppins mobileMax:text-xsmall mobileMax:leading-normal">
            {option.title}
          </div>
        </label>
      ))}
    </>
  );
};

export default CustomRadioButton;

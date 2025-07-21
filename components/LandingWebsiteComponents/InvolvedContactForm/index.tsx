"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DrupalNode } from "next-drupal";
import CommonReactSelect from "@/components/CommonReactSelect";

interface InvolvedContactFormProps {
  data: DrupalNode[];
  onChange: (key: string, value: string) => void;
}

const InvolvedContactForm: React.FC<InvolvedContactFormProps> = ({
  data,
  onChange,
}) => {
  const [selectorValues, setSelectorValues] = useState<any>({});
  const buildSelectList = (Element: DrupalNode) => {
    let selectList: { label: string; value: string }[] = [];
    if (Element.field_form_field_type === "select") {
      selectList = JSON.parse(Element.field_form_extra_field).map(
        (countryElement: { text: string; value: string }) => {
          return {
            value: countryElement.text,
            label: countryElement.text,
          };
        }
      );
    }
    return selectList;
  };
  return (
    <>
      <form className="involved-form-field">
        <p className="text-[27px] mb-[35px] text-white text-left font-semibold --font-poppins leading-10 mobileMax:text-medium mobileMax:leading-7 mobileMax:text-medium mobileMax:mb-5">
          Point of Contact
        </p>
        {data?.map((formElement: DrupalNode, index: number) => {
          const selectList: { label: string; value: string }[] =
            buildSelectList(formElement);

          return (
            <>
              {formElement.field_form_field_type === "select" ? (
                <div key={index} className="mb-4">
                  <Label className="label-text-size mb-2 text-white text-left font-semibold --font-poppins leading-10">
                    {formElement.title}
                    {formElement?.field_form_required_status ? (
                      <span className="ml-1 text-[#ff0000]">*</span>
                    ) : null}
                  </Label>
                  <CommonReactSelect
                    placeholder="Please select..."
                    list={selectList}
                    value={
                      selectorValues[formElement.field_form_field_key_name]
                    }
                    onSelectChange={(value) => {
                      onChange(formElement.field_form_field_key_name, value);
                      setSelectorValues({
                        ...selectorValues,
                        [formElement.field_form_field_key_name]: value,
                      });
                    }}
                    // isMulti
                    isSearchable={false}
                    // minMenuListHeight={230}
                    // maxMenuListHeight={230}
                  />
                </div>
              ) : (
                <div key={index} className="mb-4">
                  <Label className="label-text-size mb-2 text-white text-left font-semibold --font-poppins leading-10">
                    {formElement.title}
                    {formElement?.field_form_required_status ? (
                      <span className="ml-1 text-[#ff0000]">*</span>
                    ) : null}
                  </Label>
                  <Input
                    type={formElement.field_form_field_type}
                    placeholder={formElement.field_field_placeholder}
                    className="p-[15px] bg-transparent min-h-[60px] label-text-size mb-2 text-white text-left --font-poppins leading-10"
                    onChange={(e) =>
                      onChange(
                        formElement.field_form_field_key_name,
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </>
          );
        })}
      </form>
    </>
  );
};

export default InvolvedContactForm;

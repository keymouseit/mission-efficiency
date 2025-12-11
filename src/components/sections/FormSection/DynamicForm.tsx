"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Label } from "@radix-ui/react-menubar";
import { useForm } from "react-hook-form";
import { RiLoader4Line } from "react-icons/ri";
import CustomSelect from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { saveContactUsForm } from "@/services/api";
import { DrupalNode } from "next-drupal";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";

interface DynamicFormProps {
  formFields?: DrupalNode[];
  afterFormSubmission?: () => void;
  isTaskforce?: boolean;
}

type FormField = {
  id: string;
  field_label: string;
  field_type: string;
  field_required: boolean;
  drupal_internal__id: number;
};

type FormValues = {
  [key: string]: string;
};

const COUNTRIES_LIST = "/static/maps/countries.geo.json";

const genderOptions = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary / Other", value: "Non-binary/other" },
  { label: "Not Declared", value: "Not Declared" },
];

const organizationTypeOptions = [
  { label: "Select Organization Type", value: "" },
  { label: "Academic Institutions", value: "Academic Institutions" },
  {
    label: "Civil Society Organization",
    value: "Civil Society Organization",
  },
  {
    label: "International Organization",
    value: "International Organization",
  },
  { label: "Government", value: "Government" },
  {
    label: "Multilateral Development Bank",
    value: "Multilateral Development Bank",
  },
  { label: "Philanthropy", value: "Philanthropy" },
  { label: "Private Sector", value: "Private Sector" },
  { label: "United Nation System", value: "United Nation System" },
  { label: "Other", value: "Other" },
];

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields = [],
  afterFormSubmission,
  isTaskforce,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<
    Array<{ label: string; value: string }>
  >([{ label: "Select Country", value: "" }]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {},
  });

  // Load countries from GeoJSON
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_LIST);
        const geoData = await response.json();

        const countries = geoData.features
          .filter((feature: any) => feature?.properties?.name)
          .map((feature: any) => ({
            label: feature.properties.name,
            value: feature.properties.name,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));

        setCountryOptions([
          { label: "Select Country", value: "" },
          ...countries,
        ]);
      } catch (error) {
        setCountryOptions([
          { label: "Select Country", value: "" },
          { label: "India", value: "India" },
          { label: "United States", value: "United States" },
          { label: "Kenya", value: "Kenya" },
          { label: "Ghana", value: "Ghana" },
        ]);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (formFields && formFields.length > 0) {
      const processedFields = formFields.map((field) => ({
        id: field.id,
        field_label: field.field_label,
        field_type: field.field_type,
        field_required: field.field_required,
        drupal_internal__id: field.drupal_internal__id,
      }));
      setFields(processedFields);
    }
  }, [formFields]);

  const onSubmit = async (data: FormValues) => {
    if (!termsChecked) {
      return;
    }

    setIsLoading(true);
    try {
      await saveContactUsForm({
        webformId: isTaskforce
          ? "join_the_global_effort"
          : "demand_flexibility_contact_form",
        ...data,
      });
      reset();
      setTermsChecked(false);
      if (afterFormSubmission) {
        afterFormSubmission();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldName = (label: string) => {
    return label.toLowerCase()?.replace(/\s+/g, "_");
  };

  // Check if all required fields are filled
  const allRequiredFieldsFilled = () => {
    const formValues = watch();
    return fields.every((field) => {
      if (!field.field_required) return true;
      const fieldName = getFieldName(field.field_label);
      const value = formValues[fieldName];
      return value && value.trim() !== "";
    });
  };

  const isSubmitDisabled =
    isLoading ||
    fields.length === 0 ||
    !termsChecked ||
    !allRequiredFieldsFilled();

  const renderField = (field: FormField) => {
    const fieldName = getFieldName(field?.field_label);
    const isRequired = field.field_required;
    const error = errors[fieldName]?.message as string;

    const commonInputClasses =
      "px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border-[#EAEAEA] rounded-[10px] shadow-[0px_5px_15px_0px_rgba(234,234,234,0.8)] z-50 bg-white";

    const registerOptions = {
      required: isRequired ? `${field.field_label} is required` : false,
      ...(field.field_type === "email" && {
        pattern: {
          value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
          message: "Enter a valid email",
        },
      }),
    };

    switch (field.field_type) {
      case "text":
        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left mb-[9.79px] text-black">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="text"
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              className={commonInputClasses}
              {...register(fieldName, registerOptions)}
            />
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );

      case "email":
        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left mb-[9.79px] text-black">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="email"
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              className={commonInputClasses}
              {...register(fieldName, registerOptions)}
            />
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left mb-[9.79px] text-black">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              className={commonInputClasses}
              {...register(fieldName, registerOptions)}
            />
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );

      case "text_area":
        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left text-black mb-[9.79px]">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <textarea
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              className="w-full px-[21px] py-[16px] border border-[#EAEAEA] rounded-[10px] min-h-[150px] bg-transparent text-[15px] mb-[10px] text-[#424242] shadow-[0px_5px_15px_0px_rgba(234,234,234,0.8)] focus:outline-none bg-white"
              {...register(fieldName, registerOptions)}
            />
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );

      case "select":
        // Determine which options list to use based on field name
        let selectOptions = [{ label: "Select", value: "" }];
        if (fieldName === "country") {
          selectOptions = countryOptions;
        } else if (fieldName === "gender") {
          selectOptions = genderOptions;
        } else if (
          fieldName === "type_of_organization" ||
          fieldName === "organization_type"
        ) {
          selectOptions = organizationTypeOptions;
        }

        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left mb-[9.79px] text-black">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <CustomSelect
              placeholder="Select"
              list={selectOptions}
              isPlanStyle={true}
              onSelectChange={(value) =>
                setValue(fieldName, value, { shouldValidate: true })
              }
              value={watch(fieldName) || ""}
              minMenuListHeight={112}
              maxMenuListHeight={160}
              isContact={true}
            />
            {isRequired && !watch(fieldName) && (
              <input
                type="hidden"
                {...register(fieldName, {
                  required: `${field.field_label} is required`,
                })}
              />
            )}
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id} className="mb-[14.79px]">
            <Label className="!text-[17px] text-left mb-[9.79px] text-black">
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="text"
              placeholder={`Enter ${field.field_label.toLowerCase()}`}
              className={commonInputClasses}
              {...register(fieldName, registerOptions)}
            />
            {error && (
              <p className="text-red-500 ml-1 mt-1 text-left text-[13px] leading-normal m-0">
                {error}
              </p>
            )}
          </div>
        );
    }
  };

  const renderFieldsInGrid = () => {
    const fieldsToRender: React.JSX.Element[] = [];
    const gridPairs = [
      ["first_name", "last_name"],
      ["phone_number", "organization"],
      ["designation", "country"],
    ];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const fieldName = getFieldName(field.field_label);
      const nextField = fields[i + 1];
      const nextFieldName = nextField
        ? getFieldName(nextField.field_label)
        : null;

      // Check if this field and next field should be in a grid
      const shouldBeInGrid = gridPairs.some(
        (pair) => pair.includes(fieldName) && pair.includes(nextFieldName || "")
      );

      if (shouldBeInGrid && nextField) {
        fieldsToRender.push(
          <div
            key={`grid-${field.id}`}
            className="grid grid-cols-1 desktop:grid-cols-2 gap-[12px] mb-[14.79px]"
          >
            <div>{renderField(field)}</div>
            <div>{renderField(nextField)}</div>
          </div>
        );
        i++; // Skip next field since we've already rendered it
      } else if (!gridPairs.flat().includes(fieldName) || !shouldBeInGrid) {
        fieldsToRender.push(renderField(field));
      }
    }

    return fieldsToRender;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mobileMax:px-4 mobileMax:py-6 w-full mt-[19px] betweenMobileTab:mt-[45px]"
    >
      {fields.length > 0 ? (
        renderFieldsInGrid()
      ) : (
        <p className="text-center text-gray-500">Loading form fields...</p>
      )}

      {isTaskforce ? (
        <>
          <div className="flex items-center gap-2 mb-[8px]">
            <Checkbox className="mt-[2px] w-4 h-4 rounded-[3px] border border-[#828282] bg-[#FFFCFC]" />
            <p className="text-left text-[14px] text-[#828282] cursor-pointer select-none">
              Consent for SEforALL to use your image, quotes, interview in
              programmes and/or other printed publications, websites and social
              media pages, and those of our partners
            </p>
          </div>
          <div className="flex items-center gap-2 mb-[8px]">
            <Checkbox className="mt-[2px] w-4 h-4 rounded-[3px] border border-[#828282] bg-[#FFFCFC]" />
            <p className="text-left text-[14px] text-[#828282] cursor-pointer select-none">
              Allow SEforALL to share your information (name, surname, title,
              company only) in the final attendance list
            </p>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <Checkbox
              className="mt-[2px] w-4 h-4 rounded-[3px] border border-[#828282] bg-[#FFFCFC]"
              checked={termsChecked}
              onCheckedChange={(value) => setTermsChecked(value as boolean)}
            />
            <p className="text-left text-[14px] text-[#828282] cursor-pointer select-none leading-snug">
              I have read and agree to the{" "}
              <Link
                className="text-[#4FC0FF] underline underline-offset-2"
                href="https://www.seforall.org/privacy-policy#:~:text=We%20are%20committed%20to%20protecting,for%20example%2C%20website%20usage%20statistics"
                target="_blank"
              >
                SEforALL Privacy Policy
              </Link>
              <span> and would like to receive email notifications *</span>
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center mb-[16px]">
          <Checkbox
            className="mr-2 mt-[2px] w-[22px] h-[24px] rounded-[4px] border border-[#828282] bg-[#FFFCFC]"
            checked={termsChecked}
            onCheckedChange={(value) => setTermsChecked(value as boolean)}
          />
          <p className="text-left text-[17px] text-[#828282] cursor-pointer select-none">
            <span onClick={() => setTermsChecked(!termsChecked)}>
              I have read and agree to the{" "}
            </span>
            <Link className="text-[#4FC0FF]" href="/privacy-policy">
              Privacy Policy
            </Link>
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="mx-auto capitalize py-[14px] justify-center w-full px-8 font-poppins !text-white text-[14px] font-semibold rounded-[10px] hover:!underline !no-underline mobileMax:max-w-full mobileMax:text-xmedium mobileMax:mb-3 focus:!outline-none tracking-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(90deg, #48DBB2 0%, #003350 100%)",
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <RiLoader4Line className="text-white animate-spin" />
          </div>
        ) : (
          <>SEND</>
        )}
      </Button>
    </form>
  );
};

export default DynamicForm;

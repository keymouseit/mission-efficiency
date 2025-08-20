"use client";
import CommonReactSelect from "@/components/CommonReactSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { DrupalNode } from "next-drupal";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveElevatePageFormData } from "@/services/api";
import { usePathname, useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { RiLoader4Line } from "react-icons/ri";

interface ElevateJoiningFormProps {
  formFields: DrupalNode[];
  afterFormSubmission: () => void;
}

const formSchema = yup.object().shape({
  ready_to_move_name: yup.string().required("Name is required"),
  ready_to_move_email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),
  ready_to_move_age: yup.string().required("Age is required"),
  ready_to_move_gender: yup.string().required(),
  ready_to_move_country: yup.string().required(),
});

const ElevateJoiningForm: React.FC<ElevateJoiningFormProps> = ({
  formFields,
  afterFormSubmission,
}) => {
  const router = useRouter();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerifyAndDataSubmit = useCallback(
    async (data: any) => {
      //   if (!executeRecaptcha) {
      //     return;
      //   }

      //   const token = await executeRecaptcha("onSubmit");

      //   const response = await axios({
      //     method: "post",
      //     url: "/api/verifyCaptchaToken",
      //     data: {
      //       gRecaptchaToken: token,
      //     },
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   const verifiedToken = response.data.success;

      if (data) {
        setTermsChecked(true);
        setIsLoading(true);
        saveElevatePageFormData({
          webform_id: process.env.NEXT_PUBLIC_JOIN_WEBFORM_ID,
          name: data.ready_to_move_name,
          email: data.ready_to_move_email,
          age: data.ready_to_move_age,
          gender: data.ready_to_move_gender,
          country: data.ready_to_move_country,
        }).then((res) => {
          setTermsChecked(false);
          setIsLoading(false);
          reset();
          afterFormSubmission();
          router.push(path, { scroll: false });
        });
        return;
      } else {
        alert("Could not Verify ReCaptcha, Please Try Again!");
      }
    },
    [executeRecaptcha]
  );

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ready_to_move_name: "",
      ready_to_move_email: "",
      ready_to_move_age: null,
      ready_to_move_gender: "",
      ready_to_move_country: "",
    },
    resolver: (yupResolver as any)(formSchema),
  });

  const [termsChecked, setTermsChecked] = useState<any>(false);

  const buildformList = () => {
    const filteredRadioList = formFields.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "radio"
    );
    const filteredTextAreaList = formFields.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "textarea"
    );
    const filteredTextInputList = formFields.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "text"
    );
    const filteredSelectInputList = formFields.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "select"
    );

    return {
      filteredRadioList: [
        {
          title: JSON.stringify([filteredRadioList[0]?.title]) as string,
          list: filteredRadioList as DrupalNode[],
        },
      ],
      filteredTextAreaList,
      filteredTextInputList,
      filteredSelectInputList,
    };
  };

  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusableElements = document.querySelectorAll(
          "input, select, textarea, a, button"
        ) as NodeListOf<HTMLElement>;
        const currentIndex = Array.from(focusableElements).findIndex(
          (element) => element === document.activeElement
        );
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleTabKeyPress);

    return () => {
      document.removeEventListener("keydown", handleTabKeyPress);
    };
  }, []);

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

  const { filteredRadioList, filteredTextInputList, filteredSelectInputList } =
    buildformList();

  const genders = [
    { title: "Male" },
    { title: "Female" },
    { title: "Transgender" },
    { title: "Non-binary/Non confirming" },
    { title: "Prefer not to disclose" },
  ];
  const ageGroups = [
    { title: "Under 18" },
    { title: "18-24" },
    { title: "25-35" },
    { title: "36-45" },
    { title: "46-59" },
    { title: "60+" },
  ];

  const makeGenderOptions = () => {
    const options = genders?.map((data) => {
      return {
        value: data.title,
        label: data.title,
      };
    });
    return options;
  };
  const makeAgeOptions = () => {
    const options = ageGroups?.map((data) => {
      return {
        value: data.title,
        label: data.title,
      };
    });
    return options;
  };

  const renderFormField = (formField: DrupalNode) => {
    const isAgeField = formField?.field_form_field_key_name
      .toLocaleLowerCase()
      .includes("age");

    return (
      <>
        {isAgeField ? (
          <CommonReactSelect
            placeholder={"Enter Age"}
            list={makeAgeOptions()}
            value={watch(formField?.field_form_field_key_name)}
            isPlanStyle={true}
            onSelectChange={(value) => {
              clearErrors(formField?.field_form_field_key_name);
              setValue(formField?.field_form_field_key_name, value);
            }}
            isSearchable={false}
          />
        ) : (
          <Input
            type="text"
            placeholder={formField?.field_field_placeholder || ""}
            {...register(formField?.field_form_field_key_name as any)}
            name={formField?.field_form_field_key_name}
            value={watch(formField?.field_form_field_key_name)}
            className="p-[15px] bg-transparent min-h-[40px] !text-[15px] mb-2 text-cardHeading text-left --font-poppins leading-normal mobileMax:!text-[13px] border-[#c7c7c7] !py-1"
          />
        )}
      </>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) =>
          handleReCaptchaVerifyAndDataSubmit(data)
        )}
        className="mb-2"
      >
        {filteredTextInputList?.map((formField: DrupalNode, index: number) => {
          return (
            <div className="mb-3 mx-1" key={index}>
              <Label className="!text-xmedium text-cardHeading text-left font-medium --font-poppins leading-10 mobileMax:!text-xsmall mobileMax:mb-1">
                {formField?.title || ""}:
              </Label>
              {renderFormField(formField)}
              <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize text-left">
                {(errors as any)[formField?.field_form_field_key_name]?.message
                  ? (errors as any)[formField?.field_form_field_key_name]
                      ?.message
                  : null}
              </p>
            </div>
          );
        })}
        {filteredRadioList?.map(
          (
            radioField: { title: string; list: DrupalNode[] },
            index: number
          ) => {
            return (
              <div className="mb-3 mx-1" key={index}>
                <Label className="!text-xmedium text-cardHeading text-left font-medium --font-poppins leading-10 mobileMax:!text-xsmall mobileMax:mb-1">
                  Gender:
                </Label>
                <CommonReactSelect
                  placeholder={"Select Gender"}
                  list={makeGenderOptions()}
                  value={watch(radioField.list[0]?.field_form_field_key_name)}
                  isPlanStyle={true}
                  onSelectChange={(value) => {
                    clearErrors(radioField.list[0]?.field_form_field_key_name);
                    setValue(
                      radioField.list[0]?.field_form_field_key_name,
                      value
                    );
                  }}
                  isSearchable={false}
                />
                <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize text-left">
                  {(errors as any)[
                    radioField.list[0]?.field_form_field_key_name
                  ]?.message
                    ? `Gender is Required`
                    : null}
                </p>
              </div>
            );
          }
        )}
        {filteredSelectInputList?.map(
          (selectInput: DrupalNode, index: number) => {
            const selectList: { label: string; value: string }[] =
              buildSelectList(selectInput);
            return (
              <div className="mb-8 mx-1" key={index}>
                <Label className="!text-xmedium text-cardHeading text-left font-medium --font-poppins leading-10 mobileMax:!text-xsmall mobileMax:mb-1">
                  {selectInput?.title || ""}:
                </Label>
                <CommonReactSelect
                  placeholder={
                    selectInput?.field_field_placeholder || "Select Your Answer"
                  }
                  list={selectList}
                  isPlanStyle={true}
                  onSelectChange={(value) => {
                    clearErrors(selectInput?.field_form_field_key_name);
                    setValue(selectInput?.field_form_field_key_name, value);
                  }}
                  value={watch(selectInput?.field_form_field_key_name)}
                  minMenuListHeight={124}
                />
                <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize text-left">
                  {(errors as any)[selectInput?.field_form_field_key_name]
                    ?.message
                    ? `${selectInput?.title || ""} is Required`
                    : null}
                </p>
              </div>
            );
          }
        )}
        <div className="flex items-start mb-8 mx-1">
          <Checkbox
            className="mr-2 mt-[2px]"
            checked={termsChecked}
            onCheckedChange={(value) => {
              // handle toggling button disable
              setTermsChecked(value as Boolean);
            }}
          />
          <p className="text-left text-small mobileMax:text-xsmall cursor-pointer select-none">
            <span onClick={() => setTermsChecked(!termsChecked)}>
              I have read and agree to the{" "}
            </span>
            <Link
              className=" ml-1 underline text-linkBlue focus:ring-2 focus:border-landingBlue"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <Button
          type="submit"
          disabled={!termsChecked}
          className="block mx-auto min-w-[220px] outline-btn get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg mobileMax:min-w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <RiLoader4Line className="text-white text-odd animate-spin text-center" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </>
  );
};

export default ElevateJoiningForm;

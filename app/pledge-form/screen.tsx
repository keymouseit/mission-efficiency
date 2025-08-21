"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DrupalNode } from "next-drupal";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { savePledgeFormData, uploadLogoImage } from "@/services/api";
import PledgeAccordion from "@/components/LandingWebsiteComponents/PledgeAccordion";
import PledgeSuccessModal from "@/components/LandingWebsiteComponents/PledgeSuccessModal";
import { useEffect } from "react";
import { fileToBase64 } from "@/lib/utils";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import DynamicImage from "@/components/ResuableDynamicImage";

interface pledgeFormProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  pledgeFormData: DrupalNode;
  formType: "GOVERNMENT" | "ORGANIZATION";
  formChecklist: DrupalNode[];
}

const formSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  position: yup.string().required(),
  organizationName: yup.string(),
  organizationWebsite: yup.string(),
  globalProgress: yup.string().required(),
  customCommitment: yup.string(),
  pledgeActions: yup.string(),
  pledgeCommitments: yup.string(),
  energyEfficiencySectors: yup.string().required(),
  pledgeGoals: yup.string(),
});

const PledgeFormsScreen: React.FC<pledgeFormProps> = ({
  headerData,
  footerData,
  pledgeFormData,
  formType,
  formChecklist,
}) => {
  const {
    field_pledge_form,
    field_pledge_form_gov_title,
    field_pledge_form_org_title,
    field_pledge_form_gov_desc,
    field_pledge_form_org_desc,
  } = pledgeFormData;

  const pledgeFormTitle =
    formType === "GOVERNMENT"
      ? field_pledge_form_gov_title
      : field_pledge_form_org_title;
  const pledgeFormDescription =
    formType === "GOVERNMENT"
      ? field_pledge_form_gov_desc
      : field_pledge_form_org_desc;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileBase64, setSelectedFileBase64] = useState<string>("");
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const setImageThumbnail = async () => {
    const fileBase64 = await fileToBase64(selectedFile as File).then(
      (res) => res
    );
    setSelectedFileBase64(fileBase64);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedFile) {
      uploadLogoImage(selectedFile)
        .then((re) => re.json())
        .then((picture) => {
          const uploadedUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${picture?.data.uri.url}`;
          setUploadedImageUrl(uploadedUrl);
          setValue("organisationLogoImage", uploadedUrl);
        });
      setImageThumbnail();
    }
  }, [selectedFile]);

  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const {
    register,
    // handleSubmit,
    getValues,
    clearErrors,
    setError,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      organizationName: "",
      organizationWebsite: "",
      globalProgress: "",
      customCommitment: "",
      pledgeActions: "",
      pledgeCommitments: "",
      pledgeGoals: "",
      energyEfficiencySectors: "",
      organisationLogoImage: "",
      supportAction: "",
      percentageIncrease: "",
    },
    resolver: (yupResolver as any)(formSchema),
  });

  const mapIdsToTitles = (value: string) => {
    const idArray = value.split(",");
    const titlesArray = idArray.length
      ? idArray.map((checklistItemId: string) => {
          const foundChecklistItem = formChecklist.find(
            (checklistItem: DrupalNode) => checklistItem.id === checklistItemId
          );
          if (foundChecklistItem) {
            return foundChecklistItem.title;
          } else {
            return "---";
          }
        })
      : [];

    return titlesArray.join("|");
  };

  const handleFormProceedNextStep = () => {
    window.scrollTo({ top: isMobile ? 450 : 600, behavior: "smooth" });
    const formData = getValues();
    switch (currentStep) {
      case 0:
        const emailNotWorking = !Boolean(formData.email.length);
        const positionNotWorking = !Boolean(formData.position.length);

        if (emailNotWorking) {
          setError("email", { type: "custom", message: "Email is Required" });
        }
        if (positionNotWorking) {
          setError("position", {
            type: "custom",
            message: "Position is Required",
          });
        }

        if (emailNotWorking || positionNotWorking) {
          return;
        }

        clearErrors();
        setCurrentStep(currentStep + 1);
        break;
      case 1:
        const noPledgeIdsSelected = !Boolean(formData.globalProgress.length);

        if (noPledgeIdsSelected) {
          setError("globalProgress", {
            type: "custom",
            message: "Pledges is Required",
          });
          return;
        }

        clearErrors();
        setCurrentStep(currentStep + 1);
        return;
      case 2:
        const noSectorIdsSelected = !Boolean(
          formData.energyEfficiencySectors.length
        );

        if (noSectorIdsSelected) {
          setError("energyEfficiencySectors", {
            type: "custom",
            message: "Sectors is Required",
          });
          return;
        }

        clearErrors();
        setCurrentStep(currentStep + 1);
        return;
      case 3:
        clearErrors();
        setCurrentStep(currentStep + 1);
        return;
      case 4:
        handleReCaptchaVerifyAndDataSubmit();
        return;

      default:
        break;
    }
  };

  const handleReCaptchaVerifyAndDataSubmit = useCallback(async () => {
    const formData = getValues();

    if (formData) {
      setIsLoading(true);
      const mappedPledges = mapIdsToTitles(formData.globalProgress);
      const mappedSectors = mapIdsToTitles(formData.energyEfficiencySectors);
      savePledgeFormData({
        webform_id: process.env.NEXT_PUBLIC_PLEDGE_FORM_ID,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        pledge_type: formType,
        pledge_position: formData.position,
        organization_name: formData.organizationName,
        website_link: formData.organizationWebsite,
        selected_pledges: mappedPledges,
        custom_commitment: formData.customCommitment,
        pledge_actions: formData.pledgeActions,
        pledge_commitment: formData.pledgeCommitments,
        pledge_goals: formData.pledgeGoals,
        selected_sector: mappedSectors,
        specific_actions: formData.supportAction,
        direct_investment: formData.percentageIncrease,
        organization_logo: formData.organisationLogoImage,
      })
        .then(() => {
          setIsLoading(false);
          setUploadedImageUrl("");
          setSelectedFileBase64("");
          setOpenSuccessModal(!openSuccessModal);
          setCurrentStep(0);
          reset();
        })
        .catch(() => setIsLoading(false));
      return;
    } else {
      alert("Could not Verify ReCaptcha, Please Try Again!");
    }
  }, []);

  const handleCheckListUpdate = (formKey: any, value: string) => {
    const fieldState = getValues() as any;
    const checklistArray = fieldState[formKey].split(",");
    const valueArray = value.split(",");
    for (let valueIndex = 0; valueIndex < valueArray.length; valueIndex++) {
      let index = checklistArray.indexOf(valueArray[valueIndex]); // Check if the element exists in checklistArray
      if (index !== -1) {
        checklistArray.splice(index, 1); // Remove the element from checklistArray
        setValue(formKey, checklistArray.join(","));
      } else {
        if (fieldState[formKey].length) {
          checklistArray.push(valueArray[valueIndex]); // Push the element to checklistArray if it doesn't exist
          setValue(formKey, checklistArray.join(","));
        } else {
          setValue(formKey, value);
        }
      }
    }
  };

  const handleFileChange = async (file: any) => {
    setSelectedFile(file);
  };

  const renderSteps = (organizationFormData: DrupalNode[]) => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <p className="text-odd mb-5 text-landingBlue text-left font-medium --font-poppins leading-normal mobileMax:text-medium mobileMax:text-xmedium mobileMax:mb-5">
              {organizationFormData[currentStep].title}
            </p>
            {organizationFormData[
              currentStep
            ].field_pledge_form_section_inputs.map(
              (item: DrupalNode, index: number) => {
                return (
                  <div key={index} className="mb-2">
                    <Label className="!text-xmedium mb-2 text-cardHeading text-left font-medium --font-poppins leading-10 mobileMax:!text-xsmall mobileMax:mb-1">
                      {item.title}
                      {item?.field_form_required_status ? (
                        <span className="ml-1 text-danger">*</span>
                      ) : null}
                    </Label>
                    <Input
                      type={item?.field_form_field_type}
                      {...register(item.field_form_field_name as any)}
                      name={item.field_form_field_name}
                      placeholder={item?.field_field_placeholder}
                      className="p-[15px] bg-transparent min-h-[40px] !text-[15px] mb-2 text-cardHeading text-left --font-poppins leading-normal mobileMax:!text-[13px] border-[#c7c7c7] !py-1"
                    />
                    <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize">
                      {(errors as any)[item.field_form_field_name]?.message}
                    </p>
                  </div>
                );
              }
            )}
            {formType === "ORGANIZATION" ? (
              <>
                <Label className="!text-xmedium mb-2 text-cardHeading text-left font-medium --font-poppins leading-10 mobileMax:!text-xsmall mobileMax:mb-1">
                  Organization Logo
                </Label>
                <div
                  className={`!w-[200px] !h-[160px] border border-[#c7c7c7] relative overflow-hidden rounded-[6px] ${
                    uploadedImageUrl && "show-org-logo"
                  }`}
                >
                  {!Boolean(uploadedImageUrl || selectedFileBase64) && (
                    <>
                      <Input
                        onChange={(e: any) => {
                          handleFileChange(e?.target?.files[0] || {});
                        }}
                        type="file"
                        name="organizationLogo"
                        accept="image/png, image/jpeg, image/jpeg"
                        className="opacity-0 !w-full !h-full relative cursor-pointer"
                      />
                      <div className="absolute cursor-pointer w-full h-full flex items-center justify-center top-0 left-0 pointer-events-none">
                        <FaPlus className="text-black text-odd" />
                      </div>
                    </>
                  )}
                  <div className="absolute hidden top-0 left-0 w-full h-full bg-blackHighOpacity image-change-opt z-[2] flex items-center justify-center">
                    <MdEdit
                      className="text-black rounded-full h-[40px] w-[40px] bg-white p-2 cursor-pointer block mr-5 "
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                    />
                    <Input
                      onChange={(e: any) => {
                        handleFileChange(e?.target?.files[0] || {});
                      }}
                      id="fileInput"
                      type="file"
                      name="organizationLogo"
                      accept="image/png, image/jpeg, image/jpeg"
                      className="hidden"
                    />
                    <RiDeleteBin6Fill
                      onClick={() => {
                        setUploadedImageUrl("");
                        setSelectedFileBase64("");
                      }}
                      className="text-black rounded-full h-[40px] w-[40px] bg-white p-2 cursor-pointer block"
                    />
                  </div>
                  {(uploadedImageUrl || selectedFileBase64) && (
                    <>
                      <DynamicImage
                        src={uploadedImageUrl || selectedFileBase64}
                        alt="logo image"
                        width={70}
                        height={70}
                        className="block w-full h-full card-shadow relative"
                      />
                    </>
                  )}
                </div>
              </>
            ) : null}
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <p className="text-odd mb-5 text-landingBlue text-left font-medium --font-poppins leading-normal mobileMax:text-medium mobileMax:text-xmedium mobileMax:mb-5">
              {organizationFormData[currentStep].title}
            </p>
            {organizationFormData[
              currentStep
            ].field_pledge_form_section_inputs.map(
              (input: DrupalNode, index: number) => (
                <div key={index} className="mb-6 mobileMax:mb-3">
                  <p className="--font-poppins leading-normal text-cardHeading text-xmedium mobileMax:text-[15px] mobileMax:mb-2 mb-4">
                    {input.title}
                    {input?.field_form_required_status ? (
                      <span className="ml-1 text-danger">*</span>
                    ) : null}
                  </p>
                  {input?.field_form_html_extra_field?.value && (
                    <div
                      className="--font-poppins leading-normal text-cardHeading text-xmedium mobileMax:text-[15px] mobileMax:mb-2 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: input.field_form_html_extra_field.value,
                      }}
                    />
                  )}
                  <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize">
                    {(errors as any)[input.field_form_field_name]?.message}
                  </p>
                  {input.field_form_field_type === "checklist" ? (
                    input.field_form_field_checklist.map(
                      (checklistItem: DrupalNode, index: number) => {
                        return (
                          <>
                            <PledgeAccordion
                              key={index}
                              checklistData={checklistItem}
                              value={watch(input.field_form_field_name)}
                              handleChecklistUpdate={(value) => {
                                handleCheckListUpdate(
                                  input.field_form_field_name,
                                  value
                                );
                              }}
                            />
                          </>
                        );
                      }
                    )
                  ) : (
                    <div className="mb-5">
                      <Input
                        type="text"
                        placeholder={input.field_field_placeholder}
                        {...register(input.field_form_field_name as any)}
                        name={input.field_form_field_name}
                        className="p-[15px] bg-transparent min-h-[40px] !text-[15px] mb-2 text-cardHeading text-left --font-poppins leading-normal mobileMax:!text-[13px] border-[#c7c7c7] !py-1"
                      />
                    </div>
                  )}
                </div>
              )
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <p className="text-odd mb-5 text-landingBlue text-left font-medium --font-poppins leading-normal mobileMax:text-medium mobileMax:text-xmedium mobileMax:mb-5">
              {organizationFormData[currentStep].title}
            </p>
            <div className="mb-5">
              {organizationFormData[
                currentStep
              ].field_pledge_form_section_inputs.map(
                (input: DrupalNode, index: number) => (
                  <div key={index} className="mb-6 mobileMax:mb-3">
                    <p className="--font-poppins leading-normal text-cardHeading text-xmedium mobileMax:text-[15px] mobileMax:mb-2 mb-4">
                      {input.title}
                      {input?.field_form_required_status ? (
                        <span className="ml-1 text-danger">*</span>
                      ) : null}
                    </p>
                    <p className="text-danger text-[13px] leading-normal m-0 first-letter:capitalize">
                      {(errors as any)[input.field_form_field_name]?.message}
                    </p>
                    {input.field_form_field_type === "checklist" ? (
                      input.field_form_field_checklist.map(
                        (checklistItem: DrupalNode, index: number) => {
                          return (
                            <>
                              <PledgeAccordion
                                key={index}
                                value={watch(input.field_form_field_name)}
                                checklistData={checklistItem}
                                handleChecklistUpdate={(value) => {
                                  handleCheckListUpdate(
                                    input.field_form_field_name,
                                    value
                                  );
                                }}
                              />
                            </>
                          );
                        }
                      )
                    ) : (
                      <div className="mb-5">
                        <Input
                          type="text"
                          {...register(input.field_form_field_name as any)}
                          name={input.field_form_field_name}
                          placeholder="Enter your answer"
                          className="p-[15px] bg-transparent min-h-[40px] !text-[15px] mb-2 text-cardHeading text-left --font-poppins leading-normal mobileMax:!text-[13px] border-[#c7c7c7] !py-1"
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <p className="text-odd mb-5 text-landingBlue text-left font-medium --font-poppins leading-normal mobileMax:text-medium mobileMax:text-xmedium mobileMax:mb-5">
              {organizationFormData[currentStep].title}
            </p>
            <div className="mb-5">
              {organizationFormData[
                currentStep
              ].field_pledge_form_section_inputs.map(
                (input: DrupalNode, index: number) => (
                  <div key={index} className="mb-6 mobileMax:mb-3">
                    <p className="--font-poppins leading-normal text-cardHeading text-xmedium mobileMax:text-[15px] mobileMax:mb-2 mb-4">
                      {input.title}
                    </p>
                    {
                      <div className="mb-5">
                        <Input
                          type="text"
                          {...register(input.field_form_field_name as any)}
                          name={input.field_form_field_name}
                          placeholder="Enter your answer"
                          className="p-[15px] bg-transparent min-h-[40px] !text-[15px] mb-2 text-cardHeading text-left --font-poppins leading-normal mobileMax:!text-[13px] border-[#c7c7c7] !py-1"
                        />
                      </div>
                    }
                  </div>
                )
              )}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation "
          >
            <p className="text-odd mb-5 text-landingBlue text-left font-medium --font-poppins leading-normal mobileMax:text-medium mobileMax:text-xmedium mobileMax:mb-5">
              E. SUBMIT YOUR PLEDGES
            </p>
            <div className="mb-5">
              <p className="text-xmedium font-semibold text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal">
                Thank you, you are ready to submit to submit your Mission
                Efficiency Pledge!
              </p>
              <p className="text-xmedium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal mb-3">
                If you agree, Mission Efficiency will store and process your
                contact details and pledges in line with our
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-defaultLink pl-2 underline"
                >
                  Learn more
                </a>{" "}
              </p>
              <p className="text-xmedium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal mb-3">
                If you have any questions, please contact us at
                <a
                  href="mailto:info@missionefficiency.org"
                  className="text-defaultLink pl-2 underline"
                >
                  {" "}
                  info@missionefficiency.org{" "}
                </a>
              </p>
            </div>
          </motion.div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Header data={headerData} />
      <div className="pt-20 bg-mapGray">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={pledgeFormTitle}
          subTitle={pledgeFormDescription}
          lightBgClip={true}
          isSmallImage={false}
        />
        <div className="relative pt-[92px] exactLaptop:min-h-[80vh] pb-[100px] bg-mapGray relative mobileMax:pt-10 mobileMax:pb-14 betweenMobileTab:pt-16 betweenMobileTab:pb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2,
            }}
            className="z-[1] absolute pointer-events-none max-w-[50%] top-[150px] betweenMobileTab:max-w-[22%] laptopMax:top-[100px] laptopMax:max-w-[30%] "
          >
            <DynamicImage
              width={316}
              height={576}
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="mobileMax:opacity-40"
            />
          </motion.div>
          <div className="mini-container relative z-[2]">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mt-5 p-6 card-shadow rounded-[23px] bg-white"
              >
                <form
                // onSubmit={
                // 	handleSubmit((data) =>
                // 	handleFormSubmit({ ...data, type: formType }),
                // )}
                >
                  {renderSteps(field_pledge_form)}
                  <div className="flex items-center justify-between mt-8">
                    {currentStep > 0 && (
                      <Button
                        type="button"
                        className="px-4 min-w-[100px] mobileMax:w-full flex items-center rounded-lg justify-center mobileMax:!text-xsmall !text-small text-white font-medium visit-site-btn --font-poppins mr-2"
                        onClick={() => {
                          window.scrollTo({
                            top: isMobile ? 450 : 600,
                            behavior: "smooth",
                          });
                          setCurrentStep(currentStep - 1);
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep < field_pledge_form.length ? (
                      <Button
                        type="button"
                        onClick={handleFormProceedNextStep}
                        className="ml-auto px-4 min-w-[100px] mobileMax:w-full flex items-center rounded-lg justify-center mobileMax:!text-xsmall !text-small text-white font-medium visit-site-btn --font-poppins"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        // type="submit"
                        type="button"
                        onClick={handleFormProceedNextStep}
                        className="ml-auto px-4 min-w-[100px] flex items-center rounded-lg justify-center mobileMax:!text-xsmall !text-small text-white font-medium visit-site-btn --font-poppins mobileMax:w-full"
                      >
                        {isLoading ? (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z"
                              className="opacity-30"
                            />
                            <path
                              fill="currentColor"
                              d="M12 2a10 10 0 0110 10h-4a6 6 0 00-6-6V2z"
                            />
                          </svg>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <PledgeSuccessModal
        open={openSuccessModal}
        setOpen={(value) => setOpenSuccessModal(value)}
      />
      <LandingFooter data={footerData} />
    </>
  );
};

export default PledgeFormsScreen;

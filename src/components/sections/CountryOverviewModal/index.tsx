import React from "react";
import Image from "next/image";
import { DrupalNode } from "next-drupal";
import { getAlpha2FromISO, getSectorByEfficiency } from "@/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import OverAllCountryTable from "../OverAllCountryTable";
import { Button } from "@/components/ui/Button";

interface CountryOverviewModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  selectedCountryMapData?: DrupalNode;
  onNext: () => void;
}

const CountryOverviewModal: React.FC<CountryOverviewModalProps> = ({
  open,
  setOpen,
  selectedCountryMapData,
  onNext,
}) => {
  const countryAlpha2 =
    getAlpha2FromISO(selectedCountryMapData?.field_iso_code) || "";
  const sectorByEfficiency = getSectorByEfficiency(selectedCountryMapData);
  return (
    <Dialog open={open as boolean} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="w-[80%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5 p-0">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center mb-3 px-14 pb-2 pt-8">
              <p className="text-medium text-left text-purple font-extrabold">
                Sector(s) with highest energy savings potential in{" "}
              </p>
              <div className="flex items-center ml-3">
                {!countryAlpha2 ? (
                  <div className="animate-pulse rounded-[6px] h-[24px] w-[28px] w-full bg-skeleton" />
                ) : (
                  <Image
                    src={`https://img.geonames.org/flags/x/${countryAlpha2.toLowerCase()}.gif`}
                    alt="flag"
                    width={28}
                    height={28}
                    className="common-dropShadow"
                  />
                )}
                <p className="text-gray text-midSmall text-left ml-2.5 font-normal font-poppins">
                  {selectedCountryMapData?.title}
                </p>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            <OverAllCountryTable
              isCountryDetail={false}
              selectedCountryMapData={selectedCountryMapData}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 mx-14 border-t-2 border-borderColor">
          <div>
            <div className="flex items-center mb-6 justify-center">
              <div className="border-box p-4 rounded-full bg-blue flex items-center justify-center max-w-[65px] h-[65px] w-[65px] white-svg-color">
                <Image
                  src={`/static/images/${sectorByEfficiency?.icon}.svg`}
                  alt={sectorByEfficiency?.icon || ""}
                  width={40}
                  height={40}
                  className="max-w-[40px] block"
                />
              </div>
              <p className="text-black text-xmedium font-semibold ml-3 w-full font-poppins">
                Explore available tools in{" "}
                <span className="text-blue">{sectorByEfficiency?.title}</span>{" "}
                sectors.
              </p>
            </div>
            <Button
              onClick={onNext}
              className="mx-auto block min-w-[220px] modals-gradientBtn text-white text-medium capitalize"
            >
              View Tools
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CountryOverviewModal;

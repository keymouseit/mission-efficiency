import React from "react";
import { DrupalNode } from "next-drupal";

interface MobileToolsListProps {
  tools: DrupalNode[] | undefined;
  loading: boolean;
}

const MobileToolsList: React.FC<MobileToolsListProps> = ({
  tools,
  loading,
}) => {
  return (
    <>
      <p className="font-bold text-purple font-poppins text-midSmall bg-mapGray py-2 px-5">
        Tools
      </p>
      <div className="px-3 max-h-[510px] overflow-auto">
        {!loading &&
          (tools?.length ? (
            <>
              {tools?.map((tool, index) => {
                return (
                  <div key={index} className="px-2 py-5 border-1 border-b border-borderColor">
                    <a
                      href={tool.field_tool_d_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h6 className="text-midSmall text-linkBlue font-poppins line-clamp-2 leading-6">
                        {tool.title}
                      </h6>
                    </a>
                    <div className="flex items-start justify-between mt-3">
                      <div className="w-[35%] mr-3">
                        <h6 className="font-medium text-small text-[#392a74] font-poppins mb-1">
                          Type:
                        </h6>
                        <p className="font-normal text-xsmall  text-purple leading-4 font-poppins">
                          {tool.field_tool_d_type?.name || "---"}
                        </p>
                      </div>
                      <div className="w-[64%]">
                        <h6 className="font-medium text-small text-[#392a74] font-poppins mb-1">
                          Category:
                        </h6>
                        <p className="font-normal text-xsmall  text-purple leading-4 font-poppins">
                          {tool.field_tool_d_category?.name || "---"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : 
          <div className="px-5 h-[250px] flex items-center justify-center pt-6">
               <p className="font-medium text-small text-[#392a74] --font-poppins">No Data Found</p>
          </div>)}
      </div>

      {/* skeleton */}
      {loading && (
        <>
          {Array(2)
            .fill(0)
            .map((item) => {
              return (
                <div
                  key={item}
                  className="px-5 py-4 border-1 border-b border-borderColor"
                >
                  <div className="animate-pulse h-8 rounded-md w-full bg-skeleton" />
                  <div className="flex items-start justify-between mt-3">
                    <div className="w-[35%] pr-1">
                      <div className="animate-pulse h-8 rounded-md w-full bg-skeleton mb-2" />
                      <div className="animate-pulse h-8 rounded-md w-full bg-skeleton mb-2" />
                    </div>
                    <div className="w-[65%] pl-1">
                      <div className="animate-pulse h-8 rounded-md w-full bg-skeleton mb-2" />
                      <div className="animate-pulse h-8 rounded-md w-full bg-skeleton mb-2" />
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default MobileToolsList;

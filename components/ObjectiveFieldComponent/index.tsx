import React from 'react';
import { motion } from 'framer-motion';

// Component for displaying objective list data
function ObjectiveListComponent({ data }) {
  // Extract the objective data from the response
  const objectiveData = data?.field_add_objective?.[0];
  
  if (!objectiveData) {
    return null;
  }

  const { field_title, field_description, field_add_item } = objectiveData;

  return (
    <section className="mt-[64px]">
      <div className="">
        {/* Title Section */}
        {field_title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <h2 className="text-[20px] mobileMax:text-[16px] text-[#5879aa] mb-[20px]">
              {field_title}
            </h2>
          </motion.div>
        )}

        {/* Description Section */}
        {field_description?.processed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div 
              className="text-list --font-poppins text-left text-medium mt-2.5 leading-normal text-[#545d6f] mobileMax:mb-5 mobileMax:text-small mobileMax:leading-normal"
              dangerouslySetInnerHTML={{ 
                __html: field_description.processed 
              }}
            />
          </motion.div>
        )}

        {/* Additional Items Section */}
        {field_add_item && field_add_item.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {field_add_item.map((item, index) => (
              <div 
                key={item.id || index}
                className=""
              >
                {/* Item Title */}
                {item.field_title && (
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    {item.field_title}
                  </h3>
                )}
                
                {/* Item Description */}
                {item.field_description?.processed && (
                  <div 
                    className="prose prose-base max-w-none text-gray-600 leading-relaxed
                               prose-ul:space-y-2 prose-li:text-gray-600
                               prose-strong:text-gray-800 prose-strong:font-medium
                               prose-p:text-gray-600 prose-p:mb-3"
                    dangerouslySetInnerHTML={{ 
                      __html: item.field_description.processed 
                    }}
                  />
                )}

                {/* Additional nested content if exists */}
                {item.field_add_item && item.field_add_item.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {item.field_add_item.map((nestedItem, nestedIndex) => (
                      <div 
                        key={nestedItem.id || nestedIndex}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                      >
                        {nestedItem.field_title && (
                          <h4 className="text-lg font-medium text-gray-800 mb-3">
                            {nestedItem.field_title}
                          </h4>
                        )}
                        {nestedItem.field_description?.processed && (
                          <div 
                            className="prose prose-sm max-w-none text-gray-600
                                       prose-ul:space-y-1 prose-li:text-gray-600
                                       prose-strong:text-gray-700"
                            dangerouslySetInnerHTML={{ 
                              __html: nestedItem.field_description.processed 
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}

export default ObjectiveListComponent;
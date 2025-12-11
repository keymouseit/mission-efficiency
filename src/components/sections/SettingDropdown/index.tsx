import { Checkbox } from "@/components/ui/Checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import React from "react";

interface SettingMenuProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: React.ReactNode;
  triggerClassName?: string;
  columns: string[];
  activeColumns: { [key: string]: boolean };
  onColumnToggle: (columnName: string) => void;
}

const SettingDropdown: React.FC<SettingMenuProps> = ({
  open,
  setOpen,
  children,
  triggerClassName = "",
  columns,
  activeColumns,
  onColumnToggle,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={(value) => setOpen(value)}>
      <DropdownMenuTrigger
        className={triggerClassName}
        aria-label="setting dropdown button"
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2 setting-modal">
        <DropdownMenuLabel className="text-gray flex items-center">
          Display Columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuItem
            key={column}
            onClick={() => onColumnToggle(column)}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              <Checkbox
                id={column}
                className="mr-2 bg-mapGray border-[#D4D4D4] cursor-pointer"
                checked={activeColumns[column]}
              />
              <label
                className="text-gray text-xsmall cursor-pointer"
                htmlFor={column}
              >
                {column}
              </label>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingDropdown;

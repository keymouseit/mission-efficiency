import {
  useState,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

interface Columns {
  [key: string]: boolean;
}

interface ColumnVisibilityHook {
  visibleColumns: Columns;
  setVisibleColumns: Dispatch<SetStateAction<Columns>>;
  headers: string[];
  toggleColumn: (columnName: string) => void;
}

const useColumnVisibility = (
  initialColumns: Columns | null = {}
): ColumnVisibilityHook => {
  const [visibleColumns, setVisibleColumns] = useState<Columns>(
    initialColumns as Columns
  );

  const toggleColumn = useCallback((columnName: string) => {
    setVisibleColumns((prevColumns) => {
      return {
        ...prevColumns,
        [columnName]: !prevColumns[columnName],
      };
    });
  }, []);

  const headers: string[] = useMemo(
    () =>
      Object.keys(visibleColumns || {})?.reduce<string[]>((acc, key) => {
        if (visibleColumns[key]) {
          acc.push(key);
        }
        return acc;
      }, []),
    [visibleColumns]
  );

  return {
    visibleColumns,
    setVisibleColumns,
    headers,
    toggleColumn,
  };
};

export default useColumnVisibility;

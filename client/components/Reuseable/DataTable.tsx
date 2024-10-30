import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AlignOptions = "left" | "center" | "right";

interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    header?: string;
    key: keyof T; // Restricting key to keyof T only
    align?: AlignOptions;
  }>;
  caption?: string;
  onRowHover?: (row: T | null) => void;
  onDelete?: (row: T) => void; // Optional delete functionality
}

const DataTable = <T,>({
  data,
  columns,
  caption,
  onRowHover,
  onDelete,
}: DataTableProps<T>): JSX.Element => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className={column.align ? `text-${column.align}` : ""}
            >
              {column.header || ""}
            </TableHead>
          ))}
          {onDelete && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onMouseEnter={() => onRowHover?.(row)}
              onMouseLeave={() => onRowHover?.(null)}
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={column.align ? `text-${column.align}` : ""}
                >
                  {row[column.key] as React.ReactNode}
                </TableCell>
              ))}
              {onDelete && (
                <TableCell className="text-right">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length + (onDelete ? 1 : 0)}
              className="text-center"
            >
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;

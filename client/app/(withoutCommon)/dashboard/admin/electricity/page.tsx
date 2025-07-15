"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useGetAllElectricityQuery } from "@/redux/api/New/electricity";
import TopBar from "./Components/TopBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ElectricityBill = () => {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllElectricityQuery({ searchTerm: search });

  // ✅ fix: extract actual room data
  const rawElectricity = data || {};
  console.log(rawElectricity);
  const roomNumbers = Object.keys(rawElectricity);

  // Collect all unique months across all rooms
  const allMonthSet = new Set<string>();
  roomNumbers.forEach((roomNo) => {
    rawElectricity[roomNo].forEach((entry: any) => {
      allMonthSet.add(`${entry.monthName}-${entry.year}`);
    });
  });

  // Sort months chronologically
  const allMonthsSorted = Array.from(allMonthSet).sort((a, b) => {
    const [monthA, yearA] = a.split("-");
    const [monthB, yearB] = b.split("-");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Electricity Bill</h2>

      <TopBar searchValue={search} onSearchChange={setSearch} />

      <Link href="/dashboard/admin/electricity/create">
        <Button className="mb-4">Click to Create</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room No</TableHead>
            {allMonthsSorted.map((month) => (
              <TableHead key={month}>{month}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {roomNumbers.map((roomNo) => {
            const readings = rawElectricity[roomNo];

            const monthMap: Record<string, number> = {};
            readings.forEach((r: any) => {
              monthMap[`${r.monthName}-${r.year}`] = r.reading;
            });

            return (
              <TableRow key={roomNo}>
                <TableCell>{roomNo}</TableCell>
                {allMonthsSorted.map((month) => (
                  <TableCell key={month}>
                    {monthMap[month] !== undefined ? monthMap[month] : "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ElectricityBill;

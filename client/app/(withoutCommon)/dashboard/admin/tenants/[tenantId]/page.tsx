"use client";
import { useParams } from "next/navigation";
import React from "react";

const TenantsDetails = () => {
  const { tenants } = useParams();
  console.log(tenants);
  return <div>roomId:{tenants}</div>;
};

export default TenantsDetails;

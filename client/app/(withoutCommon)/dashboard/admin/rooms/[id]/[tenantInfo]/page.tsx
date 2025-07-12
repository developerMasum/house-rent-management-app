"use client";
import { useParams } from "next/navigation";
import React from "react";

const TenantInformation = () => {
  const { tenantInfo } = useParams();

  return (
    <div>
      TenantInformation: {tenantInfo}
      <p>this is roomId, search it by roomId inside tenant info</p>
    </div>
  );
};

export default TenantInformation;

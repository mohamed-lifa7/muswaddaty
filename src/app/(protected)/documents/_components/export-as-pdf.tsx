"use client";
import { Button } from "@/components/ui/button";
import { exportToPdf } from "@/lib/utils";
import React from "react";

const ExportAsPdf = () => {
  const doc = document.getElementById("document");
  return (
    <Button variant="outline" className="mb-4" onClick={async () => {
      console.log(doc);
      await exportToPdf(doc)
    }}>
      Export as PDF
    </Button>
  );
};

export default ExportAsPdf;

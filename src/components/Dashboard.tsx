"use client";

import React from "react";
import { UserInformationForm } from "@/components/UserInformationForm";
import { EligibilityResults } from "@/components/EligibilityResults";
import { ClaimProcessGuidance } from "@/components/ClaimProcessGuidance";
import { Card } from "@/components/ui/card";

interface DashboardProps {
  results: any;
  setResults: (results: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ results, setResults }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">MediSure: Your Health Insurance Eligibility Guide</h1>
      <Card className="mb-5">
        <UserInformationForm setResults={setResults} />
      </Card>
      {results && (
        <Card className="mb-5">
          <EligibilityResults results={results} />
        </Card>
      )}
      <Card>
        <ClaimProcessGuidance />
      </Card>
    </div>
  );
};


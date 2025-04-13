"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SuggestInsurancePoliciesInput,
  suggestInsurancePolicies,
} from "@/ai/flows/suggest-insurance-policies";
import { getLocationInformation } from "@/services/location";

interface UserInformationFormProps {
  setResults: (results: any) => void;
}

export const UserInformationForm: React.FC<UserInformationFormProps> = ({
  setResults,
}) => {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const locationInfo = { city, region };

    const input: SuggestInsurancePoliciesInput = {
      age: parseInt(age),
      income: parseInt(income),
      medicalHistory,
      location: locationInfo,
    };

    try {
      const results = await suggestInsurancePolicies(input);
      setResults(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      // Handle error appropriately (e.g., display an error message)
      setResults({
        suggestedPolicies: [],
        error: "Failed to fetch eligibility results. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          required
        />
      </div>
      <div>
        <Label htmlFor="income">Annual Income</Label>
        <Input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter your annual income"
          required
        />
      </div>
      <div>
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea
          id="medicalHistory"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          placeholder="Enter a brief summary of your medical history"
          required
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          required
        />
      </div>
      <div>
        <Label htmlFor="region">Region</Label>
        <Input
          type="text"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Enter your region"
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Eligibility"}
      </Button>
    </form>
  );
};

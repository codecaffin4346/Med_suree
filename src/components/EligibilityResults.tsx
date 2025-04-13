import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EligibilityResultsProps {
  results: any;
}

export const EligibilityResults: React.FC<EligibilityResultsProps> = ({
  results,
}) => {
  if (results.error) {
    return <div className="text-red-500">{results.error}</div>;
  }

  if (!results.suggestedPolicies || results.suggestedPolicies.length === 0) {
    return <div>No eligibility results found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Eligibility Results</h2>
      <div className="grid gap-4">
        {results.suggestedPolicies.map((policy: any) => (
          <Card key={policy.name}>
            <CardHeader>
              <CardTitle>{policy.name}</CardTitle>
              <CardDescription>
                Confidence Score: <Badge>{(policy.confidenceScore * 100).toFixed(2)}%</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{policy.description}</p>
              <p>
                <strong>Eligibility Criteria:</strong> {policy.eligibilityCriteria}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

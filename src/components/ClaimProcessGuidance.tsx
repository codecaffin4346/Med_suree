import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ClaimProcessGuidance: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Claim Process Guidance</h2>
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Instructions</CardTitle>
          <CardDescription>
            Follow these steps to successfully claim your insurance benefits:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5">
            <li>
              <p>
                <strong>Step 1: Gather Required Documents</strong>
              </p>
              <p>
                Collect all necessary documents such as your insurance card,
                identification, medical records, and receipts.
              </p>
            </li>
            <li>
              <p>
                <strong>Step 2: Fill Out the Claim Form</strong>
              </p>
              <p>
                Obtain a claim form from your insurance provider's website or
                office. Fill it out accurately with all required information.
              </p>
            </li>
            <li>
              <p>
                <strong>Step 3: Submit the Claim</strong>
              </p>
              <p>
                Submit the claim form along with the required documents to your
                insurance provider through their online portal, by mail, or in
                person.
              </p>
            </li>
            <li>
              <p>
                <strong>Step 4: Follow Up</strong>
              </p>
              <p>
                Keep track of your claim status and follow up with your
                insurance provider if you do not receive a response within the
                expected timeframe.
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, Info, AlertCircle } from 'lucide-react';

interface FormData {
  age: number;
  income: number;
  employmentStatus: string;
  maritalStatus: string;
  children: number;
  healthStatus: string;
  veteran: boolean;
  disability: boolean;
  state: string;
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibilityPoints: string[];
  coverage: string[];
  matchScore: number;
  url: string;
}

const initialFormData: FormData = {
  age: 35,
  income: 45000,
  employmentStatus: 'employed',
  maritalStatus: 'single',
  children: 0,
  healthStatus: 'good',
  veteran: false,
  disability: false,
  state: 'california'
};

// Mock schemes data (in a real app, this would come from an API)
const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'Medicaid',
    description: 'Federal and state program that helps with medical costs for some people with limited income and resources.',
    eligibilityPoints: [
      'Income below state threshold',
      'Based on household size',
      'Special provisions for pregnant women, children, elderly, and disabled'
    ],
    coverage: [
      'Doctor visits',
      'Hospital stays',
      'Long-term medical services',
      'Preventive care for children'
    ],
    matchScore: 0,
    url: 'https://www.medicaid.gov/'
  },
  {
    id: '2',
    name: 'Children\'s Health Insurance Program (CHIP)',
    description: 'Insurance program that provides low-cost health coverage to children in families that earn too much to qualify for Medicaid.',
    eligibilityPoints: [
      'Children under 19 years old',
      'Family income above Medicaid limits but still moderate',
      'Specific income limits vary by state'
    ],
    coverage: [
      'Routine check-ups',
      'Immunizations',
      'Doctor visits',
      'Prescriptions',
      'Dental and vision care'
    ],
    matchScore: 0,
    url: 'https://www.healthcare.gov/medicaid-chip/childrens-health-insurance-program/'
  },
  {
    id: '3',
    name: 'Medicare',
    description: 'Federal health insurance program for people who are 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease.',
    eligibilityPoints: [
      'Age 65 or older',
      'Younger with qualifying disabilities',
      'Any income level, but costs vary'
    ],
    coverage: [
      'Hospital insurance (Part A)',
      'Medical insurance (Part B)',
      'Medicare Advantage Plans (Part C)',
      'Prescription drug coverage (Part D)'
    ],
    matchScore: 0,
    url: 'https://www.medicare.gov/'
  },
  {
    id: '4',
    name: 'Healthcare Marketplace Subsidies',
    description: 'Financial assistance to help pay for health insurance purchased through the Health Insurance Marketplace.',
    eligibilityPoints: [
      'Income between 100% and 400% of Federal Poverty Level',
      'Not eligible for other qualifying coverage',
      'File taxes jointly if married'
    ],
    coverage: [
      'Premium tax credits',
      'Cost-sharing reductions for Silver plans',
      'Access to private insurance plans'
    ],
    matchScore: 0,
    url: 'https://www.healthcare.gov/lower-costs/'
  },
  {
    id: '5',
    name: 'Veterans Health Administration (VA)',
    description: 'Healthcare system for eligible veterans of the U.S. armed forces.',
    eligibilityPoints: [
      'Former active-duty service members with other than dishonorable discharge',
      'Priority groups based on service-connected disabilities and income',
      'Minimum duty requirements may apply'
    ],
    coverage: [
      'Primary care',
      'Specialty care',
      'Mental health services',
      'Prescription medications',
      'Home health and geriatric care'
    ],
    matchScore: 0,
    url: 'https://www.va.gov/health-care/'
  }
];

const SchemesFinder = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Calculate matches based on form data
  const findMatchingSchemes = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const matchedSchemes = mockSchemes.map(scheme => {
        let score = 0;
        
        // Calculate matching score based on eligibility criteria
        // This is a simplified example - a real system would have more complex matching logic
        
        if (scheme.id === '1') { // Medicaid
          if (formData.income < 30000) score += 50;
          if (formData.healthStatus === 'poor') score += 20;
          if (formData.employmentStatus === 'unemployed') score += 20;
          if (formData.children > 0) score += 10;
        }
        
        if (scheme.id === '2') { // CHIP
          if (formData.children > 0) score += 50;
          if (formData.income < 60000 && formData.income > 30000) score += 30;
          if (formData.age < 50) score += 20;
        }
        
        if (scheme.id === '3') { // Medicare
          if (formData.age >= 65) score += 80;
          if (formData.disability) score += 50;
          if (formData.healthStatus === 'poor') score += 20;
        }
        
        if (scheme.id === '4') { // Marketplace Subsidies
          if (formData.income > 30000 && formData.income < 100000) score += 40;
          if (formData.employmentStatus === 'self-employed') score += 30;
          if (formData.age < 65) score += 20;
          if (formData.healthStatus !== 'poor') score += 10;
        }
        
        if (scheme.id === '5') { // VA
          if (formData.veteran) score += 100;
          // If not a veteran, don't show this option at all
          if (!formData.veteran) score = 0;
        }
        
        return {
          ...scheme,
          matchScore: score
        };
      });
      
      // Sort by match score and filter out non-matches
      const sortedMatches = matchedSchemes
        .filter(scheme => scheme.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);
      
      setSchemes(sortedMatches);
      setLoading(false);
      
      // If we have results, switch to results tab
      if (sortedMatches.length > 0) {
        setActiveTab('results');
      }
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findMatchingSchemes();
  };
  
  const handleReset = () => {
    setFormData(initialFormData);
    setSchemes([]);
    setCurrentStep(1);
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const getMatchScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-100 text-green-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  const getMatchLabel = (score: number) => {
    if (score >= 70) return 'Strong Match';
    if (score >= 40) return 'Potential Match';
    return 'Possible Match';
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="questionnaire" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questionnaire">Eligibility Questionnaire</TabsTrigger>
          <TabsTrigger value="results" disabled={schemes.length === 0}>Recommended Schemes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questionnaire" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-medsure-primary">Find Government Healthcare Schemes</CardTitle>
              <CardDescription>
                Answer the questions to discover healthcare schemes you may be eligible for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Information */}
                <div className={currentStep === 1 ? 'block' : 'hidden'}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-medsure-primary">Step 1: Basic Information</h3>
                      <Badge variant="outline">1 of 3</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-medsure-primary h-2.5 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        min="0" 
                        max="120" 
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                        required
                      />
                    </div>
                    
                    {/* Income */}
                    <div className="space-y-2">
                      <Label htmlFor="income">Annual Household Income (USD)</Label>
                      <Input 
                        id="income" 
                        type="number" 
                        min="0" 
                        step="1000" 
                        value={formData.income}
                        onChange={(e) => setFormData({...formData, income: parseInt(e.target.value) || 0})}
                        required
                      />
                    </div>
                    
                    {/* Employment Status */}
                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Employment Status</Label>
                      <Select 
                        value={formData.employmentStatus}
                        onValueChange={(value) => setFormData({...formData, employmentStatus: value})}
                      >
                        <SelectTrigger id="employmentStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed Full-time</SelectItem>
                          <SelectItem value="part-time">Employed Part-time</SelectItem>
                          <SelectItem value="self-employed">Self-employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* State */}
                    <div className="space-y-2">
                      <Label htmlFor="state">State of Residence</Label>
                      <Select 
                        value={formData.state}
                        onValueChange={(value) => setFormData({...formData, state: value})}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="florida">Florida</SelectItem>
                          <SelectItem value="illinois">Illinois</SelectItem>
                          <SelectItem value="other">Other State</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: Family Information */}
                <div className={currentStep === 2 ? 'block' : 'hidden'}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-medsure-primary">Step 2: Family Information</h3>
                      <Badge variant="outline">2 of 3</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-medsure-primary h-2.5 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Marital Status */}
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <RadioGroup 
                        value={formData.maritalStatus}
                        onValueChange={(value) => setFormData({...formData, maritalStatus: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" />
                          <Label htmlFor="single">Single</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="married" id="married" />
                          <Label htmlFor="married">Married</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="divorced" id="divorced" />
                          <Label htmlFor="divorced">Divorced</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="widowed" id="widowed" />
                          <Label htmlFor="widowed">Widowed</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Children */}
                    <div className="space-y-2">
                      <Label htmlFor="children">Number of Dependent Children</Label>
                      <Input 
                        id="children" 
                        type="number" 
                        min="0" 
                        max="10" 
                        value={formData.children}
                        onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})}
                        required
                      />
                      <p className="text-xs text-gray-500">Under 18 years old or qualifying dependents</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3: Health Information */}
                <div className={currentStep === 3 ? 'block' : 'hidden'}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-medsure-primary">Step 3: Health & Special Status</h3>
                      <Badge variant="outline">3 of 3</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-medsure-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Status */}
                    <div className="space-y-2">
                      <Label htmlFor="healthStatus">General Health Status</Label>
                      <Select 
                        value={formData.healthStatus}
                        onValueChange={(value) => setFormData({...formData, healthStatus: value})}
                      >
                        <SelectTrigger id="healthStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor/Chronic Conditions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Veteran Status */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="veteran">Military Veteran</Label>
                        <Switch
                          id="veteran"
                          checked={formData.veteran}
                          onCheckedChange={(checked) => setFormData({...formData, veteran: checked})}
                        />
                      </div>
                      <p className="text-xs text-gray-500">Served in U.S. Armed Forces, National Guard, or Reserves</p>
                    </div>
                    
                    {/* Disability */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="disability">Disability Status</Label>
                        <Switch
                          id="disability"
                          checked={formData.disability}
                          onCheckedChange={(checked) => setFormData({...formData, disability: checked})}
                        />
                      </div>
                      <p className="text-xs text-gray-500">Have a qualifying disability or medical condition</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-6">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button type="button" className="btn-primary" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? "Finding Schemes..." : "Find Eligible Schemes"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          {schemes.length > 0 ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-medsure-primary">Your Recommended Schemes</CardTitle>
                  <CardDescription>
                    Based on your information, these healthcare schemes may be suitable for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    {schemes.map((scheme) => (
                      <Card key={scheme.id} className="border-medsure-primary/20">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl text-medsure-primary">{scheme.name}</CardTitle>
                            <Badge className={getMatchScoreColor(scheme.matchScore)}>
                              {getMatchLabel(scheme.matchScore)}
                            </Badge>
                          </div>
                          <CardDescription>
                            {scheme.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                                <Info className="h-4 w-4 text-medsure-primary" />
                                <span>Eligibility Criteria</span>
                              </h4>
                              <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                                {scheme.eligibilityPoints.map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                                <Check className="h-4 w-4 text-medsure-primary" />
                                <span>Coverage</span>
                              </h4>
                              <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                                {scheme.coverage.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Application info */}
                          <div className="mt-4 p-3 bg-blue-50 rounded-md">
                            <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                              <AlertCircle className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-800">How to Apply</span>
                            </h4>
                            <p className="text-sm text-blue-800">
                              Visit the official website for complete eligibility details and application process.
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" className="text-sm">
                            Save for Later
                          </Button>
                          <a href={scheme.url} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-medsure-primary hover:bg-medsure-dark text-sm">
                              Visit Official Website
                            </Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {schemes.length === 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      <span>No Matching Schemes Found</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-700">
                      Based on the information provided, we couldn't find any schemes that match your profile. You might want to:
                    </p>
                    <ul className="list-disc ml-5 mt-2 text-yellow-700 space-y-1">
                      <li>Review and update your information</li>
                      <li>Check if you qualify for private insurance through the Health Insurance Marketplace</li>
                      <li>Contact a healthcare navigator for personalized assistance</li>
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex justify-between">
                <Button 
                  onClick={() => setActiveTab('questionnaire')}
                  variant="outline"
                >
                  Back to Questionnaire
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-medsure-primary text-medsure-primary"
                >
                  Start New Search
                </Button>
              </div>
            </div>
          ) : (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500 mb-4">Please complete the questionnaire first to see results</p>
                <Button 
                  onClick={() => setActiveTab('questionnaire')}
                  className="bg-medsure-primary text-white hover:bg-medsure-dark"
                >
                  Go to Questionnaire
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchemesFinder;

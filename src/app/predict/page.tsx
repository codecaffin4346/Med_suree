"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FormData {
  age: number;
  gender: string;
  bmi: number;
  children: number;
  smoker: boolean;
  region: string;
  income: number;
  existingConditions: boolean;
}

const initialFormData: FormData = {
  age: 30,
  gender: 'male',
  bmi: 24.5,
  children: 0,
  smoker: false,
  region: 'northeast',
  income: 50000,
  existingConditions: false
};

const PredictionForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  interface Prediction {
    annualCost: number;
    monthlyCost: number;
    breakdown: { name: string; value: number }[];
    riskFactors: boolean;
    recommendation: string;
  }

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Mock prediction function - in a real app, this would call an API
  const predictCost = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock calculation (this would come from ML model in production)
      const baseCost = 5000;
      const ageFactor = formData.age * 50;
      const bmiAdjustment = (formData.bmi > 30 ? formData.bmi - 30 : 0) * 200;
      const smokerMultiplier = formData.smoker ? 1.7 : 1;
      const childrenCost = formData.children * 1000;
      const existingConditionsCost = formData.existingConditions ? 2000 : 0;
      
      const totalCost = (baseCost + ageFactor + bmiAdjustment + childrenCost + existingConditionsCost) * smokerMultiplier;
      
      // Create cost breakdown for visualization
      const costBreakdown = [
        { name: 'Base Premium', value: baseCost },
        { name: 'Age Factor', value: ageFactor },
        { name: 'BMI Adjustment', value: bmiAdjustment },
        { name: 'Children', value: childrenCost },
        { name: 'Health Conditions', value: existingConditionsCost },
        { name: 'Smoking Status', value: (baseCost + ageFactor + bmiAdjustment + childrenCost + existingConditionsCost) * (smokerMultiplier - 1) }
      ].filter(item => item.value > 0);
      
      setPrediction({
        annualCost: Math.round(totalCost),
        monthlyCost: Math.round(totalCost / 12),
        breakdown: costBreakdown,
        riskFactors: formData.smoker || formData.bmi > 30 || formData.existingConditions,
        recommendation: formData.income < 30000 ? "You may qualify for subsidized insurance options." : "Standard insurance plans recommended."
      });
      
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    predictCost();
  };
  
  const handleReset = () => {
    setFormData(initialFormData);
    setPrediction(null);
  };
  
  // Colors for charts
  const COLORS = ['#2A6B5D', '#3D8C7D', '#5ABEAA', '#F17B60', '#F49C87', '#F7BEA9'];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="basic" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="additional" disabled={!prediction}>Results & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-medsure-primary">Predict Your Insurance Cost</CardTitle>
              <CardDescription>
                Fill out the form below to get an estimated insurance premium based on your profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      min="18" 
                      max="100" 
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  
                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* BMI */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
                      <span className="text-sm text-gray-500">{formData.bmi.toFixed(1)}</span>
                    </div>
                    <Slider
                      id="bmi"
                      min={15}
                      max={50}
                      step={0.1}
                      value={[formData.bmi]}
                      onValueChange={(value) => setFormData({...formData, bmi: value[0]})}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                  
                  {/* Children */}
                  <div className="space-y-2">
                    <Label htmlFor="children">Number of Children</Label>
                    <Input 
                      id="children" 
                      type="number" 
                      min="0" 
                      max="10" 
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  
                  {/* Smoker Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smoker">Smoker</Label>
                      <Switch
                        id="smoker"
                        checked={formData.smoker}
                        onCheckedChange={(checked) => setFormData({...formData, smoker: checked})}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Tobacco use significantly affects insurance premiums</p>
                  </div>
                  
                  {/* Region */}
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select 
                      value={formData.region}
                      onValueChange={(value) => setFormData({...formData, region: value})}
                    >
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="northwest">Northwest</SelectItem>
                        <SelectItem value="southeast">Southeast</SelectItem>
                        <SelectItem value="southwest">Southwest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Income */}
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (USD)</Label>
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
                  
                  {/* Existing Conditions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="existingConditions">Pre-existing Health Conditions</Label>
                      <Switch
                        id="existingConditions"
                        checked={formData.existingConditions}
                        onCheckedChange={(checked) => setFormData({...formData, existingConditions: checked})}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Chronic conditions, diseases, or ongoing treatments</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Premium"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Results Preview (if prediction exists) */}
          {prediction && (
            <Card className="mt-6 border-medsure-secondary/20">
              <CardHeader className="bg-medsure-secondary/10 rounded-t-lg">
                <CardTitle className="text-xl text-medsure-primary">Your Estimated Insurance Cost</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Annual Premium</p>
                    <p className="text-4xl font-bold text-medsure-primary">${prediction.annualCost.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Monthly Payment</p>
                    <p className="text-4xl font-bold text-medsure-secondary">${prediction.monthlyCost.toLocaleString()}</p>
                  </div>
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                  Click on "Results & Analysis" tab for detailed breakdown and recommendations
                </p>
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={() => setActiveTab('additional')}
                    className="bg-medsure-primary text-white hover:bg-medsure-dark"
                  >
                    View Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="additional" className="mt-6">
          {prediction ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-medsure-primary">Cost Breakdown Analysis</CardTitle>
                  <CardDescription>
                    Understanding what factors contribute to your insurance premium.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bar Chart */}
                    <div className="h-80">
                      <p className="text-sm font-medium text-center mb-2">Cost Components</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prediction.breakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
                          <YAxis />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Bar dataKey="value" fill="#2A6B5D" name="Amount (USD)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Pie Chart */}
                    <div className="h-80">
                      <p className="text-sm font-medium text-center mb-2">Percentage Breakdown</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prediction.breakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {prediction.breakdown.map((entry: { name: string; value: number }, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-medsure-primary">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-medsure-light rounded-lg">
                      <h3 className="text-lg font-medium text-medsure-primary mb-2">Insurance Type Recommendation</h3>
                      <p>{prediction.recommendation}</p>
                    </div>
                    
                    {prediction.riskFactors && (
                      <div className="p-4 bg-medsure-secondary/10 rounded-lg">
                        <h3 className="text-lg font-medium text-medsure-secondary mb-2">Risk Factors</h3>
                        <p>We've identified factors that are increasing your premium:</p>
                        <ul className="list-disc ml-5 mt-2">
                          {formData.smoker && <li>Smoking status significantly increases your premium</li>}
                          {formData.bmi > 30 && <li>BMI above 30 is classified as obese, increasing health risks</li>}
                          {formData.existingConditions && <li>Pre-existing conditions impact your insurance costs</li>}
                        </ul>
                      </div>
                    )}
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-700 mb-2">Potential Savings</h3>
                      <p>Ways you might be able to reduce your premium:</p>
                      <ul className="list-disc ml-5 mt-2">
                        {formData.smoker && (
                          <li>Quitting smoking could save you approximately ${Math.round(prediction.annualCost * 0.4).toLocaleString()} annually</li>
                        )}
                        {formData.bmi > 25 && (
                          <li>Reaching a healthier BMI could reduce your premium by 10-15%</li>
                        )}
                        <li>Consider a higher deductible plan if you're generally healthy</li>
                        <li>Check if your employer offers subsidized group insurance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  onClick={() => setActiveTab('basic')}
                  variant="outline"
                >
                  Back to Form
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-medsure-primary text-medsure-primary"
                >
                  Start New Prediction
                </Button>
              </div>
            </div>
          ) : (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500 mb-4">Please complete the form first to see results</p>
                <Button 
                  onClick={() => setActiveTab('basic')}
                  className="bg-medsure-primary text-white hover:bg-medsure-dark"
                >
                  Go to Form
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictionForm;

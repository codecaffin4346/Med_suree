
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, Settings, FileText, Heart, Home, LogOut, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for dashboard
const mockPredictions = [
  { id: 1, date: '2025-03-15', annualCost: 8750, monthlyCost: 729, factors: ['Age', 'BMI', 'Smoker'] },
  { id: 2, date: '2025-02-20', annualCost: 12500, monthlyCost: 1042, factors: ['Age', 'BMI', 'Children', 'Smoker'] }
];

const mockSchemes = [
  { id: 1, name: 'Medicaid', matchScore: 85, status: 'Eligible', saved: '2025-03-10' },
  { id: 2, name: 'Healthcare Marketplace Subsidies', matchScore: 72, status: 'Potentially Eligible', saved: '2025-02-25' }
];

const costBreakdown = [
  { name: 'Base Premium', value: 5000 },
  { name: 'Age Factor', value: 1500 },
  { name: 'BMI Adjustment', value: 800 },
  { name: 'Children', value: 1200 },
  { name: 'Smoking Status', value: 1500 }
];

const COLORS = ['#2A6B5D', '#3D8C7D', '#5ABEAA', '#F17B60', '#F49C87'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-medsure-primary p-2 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">John Smith</CardTitle>
                  <CardDescription>Member since April 2025</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1 px-2">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'overview' ? 'bg-medsure-light text-medsure-primary' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'predictions' ? 'bg-medsure-light text-medsure-primary' : ''}`}
                  onClick={() => setActiveTab('predictions')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Saved Predictions
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'schemes' ? 'bg-medsure-light text-medsure-primary' : ''}`}
                  onClick={() => setActiveTab('schemes')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Saved Schemes
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'profile' ? 'bg-medsure-light text-medsure-primary' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Button>
                
                <Separator className="my-2" />
                
                <Link to="/">
                  <Button variant="ghost" className="w-full justify-start text-gray-500 hover:text-gray-900">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-9">
          <TabsContent value="overview" className={activeTab === 'overview' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-medsure-primary to-medsure-dark text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back, John!</CardTitle>
                  <CardDescription className="text-white/80">
                    Here's a summary of your healthcare predictions and eligible schemes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-white/70 text-sm">Latest Insurance Estimate</p>
                      <p className="text-2xl font-bold">${mockPredictions[0].annualCost.toLocaleString()}/year</p>
                      <p className="text-white/70 text-sm">${mockPredictions[0].monthlyCost.toLocaleString()}/month</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-white/70 text-sm">Eligible Schemes</p>
                      <p className="text-2xl font-bold">{mockSchemes.length}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-white/20 hover:bg-white/30">
                          {mockSchemes[0].name}
                        </Badge>
                        {mockSchemes.length > 1 && <span className="text-white/70">+{mockSchemes.length - 1} more</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
                    <p className="text-white/80">Need to update your information?</p>
                    <Button className="bg-white text-medsure-primary hover:bg-white/90">
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown Analysis</CardTitle>
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
                        <BarChart data={costBreakdown}>
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
                            data={costBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {costBreakdown.map((entry, index) => (
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
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Insurance Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      You have {mockPredictions.length} saved predictions. Want to create a new one?
                    </p>
                    <Link to="/predict">
                      <Button className="w-full btn-primary">
                        Get New Prediction
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Government Schemes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      You have {mockSchemes.length} saved schemes. Want to find more options?
                    </p>
                    <Link to="/schemes">
                      <Button className="w-full bg-medsure-secondary hover:bg-medsure-secondary/90">
                        Find More Schemes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="predictions" className={activeTab === 'predictions' ? 'block' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle>Saved Insurance Predictions</CardTitle>
                <CardDescription>
                  View and compare your previous insurance cost predictions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPredictions.map((prediction) => (
                    <Card key={prediction.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Prediction from {new Date(prediction.date).toLocaleDateString()}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {prediction.factors.map((factor, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-2xl font-bold text-medsure-primary">${prediction.annualCost.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">${prediction.monthlyCost.toLocaleString()}/month</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button className="text-sm" variant="ghost">Delete</Button>
                          <Button className="text-sm bg-medsure-primary">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/predict">
                    <Button className="btn-primary flex items-center gap-2">
                      <span>Create New Prediction</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schemes" className={activeTab === 'schemes' ? 'block' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle>Saved Government Schemes</CardTitle>
                <CardDescription>
                  View government healthcare schemes you've saved for future reference.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchemes.map((scheme) => (
                    <Card key={scheme.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-medsure-primary">{scheme.name}</h3>
                            <p className="text-sm text-gray-500">Saved on {new Date(scheme.saved).toLocaleDateString()}</p>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right flex flex-col items-end">
                            <Badge className={
                              scheme.matchScore >= 80 ? 'bg-green-100 text-green-800' : 
                              scheme.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }>
                              {scheme.matchScore}% Match
                            </Badge>
                            <p className="text-sm text-gray-500 mt-1">{scheme.status}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button className="text-sm" variant="ghost">Remove</Button>
                          <Button className="text-sm" variant="outline">Application Steps</Button>
                          <Button className="text-sm bg-medsure-primary">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/schemes">
                    <Button className="btn-primary flex items-center gap-2">
                      <span>Find More Schemes</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className={activeTab === 'profile' ? 'block' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 flex items-center justify-center h-40">
                  Profile settings content would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PlanTrip: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: [5000],
    interests: [] as string[],
    travelStyle: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, budget: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.destination || !formData.startDate || !formData.endDate)) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    if (step === 2 && (!formData.travelStyle || formData.interests.length === 0)) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select your travel style and at least one interest",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit the form
      toast({
        title: "Trip plan created!",
        description: "Your personalized itinerary is ready",
      });
      navigate('/home');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const interests = [
    { id: 'nature', label: 'Nature & Outdoors' },
    { id: 'culture', label: 'Culture & Heritage' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'adventure', label: 'Adventure Activities' },
    { id: 'shopping', label: 'Shopping & Markets' },
    { id: 'wellness', label: 'Wellness & Spa' },
    { id: 'photography', label: 'Photography' },
    { id: 'festivals', label: 'Festivals & Events' },
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <Layout>
      <div className="p-6 mb-16">
        <h1 className="text-2xl font-bold font-heading mb-6">Plan Your Trip</h1>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Destination & Dates"}
              {step === 2 && "Your Preferences"}
              {step === 3 && "Review Your Plan"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Where would you like to go?</Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Goa, Rajasthan, Mumbai"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Budget Range (per person)</Label>
                  <div className="pt-6 pb-2">
                    <Slider
                      value={formData.budget}
                      onValueChange={handleSliderChange}
                      max={50000}
                      step={1000}
                      min={1000}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {formatCurrency(formData.budget[0])}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="travelStyle" className="mb-2 block">Travel Style</Label>
                  <Select 
                    value={formData.travelStyle} 
                    onValueChange={(value) => handleSelectChange('travelStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury Travel</SelectItem>
                      <SelectItem value="budget">Budget Friendly</SelectItem>
                      <SelectItem value="backpacker">Backpacker</SelectItem>
                      <SelectItem value="family">Family Trip</SelectItem>
                      <SelectItem value="solo">Solo Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Interests (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map(interest => (
                      <Button
                        key={interest.id}
                        type="button"
                        variant={formData.interests.includes(interest.id) ? "default" : "outline"}
                        onClick={() => toggleInterest(interest.id)}
                        className="justify-start"
                      >
                        {interest.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Trip Summary</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Destination:</span>
                    <span className="font-medium">{formData.destination}</span>
                    
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-medium">{formData.startDate} to {formData.endDate}</span>
                    
                    <span className="text-gray-500">Budget:</span>
                    <span className="font-medium">{formatCurrency(formData.budget[0])}</span>
                    
                    <span className="text-gray-500">Travel Style:</span>
                    <span className="font-medium capitalize">{formData.travelStyle}</span>
                    
                    <span className="text-gray-500">Interests:</span>
                    <span className="font-medium">
                      {formData.interests.map(i => {
                        const interest = interests.find(item => item.id === i);
                        return interest ? interest.label : i;
                      }).join(', ')}
                    </span>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm">
                    Your personalized itinerary will include recommendations for accommodation,
                    activities, and local experiences based on your preferences.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={nextStep}>
              {step < 3 ? "Next" : "Create Plan"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PlanTrip;

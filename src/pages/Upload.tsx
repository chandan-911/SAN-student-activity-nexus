
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addActivity, ActivityCategory } from '@/services/activityService';
import { toast } from '@/components/ui/use-toast';
import { Upload as UploadIcon, Check, Image } from 'lucide-react';

const Upload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    activity: '',
    description: '',
    date: '',
    category: 'academic' as ActivityCategory,
    file: null as File | null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value as ActivityCategory }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(prev => ({ ...prev, file }));
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast({
        title: "Missing certificate",
        description: "Please upload a certificate image",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Read file as data URL
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        
        addActivity({
          activity: formData.activity,
          description: formData.description,
          date: formData.date,
          category: formData.category,
          fileName: formData.file!.name,
          fileType: formData.file!.type,
          fileData,
          uploadedAt: new Date().toISOString(),
        });
        
        toast({
          title: "Certificate uploaded successfully",
          description: "Your activity has been recorded",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          activity: '',
          description: '',
          date: '',
          category: 'academic',
          file: null,
        });
        setPreviewUrl(null);
        
        // Reset file input by clearing its value
        const fileInput = document.getElementById('certificate') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      };
      
      reader.readAsDataURL(formData.file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your certificate",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Upload Certificate</h1>
          <p className="text-muted-foreground">
            Add a new certificate or achievement to your record
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>
                Enter the details of your achievement or activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="uploadForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity / Event Name</Label>
                  <Input 
                    id="activity" 
                    name="activity" 
                    placeholder="Enter the name of the activity or event"
                    value={formData.activity}
                    onChange={handleTextChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Provide a brief description of your achievement"
                    value={formData.description}
                    onChange={handleTextChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    value={formData.date}
                    onChange={handleTextChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificate">Certificate Image</Label>
                  <Input 
                    id="certificate" 
                    name="certificate" 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    required 
                    className="hidden"
                  />
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => document.getElementById('certificate')?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your certificate here, or click to select
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Supports: JPG, PNG, GIF (Max: 5MB)
                    </p>
                    {formData.file && (
                      <p className="mt-2 text-xs text-primary font-medium flex items-center justify-center">
                        <Check className="h-4 w-4 mr-1" /> {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">Processing...</span>
                  ) : (
                    <span className="flex items-center">
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload Certificate
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview your certificate before uploading
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] relative">
              {previewUrl ? (
                <div className="w-full animate-fade-in">
                  <img 
                    src={previewUrl} 
                    alt="Certificate Preview" 
                    className="max-h-[300px] mx-auto object-contain border border-border rounded-md p-2" 
                  />
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <Check className="inline-block h-4 w-4 mr-1 text-green-500" />
                    Preview ready
                  </div>
                </div>
              ) : (
                <div 
                  className="text-center p-8 border-2 border-dashed border-border rounded-lg w-full h-[300px] flex flex-col items-center justify-center animate-fade-in"
                >
                  <Image className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Upload an image to see a preview
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground text-center">
              Please ensure the certificate image is clear and legible
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;

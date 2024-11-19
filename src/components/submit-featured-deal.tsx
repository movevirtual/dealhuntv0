import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  'Indie Deals',
  'LLC Setup',
  'Cloud',
  'AI',
  'Marketing',
  'Design',
  'Social media',
  'Boilerplates',
  'Development',
  'Finance',
  'E-commerce',
  'Assets',
  'Productivity',
];

export const SubmitFeaturedDeal = ({ isDark }: { isDark: boolean }) => {
  const [formData, setFormData] = useState({
    productName: '',
    categories: [] as string[],
    subtext: '',
    originalPrice: '',
    discountPrice: '',
    discountCode: '',
    discountLength: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email to nick@movevirtual.co
      const emailContent = `
        New Featured Deal Submission:
        
        Product Name: ${formData.productName}
        Categories: ${formData.categories.join(', ')}
        Subtext: ${formData.subtext}
        Original Price: ${formData.originalPrice}
        Discount Price: ${formData.discountPrice}
        Discount Code: ${formData.discountCode}
        Discount Length: ${formData.discountLength}
      `;

      // Here you would implement your email sending logic
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        {!isSubmitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Submit Your Featured Deal</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Fill out the form below to submit your featured deal. We'll review and publish it within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                  className={`w-full rounded-lg px-3 py-2 text-sm ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              {/* Categories */}
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Categories *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subtext */}
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Subtext *
                </label>
                <input
                  type="text"
                  value={formData.subtext}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtext: e.target.value }))}
                  className={`w-full rounded-lg px-3 py-2 text-sm ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Original Price *
                  </label>
                  <input
                    type="text"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="$99"
                    className={`w-full rounded-lg px-3 py-2 text-sm ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Discount Price/Percentage *
                  </label>
                  <input
                    type="text"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountPrice: e.target.value }))}
                    placeholder="$49 or 50%"
                    className={`w-full rounded-lg px-3 py-2 text-sm ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Discount Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.discountCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountCode: e.target.value }))}
                    className={`w-full rounded-lg px-3 py-2 text-sm ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Discount Length (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.discountLength}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountLength: e.target.value }))}
                    placeholder="7 days"
                    className={`w-full rounded-lg px-3 py-2 text-sm ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Featured Deal'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Thank you for submitting your featured deal!
            </div>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We'll review your submission and get back to you within 24 hours.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Back to Deals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
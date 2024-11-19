import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const dealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  discount: z.string().min(1, 'Discount is required'),
  creator: z.string().min(1, 'Creator is required'),
  featured: z.boolean().default(false),
  url: z.string().url('Must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().min(1, 'Long description is required'),
  promoCode: z.string().optional(),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  stats: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  reviews: z.array(z.object({
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    content: z.string(),
    rating: z.number().min(1).max(5),
    source: z.string()
  })).optional()
});

type DealFormData = z.infer<typeof dealSchema>;

export const AddDeal = () => {
  const [features, setFeatures] = useState(['']);
  const [stats, setStats] = useState([{ label: '', value: '' }]);
  const [reviews, setReviews] = useState([{
    author: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    source: ''
  }]);

  const { register, handleSubmit, formState: { errors } } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      featured: false,
    },
  });

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const addStat = () => setStats([...stats, { label: '', value: '' }]);
  const removeStat = (index: number) => {
    if (stats.length > 1) {
      setStats(stats.filter((_, i) => i !== index));
    }
  };

  const addReview = () => setReviews([...reviews, {
    author: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    source: ''
  }]);
  const removeReview = (index: number) => {
    if (reviews.length > 1) {
      setReviews(reviews.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: DealFormData) => {
    try {
      // Add UTM parameters to URL
      const url = new URL(data.url);
      url.searchParams.append('utm_source', 'dealhunt');
      url.searchParams.append('utm_medium', 'referral');
      url.searchParams.append('utm_campaign', 'deals');
      
      const dealData = {
        ...data,
        url: url.toString(),
        stats: stats.reduce((acc, stat) => ({
          ...acc,
          [stat.label]: stat.value
        }), {}),
        reviews: reviews.map(review => ({
          ...review,
          rating: parseInt(review.rating.toString())
        }))
      };

      const { error } = await supabase
        .from('deals')
        .insert([dealData]);

      if (error) throw error;
      alert('Deal added successfully!');
    } catch (error) {
      console.error('Error adding deal:', error);
      alert('Error adding deal. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Deal</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              {...register('title')}
              className="w-full p-2 border rounded"
              placeholder="e.g., Stripe Atlas"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              {...register('category')}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              <option value="ai">AI Tools</option>
              <option value="saas">SaaS Tools</option>
              <option value="dev">Developer Tools</option>
              <option value="design">Design Resources</option>
              <option value="hosting">Hosting & Domains</option>
              <option value="marketing">Marketing</option>
              <option value="productivity">Productivity</option>
              <option value="business">Business & Finance</option>
              <option value="education">Learning</option>
              <option value="nocode">No-Code Tools</option>
              <option value="database">Database & Backend</option>
              <option value="analytics">Analytics</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Discount *</label>
            <input
              {...register('discount')}
              className="w-full p-2 border rounded"
              placeholder="e.g., 50% OFF or $100 OFF"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Creator *</label>
            <input
              {...register('creator')}
              className="w-full p-2 border rounded"
              placeholder="Company or creator name"
            />
            {errors.creator && (
              <p className="text-red-500 text-sm mt-1">{errors.creator.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL *</label>
          <input
            {...register('url')}
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Description *</label>
          <input
            {...register('description')}
            className="w-full p-2 border rounded"
            placeholder="Brief description of the deal"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Long Description *</label>
          <textarea
            {...register('longDescription')}
            className="w-full p-2 border rounded h-32"
            placeholder="Detailed description of the deal"
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Promo Code (Optional)</label>
          <input
            {...register('promoCode')}
            className="w-full p-2 border rounded"
            placeholder="e.g., SAVE50"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Features *</label>
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {features.map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                {...register(`features.${index}`)}
                className="flex-1 p-2 border rounded"
                placeholder="Feature description"
              />
              {features.length > 1 && (
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Stats (Optional)</label>
            <Button type="button" variant="outline" size="sm" onClick={addStat}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {stats.map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                {...register(`stats.${index}.label`)}
                className="flex-1 p-2 border rounded"
                placeholder="Stat label (e.g., Active Users)"
              />
              <input
                {...register(`stats.${index}.value`)}
                className="flex-1 p-2 border rounded"
                placeholder="Stat value (e.g., 10,000+)"
              />
              {stats.length > 1 && (
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Reviews (Optional)</label>
            <Button type="button" variant="outline" size="sm" onClick={addReview}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {reviews.map((_, index) => (
            <div key={index} className="border rounded p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  {...register(`reviews.${index}.author`)}
                  className="p-2 border rounded"
                  placeholder="Author name"
                />
                <input
                  {...register(`reviews.${index}.role`)}
                  className="p-2 border rounded"
                  placeholder="Role (optional)"
                />
                <input
                  {...register(`reviews.${index}.company`)}
                  className="p-2 border rounded"
                  placeholder="Company (optional)"
                />
                <input
                  {...register(`reviews.${index}.source`)}
                  className="p-2 border rounded"
                  placeholder="Source (e.g., Trustpilot)"
                />
              </div>
              <textarea
                {...register(`reviews.${index}.content`)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Review content"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <select
                  {...register(`reviews.${index}.rating`)}
                  className="p-2 border rounded"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                {reviews.length > 1 && (
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeReview(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('featured')}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium">Featured Deal</span>
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Add Deal
        </Button>
      </form>
    </div>
  );
};
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export const useSpecialOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ADD imageFile as a second parameter here
  const submitOrder = async (form: HTMLFormElement, imageFile: File | null = null) => {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const itemName = formData.get('itemName') as string;
    const sku = formData.get('sku') as string;
    const brand = formData.get('brand') as string;
    const description = formData.get('description') as string;
    
    let image_url = null;

    console.log("Did the hook get the notes?", description);
    console.log("Did the hook get the image?", imageFile);

    try {
      // Use the directly passed imageFile from React State
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload the raw File object directly
        const { error: uploadError } = await supabase.storage
          .from('special-orders')
          .upload(fileName, imageFile); 

        if (uploadError) {
          console.error("Supabase Upload Error:", uploadError);
          throw new Error('Failed to upload image. Please try again.');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('special-orders')
          .getPublicUrl(fileName);

        image_url = publicUrl;
      }

      const { error: dbError } = await supabase
        .from('special_orders')
        .insert([
          {
            customer_name: name,
            phone: phone,
            email: email,
            item_name: itemName,
            sku: sku || null,
            brand: brand || null,
            description: description || null,
            image_url: image_url,
            status: 'pending',
          }
        ]);

      if (dbError) throw dbError;

      setSubmitted(true);
      form.reset();

    } catch (err: any) {
      console.error('Error submitting order:', err);
      setError(err.message || 'An error occurred while submitting your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitOrder, isSubmitting, submitted, error, setSubmitted };
};
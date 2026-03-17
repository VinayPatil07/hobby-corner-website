import { useState } from 'react';

// ensure this is the LATEST URL from "New Deployment"
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHFKI2fZNLtJPz-_Eo-LANuOYElSj9VGY8GbtBSN8K1YytuAffVNdrXKDHguiFOKFO/exec";

export const useSpecialOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToGoogle = async (data: any) => {
    try {
      // Native fetch utilizing POST for serverless transmission [cite: 103, 112]
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Mandatory for cross-origin Google Apps Script 
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Since 'no-cors' provides an opaque response, we assume success if no catch [cite: 103]
      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Failed to connect to order server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOrder = (formElement: HTMLFormElement) => {
    setIsSubmitting(true);
    setError(null);

    // Capture inputs using FormData API [cite: 97, 112]
    const formData = new FormData(formElement);
    const payload: any = {};
    
    // Explicitly mapping keys to ensure Google Sheets alignment 
    formData.forEach((value, key) => { 
      payload[key] = value; 
    });

    const fileInput = formElement.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    // Image Upload and Base64 Transformation [cite: 99, 102, 112]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        payload.imageFile = reader.result; // Base64 encoded string [cite: 102]
        payload.imageName = file.name;
        sendToGoogle(payload);
      };
      reader.onerror = () => {
        setError("Could not process image file.");
        setIsSubmitting(false);
      };
      reader.readAsDataURL(file);
    } else {
      sendToGoogle(payload);
    }
  };

  return { submitOrder, isSubmitting, submitted, error, setSubmitted };
};
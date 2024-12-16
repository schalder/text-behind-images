import React, { useState } from 'react';

interface ImageProcessorProps {
  onLogout: () => void;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ onLogout }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      // TODO: Implement image processing
      const reader = new FileReader();
      reader.onloadend = () => {
        setProcessedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Text Behind Image Editor</h1>
        <button 
          onClick={onLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full p-2 border rounded"
          />
          {uploadedImage && (
            <div className="mt-4">
              <h2 className="text-xl mb-2">Original Image</h2>
              <img 
                src={URL.createObjectURL(uploadedImage)} 
                alt="Uploaded" 
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>

        <div>
          {processedImage && (
            <div>
              <h2 className="text-xl mb-2">Processed Image</h2>
              <img 
                src={processedImage} 
                alt="Processed" 
                className="max-w-full h-auto"
              />
              <button 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = processedImage;
                  link.download = 'processed_image.png';
                  link.click();
                }}
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageProcessor;

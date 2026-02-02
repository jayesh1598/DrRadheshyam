import { useState, useRef } from 'react';
import { Upload, Loader2, AlertCircle, Check } from 'lucide-react';
import { compressImage, isValidImageFile, formatFileSize } from '../utils/imageCompress';
import { uploadToGitHub, generateUniqueFilename } from '../utils/githubUpload';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  uploadPath?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  required = false,
  uploadPath = 'gallery',
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);

    // Validate file
    if (!isValidImageFile(file)) {
      setError('Please select a valid image file (JPG, PNG, WebP, or GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setOriginalSize(file.size);

    try {
      // Compress image
      const compressedBlob = await compressImage(file, 0.75);
      setCompressedSize(compressedBlob.size);

      // Generate unique filename
      const filename = generateUniqueFilename(file.name);

      // Upload to GitHub
      const imageUrl = await uploadToGitHub(compressedBlob, filename, uploadPath);

      // Update form value
      onChange(imageUrl);
      setSuccess(true);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id={`image-upload-${label}`}
        />

        <label
          htmlFor={`image-upload-${label}`}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
              <p className="text-sm text-gray-600">Compressing and uploading...</p>
            </>
          ) : success ? (
            <>
              <Check className="w-8 h-8 text-green-600" />
              <p className="text-sm text-green-600 font-medium">
                Upload successful!
              </p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP or GIF (Max 10MB)
              </p>
            </>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Compression Stats */}
      {originalSize > 0 && !isUploading && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>Original size: {formatFileSize(originalSize)}</p>
          {compressedSize > 0 && (
            <>
              <p>Compressed size: {formatFileSize(compressedSize)}</p>
              <p>
                Reduction: {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
              </p>
            </>
          )}
        </div>
      )}

      {/* Current Image URL */}
      {value && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-600 font-medium truncate">
              Image URL set successfully
            </p>
          </div>
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

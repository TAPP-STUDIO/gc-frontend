'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image as ImageIcon, Check, AlertTriangle, Download } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/toast';
import { DashboardButton } from '@/components/dashboard';

export interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
  status: 'uploading' | 'success' | 'error' | 'pending';
  progress?: number;
  error?: string;
  url?: string;
}

// Basic file upload component
export function FileUpload({
  onFileSelect,
  accept = "*/*",
  multiple = false,
  maxSize = 10, // 10MB default
  maxFiles = 5,
  className = '',
  disabled = false,
  children
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { error } = useToast();

  const validateFile = useCallback((file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `Soubor je příliš velký (max. ${maxSize}MB)`;
    }
    
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type.replace('*', '.*'));
      });
      
      if (!isAccepted) {
        return 'Nepodporovaný typ souboru';
      }
    }
    
    return null;
  }, [maxSize, accept]);

  const handleFileSelect = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      error('Lze vybrat pouze jeden soubor', '');
      return;
    }
    
    if (fileArray.length > maxFiles) {
      error(`Lze vybrat maximálně ${maxFiles} souborů`, '');
      return;
    }
    
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    fileArray.forEach(file => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push(file);
      }
    });
    
    if (errors.length > 0) {
      error('Chyba při nahrávání', errors.join('\n'));
    }
    
    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  }, [multiple, maxFiles, validateFile, error, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [disabled, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg transition-all cursor-pointer
        ${isDragOver 
          ? 'border-[#F9D523] bg-[#F9D523]/10' 
          : 'border-white/30 hover:border-white/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files) {
            handleFileSelect(e.target.files);
          }
        }}
        className="hidden"
        disabled={disabled}
      />
      
      {children || (
        <div className="p-8 text-center">
          <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <div className="text-white mb-2">
            Přetáhněte soubory sem nebo klikněte pro výběr
          </div>
          <div className="text-white/60 text-sm">
            {accept !== "*/*" && `Podporované formáty: ${accept}`}
            {maxSize && ` • Max. velikost: ${maxSize}MB`}
          </div>
        </div>
      )}
    </div>
  );
}

// Image upload with preview
interface ImageUploadProps extends Omit<FileUploadProps, 'accept'> {
  onImageSelect: (files: File[]) => void;
  showPreview?: boolean;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'free';
}

export function ImageUpload({
  onImageSelect,
  multiple = false,
  maxSize = 5,
  showPreview = true,
  aspectRatio = 'free',
  className = '',
  disabled = false
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (files: File[]) => {
    onImageSelect(files);
    
    if (showPreview) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews);
    }
  };

  const removePreview = (index: number) => {
    setPreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      return newPreviews;
    });
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    free: ''
  };

  return (
    <div className={className}>
      <FileUpload
        onFileSelect={handleFileSelect}
        accept="image/*"
        multiple={multiple}
        maxSize={maxSize}
        disabled={disabled}
      >
        <div className="p-6 text-center">
          <ImageIcon className="w-10 h-10 text-white/40 mx-auto mb-3" />
          <div className="text-white mb-2">Nahrajte obrázky</div>
          <div className="text-white/60 text-sm">
            PNG, JPG, GIF • Max. {maxSize}MB
          </div>
        </div>
      </FileUpload>
      
      {showPreview && previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden bg-white/10 ${aspectRatioClasses[aspectRatio]}`}
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
              <button
                onClick={() => removePreview(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// File upload with progress tracking
interface FileUploadWithProgressProps extends FileUploadProps {
  onUpload?: (files: File[]) => Promise<void>;
  uploadEndpoint?: string;
}

export function FileUploadWithProgress({
  onFileSelect,
  onUpload,
  uploadEndpoint,
  ...props
}: FileUploadWithProgressProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { success, error } = useToast();

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const handleFileSelect = async (files: File[]) => {
    onFileSelect(files);
    
    const newFiles: UploadedFile[] = files.map(file => ({
      file,
      id: generateFileId(),
      status: 'pending',
      progress: 0,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Start upload
    if (onUpload) {
      setIsUploading(true);
      try {
        await uploadFiles(newFiles);
        success('Soubory nahrány', 'Všechny soubory byly úspěšně nahrány');
      } catch {
        error('Chyba při nahrávání', 'Některé soubory se nepodařilo nahrát');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const uploadFiles = async (filesToUpload: UploadedFile[]) => {
    for (const uploadedFile of filesToUpload) {
      try {
        setUploadedFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ));

        if (uploadEndpoint) {
          // Upload via API endpoint
          await uploadFileToEndpoint(uploadedFile);
        } else if (onUpload) {
          // Use provided upload function
          await onUpload([uploadedFile.file]);
        } else {
          throw new Error('No upload method provided');
        }

        setUploadedFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'success', progress: 100 }
            : f
        ));
      } catch (uploadError) {
        setUploadedFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'error', error: uploadError instanceof Error ? uploadError.message : 'Upload failed' }
            : f
        ));
      }
    }
  };

  const uploadFileToEndpoint = async (uploadedFile: UploadedFile) => {
    if (!uploadEndpoint) return;

    const formData = new FormData();
    formData.append('file', uploadedFile.file);

    const xhr = new XMLHttpRequest();
    
    return new Promise<void>((resolve, reject) => {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadedFiles(prev => prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, progress }
              : f
          ));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            setUploadedFiles(prev => prev.map(f => 
              f.id === uploadedFile.id 
                ? { ...f, url: response.url }
                : f
            ));
            resolve();
          } catch {
            reject(new Error('Invalid response'));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));
      
      xhr.open('POST', uploadEndpoint);
      xhr.send(formData);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const retryUpload = async (fileId: string) => {
    const fileToRetry = uploadedFiles.find(f => f.id === fileId);
    if (fileToRetry) {
      await uploadFiles([fileToRetry]);
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload
        {...props}
        onFileSelect={handleFileSelect}
        disabled={isUploading}
      />
      
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Nahrané soubory</h4>
          {uploadedFiles.map(uploadedFile => (
            <FileUploadItem
              key={uploadedFile.id}
              uploadedFile={uploadedFile}
              onRemove={() => removeFile(uploadedFile.id)}
              onRetry={() => retryUpload(uploadedFile.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual file upload item
interface FileUploadItemProps {
  uploadedFile: UploadedFile;
  onRemove: () => void;
  onRetry: () => void;
}

function FileUploadItem({ uploadedFile, onRemove, onRetry }: FileUploadItemProps) {
  const { file, status, progress = 0, error, preview, url } = uploadedFile;
  
  const statusIcons = {
    pending: <File className="w-5 h-5 text-white/60" />,
    uploading: <div className="w-5 h-5 border-2 border-[#F9D523] border-t-transparent rounded-full animate-spin" />,
    success: <Check className="w-5 h-5 text-green-500" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500" />
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center space-x-4">
        
        {/* Preview or icon */}
        <div className="flex-shrink-0">
          {preview ? (
            <>
              <div className="relative w-12 h-12">
                <Image
                  src={preview}
                  alt={`Preview of ${file.name}`}
                  fill
                  className="object-cover rounded"
                  sizes="48px"
                  unoptimized
                />
              </div>
            </>
          ) : (
            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
              <File className="w-6 h-6 text-white/60" />
            </div>
          )}
        </div>
        
        {/* File info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-white truncate">
              {file.name}
            </p>
            <div className="flex items-center space-x-2">
              {statusIcons[status]}
              {status === 'uploading' && (
                <span className="text-xs text-white/60">{progress}%</span>
              )}
            </div>
          </div>
          
          <p className="text-xs text-white/60">
            {formatFileSize(file.size)}
          </p>
          
          {/* Progress bar */}
          {status === 'uploading' && (
            <div className="mt-2 w-full bg-white/10 rounded-full h-1">
              <div
                className="bg-[#F9D523] h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          {/* Error message */}
          {status === 'error' && error && (
            <p className="text-xs text-red-400 mt-1">{error}</p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          {status === 'success' && url && (
            <DashboardButton
              onClick={() => window.open(url, '_blank')}
              variant="ghost"
              size="sm"
            >
              <Download className="w-4 h-4" />
            </DashboardButton>
          )}
          
          {status === 'error' && (
            <DashboardButton
              onClick={onRetry}
              variant="secondary"
              size="sm"
            >
              Zkusit znovu
            </DashboardButton>
          )}
          
          <button
            onClick={onRemove}
            className="p-1 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Avatar upload component
interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (file: File) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  size = 'md',
  className = ''
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      onAvatarChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} rounded-full overflow-hidden bg-white/10 border-2 border-white/20
          cursor-pointer hover:border-[#F9D523] transition-colors group
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Avatar preview"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
            unoptimized
          />
        ) : currentAvatar ? (
          <Image
            src={currentAvatar}
            alt="User avatar"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-white/40 group-hover:text-[#F9D523]" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect([e.target.files[0]]);
          }
        }}
        className="hidden"
      />
    </div>
  );
}

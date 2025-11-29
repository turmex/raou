import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Download, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    IMAGE_REQUIREMENTS,
    resizeImage,
    validateImageFormat,
    downloadBlob,
    type ImageRequirements,
} from "@/lib/imageUtils";

interface ImageUploaderProps {
    imageName: string;
    currentImagePath: string;
}

export const ImageUploader = ({ imageName, currentImagePath }: ImageUploaderProps) => {
    const [processing, setProcessing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();

    const requirements = IMAGE_REQUIREMENTS[imageName];

    if (!requirements) {
        return null;
    }

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setProcessing(true);

        try {
            // Validate format
            if (!validateImageFormat(file, requirements.formats)) {
                toast({
                    title: "Invalid Format",
                    description: `Please upload one of: ${requirements.formats.join(", ")}`,
                    variant: "destructive",
                });
                setProcessing(false);
                return;
            }

            // Resize image
            const resizedBlob = await resizeImage(
                file,
                requirements.width,
                requirements.height,
                0.9
            );

            // Check size
            const sizeKB = resizedBlob.size / 1024;
            if (sizeKB > requirements.maxSizeKB) {
                toast({
                    title: "Image Too Large",
                    description: `Image is ${sizeKB.toFixed(0)}KB, max is ${requirements.maxSizeKB}KB. Try a lower quality image.`,
                    variant: "destructive",
                });
                setProcessing(false);
                return;
            }

            // Create preview
            const previewUrl = URL.createObjectURL(resizedBlob);
            setPreview(previewUrl);

            // Upload to server
            const formData = new FormData();
            formData.append('image', resizedBlob, imageName);
            formData.append('filename', imageName);

            const response = await fetch('http://localhost:3001/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const result = await response.json();

            toast({
                title: "Image Uploaded Successfully! 🎉",
                description: `${imageName} has been automatically replaced. The website will refresh in a moment.`,
            });

            // Trigger a page reload after a short delay to see the new image
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            toast({
                title: "Upload Failed",
                description: error instanceof Error ? error.message : "Failed to upload image. Make sure the upload server is running.",
                variant: "destructive",
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <Label className="text-base font-semibold">{requirements.name}</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                                Current: {imageName}
                            </p>
                        </div>
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
                        <p className="text-xs font-semibold text-blue-900">Requirements:</p>
                        <ul className="text-xs text-blue-800 space-y-0.5">
                            <li>• Size: {requirements.width}x{requirements.height}px</li>
                            <li>• Max file size: {requirements.maxSizeKB}KB</li>
                            <li>• Formats: {requirements.formats.join(", ")}</li>
                        </ul>
                    </div>

                    {/* Current Image Preview */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                            src={currentImagePath}
                            alt={requirements.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>

                    {/* New Image Preview */}
                    {preview && (
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-green-500">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                New
                            </div>
                        </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => document.getElementById(`upload-${imageName}`)?.click()}
                            disabled={processing}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {processing ? "Processing..." : "Upload New Image"}
                        </Button>
                        <input
                            id={`upload-${imageName}`}
                            type="file"
                            accept={requirements.formats.map(f => `.${f}`).join(",")}
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>

                    {/* Instructions */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex gap-2">
                            <AlertCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-green-800">
                                <p className="font-semibold mb-1">✨ Fully Automatic Upload:</p>
                                <ol className="list-decimal list-inside space-y-0.5">
                                    <li>Click "Upload New Image" and select your image</li>
                                    <li>Image is auto-resized and validated</li>
                                    <li>File is automatically replaced in <code className="bg-green-100 px-1 rounded">src/assets/</code></li>
                                    <li>Website refreshes automatically - Done! 🎉</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

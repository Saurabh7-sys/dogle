"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        if (data.success) setImages(data.data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFiles = async (files) => {
    setUploading(true);
    let uploaded = 0;
    let failed = 0;

    for (const file of files) {
      uploaded++;
      setUploadProgress(`Uploading ${uploaded}/${files.length}: ${file.name}`);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });
        
        let data;
        try {
          data = await res.json();
        } catch (parseErr) {
          console.error("Failed to parse response. Server might have returned a 413 Payload Too Large error.", parseErr);
          failed++;
          continue;
        }

        if (data.success) {
          setImages((prev) => [data.data, ...prev]);
        } else {
          failed++;
        }
      } catch (err) {
        console.error("Upload failed for:", file.name, err);
        failed++;
      }
    }

    setUploading(false);
    setUploadProgress("");
    
    if (failed > 0) {
      alert(`Finished, but ${failed} image(s) failed to upload. They might be too large or there was a network error.`);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      uploadFiles(files);
      // Clear the input so the same file can be selected again if needed
      e.target.value = null; 
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) uploadFiles(files);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-[var(--admin-text-primary)] mb-2">
          Gallery Manager
        </h1>
        <p className="text-lg text-[var(--admin-text-secondary)]">
          Upload, manage, and organize your gallery images. Photos are stored on
          Cloudinary and displayed on the public gallery.
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className={`glass-panel rounded-2xl p-8 mb-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-[var(--admin-accent)] bg-[var(--admin-accent-light)]"
              : "border-[var(--admin-border)] hover:border-[var(--admin-accent)]"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">
                cloud_upload
              </span>
            </div>
            {uploading ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
                  <p className="text-lg font-bold text-[var(--admin-text-primary)]">
                    {uploadProgress}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-[var(--admin-text-primary)]">
                  {dragActive
                    ? "Drop your images here!"
                    : "Drag & drop images here, or click to browse"}
                </p>
                <p className="text-sm text-[var(--admin-text-muted)]">
                  Supports JPG, PNG, WebP • Multiple files supported
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--admin-text-primary)]">
          Uploaded Images ({images.length})
        </h2>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-[var(--admin-skeleton-base)] animate-pulse"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined text-6xl text-[var(--admin-text-muted)] mb-4 block">
            photo_library
          </span>
          <p className="text-lg text-[var(--admin-text-secondary)]">
            No images uploaded yet. Drop some photos above to get started!
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative aspect-square rounded-xl overflow-hidden glass-panel"
              >
                <Image
                  src={img.src}
                  alt="Gallery image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Delete overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img.id);
                    }}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}

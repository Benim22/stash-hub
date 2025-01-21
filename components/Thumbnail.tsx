"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
  isVisible?: boolean; // Optional prop to control visibility
  onClose?: () => void; // Callback when the thumbnail is manually closed
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
  isVisible = true, // Default to visible
  onClose,
}: Props) => {
  const [isCardVisible, setCardVisible] = useState(isVisible);
  const isImage = type === "image" && extension !== "svg";

  // Handle manual close
  const handleClose = () => {
    setCardVisible(false);
    if (onClose) onClose(); // Call parent callback if provided
  };

  if (!isCardVisible) {
    return null;
  }

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
      />
      {/* Add a close button to allow users to dismiss the thumbnail */}
      <button
        onClick={handleClose}
        className="bg-red-500 absolute right-2 top-2 rounded px-2 py-1 text-sm text-white"
      >
        Close
      </button>
    </figure>
  );
};

export default Thumbnail;

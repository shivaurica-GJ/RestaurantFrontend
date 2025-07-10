export const getOptimizedImageUrl = (imagePath, width = 800) => {
  // Remove the leading './' if present
  const cleanPath = imagePath.replace(/^\.\//, '');
  
  // For development, return the original path
  if (process.env.NODE_ENV === 'development') {
    return imagePath;
  }

  // In production, you can use an image optimization service
  // Example with ImageKit.io (you would need to set this up)
  // return `https://ik.imagekit.io/your_account/${cleanPath}?tr=w-${width}`;
  
  // For now, return the original path
  return imagePath;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}; 
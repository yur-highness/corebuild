interface ProductImagesProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export const ProductImages = ({ images, productName, selectedImage, onImageSelect }: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-slate-800">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? 'border-blue-500' : 'border-slate-600'
            }`}
          >
            <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

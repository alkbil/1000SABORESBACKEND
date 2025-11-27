import React, { useState } from 'react';

const ProductImage = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    setHasError(true);
    console.error(`❌ Error cargando imagen: ${src}`);
  };

  const handleLoad = () => {
    setHasError(false);
    console.log(`✅ Imagen cargada exitosamente: ${src}`);
  };

  if (hasError) {
    return (
      <div 
        className="product-image-fallback"
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6c757d',
          fontSize: '14px',
          border: '2px dashed #dee2e6',
          borderRadius: '12px'
        }}
      >
        <span style={{ fontSize: '24px', marginBottom: '8px' }}>🍰</span>
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      style={{ 
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        display: 'block',
        borderRadius: '12px'
      }}
    />
  );
};

export default ProductImage;
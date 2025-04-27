import { useEffect, useRef, useState } from 'react';


const LazyImage = ({ src, className='', placeholder="/img/icons/logo-192.png", alt, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
            
            <img
                ref={imgRef}
                src={isVisible ? src : placeholder}
                alt={alt}
                onLoad={()=>setLoaded(true)}
                className={`${className} ${!isLoaded && 'animate-pulse'}`}
                {...props}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                }}
            />
            
    );
};

export {
    LazyImage
}
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = ({ title, subtitle, ctaText, ctaLink }) => {
    return (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                <p className="text-xl md:text-2xl text-primary-100 mb-8">{subtitle}</p>
                {ctaText && ctaLink && (
                    <Link to={ctaLink}>
                        <Button variant="secondary" size="lg">
                            {ctaText}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Hero;

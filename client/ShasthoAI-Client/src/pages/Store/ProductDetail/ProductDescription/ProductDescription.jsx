import React from 'react';
import { Info, AlertCircle, Heart } from 'lucide-react';

/**
 * ProductDescription Component
 * 
 * Detailed product information including usage, warnings, and benefits
 * Uses product data from useStore
 */
const ProductDescription = ({ product }) => {
  // Generate detailed description based on product data
  const detailedDescription = `${product.name} is a high-quality medication designed for effective relief. ${product.description} This product is manufactured by ${product.manufacturer} following strict quality standards.`;

  const benefits = [
    `Effective ${product.category} relief`,
    'Fast-acting formula',
    'Trusted by healthcare professionals',
    'High patient satisfaction',
    'Quality guaranteed'
  ];

  const usage = `Take as directed by your healthcare provider. Typically used for ${product.category.replace('-', ' ')}. Consult with a doctor for proper dosage.`;

  const warnings = product.prescription 
    ? 'PRESCRIPTION REQUIRED. Consult with a healthcare professional before use. Do not use if allergic to any ingredients. Keep out of reach of children.'
    : 'Consult with a healthcare professional before use if you have existing medical conditions. Do not use if allergic to any ingredients. Keep out of reach of children.';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        
        {/* Left Column - Description & Benefits */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-3 text-blue-600" />
              Product Description
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {detailedDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-3 text-red-500" />
              Key Benefits
            </h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Usage & Warnings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">
              Usage Instructions
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 font-medium">{usage}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 text-amber-500" />
              Important Warnings
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-medium">{warnings}</p>
            </div>
          </div>

          {/* Product Specifications */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">
              Product Specifications
            </h3>
            <div className="grid gap-3">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Dosage</span>
                <span className="font-semibold text-slate-900">{product.dosage}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Form</span>
                <span className="font-semibold text-slate-900">{product.dosage.includes('tablets') ? 'Tablets' : product.dosage.includes('gel') ? 'Gel' : 'Capsules'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Category</span>
                <span className="font-semibold text-slate-900 capitalize">{product.category.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Manufacturer</span>
                <span className="font-semibold text-slate-900">{product.manufacturer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Prescription</span>
                <span className="font-semibold text-slate-900">{product.prescription ? 'Required' : 'Not Required'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
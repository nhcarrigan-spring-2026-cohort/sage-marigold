import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import LocationAutocomplete from "../components/LocationAutoComplete.jsx";

const Donate = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const maxImages = 5;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    location: '',
    pickupInstructions: '',
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      setErrors(prev => ({
        ...prev,
        images: `You can only upload up to ${maxImages} images. You currently have ${images.length}.`
      }));
      return;
    }

    const validFiles = [];
    let hasError = false;

    files.forEach((file) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          images: 'Only JPEG, PNG, and WebP images are allowed'
        }));
        hasError = true;
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          images: `Image "${file.name}" is too large. Maximum size is 5MB.`
        }));
        hasError = true;
        return;
      }

      validFiles.push({
        id: Date.now() + Math.random(),
        file: file,
        preview: URL.createObjectURL(file)
      });
    });

    if (!hasError && validFiles.length > 0) {
      setImages(prev => [...prev, ...validFiles]);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }

    e.target.value = '';
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Item title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select a condition';
    }

    if (!formData.location || !formData.latitude || !formData.longitude) {
      newErrors.location = 'Please select a valid pickup location from suggestions';
    }

    if (images.length === 0) {
      newErrors.images = 'At least 1 photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      condition: '',
      location: '',
      pickupInstructions: '',
      latitude: null, 
      longitude: null,
    });
    
    images.forEach(image => URL.revokeObjectURL(image.preview));
    setImages([]);
    
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();

      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('condition', formData.condition);
      submitData.append('location', formData.location);
      submitData.append('pickupInstructions', formData.pickupInstructions);

      images.forEach((image) => {
        submitData.append('images', image.file);
      });

      const response = await fetch('/api/donations', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        throw new Error('Failed to submit donation');
      }

      const result = await response.json();
      console.log('Success:', result);

      setShowSuccess(true);
      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Error:', error);
      setErrors({
        submit: 'Failed to submit donation. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = ({ address, latitude, longitude }) => {
  setFormData(prev => ({
    ...prev,
    location: address,
    latitude,
    longitude
  }));

  if (errors.location) {
    setErrors(prev => ({
      ...prev,
      location: ''
    }));
  }
};

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">List an Item to Donate</h2>
          <p className="text-gray-600 mt-1">
            Help someone in need by donating items you no longer need. Share your abundance! ❤️
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-800">
                Item Listed Successfully!
              </h3>
              <p className="text-sm text-emerald-700 mt-1">
                Your donation has been posted. Someone in need will be grateful!
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800">
                Submission Failed
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {errors.submit}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              Item Photos
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Add at least 1 photo * ({images.length}/{maxImages})
              </span>
              {errors.images && (
                <span className="text-sm text-red-600">{errors.images}</span>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleImageUpload}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages((prev) =>
                        prev.filter((img) => img.id !== image.id)
                      );
                      URL.revokeObjectURL(image.preview);
                    }}
                    className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1.5 hover:bg-black/70 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {Array.from({ length: maxImages - images.length }).map((_, index) => (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  key={`empty-${index}`}
                  className="w-full cursor-pointer aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-emerald-500 transition-colors"
                >
                  <FaPlus className="text-gray-400 text-lg mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                </button>
              ))}
            </div>

            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">
                Click any empty box to upload photos (Max {maxImages})
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPEG, PNG, WebP only (Max 5MB per image)
              </p>
            </div>
          </div>
              {/* item title */}
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center justify-between text-sm font-medium">
              <span>Item Title *</span>
              <span className="text-xs text-gray-500">{formData.title.length}/100</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
              placeholder="e.g., Black leather bag in good condition"
              className={`w-full cursor-pointer px-3 py-2 rounded-md border bg-[#f3f3f5] text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500 ${
                errors.title ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

            {/* item description */}
          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center justify-between text-sm font-medium">
              <span>Description *</span>
              <span className="text-xs text-gray-500">{formData.description.length}/500</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={500}
              rows={4}
              placeholder="Describe the item's condition, size, any defects, etc."
              className={`w-full cursor-pointer px-3 py-2 rounded-md border bg-[#f3f3f5] text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500 resize-none ${
                errors.description ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* item category */}
            <div className="space-y-2">
              <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full rounded-md cursor-pointer border px-3 py-2 text-sm bg-[#f3f3f5] outline-none transition-all focus:ring-2 focus:ring-emerald-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                <option value="furniture">Furniture</option>
                <option value="appliances">Appliances</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="sports">Sports & Outdoors</option>
                <option value="kitchen">Kitchen Items</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category}</p>
              )}
            </div>
              {/* item condition */}
            <div className="space-y-2">
              <label htmlFor="condition" className="flex items-center gap-2 text-sm font-medium">
                Condition *
              </label>
              <select
                id="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className={`w-full cursor-pointer rounded-md border px-3 py-2 text-sm bg-[#f3f3f5] outline-none transition-all focus:ring-2 focus:ring-emerald-500 ${
                  errors.condition ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Condition</option>
                <option value="new">New - Never used</option>
                <option value="like-new">Like New - Barely used</option>
                <option value="good">Good - Some wear but functional</option>
                <option value="fair">Fair - Signs of use but works</option>
                <option value="poor">Poor - Heavy wear, may need repair</option>
              </select>
              {errors.condition && (
                <p className="text-sm text-red-600">{errors.condition}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Pickup Location *
            </label>
            <LocationAutocomplete onLocationSelect={handleLocationSelect} />
            <p className="text-xs text-gray-500">
              General area only. Exact address shared after confirmation.
            </p>
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="pickupInstructions" className="text-sm font-medium">
              Pickup Instructions (Optional)
            </label>
            <textarea
              id="pickupInstructions"
              value={formData.pickupInstructions}
              onChange={handleInputChange}
              rows={3}
              placeholder="e.g., Available weekends only, call before coming, etc."
              className="w-full cursor-pointer px-3 py-2 rounded-md border border-transparent bg-[#f3f3f5] text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-emerald-700 text-white px-6 py-3 outline-none inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all flex-1 rounded-md hover:bg-emerald-800 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'List Item'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
                  resetForm();
                  window.history.back();
                }
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donate;
// This file contains detailed information about all services

const serviceDetails = {
  // Daily Wear Category
  "regular-dry-cleaning": {
    id: "regular-dry-cleaning",
    name: "Regular Dry Cleaning",
    category: "daily",
    description: "Professional dry cleaning for regular clothes",
    fullDescription: "Our regular dry cleaning service uses premium environmentally-friendly solvents to gently clean your everyday garments. Each item is carefully inspected, pre-treated for stains, cleaned, and finished to perfection.",
    price: "₹69",
    priceDetails: "per piece",
    turnaround: "24-48 hours",
    popular: true,
    benefits: [
      "Safe for most fabrics",
      "Stain pre-treatment included",
      "Professional pressing",
      "Preserves color and texture"
    ],
    process: [
      "Inspection & tagging",
      "Stain pre-treatment",
      "Dry cleaning in eco-friendly solvent",
      "Professional pressing",
      "Quality check & packaging"
    ],
    recommendedFor: [
      "Regular shirts & trousers",
      "Cotton & synthetic garments",
      "Light stains & everyday dirt",
      "Maintaining garment shape"
    ]
  },
  "wash-fold": {
    id: "wash-fold",
    name: "Wash & Fold",
    category: "daily",
    description: "Washing, drying and folding service",
    fullDescription: "Our Wash & Fold service offers complete care for your everyday laundry needs. We use high-quality detergents and fabric softeners to ensure your clothes come back clean, fresh, and neatly folded.",
    price: "₹99/kg",
    priceDetails: "minimum 3kg",
    turnaround: "24 hours",
    popular: true,
    benefits: [
      "Time-saving bulk laundry solution",
      "Premium detergents used",
      "Properly sorted by color & fabric",
      "Neatly folded & packaged"
    ],
    process: [
      "Sorting by color & fabric type",
      "Pre-treatment of visible stains",
      "Machine wash with premium detergents",
      "Tumble dry at appropriate temperature",
      "Careful folding & packaging"
    ],
    recommendedFor: [
      "Everyday clothes & casuals",
      "Bed linens & towels",
      "Regular laundry needs",
      "Bulk clothing items"
    ]
  },
  "ironing-service": {
    id: "ironing-service",
    name: "Ironing Service",
    category: "daily",
    description: "Professional pressing for wrinkle-free clothes",
    fullDescription: "Our professional ironing service ensures your garments look their best with crisp, wrinkle-free results. Each item is carefully pressed by experienced staff using professional equipment for a perfect finish.",
    price: "₹25/piece",
    priceDetails: "discounts for bulk orders",
    turnaround: "Same day",
    popular: true,
    benefits: [
      "Professional crisp finish",
      "Steam technology for better results",
      "Garment-specific temperature settings",
      "Folded or hung according to preference"
    ],
    process: [
      "Inspection & sorting by fabric type",
      "Proper temperature selection",
      "Steam pressing for optimal results",
      "Folding or hanging as requested",
      "Quality check & packaging"
    ],
    recommendedFor: [
      "Business shirts & formal wear",
      "Cotton & linen garments",
      "Pleated skirts & trousers",
      "Daily office wear"
    ]
  },
  "wash-iron": {
    id: "wash-iron",
    name: "Wash & Iron",
    category: "daily",
    description: "Complete laundry with washing and ironing",
    fullDescription: "Our Wash & Iron service combines thorough cleaning with professional pressing for a complete garment care solution. Your clothes are carefully washed, dried, and expertly ironed for a clean, crisp finish.",
    price: "₹129/kg",
    priceDetails: "minimum 2kg",
    turnaround: "24-48 hours",
    popular: false,
    benefits: [
      "Complete garment care in one service",
      "Professional wash and pressing",
      "Stain pre-treatment included",
      "Organized packaging by garment type"
    ],
    process: [
      "Sorting by color & fabric type",
      "Pre-treatment of stains",
      "Machine wash with appropriate detergents",
      "Controlled drying to prevent shrinkage",
      "Professional pressing & finishing",
      "Quality check & packaging"
    ],
    recommendedFor: [
      "Regular office wear",
      "Family laundry needs",
      "Cotton & everyday fabrics",
      "Weekly laundry maintenance"
    ]
  },
  
  // Premium Category
  "premium-suit-care": {
    id: "premium-suit-care",
    name: "Premium Suit Care",
    category: "premium",
    description: "Specialized cleaning for suits and formal wear",
    fullDescription: "Our premium suit care service provides meticulous cleaning and maintenance for your valuable suits and formal wear. We use gentle cleaning methods and hand-finishing techniques to preserve the structure, fabric, and details of your garments.",
    price: "₹399/piece",
    priceDetails: "includes jacket and trouser",
    turnaround: "48 hours",
    popular: true,
    benefits: [
      "Preserves fabric & structure",
      "Hand-finishing",
      "Stain treatment",
      "Proper pressing & packaging"
    ],
    process: [
      "Inspection & assessment",
      "Spot treatment for stains",
      "Gentle cleaning method",
      "Hand-finished pressing",
      "Careful packaging"
    ],
    recommendedFor: [
      "Wool & delicate suits",
      "Business wear",
      "Formal event preparation",
      "Seasonal storage preparation"
    ],
    addon: {
      name: "Suit Protection Package",
      description: "Includes breathable garment bag and cedar blocks",
      price: "₹199 extra"
    }
  },
  "designer-wear": {
    id: "designer-wear",
    name: "Designer Wear Care",
    category: "premium",
    description: "Expert care for luxury and designer clothing",
    fullDescription: "Our designer wear service provides exceptional care for your high-end fashion and luxury garments. Our specialists are trained to handle delicate fabrics, intricate embellishments, and unique construction elements with the utmost attention to detail.",
    price: "₹499/piece",
    priceDetails: "price may vary based on complexity",
    turnaround: "72 hours",
    popular: false,
    benefits: [
      "Expert handling of luxury fabrics",
      "Preservation of embellishments",
      "Hand cleaning when required",
      "Specialized pressing techniques"
    ],
    process: [
      "Individual garment assessment",
      "Customized cleaning plan",
      "Gentle hand cleaning when necessary",
      "Careful treatment of embellishments",
      "Expert finishing & packaging"
    ],
    recommendedFor: [
      "Haute couture & designer pieces",
      "Garments with sequins or beading",
      "Silk, cashmere & other luxury fabrics",
      "Heritage & vintage clothing"
    ],
    addon: {
      name: "Luxury Preservation Package",
      description: "Acid-free tissue, garment bag and handling instructions",
      price: "₹299 extra"
    }
  },
  "wedding-dress": {
    id: "wedding-dress",
    name: "Wedding Dress",
    category: "premium",
    description: "Expert care for wedding dresses and formal gowns",
    fullDescription: "Our wedding dress cleaning service provides meticulous care and preservation for your cherished wedding gown. Our specialists handle every detail, from delicate beadwork to intricate lace, ensuring your precious dress is beautifully preserved for generations.",
    price: "₹799/piece",
    priceDetails: "includes preservation box",
    turnaround: "5-7 days",
    popular: false,
    benefits: [
      "Expert handling of delicate fabrics and details",
      "Stain removal, including hidden stains",
      "Preservation against yellowing",
      "Museum-quality preservation option"
    ],
    process: [
      "Detailed assessment and photography",
      "Stain identification and treatment",
      "Hand cleaning with specialized solutions",
      "Careful detailing of embellishments and trim",
      "Acid-free packaging for long-term preservation"
    ],
    recommendedFor: [
      "Wedding gowns of all fabric types",
      "Heirloom dresses and veils",
      "Heavily beaded or embellished gowns",
      "Long-term preservation needs"
    ],
    addon: {
      name: "Heritage Preservation Box",
      description: "Museum-quality acid-free preservation box with viewing window",
      price: "₹499 extra"
    }
  },
  "leather-suede": {
    id: "leather-suede",
    name: "Leather & Suede",
    category: "premium",
    description: "Specialized cleaning for leather and suede items",
    fullDescription: "Our leather and suede cleaning service provides expert care for your valuable leather garments and accessories. Using specialized techniques and conditioners, we clean, restore, and preserve your leather and suede items to maintain their appearance and extend their life.",
    price: "₹599/piece",
    priceDetails: "varies by item size",
    turnaround: "3-5 days",
    popular: true,
    benefits: [
      "Specialized cleaning agents for leather",
      "Stain and spot treatment",
      "Conditioning to prevent drying and cracking",
      "Color restoration where possible"
    ],
    process: [
      "Assessment of leather type and condition",
      "Gentle cleaning with leather-specific products",
      "Spot treatment for stains and discoloration",
      "Conditioning and polishing",
      "Careful drying at controlled temperature"
    ],
    recommendedFor: [
      "Leather jackets and coats",
      "Suede garments and accessories",
      "Leather bags and purses",
      "Leather furniture pieces (small)"
    ],
    addon: {
      name: "Leather Protection Treatment",
      description: "Water and stain repellent application for future protection",
      price: "₹199 extra"
    }
  },
  
  // Home Care Category
  "carpet-cleaning": {
    id: "carpet-cleaning",
    name: "Carpet Cleaning",
    category: "home",
    description: "Deep cleaning for carpets and rugs",
    fullDescription: "Our comprehensive carpet cleaning service removes deep-seated dirt, stains and allergens from your carpets and rugs. We use advanced extraction methods and premium cleaning solutions to restore your carpets while protecting their fibers and colors.",
    price: "₹30/sq.ft",
    priceDetails: "minimum 50 sq.ft",
    turnaround: "3-4 days",
    popular: true,
    benefits: [
      "Removes deep dirt & allergens",
      "Stain treatment included",
      "Odor elimination",
      "Extends carpet life"
    ],
    process: [
      "Inspection & pre-treatment",
      "Dirt extraction & deep cleaning",
      "Stain treatment",
      "Hot water extraction",
      "Drying & final grooming"
    ],
    recommendedFor: [
      "Area rugs & carpets",
      "High-traffic carpeted areas",
      "Removing pet odors & stains",
      "Seasonal deep cleaning"
    ],
    addon: {
      name: "Carpet Protection Treatment",
      description: "Stain-resistant coating application",
      price: "₹10/sq.ft extra"
    }
  },
  "curtain-cleaning": {
    id: "curtain-cleaning",
    name: "Curtain Cleaning",
    category: "home",
    description: "Professional cleaning for all types of curtains",
    fullDescription: "Our curtain cleaning service provides thorough cleaning and care for all types of window treatments. We carefully remove dust, allergens, and stains while preserving the fabric's color and texture, helping your curtains look fresh and extend their lifespan.",
    price: "₹149/piece",
    priceDetails: "based on standard sizes",
    turnaround: "3 days",
    popular: true,
    benefits: [
      "Removes dust, pollen & allergens",
      "Preserves fabric & color",
      "Deodorizes & refreshes",
      "Extends curtain lifespan"
    ],
    process: [
      "Assessment of fabric & construction",
      "Gentle dust removal",
      "Appropriate cleaning method selection",
      "Stain treatment if required",
      "Careful drying & pressing",
      "Rehang service available (additional fee)"
    ],
    recommendedFor: [
      "All types of curtains & drapes",
      "Sheer & delicate fabrics",
      "Heavy or lined curtains",
      "Seasonal deep cleaning"
    ],
    addon: {
      name: "Rehang Service",
      description: "Professional reinstallation of your curtains",
      price: "₹99/set"
    }
  },
  "sofa-cleaning": {
    id: "sofa-cleaning",
    name: "Sofa Cleaning",
    category: "home",
    description: "Refresh your sofa with deep cleaning service",
    fullDescription: "Our professional sofa cleaning service removes dirt, stains, and allergens deeply embedded in your upholstery. Using specialized equipment and eco-friendly cleaning solutions, we restore the appearance of your sofa while extending its lifespan.",
    price: "₹299/seat",
    priceDetails: "minimum 2 seats",
    turnaround: "2-3 days",
    popular: false,
    benefits: [
      "Removes deep-seated dirt and allergens",
      "Eliminates odors and freshens fabric",
      "Stain treatment included",
      "Extends upholstery life"
    ],
    process: [
      "Inspection and pre-treatment assessment",
      "Vacuuming to remove surface debris",
      "Pre-treatment of visible stains",
      "Deep extraction cleaning",
      "Fabric protection treatment (optional)",
      "Controlled drying process"
    ],
    recommendedFor: [
      "Fabric upholstered sofas and chairs",
      "Regularly used family furniture",
      "Homes with pets or children",
      "Seasonal deep cleaning"
    ],
    addon: {
      name: "Fabric Protection Treatment",
      description: "Stain-resistant coating application for future protection",
      price: "₹149/seat extra"
    }
  },
  "bedding-package": {
    id: "bedding-package",
    name: "Bedding Package",
    category: "home",
    description: "Complete cleaning for bedsheets, covers & pillowcases",
    fullDescription: "Our comprehensive bedding package provides thorough cleaning for all your bed linens, including sheets, duvet covers, pillowcases, and bed covers. We remove allergens, dust mites, and stains while maintaining fabric softness and freshness.",
    price: "₹349/set",
    priceDetails: "standard queen/king set",
    turnaround: "2-3 days",
    popular: true,
    benefits: [
      "Eliminates dust mites and allergens",
      "Removes body oils and perspiration residue",
      "Hygienic cleaning at optimal temperature",
      "Proper folding and packaging"
    ],
    process: [
      "Sorting and inspection of items",
      "Pre-treatment of stains and marks",
      "Washing with premium detergents",
      "High-temperature sanitization",
      "Controlled drying and finishing",
      "Neat folding and packaging"
    ],
    recommendedFor: [
      "Seasonal bedding changes",
      "Allergy sufferers",
      "Guest room preparation",
      "Regular bedding maintenance"
    ],
    addon: {
      name: "Scented Fabric Softener",
      description: "Premium softener in lavender or fresh linen scent",
      price: "₹49 extra"
    }
  },
  
  // Express Category
  "express-dry-clean": {
    id: "express-dry-clean",
    name: "Express Dry Clean",
    category: "express",
    description: "Quick turnaround dry cleaning service",
    fullDescription: "When you need your garments cleaned in a hurry, our Express Dry Clean service provides the same quality cleaning with priority handling and faster turnaround. We ensure your clothes are ready within 6 hours without compromising on quality.",
    price: "₹129/piece",
    priceDetails: "50% premium over regular",
    turnaround: "6 hours",
    popular: true,
    benefits: [
      "Priority processing",
      "Same quality as regular service",
      "SMS notification when ready",
      "Express packaging"
    ],
    process: [
      "Priority tagging & inspection",
      "Express dry cleaning process",
      "Fast-track pressing & finishing",
      "Quality check",
      "Ready within 6 hours"
    ],
    recommendedFor: [
      "Last-minute needs",
      "Interview or meeting preparation",
      "Special occasions",
      "Business travelers"
    ]
  },
  "same-day-laundry": {
    id: "same-day-laundry",
    name: "Same Day Laundry",
    category: "express",
    description: "Complete laundry service delivered same day",
    fullDescription: "Our Same Day Laundry service offers complete washing, drying, and folding with guaranteed same-day completion. Perfect for when you need clean clothes quickly, we prioritize your items while maintaining our high quality standards.",
    price: "₹149/kg",
    priceDetails: "minimum 2kg",
    turnaround: "Same day",
    popular: true,
    benefits: [
      "Guaranteed same-day service",
      "Complete wash, dry and fold",
      "Priority handling",
      "SMS notification when ready"
    ],
    process: [
      "Morning drop-off (before 10 AM)",
      "Priority sorting and processing",
      "Premium detergent washing",
      "Controlled drying and folding",
      "Ready for pickup by 6 PM same day"
    ],
    recommendedFor: [
      "Urgent laundry needs",
      "Business travelers",
      "Last-minute preparations",
      "Regular clothes and everyday items"
    ],
    addon: {
      name: "Express Delivery",
      description: "Delivery to your doorstep within service area",
      price: "₹99 extra"
    }
  },
  "express-ironing": {
    id: "express-ironing",
    name: "Express Ironing",
    description: "Quick ironing service for urgent needs",
    fullDescription: "When you need perfectly pressed clothes in a hurry, our Express Ironing service delivers professional results within 2-4 hours. Ideal for last-minute meetings or events when you need to look your best quickly.",
    price: "₹35/piece",
    priceDetails: "50% premium over regular",
    category: "express",
    turnaround: "2-4 hours",
    popular: false,
    benefits: [
      "Ultra-fast turnaround time",
      "Professional pressing quality",
      "Priority handling",
      "SMS notification when ready"
    ],
    process: [
      "Priority tagging and sorting",
      "Garment preparation",
      "Professional steam pressing",
      "Quality inspection",
      "Ready within 2-4 hours of drop-off"
    ],
    recommendedFor: [
      "Business meetings and presentations",
      "Last-minute event preparation",
      "Interview outfits",
      "Time-sensitive situations"
    ]
  },
  "urgent-stain-removal": {
    id: "urgent-stain-removal",
    name: "Urgent Stain Removal",
    category: "express",
    description: "Quick treatment for fresh stains",
    fullDescription: "Our Urgent Stain Removal service provides fast, expert treatment for fresh stains before they set permanently. Our technicians identify the stain type and apply the appropriate removal method to save your garment quickly.",
    price: "₹199/piece",
    priceDetails: "per stain treatment",
    turnaround: "4 hours",
    popular: false,
    benefits: [
      "Rapid response to fresh stains",
      "Expert stain identification",
      "Specialized removal techniques",
      "Prevents permanent damage"
    ],
    process: [
      "Stain assessment and identification",
      "Selection of appropriate removal agents",
      "Careful application and treatment",
      "Rinse and neutralization",
      "Quality check and drying"
    ],
    recommendedFor: [
      "Fresh food and beverage stains",
      "Ink and makeup accidents",
      "Oil and grease spots",
      "Valuable garments with unexpected stains"
    ],
    addon: {
      name: "Full Garment Refresh",
      description: "Complete cleaning of the entire garment after stain removal",
      price: "₹99 extra"
    }
  },
  "winter-wear": {
    id: "winter-wear",
    name: "Winter Wear",
    category: "seasonal",
    description: "Special care for jackets, coats & sweaters",
    fullDescription: "Our Winter Wear cleaning service is specially designed to clean and care for heavy seasonal garments like wool coats, down jackets, and delicate sweaters. We use appropriate cleaning methods for each fabric type to preserve insulation properties and appearance.",
    price: "₹249/piece",
    priceDetails: "varies by item size",
    turnaround: "3 days",
    popular: false,
    benefits: [
      "Preserves insulation and warmth",
      "Deep cleaning without damage",
      "Maintains fabric loft and texture",
      "Odor elimination"
    ],
    process: [
      "Detailed fabric assessment",
      "Specialized cleaning method selection",
      "Gentle cleaning process",
      "Proper drying to maintain loft",
      "Finishing and careful packaging"
    ],
    recommendedFor: [
      "Down jackets and puffer coats",
      "Wool and cashmere sweaters",
      "Heavy winter coats",
      "Seasonal storage preparation"
    ],
    addon: {
      name: "Season Storage Package",
      description: "Breathable garment bag and cedar sachets for off-season storage",
      price: "₹149 extra"
    }
  },
  "monsoon-package": {
    id: "monsoon-package",
    name: "Monsoon Package",
    category: "seasonal",
    description: "Special treatment for monsoon-affected clothes",
    fullDescription: "Our Monsoon Package offers specialized cleaning for garments affected by monsoon conditions. We address issues like dampness, mildew, mud stains, and musty odors that are common during rainy seasons, restoring freshness and preventing damage.",
    price: "₹299/set",
    priceDetails: "up to 5 items",
    turnaround: "2-3 days",
    popular: false,
    benefits: [
      "Mildew and mold prevention",
      "Deep deodorizing treatment",
      "Mud and water stain removal",
      "Anti-humidity finishing"
    ],
    process: [
      "Assessment of moisture damage",
      "Antimicrobial pre-treatment",
      "Specialized cleaning for water damage",
      "Deodorizing treatment",
      "Heat treatment for mildew prevention",
      "Anti-humidity finishing"
    ],
    recommendedFor: [
      "Rain-soaked garments",
      "Clothing with mildew or musty odors",
      "Mud-stained items",
      "Damp-affected fabrics"
    ],
    addon: {
      name: "Waterproofing Treatment",
      description: "Water-repellent application for future protection",
      price: "₹99/item extra"
    }
  },
  "summer-fabrics": {
    id: "summer-fabrics",
    name: "Summer Fabrics",
    category: "seasonal",
    description: "Gentle cleaning for light summer fabrics",
    fullDescription: "Our Summer Fabrics service provides gentle cleaning for lightweight summer clothing. We take special care with delicate materials like linen, cotton voile, and thin synthetics, preserving their airy texture and bright colors.",
    price: "₹159/kg",
    priceDetails: "minimum 2kg",
    turnaround: "24 hours",
    popular: true,
    benefits: [
      "Preserves fabric lightness and texture",
      "Gentle on delicate summer materials",
      "Maintains bright colors and whites",
      "Sweat stain removal"
    ],
    process: [
      "Sorting by fabric type and color",
      "Low-impact cleaning methods",
      "Special treatment for perspiration stains",
      "Gentle drying and finishing",
      "Careful folding to prevent wrinkles"
    ],
    recommendedFor: [
      "Linen and cotton garments",
      "Light-colored summer clothes",
      "Delicate warm-weather fabrics",
      "Beach and resort wear"
    ],
    addon: {
      name: "UV Protection Treatment",
      description: "Treatment to prevent color fading from sun exposure",
      price: "₹79/kg extra"
    }
  },
  "shoe-care": {
    id: "shoe-care",
    name: "Shoe Care",
    category: "daily",
    description: "Professional cleaning for all types of shoes",
    fullDescription: "Our comprehensive Shoe Care service provides expert cleaning and restoration for all types of footwear. From leather formal shoes to athletic sneakers, we remove dirt, stains, and odors while conditioning materials to extend the life of your shoes.",
    price: "₹199/pair",
    priceDetails: "varies by material and condition",
    turnaround: "3 days",
    popular: true,
    benefits: [
      "Deep cleaning of exterior and insoles",
      "Stain and scuff removal",
      "Deodorizing treatment",
      "Material-specific conditioning"
    ],
    process: [
      "Initial assessment and photography",
      "Dirt and debris removal",
      "Material-appropriate cleaning method",
      "Stain treatment and sole cleaning",
      "Conditioning and polishing",
      "Deodorizing and finishing"
    ],
    recommendedFor: [
      "Leather formal shoes and boots",
      "Athletic and canvas sneakers",
      "Suede and nubuck footwear",
      "Designer and high-value shoes"
    ],
    addon: {
      name: "Waterproofing & Protection",
      description: "Weather-resistant treatment for future protection",
      price: "₹99/pair extra"
    }
  },
  "bag-cleaning": {
    id: "bag-cleaning",
    name: "Bag Cleaning",
    category: "premium",
    description: "Restoration and cleaning for bags & purses",
    fullDescription: "Our Bag Cleaning service provides expert care for handbags, backpacks, and luggage of all materials. We clean exterior surfaces, address stains, and revitalize the appearance of your bags while paying special attention to hardware and details.",
    price: "₹249/piece",
    priceDetails: "varies by size and material",
    turnaround: "3-4 days",
    popular: false,
    benefits: [
      "Material-specific cleaning techniques",
      "Exterior and interior cleaning",
      "Hardware polishing and care",
      "Shape restoration where possible"
    ],
    process: [
      "Detailed assessment and documentation",
      "Interior emptying and cleaning",
      "Exterior surface cleaning with appropriate methods",
      "Hardware cleaning and polishing",
      "Conditioning of leather/fabric",
      "Reshaping and finishing"
    ],
    recommendedFor: [
      "Leather handbags and purses",
      "Canvas and fabric backpacks",
      "Designer and luxury bags",
      "Travel luggage and duffel bags"
    ],
    addon: {
      name: "Full Restoration Package",
      description: "Deep conditioning, color touch-up, and hardware maintenance",
      price: "₹199 extra"
    }
  },
  "deep-stain-treatment": {
    id: "deep-stain-treatment",
    name: "Deep Stain Treatment",
    category: "daily",
    description: "Advanced stain removal for tough stains",
    fullDescription: "Our Deep Stain Treatment service tackles the most challenging stains that regular cleaning can't remove. Using specialized agents and techniques, we target specific stain types including oil, wine, blood, ink, and more to restore your garments.",
    price: "₹179/stain",
    priceDetails: "price may vary based on complexity",
    turnaround: "2 days",
    popular: true,
    benefits: [
      "Targets stubborn and set-in stains",
      "Specialized agents for different stain types",
      "Preserves fabric integrity during treatment",
      "Saves garments from replacement"
    ],
    process: [
      "Stain identification and analysis",
      "Testing in inconspicuous area",
      "Application of specialized stain remover",
      "Multiple treatments if necessary",
      "Neutralizing and rinsing",
      "Post-treatment fabric conditioning"
    ],
    recommendedFor: [
      "Old or set-in stains",
      "Oil, grease, and wax marks",
      "Red wine, coffee, and food stains",
      "Ink, makeup, and protein-based stains"
    ],
    addon: {
      name: "Color Restoration",
      description: "Treatment to address any color loss in stained areas",
      price: "₹99 extra"
    }
  },
  "premium-package": {
    id: "premium-package",
    name: "Premium Package",
    category: "premium",
    description: "Complete laundry solution for premium clothes",
    fullDescription: "Our comprehensive Premium Package provides complete care for your high-value wardrobe items. This all-inclusive service combines dry cleaning, hand finishing, and fabric care with a focus on garment preservation and exceptional results.",
    price: "₹799/set",
    priceDetails: "up to 5 premium garments",
    turnaround: "4-5 days",
    popular: false,
    benefits: [
      "Comprehensive care for valuable items",
      "Hand cleaning where appropriate",
      "Detailed inspection and pre-treatment",
      "Custom finishing and packaging"
    ],
    process: [
      "Initial consultation and garment assessment",
      "Custom care plan for each item",
      "Specialized cleaning according to fabric type",
      "Hand-finishing and detailing",
      "Final inspection by senior staff",
      "Premium packaging with garment covers"
    ],
    recommendedFor: [
      "Investment wardrobe pieces",
      "Tailored and custom garments",
      "Mixed material items",
      "Special occasion wear"
    ],
    addon: {
      name: "Wardrobe Consultation",
      description: "Expert advice on garment care and maintenance",
      price: "₹399 extra"
    }
  },
  "home-linen-package": {
    id: "home-linen-package",
    name: "Home Linen Package",
    category: "home",
    description: "Complete care for all home linens",
    fullDescription: "Our Home Linen Package provides thorough cleaning and care for all household textiles including table linens, towels, bath mats, and decorative items. We restore freshness and cleanliness while preserving colors and textures.",
    price: "₹499/set",
    priceDetails: "up to 10 items",
    turnaround: "3 days",
    popular: true,
    benefits: [
      "Comprehensive care for multiple items",
      "Removes tough bathroom and kitchen stains",
      "Sanitizes and deodorizes",
      "Preserves color and fabric quality"
    ],
    process: [
      "Sorting and categorization by type",
      "Pre-treatment of spots and stains",
      "Appropriate washing method selection",
      "High-temperature sanitization where needed",
      "Proper folding and finishing",
      "Organized packaging by room or type"
    ],
    recommendedFor: [
      "Bath towels and mats",
      "Table linens and napkins",
      "Kitchen towels and cloths",
      "Decorative pillowcases and runners"
    ],
    addon: {
      name: "Fancy Fold Presentation",
      description: "Hotel-style folding for towels and linens",
      price: "₹149 extra"
    }
  }
};

// Map to quickly access service details by ID
const serviceDetailsMap = Object.values(serviceDetails).reduce((map, service) => {
  map[service.id] = service;
  return map;
}, {});

// Function to get a specific service detail by ID
export const getServiceDetail = (id) => {
  return serviceDetailsMap[id] || null;
};

// Function to get all services for a specific category
export const getServicesByCategory = (category) => {
  return Object.values(serviceDetails).filter(service => service.category === category);
};

// Function to get all service details
export const getAllServices = () => {
  return Object.values(serviceDetails);
};

export default serviceDetails; 
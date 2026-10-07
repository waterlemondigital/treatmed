const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Treatment = require('../models/Treatment');
const Review = require('../models/Review');
const Order = require('../models/Order');
const Appointment = require('../models/Appointment');
const Coupon = require('../models/Coupon');

// ─── Seed Data (from frontend mockData.ts) ───────────────────

const PRODUCTS = [
  {
    name: "Treatmed Herbal Hair Oil",
    category: "Hair Care",
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1608248597266-2244248232f7?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Traditional Unani & Ayurvedic hair vitality oil formulated with Amla, Bhringraj, Brahmi & Sesame oil.",
    description: "Formulated under the expert supervision of Dr. HKM. Zaid Abdul Aziz, Treatmed Herbal Hair Oil penetrates deep into hair roots to combat hair fall, nourish dry scalp, and promote thick, healthy hair growth.",
    ingredients: ["Amla (Emblica Officinalis)", "Bhringraj (Eclipta Alba)", "Brahmi", "Cold-Pressed Sesame Oil", "Kalonji Oil"],
    benefits: [
      "Combats hair fall and strengthens hair roots",
      "Prevents premature graying and scalp dryness",
      "Promotes thick, shiny hair growth",
      "Cools the scalp and relieves stress"
    ],
    usage: "Gently massage 10-15 ml into scalp in circular motions before bedtime. Leave overnight or for at least 2 hours before washing with Treatmed Botanical Shampoo.",
    size: "200 ml",
    inStock: true,
    isBestSeller: true,
  },
  {
    name: "Treatmed Botanical Hair Shampoo",
    category: "Hair Care",
    price: 320,
    originalPrice: 380,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Gentle sulfate-free herbal cleanser infused with Reetha, Shikakai, Neem & Organic Aloe Vera.",
    description: "Treatmed Botanical Hair Shampoo thoroughly cleanses scalp impurities while locking in essential natural moisture. Free from harsh sulfates and parabens, it leaves hair soft, lustrous, and free of dandruff.",
    ingredients: ["Shikakai Extract", "Neem Bark", "Reetha", "Organic Aloe Vera", "Hibiscus Extract"],
    benefits: [
      "100% Sulfate & Paraben Free",
      "Relieves scalp itching and dandruff",
      "Cleanses gently without stripping natural oils",
      "Restores hair bounce and natural shine"
    ],
    usage: "Apply a generous amount to wet hair, lather well from roots to ends, and rinse thoroughly with water.",
    size: "250 ml",
    inStock: true,
  },
  {
    name: "Treatmed Rahat Plus Pain Relief Oil",
    category: "Pain Relief",
    price: 450,
    originalPrice: 520,
    rating: 5.0,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Deep-penetrating Unani pain relief formula for knees, backache, joints & muscle stiffness.",
    description: "Rahat Plus Pain Relief Oil combines potent warming botanicals including Gandhapura (Wintergreen), Eucalyptus, Ajwain, and Garlic extract in a mustard oil base. Specially crafted by Dr. HKM. Zaid Abdul Aziz for quick absorption and effective relief from chronic joint and muscle pain.",
    ingredients: ["Gandhapura Tel (Wintergreen)", "Eucalyptus Oil", "Ajwain Oil", "Garlic Extract", "Camphor", "Mustard Oil Base"],
    benefits: [
      "Provides fast soothing warmth to stiff joints",
      "Relieves knee, back, neck & sciatica pain",
      "Reduces muscular swelling and inflammation",
      "Enhances joint mobility"
    ],
    usage: "Take 5-10 ml oil and warm slightly between palms. Gently massage affected joints or muscles for 10 minutes twice daily.",
    size: "100 ml",
    inStock: true,
    isBestSeller: true,
  },
  {
    name: "Treatmed Sugar Control Herbal Tablet",
    category: "Tablets",
    price: 490,
    originalPrice: 580,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Synergistic herbal formulation of Gurmar, Karela, Jamun seed & Shilajit for glycemic balance.",
    description: "Formulated to support healthy glucose metabolism and pancreatic function. Combined with restorative Unani herbs that help combat diabetic weakness, fatigue, and sugar cravings naturally.",
    ingredients: ["Gurmar (Gymnema Sylvestre)", "Jamun Seed Extract", "Karela (Bitter Gourd)", "Purified Shilajit", "Methi (Fenugreek)"],
    benefits: [
      "Supports healthy blood sugar levels",
      "Reduces sugar cravings naturally",
      "Combats lethargy & diabetic tiredness",
      "Promotes pancreatic wellness"
    ],
    usage: "Take 1 tablet twice daily 30 minutes before meals with warm water, or as advised by physician.",
    size: "60 Tablets",
    inStock: true,
    isBestSeller: true,
  },
  {
    name: "Treatmed Acidity Relief Herbal Tablet",
    category: "Tablets",
    price: 290,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 116,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Carminative Unani herbal formula for hyperacidity, acid reflux, gas & indigestion.",
    description: "Treatmed Acidity Relief Tablets soothe stomach irritation, neutralize excess gastric acid, and ease heartburn, gas, and abdominal bloating. Formulated with Mint, Ginger, Fennel, and mineral digestive salts.",
    ingredients: ["Pudina (Mint)", "Sonth (Dry Ginger)", "Saunf (Fennel)", "Ajwain", "Black Salt", "Jeera"],
    benefits: [
      "Provides rapid relief from acidity and heartburn",
      "Prevents post-meal bloating and gas",
      "Improves appetite and digestive comfort",
      "100% natural and non-habit forming"
    ],
    usage: "Take 1 to 2 tablets twice daily after meals with warm water, or as directed by doctor.",
    size: "60 Tablets",
    inStock: true,
  },
];

const SERVICES = [
  {
    title: "Unani Consultant",
    category: "Consultation",
    shortDesc: "Comprehensive pulse diagnosis (Nabd), temperament evaluation (Mizaj) & personalized herbal care by Dr. HKM. Zaid Abdul Aziz.",
    fullDesc: "Direct one-on-one medical consultation with Dr. HKM. Zaid Abdul Aziz (B.U.M.S.). Evaluates body temperament (Mizaj) and pulse (Nabd) to diagnose chronic & acute conditions, prescribing custom herbal formulations tailored to your body.",
    iconName: "Stethoscope",
    duration: "30 - 45 Mins",
    priceEstimate: "Consultation + Herbal Prescriptions",
    whatToExpect: [
      "Detailed Nabd (Pulse) & physical examination",
      "Personalized Mizaj (Temperament) analysis",
      "Customized herbal treatment plan & prescription",
      "Dietary & lifestyle modification guidance"
    ],
    benefits: [
      "Treats root cause rather than suppressing symptoms",
      "100% natural, safe herbal formulations",
      "Customized to individual metabolic body type",
      "Sustainable long-term health and disease prevention"
    ],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Hijama (Cupping therapy)",
    category: "Therapy",
    shortDesc: "Authentic wet & dry suction cupping by certified specialists using 100% sterile disposable equipment.",
    fullDesc: "Hijama (Cupping Therapy) is an ancient therapeutic practice recommended in Sunnah and Tibb-e-Unani. It creates localized suction to pull out stagnant blood, metabolic waste, and toxins while stimulating deep cellular healing.",
    iconName: "HeartPulse",
    duration: "40 - 50 Mins",
    priceEstimate: "Sterile Single-Use Cup Session",
    whatToExpect: [
      "100% sterilized individual disposable cups",
      "Dry suction cupping followed by gentle micro-scratches",
      "Toxin extraction & soothing Rahat Plus oil massage",
      "Post-procedure antiseptic dressing & relaxation"
    ],
    benefits: [
      "Relieves back ache, neck tension & chronic joint stiffness",
      "Stimulates systemic blood & lymphatic circulation",
      "Provides relief from migraines and chronic headaches",
      "Accelerates athletic recovery & muscle fatigue"
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Physiotherapy",
    category: "Therapy",
    shortDesc: "Targeted joint mobilization, exercise rehabilitation & posture correction combined with herbal pain relief.",
    fullDesc: "Integrating modern physical biomechanical rehabilitation with traditional Unani pain-relief oil applications. Ideal for post-injury recovery, sciatica, cervical spondylitis, joint stiffness, and spinal decompression.",
    iconName: "Activity",
    duration: "45 Mins",
    priceEstimate: "Targeted Rehab Session",
    whatToExpect: [
      "Joint range of motion & mobility assessment",
      "Manual joint mobilization & muscle release",
      "Therapeutic heat & Rahat Plus pain relief oil application",
      "Guided exercise blueprint for recovery"
    ],
    benefits: [
      "Restores spinal alignment & range of motion",
      "Reduces reliance on synthetic pain killers",
      "Strengthens weakened joint ligaments and muscles",
      "Prevents recurring sports or postural injuries"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Massage",
    category: "Therapy",
    shortDesc: "Full body therapeutic massage with warm medicated herbal oils for muscle recovery, joint lubrication & stress release.",
    fullDesc: "Rejuvenating therapeutic body massage designed to flush out muscular fatigue, release deep tissue knots, and calm the nervous system using warm, herbal oil preparations.",
    iconName: "Smile",
    duration: "60 Mins",
    priceEstimate: "Full Body Medicated Oil Massage",
    whatToExpect: [
      "Selection of warm herbal oil suited to your body temperament",
      "Rhythmic long-stroke pressure massage",
      "Focus on shoulder, spine, and leg muscle tension points",
      "Warm herbal towel wipe-down"
    ],
    benefits: [
      "Relieves deep physical fatigue & stress",
      "Promotes restful, deep sleep cycles",
      "Nourishes dry skin & lubricates joints",
      "Enhances nervous system calm and focus"
    ],
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Herbal Steam therapy",
    category: "Therapy",
    shortDesc: "Sweat detoxification chamber infused with aromatic Unani botanical decoctions to open pores & ease joint stiffness.",
    fullDesc: "Therapeutic herbal steam bath (Hammam) using decoctions of medicinal botanicals. Opens skin pores, eliminates metabolic toxins through natural perspiration, relieves joint stiffness, and rejuvenates skin.",
    iconName: "Sparkles",
    duration: "30 Mins",
    priceEstimate: "Botanical Steam Bath Session",
    whatToExpect: [
      "Custom herbal decoction infusion preparation",
      "Temperature-controlled steam chamber session",
      "Deep pore cleansing and sweat detox",
      "Hydrating botanical towel rinse"
    ],
    benefits: [
      "Flushes metabolic impurities through skin pores",
      "Soothes joint and muscular stiffness",
      "Clears respiratory passages",
      "Deeply relaxes body and mind"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Diet Therapy",
    category: "Wellness",
    shortDesc: "Personalized Unani & Ayurvedic nutrition plans tailored to your specific Mizaj (temperament) & digestive health.",
    fullDesc: "In Tibb-e-Unani, food is the primary medicine. Dr. HKM. Zaid Abdul Aziz designs tailored dietary regimens based on your specific Mizaj (temperament) to balance humors and treat metabolic, digestive, or chronic ailments naturally.",
    iconName: "UserCheck",
    duration: "30 Mins",
    priceEstimate: "Personalized Diet Chart Consultation",
    whatToExpect: [
      "Evaluation of digestive strength and food tolerances",
      "Temperament-based food categorization (Hot/Cold/Moist/Dry)",
      "Customized weekly meal plan & recipe guidance",
      "Follow-up monitoring and adjustments"
    ],
    benefits: [
      "Rebalances body humors through whole foods",
      "Improves digestion, gas, and hyperacidity",
      "Supports healthy weight and sugar management",
      "Sustainably boosts daily energy and vitality"
    ],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Diagnostic service (X-ray, ultrasound, MRI, CT scan, and laboratory)",
    category: "Diagnostics",
    shortDesc: "Complete diagnostic support including X-ray, Ultrasound, MRI, CT scan, and comprehensive clinical lab testing.",
    fullDesc: "Complete diagnostic and imaging facilities for thorough medical evaluation. We provide access to high-precision X-rays, Ultrasound imaging, MRI, CT scans, and clinical laboratory blood investigations to guide precise treatment.",
    iconName: "Stethoscope",
    duration: "Variable",
    priceEstimate: "Lab Tests & Diagnostic Imaging",
    whatToExpect: [
      "Professional sample collection & imaging scans",
      "High-precision digital diagnostic equipment",
      "Timely delivery of certified medical reports",
      "Doctor interpretation during clinical consultation"
    ],
    benefits: [
      "Accurate baseline health & diagnostic assessment",
      "Complements holistic Unani clinical diagnosis",
      "Monitors treatment progress scientifically",
      "Comprehensive diagnostics under one roof"
    ],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
  },
];

const TREATMENTS = [
  {
    title: "Joint & Muscular Pain Management",
    category: "Orthopedic Wellness",
    summary: "Comprehensive non-invasive care for Sciatica, Arthritis, Cervical Spondylitis & Knee Pain.",
    symptomsAddressed: [
      "Knee joint swelling & bone friction",
      "Sciatic nerve shooting pain",
      "Cervical & lumbar spine stiffness",
      "Morning muscular stiffness"
    ],
    unaniApproach: "Combines internal anti-inflammatory formulations (Suranjan, Gugglu) with localized warm Ruhan oil massages, Hijama therapy for nerve decongestion, and mild joint mobilization.",
    recommendedDuration: "3 to 6 Weeks Program",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Skin Disorders & Psoriasis",
    category: "Dermatological Unani",
    summary: "Natural blood purification and barrier repair for Eczema, Acne, Psoriasis & Hyperpigmentation.",
    symptomsAddressed: [
      "Chronic itching & dry skin scaling",
      "Persistent facial acne & deep spots",
      "Eczematous flares & skin redness",
      "Uneven skin tone and dark patches"
    ],
    unaniApproach: "Unani medicine identifies skin disorders with blood imbalance (Safra/Dam impurities). We prescribe blood purifier formulations (Unnab, Shahtra, Neem) alongside soothing topical ointments and Hijama.",
    recommendedDuration: "4 to 8 Weeks",
    iconName: "Sparkle",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Liver & Abdominal Discomfort",
    category: "Gastrointestinal Care",
    summary: "Targeted care for Fatty Liver, Chronic Gastritis, Indigestion, IBS & Acid Reflux.",
    symptomsAddressed: [
      "Heartburn & post-meal acid surge",
      "Sluggish liver function & fatty liver grade 1/2",
      "Persistent abdominal bloating & gas",
      "Irritable bowel habits"
    ],
    unaniApproach: "Utilizes liver-tonic herbs like Kasni, Mako, and Kalonji combined with Hazim-G digestive capsules to reset stomach pH and bile secretion.",
    recommendedDuration: "2 to 4 Weeks",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Sexual Disorders & Male/Female Vitality",
    category: "Reproductive & Hormonal",
    summary: "Confidential, respectful treatment for vitality, hormonal imbalance, general debility & reproductive wellness.",
    symptomsAddressed: [
      "General nervous fatigue & stamina loss",
      "Hormonal imbalance & irregular cycles",
      "Stress-induced debility",
      "Low vitality and vigor"
    ],
    unaniApproach: "Employs restorative Muqawwi-e-Aaza (vital organ invigorators) including purified Shilajit, Salab Misri, Ashwagandha, and Safed Musli under strict clinical privacy.",
    recommendedDuration: "4 to 12 Weeks",
    iconName: "Heart",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Hair Problems & Alopecia Control",
    category: "Trichology Care",
    summary: "Root-cause scalp nourishment for severe hair fall, hair thinning, premature graying & dandruff.",
    symptomsAddressed: [
      "Excessive hair fall in shower/brushing",
      "Receding hairline & patchy hair loss",
      "Stubborn scalp dandruff & fungal itch",
      "Early graying in youth"
    ],
    unaniApproach: "Combines scalp micro-cupping (Hijama) to boost local follicle blood supply with customized herbal oils (Kesh Sanjeevani) and internal nutrient-rich syrups.",
    recommendedDuration: "6 to 12 Weeks",
    iconName: "Scissors",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
  },
];

const REVIEWS = [
  {
    author: "Mohammed Shakir",
    rating: 5,
    title: "Outstanding Sciatica Relief via Hijama",
    comment: "I had severe sciatica pain in my right leg for 8 months. Dr. Zaid performed Hijama therapy and prescribed Ruhan Pain Relief Oil. Within 3 sessions, my pain dropped by 90%! Very clean, professional clinic.",
    verifiedPurchase: true,
    treatmentOrProduct: "Hijama + Ruhan Oil",
  },
  {
    author: "Fatima Bano",
    rating: 5,
    title: "Ajwa Dates & Sidr Honey are top quality",
    comment: "Authentic store in Mira Road! The Ajwa dates from Madinah were super soft and fresh. My father takes their Kalonji oil daily for immunity.",
    verifiedPurchase: true,
    treatmentOrProduct: "Royal Madinah Ajwa Dates",
  },
  {
    author: "Anand Verma",
    rating: 5,
    title: "Kesh Sanjeevani Oil stopped my hair fall",
    comment: "I was skeptical at first, but after 3 weeks of using Kesh Sanjeevani Oil and Shikakai Shampoo, my hair loss has almost stopped. Highly recommend Dr. Zaid's remedies.",
    verifiedPurchase: true,
    treatmentOrProduct: "Kesh Sanjeevani Hair Oil",
  },
];

const COUPON = {
  code: "TREATMED10",
  discountPercent: 10,
  isActive: true,
  expiresAt: new Date('2027-12-31'),
  minOrderAmount: 0,
};

// ─── Seed Function ───────────────────────────────────────────

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.mongodb_connection_string || process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables.');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Service.deleteMany({}),
      Treatment.deleteMany({}),
      Review.deleteMany({}),
      Order.deleteMany({}),
      Appointment.deleteMany({}),
      Coupon.deleteMany({}),
    ]);

    // Seed Products
    console.log('📦 Seeding Products...');
    const products = await Product.insertMany(PRODUCTS);
    console.log(`   ✓ ${products.length} products created`);

    // Seed Services
    console.log('🏥 Seeding Services...');
    const services = await Service.insertMany(SERVICES);
    console.log(`   ✓ ${services.length} services created`);

    // Seed Treatments
    console.log('💊 Seeding Treatments...');
    const treatments = await Treatment.insertMany(TREATMENTS);
    console.log(`   ✓ ${treatments.length} treatments created`);

    // Seed Reviews
    console.log('⭐ Seeding Reviews...');
    const reviews = await Review.insertMany(REVIEWS);
    console.log(`   ✓ ${reviews.length} reviews created`);

    // Seed Demo User
    console.log('👤 Seeding Demo User...');
    const demoEmail = process.env.DEMO_USER_EMAIL || "salman.mira@example.com";
    const demoPassword = process.env.DEMO_USER_PASSWORD || "Password123!";
    const demoUser = await User.create({
      name: process.env.DEMO_USER_NAME || "Mohammed Salman",
      email: demoEmail,
      phone: process.env.DEMO_USER_PHONE || "+91 9820123456",
      password: demoPassword,
      isVerified: true,
      role: "user",
      address: {
        street: "Flat 402, Green Valley Apartments, Kanakia Road",
        city: "Mira Road (E)",
        pincode: "401105",
        state: "Maharashtra",
      },
    });
    console.log(`   ✓ Demo user: ${demoUser.email} / ${demoPassword}`);

    // Seed Admin User
    console.log('🔑 Seeding Admin User...');
    const adminEmail = process.env.ADMIN_EMAIL || "treatmedclinic@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Treatmed@123";
    const adminUser = await User.create({
      name: process.env.ADMIN_NAME || "Dr. HKM. Zaid Abdul Aziz",
      email: adminEmail,
      phone: process.env.ADMIN_PHONE || "+91 8879123795",
      password: adminPassword,
      isVerified: true,
      role: "admin",
      address: {
        street: "Jangid Enclave, Aarnica Bldg, A Wing, Shop No 2",
        city: "Mira Road (E)",
        pincode: "401105",
        state: "Maharashtra",
      },
    });
    console.log(`   ✓ Admin user: ${adminUser.email} / ${adminPassword}`);

    // Seed Sample Orders
    console.log('🛒 Seeding Sample Orders...');
    const sampleOrders = [
      {
        userId: demoUser._id,
        items: [
          { productId: products[2]._id, productName: "Treatmed Rahat Plus Pain Relief Oil (100ml)", quantity: 2, price: 450 },
          { productId: products[4]._id, productName: "Treatmed Acidity Relief Herbal Tablet (60s)", quantity: 1, price: 290 },
        ],
        totalAmount: 1190,
        status: "Delivered",
        shippingAddress: {
          name: "Mohammed Salman",
          phone: "+91 9820123456",
          street: "Flat 402, Green Valley Apartments, Kanakia Road",
          pincode: "401105",
        },
        paymentMethod: "cod",
        deliveryFee: 0,
      },
      {
        userId: demoUser._id,
        items: [
          { productId: products[0]._id, productName: "Treatmed Herbal Hair Oil (200ml)", quantity: 1, price: 380 },
          { productId: products[1]._id, productName: "Treatmed Botanical Hair Shampoo (250ml)", quantity: 1, price: 320 },
        ],
        totalAmount: 700,
        status: "Delivered",
        shippingAddress: {
          name: "Mohammed Salman",
          phone: "+91 9820123456",
          street: "Flat 402, Green Valley Apartments, Kanakia Road",
          pincode: "401105",
        },
        paymentMethod: "upi",
        deliveryFee: 70,
      },
    ];
    const orders = await Order.insertMany(sampleOrders);
    console.log(`   ✓ ${orders.length} sample orders created`);

    // Seed Sample Appointment
    console.log('📅 Seeding Sample Appointment...');
    const appointment = await Appointment.create({
      userId: demoUser._id,
      serviceTitle: "Hijama (Cupping Therapy) Session",
      date: "2026-08-15",
      time: "11:30 AM (Morning Clinic)",
      patientName: "Mohammed Salman",
      phone: "+91 9820123456",
      status: "Confirmed",
      notes: "Focus on lower back ache and shoulder stiffness.",
    });
    console.log(`   ✓ 1 sample appointment created`);

    // Seed Coupon
    console.log('🎟️  Seeding Coupon...');
    const coupon = await Coupon.create(COUPON);
    console.log(`   ✓ Coupon "${coupon.code}" (${coupon.discountPercent}% discount) created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('───────────────────────────────────────');
    console.log('  Products:     ', products.length);
    console.log('  Services:     ', services.length);
    console.log('  Treatments:   ', treatments.length);
    console.log('  Reviews:      ', reviews.length);
    console.log('  Users:         2 (demo + admin)');
    console.log('  Orders:       ', orders.length);
    console.log('  Appointments:  1');
    console.log('  Coupons:       1');
    console.log('───────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();

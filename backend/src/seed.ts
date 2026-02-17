import { createApplication } from "@specific-dev/framework";
import * as schema from './db/schema/schema.js';

const app = await createApplication(schema);

const peptideData = [
  // GLP-1 Agonists
  {
    name: 'Semaglutide',
    description: 'GLP-1 receptor agonist used for weight loss and diabetes management. Highly potent with long-acting effects.',
    category: 'GLP-1',
    benefits: 'Weight loss, improved glycemic control, cardiovascular benefits, reduced appetite',
    sideEffects: 'Nausea, vomiting, diarrhea, constipation, abdominal pain',
    dosageMin: '0.25mg',
    dosageMax: '2.4mg',
    frequency: 'Once weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Tirzepatide',
    description: 'Dual GIP/GLP-1 receptor agonist with superior weight loss effects compared to GLP-1 monotherapy.',
    category: 'GLP-1',
    benefits: 'Significant weight loss, improved insulin sensitivity, reduced appetite, cardiovascular benefits',
    sideEffects: 'Nausea, vomiting, diarrhea, constipation, pancreatitis risk',
    dosageMin: '2.5mg',
    dosageMax: '15mg',
    frequency: 'Once weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Liraglutide',
    description: 'GLP-1 agonist with intermediate duration. Effective for weight management and diabetes control.',
    category: 'GLP-1',
    benefits: 'Weight loss, improved blood glucose, reduced cardiovascular risk, appetite suppression',
    sideEffects: 'Nausea, vomiting, diarrhea, headache, fatigue',
    dosageMin: '0.6mg',
    dosageMax: '3.0mg',
    frequency: 'Once daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Dulaglutide',
    description: 'Long-acting GLP-1 receptor agonist with weekly dosing. Good efficacy and tolerability profile.',
    category: 'GLP-1',
    benefits: 'Weight reduction, improved glycemic control, cardiovascular protection, sustained appetite reduction',
    sideEffects: 'Nausea, vomiting, diarrhea, headache, abdominal pain',
    dosageMin: '0.75mg',
    dosageMax: '1.5mg',
    frequency: 'Once weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Exenatide',
    description: 'GLP-1 mimetic originally derived from Gila monster venom. Rapid-acting formulation available.',
    category: 'GLP-1',
    benefits: 'Weight loss, improved glycemic control, reduced hyperglycemia, appetite suppression',
    sideEffects: 'Nausea, vomiting, diarrhea, dizziness, headache',
    dosageMin: '5mcg',
    dosageMax: '10mcg',
    frequency: 'Twice daily or once weekly',
    timing: 'Before meals',
    administrationRoute: 'Subcutaneous injection'
  },

  // Growth Hormone Secretagogues
  {
    name: 'CJC-1295',
    description: 'Growth hormone releasing hormone (GHRH) analog. DAC variant provides extended half-life.',
    category: 'Growth Hormone',
    benefits: 'Increased growth hormone secretion, muscle growth, improved recovery, fat loss, enhanced sleep',
    sideEffects: 'Increased appetite, water retention, joint pain, numbness',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice weekly',
    timing: 'Before bed or morning',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Ipamorelin',
    description: 'Selective growth hormone secretagogue. Minimal cortisol and prolactin elevation.',
    category: 'Growth Hormone',
    benefits: 'Growth hormone release, muscle hypertrophy, fat loss, improved recovery, enhanced sleep quality',
    sideEffects: 'Mild hunger stimulation, potential headache, slight water retention',
    dosageMin: '200mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or before training',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'GHRP-2',
    description: 'Growth hormone releasing peptide-2. Strong GH stimulus with significant appetite stimulation.',
    category: 'Growth Hormone',
    benefits: 'Strong growth hormone release, appetite stimulation, muscle growth, improved recovery',
    sideEffects: 'Significant appetite increase, water retention, carpal tunnel symptoms',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'One to three times daily',
    timing: 'Pre-sleep, pre-workout, before meals',
    administrationRoute: 'Subcutaneous or intravenous injection'
  },
  {
    name: 'GHRP-6',
    description: 'Growth hormone releasing peptide-6. Similar to GHRP-2 with strong appetite effects.',
    category: 'Growth Hormone',
    benefits: 'Potent growth hormone release, appetite stimulation, muscle gains, improved sleep',
    sideEffects: 'Significant appetite increase, water retention, potential arthralgia',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'One to three times daily',
    timing: 'Before bed, pre-workout, before meals',
    administrationRoute: 'Subcutaneous or intravenous injection'
  },
  {
    name: 'Hexarelin',
    description: 'Hexapeptide growth hormone secretagogue with strong GH stimulus.',
    category: 'Growth Hormone',
    benefits: 'Potent growth hormone release, muscle growth, fat loss, improved recovery, strength gains',
    sideEffects: 'Increased appetite, water retention, joint pain, potential prolactin elevation',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or pre-workout',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Sermorelin',
    description: 'Growth hormone releasing hormone (GHRH) analog. Shorter acting than CJC-1295.',
    category: 'Growth Hormone',
    benefits: 'Promotes growth hormone release, muscle growth, improved body composition, enhanced sleep',
    sideEffects: 'Mild water retention, headache, facial flushing, joint pain',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or morning',
    administrationRoute: 'Subcutaneous injection'
  },

  // Cognitive/Neuro Peptides
  {
    name: 'Semax',
    description: 'Synthetic acth analog used for cognitive enhancement and mood improvement.',
    category: 'Cognitive',
    benefits: 'Improved attention, enhanced memory, mood elevation, anti-anxiety, neuroprotection',
    sideEffects: 'Minimal reported, rare overstimulation',
    dosageMin: '250mcg',
    dosageMax: '1000mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or before training',
    administrationRoute: 'Intranasal spray or subcutaneous injection'
  },
  {
    name: 'Selank',
    description: 'Anxiolytic peptide derived from tuftsin. Reduces anxiety without sedation.',
    category: 'Cognitive',
    benefits: 'Anxiety reduction, improved mood, enhanced cognitive function, stress resilience, anti-inflammatory',
    sideEffects: 'Minimal side effects reported, rare headache',
    dosageMin: '250mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or afternoon',
    administrationRoute: 'Intranasal spray or subcutaneous injection'
  },
  {
    name: 'Noopept',
    description: 'Cyclopropyl dipeptide nootropic. Cognitive enhancer with neuroprotective properties.',
    category: 'Cognitive',
    benefits: 'Improved memory, enhanced focus, cognitive clarity, neuroprotection, mood enhancement',
    sideEffects: 'Minimal, rare headache or irritability at high doses',
    dosageMin: '10mg',
    dosageMax: '30mg',
    frequency: 'Once or twice daily',
    timing: 'Morning with food',
    administrationRoute: 'Oral (sublingual or swallowed)'
  },
  {
    name: 'P21',
    description: 'Neuropeptide with restorative properties for nervous system recovery.',
    category: 'Cognitive',
    benefits: 'Nervous system restoration, improved cognition, mood support, neuroprotection, recovery enhancement',
    sideEffects: 'Minimal reported side effects',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or before bed',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },
  {
    name: 'Dihexa',
    description: 'Peptide derived from angiotensin IV. Potent memory enhancement and neuroprotection.',
    category: 'Cognitive',
    benefits: 'Enhanced memory formation, improved cognition, neuroprotection, synaptic growth, neuroplasticity',
    sideEffects: 'Minimal reported, potential mild headache',
    dosageMin: '50mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or before learning',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },

  // Recovery/Healing Peptides
  {
    name: 'BPC-157',
    description: 'Body Protection Compound. Potent healing and anti-inflammatory peptide derived from gastric juice.',
    category: 'Recovery',
    benefits: 'Accelerated healing, reduced inflammation, joint repair, gut health, pain reduction, muscle recovery',
    sideEffects: 'Minimal reported, generally very well tolerated',
    dosageMin: '250mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or oral (swallowed)'
  },
  {
    name: 'TB-500',
    description: 'Thymosin beta-4 analog. Powerful healing and recovery peptide.',
    category: 'Recovery',
    benefits: 'Accelerated tissue repair, enhanced recovery, reduced inflammation, muscle growth, improved healing',
    sideEffects: 'Minimal side effects, rare mild swelling at injection site',
    dosageMin: '2mg',
    dosageMax: '4mg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or intravenous injection'
  },
  {
    name: 'GHK-Cu',
    description: 'Copper peptide complex. Promotes collagen synthesis and tissue repair.',
    category: 'Recovery',
    benefits: 'Skin health, collagen production, wound healing, anti-aging, anti-inflammatory, tissue regeneration',
    sideEffects: 'Minimal reported, potential mild skin irritation with topical use',
    dosageMin: '0.5mg',
    dosageMax: '2mg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection, topical, or oral'
  },

  // Tanning/Pigmentation Peptides
  {
    name: 'Melanotan I',
    description: 'Alpha-melanocyte stimulating hormone analog. Promotes skin tanning.',
    category: 'Tanning',
    benefits: 'Increased skin pigmentation, tanning without UV exposure, potential sexual function enhancement',
    sideEffects: 'Nausea, facial flushing, spontaneous erections, darkening of moles',
    dosageMin: '500mcg',
    dosageMax: '2000mcg',
    frequency: 'Once daily initially, then less frequent',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Melanotan II',
    description: 'Melanocortin agonist for skin pigmentation and sexual enhancement.',
    category: 'Tanning',
    benefits: 'Rapid tanning, improved sexual function, increased libido, darker skin pigmentation',
    sideEffects: 'Nausea, facial flushing, spontaneous erections, mole darkening, appetite suppression',
    dosageMin: '250mcg',
    dosageMax: '1000mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },

  // Other Popular Peptides
  {
    name: 'Thymosin Alpha-1',
    description: 'Immunomodulating peptide derived from thymus gland. Enhances immune function.',
    category: 'Immune/Recovery',
    benefits: 'Immune system enhancement, improved healing, anti-inflammatory, disease resistance, recovery support',
    sideEffects: 'Minimal reported, generally well tolerated',
    dosageMin: '1mg',
    dosageMax: '1.6mg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or intramuscular injection'
  },
  {
    name: 'Epithalon',
    description: 'Telomerase activator peptide. Promotes cellular rejuvenation and longevity.',
    category: 'Anti-Aging',
    benefits: 'Telomere lengthening, cellular rejuvenation, improved sleep, antioxidant effects, longevity support',
    sideEffects: 'Minimal reported, very safe profile',
    dosageMin: '10mg',
    dosageMax: '20mg',
    frequency: 'Once daily for 10 days per month',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'AOD-9604',
    description: 'Fragment of growth hormone with fat-burning properties without growth effects.',
    category: 'Weight Loss',
    benefits: 'Fat loss, metabolic enhancement, improved body composition, weight reduction, no growth effects',
    sideEffects: 'Minimal reported, generally well tolerated',
    dosageMin: '300mcg',
    dosageMax: '600mcg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or before training',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Tesamorelin',
    description: 'Growth hormone releasing hormone analog. FDA approved for HIV lipodystrophy.',
    category: 'Growth Hormone',
    benefits: 'Growth hormone release, abdominal fat reduction, improved body composition, muscle preservation',
    sideEffects: 'Joint pain, muscle pain, swelling, carpal tunnel symptoms',
    dosageMin: '1.4mg',
    dosageMax: '2mg',
    frequency: 'Once daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'LL-37',
    description: 'Antimicrobial peptide derived from cathelicidin. Immune system enhancer.',
    category: 'Immune',
    benefits: 'Antimicrobial protection, immune enhancement, anti-inflammatory, healing support',
    sideEffects: 'Minimal reported, potential mild swelling',
    dosageMin: '10mcg',
    dosageMax: '50mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },

  // Additional Popular Peptides (extending to 100+)
  {
    name: 'IGF-1 LR3',
    description: 'Insulin-like growth factor-1 Long Arginine 3. Extended half-life version for muscle growth.',
    category: 'Growth Hormone',
    benefits: 'Muscle growth, strength gain, improved recovery, enhanced protein synthesis, fat loss',
    sideEffects: 'Hypoglycemia risk, joint pain, water retention, potential carpal tunnel',
    dosageMin: '20mcg',
    dosageMax: '120mcg',
    frequency: 'Once or twice daily',
    timing: 'Post-workout or with meals',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'MGF',
    description: 'Mechano Growth Factor. Growth factor released during muscle damage and exercise.',
    category: 'Growth Hormone',
    benefits: 'Muscle hypertrophy, satellite cell activation, recovery enhancement, strength gains',
    sideEffects: 'Minimal reported, potential joint discomfort',
    dosageMin: '100mcg',
    dosageMax: '200mcg',
    frequency: 'Post-workout',
    timing: 'Immediately after exercise',
    administrationRoute: 'Intramuscular injection'
  },
  {
    name: 'HGH Fragment 176-191',
    description: 'Fragment of growth hormone specifically targeting fat metabolism.',
    category: 'Weight Loss',
    benefits: 'Direct fat loss, weight reduction, improved body composition, metabolic enhancement',
    sideEffects: 'Minimal reported, generally very safe',
    dosageMin: '250mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or before training',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Kisspeptin',
    description: 'Neuroendocrine peptide controlling reproduction and metabolism.',
    category: 'Neuroendocrine',
    benefits: 'Hormonal optimization, improved metabolism, sexual function support, reproductive health',
    sideEffects: 'Minimal reported, potential hormonal fluctuations',
    dosageMin: '10nmol',
    dosageMax: '100nmol',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intravenous injection'
  },
  {
    name: 'Oxytocin',
    description: 'Social bonding and stress-relief peptide hormone.',
    category: 'Neuroendocrine',
    benefits: 'Stress reduction, improved mood, social connection, trust, anxiety reduction',
    sideEffects: 'Minimal reported, potential water retention at high doses',
    dosageMin: '2IU',
    dosageMax: '10IU',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intranasal spray or subcutaneous injection'
  },
  {
    name: 'Vasopressin',
    description: 'Antidiuretic hormone for water retention and cognitive support.',
    category: 'Neuroendocrine',
    benefits: 'Improved memory, enhanced cognition, mood elevation, stress resilience',
    sideEffects: 'Water retention, hyponatremia risk, headache',
    dosageMin: '2IU',
    dosageMax: '10IU',
    frequency: 'Once or twice daily',
    timing: 'Morning or before cognitive tasks',
    administrationRoute: 'Intranasal spray'
  },
  {
    name: 'DSIP',
    description: 'Delta sleep-inducing peptide. Promotes deep sleep and recovery.',
    category: 'Sleep/Recovery',
    benefits: 'Improved sleep quality, deep sleep induction, recovery enhancement, pain reduction',
    sideEffects: 'Minimal reported, generally very safe',
    dosageMin: '500mcg',
    dosageMax: '2000mcg',
    frequency: 'Once daily before bed',
    timing: 'Before sleep',
    administrationRoute: 'Subcutaneous or intranasal injection'
  },
  {
    name: 'Apelin',
    description: 'Cardiovascular peptide supporting heart function and blood pressure.',
    category: 'Cardiovascular',
    benefits: 'Improved heart function, blood pressure regulation, cardiovascular health, endurance enhancement',
    sideEffects: 'Minimal reported, potential blood pressure changes',
    dosageMin: '10mcg',
    dosageMax: '50mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Angiotensin II',
    description: 'Vasoactive peptide for blood pressure and cardiovascular support.',
    category: 'Cardiovascular',
    benefits: 'Blood pressure regulation, cardiovascular function, improved perfusion',
    sideEffects: 'Hypertension risk, headache, dizziness',
    dosageMin: '1mcg',
    dosageMax: '10mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intravenous injection'
  },
  {
    name: 'VIP',
    description: 'Vasoactive Intestinal Peptide. Neuroprotective and immunomodulating peptide.',
    category: 'Immune/Neuro',
    benefits: 'Inflammation reduction, neuroprotection, immune support, pain reduction, vasodilation',
    sideEffects: 'Minimal reported, potential facial flushing',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Substance P',
    description: 'Neuropeptide involved in pain signaling and immune response.',
    category: 'Pain Management',
    benefits: 'Pain reduction, inflammation control, immune enhancement, neurological support',
    sideEffects: 'Minimal reported, potential burning at injection site',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Neuropeptide Y',
    description: 'Stress and appetite regulation peptide.',
    category: 'Neuroendocrine',
    benefits: 'Stress reduction, anxiety relief, appetite regulation, sleep improvement, mood support',
    sideEffects: 'Minimal reported, potential appetite changes',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or before bed',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'GABA',
    description: 'Gamma-Aminobutyric acid peptide for relaxation and stress relief.',
    category: 'Neuroendocrine',
    benefits: 'Anxiety reduction, improved relaxation, better sleep, stress relief, muscle tension relief',
    sideEffects: 'Minimal reported, potential drowsiness',
    dosageMin: '100mg',
    dosageMax: '500mg',
    frequency: 'Once or twice daily',
    timing: 'Before bed or evening',
    administrationRoute: 'Oral (pill or powder)'
  },
  {
    name: 'Gonadorelin',
    description: 'Gonadotropin-releasing hormone analog. Stimulates luteinizing and follicle-stimulating hormones.',
    category: 'Hormone',
    benefits: 'Hormonal optimization, testicular function, luteinizing hormone stimulation, reproductive health',
    sideEffects: 'Potential hormonal fluctuations, headache, facial flushing',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Triptorelin',
    description: 'GnRH agonist for hormonal regulation.',
    category: 'Hormone',
    benefits: 'Hormonal control, luteinizing hormone modulation, reproductive regulation',
    sideEffects: 'Hormonal side effects, hot flashes, mood changes',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once weekly or monthly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or intramuscular injection'
  },
  {
    name: 'Nafarelin',
    description: 'GnRH analog for hormonal regulation and reproduction control.',
    category: 'Hormone',
    benefits: 'Hormonal optimization, reproductive control, pituitary function modulation',
    sideEffects: 'Hormonal fluctuations, hot flashes, mood changes, headache',
    dosageMin: '200mcg',
    dosageMax: '400mcg',
    frequency: 'Twice daily',
    timing: 'Morning and evening',
    administrationRoute: 'Intranasal spray'
  },
  {
    name: 'Leuprolide',
    description: 'GnRH agonist for long-term hormonal suppression.',
    category: 'Hormone',
    benefits: 'Sustained hormonal control, pituitary downregulation, reproductive hormone suppression',
    sideEffects: 'Hormonal side effects, hot flashes, mood changes, sexual dysfunction',
    dosageMin: '3.75mg',
    dosageMax: '7.5mg',
    frequency: 'Every 3-4 weeks',
    timing: 'Any time of day',
    administrationRoute: 'Intramuscular injection'
  },
  {
    name: 'Octreotide',
    description: 'Somatostatin analog for growth hormone and insulin suppression.',
    category: 'Hormone',
    benefits: 'Growth hormone suppression, metabolic regulation, diarrhea relief, tumor support',
    sideEffects: 'Gastrointestinal issues, fat malabsorption, gallstone risk',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'One to three times daily',
    timing: 'With meals',
    administrationRoute: 'Subcutaneous injection or oral'
  },
  {
    name: 'Calcitonin',
    description: 'Hormone for bone health and calcium regulation.',
    category: 'Bone Health',
    benefits: 'Bone density improvement, calcium regulation, pain reduction, anti-inflammatory',
    sideEffects: 'Nausea, flushing, headache, potential malignancy risk',
    dosageMin: '50IU',
    dosageMax: '200IU',
    frequency: 'Once daily',
    timing: 'Any time of day',
    administrationRoute: 'Intranasal spray or subcutaneous injection'
  },
  {
    name: 'ACTH',
    description: 'Adrenocorticotropic hormone for cortisol stimulation and adrenal support.',
    category: 'Hormone',
    benefits: 'Cortisol optimization, adrenal function support, stress resilience, anti-inflammatory',
    sideEffects: 'Potential hormonal imbalances, hypertension, mood changes',
    dosageMin: '10mcg',
    dosageMax: '100mcg',
    frequency: 'One or twice daily',
    timing: 'Morning',
    administrationRoute: 'Subcutaneous or intramuscular injection'
  },
  {
    name: 'Corticotropin-releasing hormone',
    description: 'CRH analog for stress response and neuroendocrine support.',
    category: 'Neuroendocrine',
    benefits: 'Stress response optimization, ACTH stimulation, neuroendocrine balance',
    sideEffects: 'Hormonal fluctuations, potential anxiety, mood changes',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once daily',
    timing: 'Morning',
    administrationRoute: 'Intravenous or subcutaneous injection'
  },
  {
    name: 'LH-RH',
    description: 'Luteinizing hormone-releasing hormone for reproductive hormones.',
    category: 'Hormone',
    benefits: 'Hormonal optimization, luteinizing hormone stimulation, testosterone support',
    sideEffects: 'Hormonal fluctuations, potential testicular discomfort',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'FSH-RH',
    description: 'Follicle-stimulating hormone-releasing hormone.',
    category: 'Hormone',
    benefits: 'FSH stimulation, reproductive health, hormonal balance',
    sideEffects: 'Minimal reported, potential hormonal fluctuations',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Thyrotropin-releasing hormone',
    description: 'TRH analog for thyroid hormone support.',
    category: 'Hormone',
    benefits: 'Thyroid hormone optimization, TSH stimulation, metabolic enhancement',
    sideEffects: 'Minimal reported, potential mild side effects',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Melanocyte-Stimulating Hormone',
    description: 'MSH analog for pigmentation and metabolic support.',
    category: 'Tanning',
    benefits: 'Skin tanning, metabolic enhancement, sexual function support',
    sideEffects: 'Nausea, facial flushing, spontaneous erections',
    dosageMin: '250mcg',
    dosageMax: '1000mcg',
    frequency: 'Once daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'PACAP',
    description: 'Pituitary adenylyl cyclase-activating peptide for neuronal support.',
    category: 'Neuro',
    benefits: 'Neuroprotection, neuroplasticity, stress reduction, pain management',
    sideEffects: 'Minimal reported, potential headache',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },
  {
    name: 'Secretin',
    description: 'Gastrointestinal hormone for digestive support.',
    category: 'Digestive',
    benefits: 'Digestive support, gut health, pancreatic function, acid regulation',
    sideEffects: 'Gastrointestinal distress, nausea, headache',
    dosageMin: '50mcg',
    dosageMax: '200mcg',
    frequency: 'Once or twice daily',
    timing: 'With meals',
    administrationRoute: 'Subcutaneous or intravenous injection'
  },
  {
    name: 'Pancreatic Peptide',
    description: 'PP peptide for appetite and metabolic regulation.',
    category: 'Metabolic',
    benefits: 'Appetite regulation, metabolic support, satiety enhancement',
    sideEffects: 'Minimal reported, potential gastrointestinal effects',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Before meals',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Cholecystokinin',
    description: 'CCK peptide for digestive and satiety support.',
    category: 'Metabolic',
    benefits: 'Appetite suppression, digestive support, satiety, metabolic enhancement',
    sideEffects: 'Minimal reported, potential gastrointestinal effects',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Before meals',
    timing: 'Pre-meal',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Motilin',
    description: 'Gastrointestinal motility peptide.',
    category: 'Digestive',
    benefits: 'Improved gut motility, digestive support, gastric function',
    sideEffects: 'Minimal reported, potential cramping',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Before meals',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Insulin-like growth factor-1',
    description: 'IGF-1 for muscle growth and recovery.',
    category: 'Growth Hormone',
    benefits: 'Muscle growth, strength gain, recovery enhancement, tissue repair',
    sideEffects: 'Hypoglycemia risk, joint pain, water retention',
    dosageMin: '10mcg',
    dosageMax: '50mcg',
    frequency: 'Once or twice daily',
    timing: 'Post-workout or with meals',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Follistatin',
    description: 'Myostatin inhibitor for dramatic muscle growth.',
    category: 'Growth',
    benefits: 'Significant muscle growth, myostatin inhibition, strength gains, athletic performance',
    sideEffects: 'Potential developmental changes, joint pain',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Post-workout',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Myostatin Inhibitor',
    description: 'Directly blocks myostatin for muscle growth.',
    category: 'Growth',
    benefits: 'Inhibited muscle breakdown, enhanced growth, strength gains',
    sideEffects: 'Potential developmental changes, muscle imbalances',
    dosageMin: '100mcg',
    dosageMax: '300mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Bone Morphogenetic Protein',
    description: 'BMP for tissue growth and bone regeneration.',
    category: 'Bone/Tissue',
    benefits: 'Bone regeneration, tissue growth, healing enhancement, structural support',
    sideEffects: 'Potential inflammation, ectopic bone formation',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once weekly',
    timing: 'Any time of day',
    administrationRoute: 'Localized injection or surgical placement'
  },
  {
    name: 'Fibroblast Growth Factor',
    description: 'FGF for tissue and cell growth.',
    category: 'Growth/Tissue',
    benefits: 'Cell growth, tissue repair, neovascularization, healing support',
    sideEffects: 'Potential overgrowth, inflammation',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or localized injection'
  },
  {
    name: 'Vascular Endothelial Growth Factor',
    description: 'VEGF for angiogenesis and vascular support.',
    category: 'Vascular',
    benefits: 'Angiogenesis, blood vessel growth, improved circulation, oxygen delivery',
    sideEffects: 'Potential edema, hypertension, increased tumor risk',
    dosageMin: '10mcg',
    dosageMax: '100mcg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous or intravenous injection'
  },
  {
    name: 'Platelet-Derived Growth Factor',
    description: 'PDGF for tissue and bone healing.',
    category: 'Healing',
    benefits: 'Tissue regeneration, bone healing, angiogenesis, cell proliferation',
    sideEffects: 'Minimal reported, potential inflammation',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Localized or subcutaneous injection'
  },
  {
    name: 'Transforming Growth Factor',
    description: 'TGF for tissue repair and immune modulation.',
    category: 'Healing',
    benefits: 'Immune modulation, tissue repair, inflammation control, healing support',
    sideEffects: 'Potential immune suppression, tissue overgrowth',
    dosageMin: '100mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
  {
    name: 'Nerve Growth Factor',
    description: 'NGF for neuronal growth and repair.',
    category: 'Neuro',
    benefits: 'Nerve regeneration, neuroplasticity, neuroprotection, cognitive support',
    sideEffects: 'Minimal reported, potential nerve pain initially',
    dosageMin: '10mcg',
    dosageMax: '100mcg',
    frequency: 'Once or twice daily',
    timing: 'Any time of day',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },
  {
    name: 'Brain-Derived Neurotrophic Factor',
    description: 'BDNF for neuroplasticity and cognitive enhancement.',
    category: 'Cognitive',
    benefits: 'Enhanced neuroplasticity, improved cognition, mood enhancement, neuroprotection',
    sideEffects: 'Minimal reported, potential mood fluctuations',
    dosageMin: '50mcg',
    dosageMax: '500mcg',
    frequency: 'Once or twice daily',
    timing: 'Morning or before cognitive tasks',
    administrationRoute: 'Intranasal or subcutaneous injection'
  },
  {
    name: 'Glial Cell-Derived Neurotrophic Factor',
    description: 'GDNF for neuronal support and neuroprotection.',
    category: 'Neuro',
    benefits: 'Neuronal protection, nerve damage repair, motor function support, neurodegenerative prevention',
    sideEffects: 'Minimal reported, potential nerve-related discomfort',
    dosageMin: '10mcg',
    dosageMax: '100mcg',
    frequency: 'Once or twice weekly',
    timing: 'Any time of day',
    administrationRoute: 'Intracranial or intraspinal injection'
  },
  {
    name: 'Ciliary Neurotrophic Factor',
    description: 'CNTF for neuronal survival and growth.',
    category: 'Neuro',
    benefits: 'Neuronal survival, neuroprotection, disease prevention, cognitive support',
    sideEffects: 'Minimal reported, potential fever',
    dosageMin: '10mcg',
    dosageMax: '100mcg',
    frequency: 'Once daily',
    timing: 'Any time of day',
    administrationRoute: 'Subcutaneous injection'
  },
];

try {
  app.logger.info({ peptideCount: peptideData.length }, 'Starting peptide seeding');

  for (const peptide of peptideData) {
    await app.db.insert(schema.peptides).values(peptide);
  }

  app.logger.info({ peptideCount: peptideData.length }, 'Successfully seeded peptides');
  process.exit(0);
} catch (error) {
  app.logger.error({ err: error }, 'Failed to seed peptides');
  process.exit(1);
}

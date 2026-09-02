export const SITE_URL = "https://www.cellwear.net";
export const SEO_UPDATED = "2026-09-02";

export const SEO_BY_ROUTE = {
  "/": {
    title: "Cancer Education & Microscopy-Inspired Apparel | Cellwear",
    description:
      "Explore cancer cells under the microscope, compare healthy and cancer tissue, learn cancer biology, and discover Cellwear's microscopy-inspired apparel.",
    type: "WebPage",
    breadcrumbs: [["Home", "/"]],
  },
  "/education/": {
    title: "Cancer Education: Types, Diagnosis & Treatment | Cellwear",
    description:
      "Explore clear, source-led cancer education covering cancer biology, major cancer types, pathology, diagnosis, biomarkers, treatment, screening, and myths.",
    type: "CollectionPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"]],
  },
  "/education/types-of-cancer/": {
    title: "Types of Cancer: Carcinoma, Leukemia & More | Cellwear",
    description:
      "Learn how cancer types are classified by where they begin and the cells involved, including carcinoma, sarcoma, leukemia, lymphoma, myeloma, and melanoma.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"]],
  },
  "/education/cancer-types/breast-cancer/": {
    title: "Breast Cancer Cells Under the Microscope | Cellwear",
    description: "Compare healthy breast tissue and breast cancer under the microscope, then learn how biopsy, cell type, ER, PR, and HER2 help classify the disease.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"], ["Breast Cancer", "/education/cancer-types/breast-cancer/"]],
  },
  "/education/cancer-types/lung-cancer/": {
    title: "Lung Cancer Cells Under the Microscope | Cellwear",
    description: "Explore lung cancer cells under the microscope and learn how pathology separates non-small cell and small cell lung cancer, subtypes, and biomarkers.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"], ["Lung Cancer", "/education/cancer-types/lung-cancer/"]],
  },
  "/education/cancer-types/colorectal-cancer/": {
    title: "Colorectal Cancer Under the Microscope | Cellwear",
    description: "Compare normal colorectal mucosa and colorectal cancer histology, and learn how polyps, biopsy, grade, stage, and biomarkers add meaning.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"], ["Colorectal Cancer", "/education/cancer-types/colorectal-cancer/"]],
  },
  "/education/cancer-types/pancreatic-cancer/": {
    title: "Pancreatic Cancer Under the Microscope | Cellwear",
    description: "See pancreatic cancer microscopy and learn the difference between common exocrine cancers, pancreatic neuroendocrine tumors, tissue, and cytology.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"], ["Pancreatic Cancer", "/education/cancer-types/pancreatic-cancer/"]],
  },
  "/education/cancer-types/melanoma/": {
    title: "Melanoma Cells Under the Microscope | Cellwear",
    description: "Explore melanoma cells through electron and fluorescence microscopy and learn how melanocytes, pathology, stage, and biomarkers define the disease.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Types of Cancer", "/education/types-of-cancer/"], ["Melanoma", "/education/cancer-types/melanoma/"]],
  },
  "/education/genetics-and-biomarkers/": {
    title: "Cancer Genetics & Biomarker Testing Guide | Cellwear",
    description:
      "Understand cancer genetics, inherited risk testing, tumor biomarker testing, genes, proteins, and how molecular clues may help inform cancer care.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Cancer Genetics and Biomarkers", "/education/genetics-and-biomarkers/"]],
  },
  "/education/pathology-and-diagnosis/": {
    title: "Cancer Pathology & Diagnosis: Biopsy to Report | Cellwear",
    description:
      "Follow cancer diagnosis from tests and biopsy through slide preparation, microscopic examination, pathology reports, grade, stage, margins, and biomarkers.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Pathology and Diagnosis", "/education/pathology-and-diagnosis/"]],
  },
  "/education/treatment/": {
    title: "Types of Cancer Treatment: A Visual Guide | Cellwear",
    description:
      "Compare cancer treatments including surgery, radiation, chemotherapy, targeted therapy, immunotherapy, hormone therapy, and stem cell transplant.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Cancer Treatment", "/education/treatment/"]],
  },
  "/education/screening-and-symptoms/": {
    title: "Cancer Screening vs. Symptoms: What to Know | Cellwear",
    description:
      "Learn how cancer screening differs from symptoms, what screening can and cannot show, and why lasting or concerning changes need professional care.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Screening and Symptoms", "/education/screening-and-symptoms/"]],
  },
  "/education/cancer-myths/": {
    title: "Cancer Myths vs. Facts: Evidence-Based Answers | Cellwear",
    description:
      "Separate common cancer myths from evidence-based facts about contagion, biopsies, sugar, attitude, oxygen, inherited risk, and cancer treatment.",
    type: "MedicalWebPage",
    breadcrumbs: [["Home", "/"], ["Cancer Education", "/education/"], ["Cancer Myths and Facts", "/education/cancer-myths/"]],
  },
  "/microscopy-gallery/": {
    title: "Cancer Cells Under the Microscope: Image Gallery | Cellwear",
    description:
      "Explore cancer cells under the microscope, healthy-versus-cancer tissue, histology, fluorescence, and electron microscopy with sources and image rights.",
    type: "ImageGallery",
    breadcrumbs: [["Home", "/"], ["Microscopy Gallery", "/microscopy-gallery/"]],
  },
  "/blog/": {
    title: "Cancer Biology & Microscopy Articles | Cellwear Journal",
    description:
      "Read source-led articles about cancer biology, cells under the microscope, pathology, diagnosis, grade, stage, biomarkers, and treatment decisions.",
    type: "Blog",
    breadcrumbs: [["Home", "/"], ["Cellwear Journal", "/blog/"]],
  },
  "/blog/what-cancer-looks-like/": {
    title: "What Do Cancer Cells Look Like Under a Microscope? | Cellwear",
    description:
      "See how pathologists use microscopes, stains, cell patterns, and tissue architecture to study cancer—and why one cancer image never tells the whole story.",
    type: "BlogPosting",
    breadcrumbs: [["Home", "/"], ["Cellwear Journal", "/blog/"], ["Cancer Under a Microscope", "/blog/what-cancer-looks-like/"]],
  },
  "/blog/cancer-is-not-one-disease/": {
    title: "Cancer Is Not One Disease: Types & Classification | Cellwear",
    description:
      "Learn why cancer is a family of diseases, how cancers are named by their origin and cell type, and why type, subtype, stage, and biomarkers matter.",
    type: "BlogPosting",
    breadcrumbs: [["Home", "/"], ["Cellwear Journal", "/blog/"], ["Cancer Is Not One Disease", "/blog/cancer-is-not-one-disease/"]],
  },
  "/blog/grade-stage-biomarkers/": {
    title: "Cancer Grade vs. Stage vs. Biomarkers | Cellwear",
    description:
      "Learn the difference between cancer grade, cancer stage, and tumor biomarkers—and how appearance, extent, and biology answer different questions.",
    type: "BlogPosting",
    breadcrumbs: [["Home", "/"], ["Cellwear Journal", "/blog/"], ["Grade, Stage and Biomarkers", "/blog/grade-stage-biomarkers/"]],
  },
  "/blog/how-treatment-is-chosen/": {
    title: "How Cancer Treatment Is Chosen: Type, Stage & Biomarkers",
    description:
      "Learn how cancer type, subtype, stage, grade, biomarkers, overall health, and treatment goals help a care team build an individual cancer treatment plan.",
    type: "BlogPosting",
    breadcrumbs: [["Home", "/"], ["Cellwear Journal", "/blog/"], ["How Cancer Treatment Is Chosen", "/blog/how-treatment-is-chosen/"]],
  },
  "/submit-microscopy/": {
    title: "Submit Cancer & Cell Microscopy Images | Cellwear",
    description:
      "Submit original cell, tissue, cancer, pathology, or treatment microscopy for possible use in Cellwear education, editorial, campaigns, or apparel.",
    type: "WebPage",
    breadcrumbs: [["Home", "/"], ["Submit Microscopy", "/submit-microscopy/"]],
  },
  "/image-credits/": {
    title: "Scientific Image Credits, Sources & Rights | Cellwear",
    description:
      "Review creators, institutions, source links, licenses, public-domain status, and reuse requirements for scientific microscopy images used by Cellwear.",
    type: "WebPage",
    breadcrumbs: [["Home", "/"], ["Image Credits and Rights", "/image-credits/"]],
  },
  "/editorial-standards/": {
    title: "Editorial Standards, Sources & Corrections | Cellwear",
    description: "Learn how Cellwear researches cancer education, selects authoritative sources, labels microscopy images, handles corrections, and separates education from medical advice.",
    type: "AboutPage",
    breadcrumbs: [["Home", "/"], ["Editorial Standards", "/editorial-standards/"]],
  },
};

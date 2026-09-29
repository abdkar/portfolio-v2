/** All site text lives here. Edit, save, and the pages update. */

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  year: string;
  headline: string;
  summary: string;
  problem: string;
  contribution: string;
  method: string[];
  outcome: string;
  limitation: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "trustcv", featured: true, name: "TrustCV", category: "Validation & open source", status: "Open-source toolkit · Preprint", year: "2026",
    headline: "Evaluate the model. Respect the data.",
    summary: "Cross-validation designed around patients, time, and the structure of real research data.",
    problem: "When observations from the same participant appear in both training and test sets, performance can look better than the model’s ability to generalise to a new participant.",
    contribution: "Lead developer and co-designer. I develop the validation architecture, leakage checks, reusable Python tooling, and methodological documentation with research collaborators.",
    method: ["Identify dependence: participants, groups, time, or space.", "Choose a split strategy that matches the intended use of the model.", "Keep preprocessing and model selection inside the training process.", "Document splits, uncertainty, and evaluation decisions."],
    outcome: "A reusable Python toolkit and a review-derived taxonomy for more transparent evaluation of dependent data.",
    limitation: "A suitable splitter is one part of sound validation. Preprocessing, feature selection, dataset shift, and the intended deployment setting still need explicit checks.",
    tags: ["Python", "Cross-validation", "Leakage detection"],
    links: [{ label: "Code", href: "https://github.com/ki-smile/trustcv" }, { label: "Documentation", href: "https://ki-smile.github.io/trustcv/" }, { label: "Preprint", href: "https://doi.org/10.21203/rs.3.rs-9357577/v1" }, { label: "Related study", href: "https://doi.org/10.2196/87728" }],
  },
  {
    slug: "triage-medley", featured: true, name: "TRIAGE-MEDLEY", category: "Clinical speech & uncertainty", status: "Research software · Journal article", year: "2026",
    headline: "Make uncertainty visible to the reviewer.",
    summary: "Use disagreement between speech-recognition systems to focus human review of clinical transcripts.",
    problem: "A fluent transcript can still contain an important error. Reviewing every word manually is costly, especially when a reference transcript is unavailable.",
    contribution: "Co-developer; lead and corresponding author of the clinical speech study. My work spans methodology, transcript alignment, validation, analysis, and manuscript preparation.",
    method: ["Transcribe the same audio with multiple ASR systems.", "Align alternative transcripts at the token level.", "Surface disagreement as a signal for review prioritisation.", "Keep a human reviewer responsible for checking the original audio."],
    outcome: "An on-premises research workflow connecting model disagreement with targeted human review, reported in Frontiers in Artificial Intelligence.",
    limitation: "Agreement does not prove correctness, and disagreement does not prove error. This is a review-prioritisation signal, not an autonomous clinical decision.",
    tags: ["Speech recognition", "Alignment", "Human oversight"],
    links: [{ label: "Code", href: "https://github.com/ki-smile/triage-medley" }, { label: "Journal article", href: "https://doi.org/10.3389/frai.2026.1829902" }, { label: "Research demo", href: "https://triage.medleyai.org/" }],
  },
  {
    slug: "medley-bench", featured: true, name: "MEDLEY-BENCH", category: "LLM evaluation", status: "Open benchmark · Preprint", year: "2026",
    headline: "What happens when a model is challenged?",
    summary: "A benchmark of belief revision under ambiguity, self-review, and social disagreement.",
    problem: "Answer accuracy alone tells us little about how a language model responds to conflicting evidence or pressure from other models.",
    contribution: "Co-developer and co-author. I contribute formal analysis, human validation, and interpretation of the benchmark.",
    method: ["Establish an independent answer.", "Compare structured self-review with socially conditioned revision.", "Evaluate the explanation and pattern of belief revision.", "Audit scoring assumptions and human agreement."],
    outcome: "The v1.0 proof of concept evaluates 35 models from 12 families on 130 instances. The revised preprint documents both the evaluation and its limitations.",
    limitation: "These results describe a prompted, rubric-dependent protocol. The revised paper identifies scoring and experimental-control limitations; the benchmark is not a general measure of intelligence.",
    tags: ["Benchmarking", "Belief revision", "Human validation"],
    links: [{ label: "Code", href: "https://github.com/ki-smile/medley-bench" }, { label: "Revised preprint", href: "https://arxiv.org/abs/2604.16009v2" }, { label: "Documentation", href: "https://ki-smile.github.io/medley-bench/" }],
  },
  {
    slug: "railway-resilience", name: "Railway climate resilience", category: "Infrastructure & climate", status: "Journal articles", year: "2024–2025",
    headline: "Turn failure records into evidence for resilience.",
    summary: "Machine learning for climate-related failures across regional and national railway networks.",
    problem: "Climate and infrastructure records have temporal and operational structure. Useful risk modelling needs evaluation that reflects that structure.",
    contribution: "Machine Learning Lead at Luleå University of Technology; first author of the 2025 study. I lead modelling, synchronised cross-validation, and interpretability analysis with domain experts.",
    method: ["Bring infrastructure and climate observations together.", "Develop models for failure prediction and classification.", "Evaluate with synchronised cross-validation.", "Interpret results with railway and infrastructure specialists."],
    outcome: "Peer-reviewed studies in Climate Risk Management and Transportation Research Part D, alongside reproducible modelling workflows.",
    limitation: "Research performance should not be interpreted as a live operational forecast. Generalisation depends on the network, reporting practices, and climate conditions.",
    tags: ["Time series", "Interpretable ML", "Climate risk"],
    links: [{ label: "2025 article", href: "https://doi.org/10.1016/j.crm.2025.100764" }, { label: "2024 article", href: "https://doi.org/10.1016/j.trd.2024.104371" }],
  },
  {
    slug: "rehabilitation-ai", name: "Rehabilitation & movement AI", category: "Biomechanics & multimodal ML", status: "Journal articles", year: "2026",
    headline: "Connect movement, muscle activity, and interpretation.",
    summary: "Participant-aware machine learning to study fear of re-injury after ACL reconstruction.",
    problem: "Repeated measurements and multiple sensing modalities make rehabilitation data rich, but also make careless model validation misleading.",
    contribution: "First author and ML researcher at Umeå University. I lead study design, multimodal modelling, participant-aware validation, analysis, and interpretation with clinical collaborators.",
    method: ["Represent biomechanical movement and EMG measurements.", "Study individual and combined information from the modalities.", "Keep participant identity in the validation design.", "Use feature interpretation to support scientific discussion."],
    outcome: "Related journal studies in Journal of Sports Sciences and Journal of Biomechanics, plus participant-aware validation work in JMIR AI.",
    limitation: "Classification of study labels does not replace clinical assessment. The two rehabilitation papers address related but distinct modelling questions.",
    tags: ["Biomechanics", "EMG", "Explainability"],
    links: [{ label: "Code", href: "https://github.com/abdkar/P1_FearClassification_Code" }, { label: "Multimodal study", href: "https://doi.org/10.1016/j.jbiomech.2026.113346" }, { label: "Movement study", href: "https://doi.org/10.1080/02640414.2025.2578584" }],
  },
  {
    slug: "capillaroscopy", name: "Capillaroscopy & medical imaging", category: "Computer vision", status: "Doctoral research · Software prototype", year: "2013–present",
    headline: "Make microvascular images measurable.",
    summary: "Image analysis and quantitative methods for nailfold capillary assessment.",
    problem: "Manual image assessment varies between observers. Clear measurement definitions and reproducible image analysis are essential for interpretable comparisons.",
    contribution: "Doctoral researcher at KTH and first author of capillaroscopy methodology studies. I developed capillary detection, quantification, and image-analysis methods with clinical collaborators.",
    method: ["Prepare and inspect nailfold images.", "Identify capillary structures and measurement regions.", "Apply explicit density and morphology definitions.", "Evaluate reliability and clinical interpretation."],
    outcome: "A PhD in Applied Medical Technology, peer-reviewed image-analysis studies, and a software prototype connecting the methods to an interactive workflow.",
    limitation: "The schematic is illustrative. The prototype should not be presented as an independently validated diagnostic device.",
    tags: ["Medical imaging", "Computer vision", "Quantification"],
    links: [{ label: "Prototype code", href: "https://github.com/abdkar/capillaroscopy-app" }, { label: "Density method", href: "https://doi.org/10.1016/j.mvr.2017.04.002" }, { label: "Assessment review", href: "https://doi.org/10.1007/s10067-019-04644-9" }],
  },
  {
    slug: "video-analytics", name: "Video analytics & explainable AI", category: "Computer vision", status: "Research programme · Review article", year: "2019–2022",
    headline: "Understand events across frames.",
    summary: "Deep-learning methods and evaluation for events and anomalies in video streams.",
    problem: "Video models must reason across time while remaining useful under changing conditions and practical latency constraints.",
    contribution: "Postdoctoral researcher at Mid Sweden University. I developed CNN/RNN models, streaming pipelines, evaluation methods, and contributed to student supervision.",
    method: ["Represent spatial information within frames.", "Model temporal relationships across sequences.", "Evaluate robustness, latency, and throughput.", "Connect methods with the broader event-detection literature."],
    outcome: "Algorithm and software work in video analytics, with a first-author review in Multimedia Tools and Applications.",
    limitation: "Performance depends on the event definition and deployment environment; no universal detection rate is claimed here.",
    tags: ["Deep learning", "Temporal modelling", "Video"],
    links: [{ label: "Review article", href: "https://doi.org/10.1007/s11042-021-11864-2" }],
  },
  {
    slug: "capillaroscopy-review", name: "AI in nailfold capillaroscopy", category: "Evidence synthesis", status: "Preprint · Under review", year: "2026",
    headline: "Ask what the evidence can support.",
    summary: "A scoping review of validation, reproducibility, and clinical translation in capillaroscopy AI.",
    problem: "Model performance alone is insufficient to judge readiness for clinical translation. Evaluation design and reproducibility need systematic attention.",
    contribution: "Corresponding author and co-supervisor. I co-designed the review, contributed screening and data charting, co-led analysis and writing, and coordinated collaborators across four institutions.",
    method: ["Define the review questions and eligibility criteria.", "Screen and chart the literature systematically.", "Examine validation and reproducibility practices.", "Identify the evidence needed for clinical translation."],
    outcome: "An international review manuscript with a public preprint; listed as under review in my September 2026 CV.",
    limitation: "Under review is not peer-reviewed acceptance. Publication status is kept separate from completed journal articles.",
    tags: ["Scoping review", "Reproducibility", "Clinical translation"],
    links: [{ label: "Preprint", href: "https://doi.org/10.21203/rs.3.rs-10348706/v1" }],
  },
  {
    slug: "medley-ddx", name: "MEDLEY differential diagnosis", category: "Current research", status: "Work in progress", year: "2026",
    headline: "Study consensus without hiding disagreement.",
    summary: "Research on combining ranked differential-diagnosis outputs and evaluating them on held-out cases.",
    problem: "Combining model outputs needs a clear protocol for development, independent evaluation, and assessment of the scoring process.",
    contribution: "Contributing to the study’s evaluation methodology, analysis, and manuscript development with collaborators.",
    method: ["Collect ranked outputs under a common protocol.", "Group equivalent concepts and combine ranked suggestions.", "Separate development decisions from held-out evaluation.", "Study disagreement and audit scoring with human assessment."],
    outcome: "Ongoing methodological and manuscript work. Results will be linked when a public research output is available.",
    limitation: "Research in progress. No clinical performance or deployment claim is made, and internal results are not presented as published evidence.",
    tags: ["Ensemble evaluation", "Ranked outputs", "Held-out testing"],
    links: [],
  },
];

export const domains = [
  { title: "Validation under dependence", description: "Evaluation designs that account for repeated measurements, participants, groups, time, and space.", skills: ["Nested cross-validation", "Participant-aware splits", "Calibration", "Leakage checks"], slug: "trustcv", work: "TrustCV & validation research" },
  { title: "Clinical speech & uncertainty", description: "Make disagreement visible and connect model outputs to targeted human review.", skills: ["Transcript alignment", "Multi-ASR workflows", "Uncertainty", "Human validation"], slug: "triage-medley", work: "TRIAGE-MEDLEY" },
  { title: "Medical imaging & computer vision", description: "Quantitative image analysis with explicit measurement definitions and clinical interpretation.", skills: ["Image processing", "Capillary quantification", "Deep learning", "Reliability"], slug: "capillaroscopy", work: "Capillaroscopy & medical imaging" },
  { title: "Multimodal machine learning", description: "Combine complementary measurements without losing the structure of the underlying study.", skills: ["Biomechanics", "EMG", "PyTorch", "scikit-learn", "SHAP"], slug: "rehabilitation-ai", work: "Rehabilitation & movement AI" },
  { title: "Scientific software", description: "Research methods packaged as inspectable, documented, and reusable workflows.", skills: ["Python packages", "Testing", "Documentation", "MLflow", "Docker"], slug: "trustcv", work: "Open-source validation tooling" },
  { title: "LLM evaluation & analysis", description: "Study belief revision, interpretation, and scoring assumptions beyond answer accuracy.", skills: ["Benchmark design", "Formal analysis", "Human validation", "Reproducibility"], slug: "medley-bench", work: "MEDLEY-BENCH" },
];

/** Tabs in the hero ("A closer look at my work"). */
export const focusAreas = [
  { label: "Validation", name: "TrustCV", description: "I develop validation tools that account for participants, time, and dependence in research data.", slug: "trustcv" },
  { label: "Clinical speech", name: "TRIAGE-MEDLEY", description: "I study how disagreement between speech models can help people review clinical transcripts.", slug: "triage-medley" },
  { label: "LLM evaluation", name: "MEDLEY-BENCH", description: "I contribute to research on how language models revise answers after self-review and peer feedback.", slug: "medley-bench" },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years in research" },
  { value: 18, suffix: "", label: "Journal articles" },
  { value: 5, suffix: "", label: "Swedish institutions" },
];

/** Scrolling strip under the hero. */
export const marquee = ["Karolinska Institutet", "KTH Royal Institute of Technology", "Luleå University of Technology", "Umeå University", "Mid Sweden University", "Frontiers in Artificial Intelligence", "JMIR AI", "Journal of Biomechanics", "Journal of Sports Sciences", "Climate Risk Management", "Transportation Research Part D", "Microvascular Research"];

export const publicationTopics = ["Validation under dependence", "Clinical speech & human review", "Multimodal rehabilitation AI", "Medical imaging & reproducibility"];

export type ExperienceItem = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets?: string[];
  description?: string;
  slug?: string;
};

export type EducationItem = {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  detail: string;
  year: number;
  type: "journal" | "conference" | "preprint";
  url: string;
  area: string;
  first: boolean;
  contribution: string;
};

export const experiences: ExperienceItem[] = [
  {
    title: "Affiliated Researcher & Lead Developer",
    org: "Karolinska Institutet — CLINTEC / SMAILE Core Facility",
    location: "Stockholm, Sweden",
    period: "2025 – Present",
    bullets: [
      "Lead developer of TrustCV: validation architecture, leakage checks, reusable Python tooling, and methodological documentation.",
      "Co-developed MEDLEY-BENCH; contributed formal analysis, human validation, and benchmark interpretation.",
      "Co-develop TRIAGE-MEDLEY: transcript alignment, model disagreement, uncertainty surfacing, and human-review workflows.",
      "Corresponding author and co-supervisor of an international scoping review of AI in nailfold capillaroscopy."
    ],
    slug: "trustcv"
  },
  {
    title: "Machine Learning Lead — Railway Climate Resilience",
    org: "Luleå University of Technology",
    location: "Luleå, Sweden",
    period: "2023 – Present",
    bullets: [
      "Lead machine-learning modelling for prediction and classification of climate-related railway failures.",
      "Develop reproducible evaluation workflows with MLflow and Docker, and interpret model behaviour with infrastructure specialists.",
      "First author of the 2025 Climate Risk Management study on regional and national railway networks."
    ],
    slug: "railway-resilience"
  },
  {
    title: "Staff Scientist, AI & Biomechanics",
    org: "Umeå University",
    location: "Umeå, Sweden",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Developed ML models for movement-analysis and rehabilitation data using Python, PyTorch/scikit-learn, and SHAP.",
      "Owned data preparation, model development, evaluation, experiment tracking, and containerised deployment in a research setting.",
      "Worked with clinicians and engineers to make research outputs interpretable and usable."
    ],
    slug: "rehabilitation-ai"
  },
  {
    title: "Postdoctoral Researcher — ML for Biomechanics",
    org: "Umeå University",
    location: "Umeå, Sweden",
    period: "2023 – 2025",
    bullets: [
      "Developed multimodal models connecting biomechanical motion and EMG measurements with fear of re-injury after ACL reconstruction.",
      "Led study design, participant-aware validation, multimodal analysis, interpretation, and first-author manuscripts.",
      "Co-supervised student research and contributed reusable workflows for repeated-measures data."
    ],
    slug: "rehabilitation-ai"
  },
  {
    title: "Postdoctoral Researcher — Video Analytics & XAI",
    org: "Mid Sweden University",
    location: "Sundsvall, Sweden",
    period: "2019 – 2021",
    bullets: [
      "Developed and trained deep learning models (CNNs/RNNs) for anomaly and event detection in real-time surveillance video streams.",
      "Optimised models for latency and throughput; implemented streaming pipelines, monitoring, and robust evaluation under distribution shift.",
      "Contributed to both algorithm development and software implementation in a small research/engineering team."
    ],
    slug: "video-analytics"
  },
  {
    title: "Doctoral Researcher — Medical Image Analysis",
    org: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    period: "2013 – 2019",
    bullets: [
      "Built computer-aided diagnostic methods for rheumatic disease based on nailfold capillaroscopy images (microvascular medical imaging).",
      "Developed image-processing and ML algorithms for capillary detection, quantification, and feature extraction to support clinical decision-making.",
      "Worked with rheumatologists and imaging units to design analysis pipelines, validate models, and prepare scientific and technical documentation."
    ],
    slug: "capillaroscopy"
  }
];

export const education: EducationItem[] = [
  {
    title: "Ph.D., Applied Medical Technology",
    org: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    period: "2018",
    description: "Thesis: Novel Analysis Toolkit for Capillaroscopic Images: Development and Clinical Evaluation. Research in medical image analysis, quantitative validation, and clinical decision-support technology."
  },
  {
    title: "M.Sc., Mathematics",
    org: "Isfahan University of Technology",
    location: "Isfahan, Iran",
    period: "2002",
    description: "Advanced mathematical training that supports my work in modelling, statistical reasoning, and scientific computation."
  },
  {
    title: "B.Sc., Mathematics",
    org: "University of Isfahan",
    location: "Isfahan, Iran",
    period: "2000",
    description: "Foundations in mathematics, developed into a research practice spanning computational methods and applied machine learning."
  }
];

export const publications: Publication[] = [
  {
    title: "Artificial Intelligence in Nailfold Capillaroscopy: A Scoping Review of Validation, Reproducibility, and Clinical Translation",
    authors: "Emrani, Z., Setarehdan, S. K., Jafari-Varzaneh, H., Fatemi, A., & Karbalaie, A.",
    venue: "Research Square (preprint; manuscript under review)",
    detail: "",
    year: 2026,
    type: "preprint",
    url: "https://doi.org/10.21203/rs.3.rs-10348706/v1",
    area: "Medical Imaging",
    first: false,
    contribution: "Corresponding author and co-supervisor — review design, screening, data charting, analysis, writing, and coordination across four institutions."
  },
  {
    title: "Cross-model disagreement as a reference-free signal for prioritizing human review in medical speech transcription",
    authors: "Karbalaie, A., Seoane, F., & Abtahi, F.",
    venue: "Frontiers in Artificial Intelligence",
    detail: "Article 1829902",
    year: 2026,
    type: "journal",
    url: "https://doi.org/10.3389/frai.2026.1829902",
    area: "Speech & Language AI",
    first: true,
    contribution: "Lead and corresponding author — conceptualization, methodology, software, validation, and manuscript."
  },
  {
    title: "Enhancing fear of re-injury classification after ACL reconstruction by integrating biomechanical and electromyography data using multimodal machine learning methods",
    authors: "Karbalaie, A., Grinberg, A., Strong, A., Grip, H., Prorok, K., Häger, C. K., & Nordström, T.",
    venue: "Journal of Biomechanics",
    detail: "204, 113346",
    year: 2026,
    type: "journal",
    url: "https://doi.org/10.1016/j.jbiomech.2026.113346",
    area: "Clinical & Biomechanics ML",
    first: true,
    contribution: "First author — study design, multimodal ML methodology, validation, analysis, and drafting."
  },
  {
    title: "Participant-Aware Model Validation for Repeated-Measures Data: Comparative Cross-Validation Study",
    authors: "Karbalaie, A., Abtahi, F., & Häger, C. K.",
    venue: "JMIR AI",
    detail: "5:e87728",
    year: 2026,
    type: "journal",
    url: "https://doi.org/10.2196/87728",
    area: "AI Evaluation & Validation",
    first: true,
    contribution: "First author — methodological framing, evaluation design, statistical benchmarking, reproducible code."
  },
  {
    title: "Cross-validation under data dependence: a review-derived taxonomy and TrustCV, a leakage-aware Python toolkit",
    authors: "Karbalaie, A. & Abtahi, F.",
    venue: "Research Square (preprint)",
    detail: "",
    year: 2026,
    type: "preprint",
    url: "https://doi.org/10.21203/rs.3.rs-9357577/v1",
    area: "AI Evaluation & Validation",
    first: true,
    contribution: "First author — taxonomy, toolkit design, and manuscript writing."
  },
  {
    title: "MEDLEY-BENCH: Benchmarking Behavioural Metacognition and Belief Revision Under Social Pressure in Large Language Models",
    authors: "Abtahi, F., Karbalaie, A., Illueca-Fernandez, E., & Seoane, F.",
    venue: "arXiv (preprint)",
    detail: "2604.16009",
    year: 2026,
    type: "preprint",
    url: "https://arxiv.org/abs/2604.16009v2",
    area: "AI Evaluation & Validation",
    first: false,
    contribution: "Co-author — formal analysis, human-validation work, benchmark interpretation."
  },
  {
    title: "Beyond self-reports after anterior cruciate ligament injury — machine learning methods for classifying and identifying movement patterns related to fear of re-injury",
    authors: "Karbalaie, A., Strong, A., Nordström, T., Schelin, L., Selling, J., Grip, H., Prorok, K., & Häger, C. K.",
    venue: "Journal of Sports Sciences",
    detail: "44(3), 342–356",
    year: 2026,
    type: "journal",
    url: "https://doi.org/10.1080/02640414.2025.2578584",
    area: "Clinical & Biomechanics ML",
    first: true,
    contribution: "First author — ML methodology, analysis pipeline, interpretation, and manuscript."
  },
  {
    title: "Classifying climate-related failures for regional-national railway networks",
    authors: "Karbalaie, A., Soleimani-Chamkhorami, K., Famurewa, S. M., & Garmabaki, A. H. S.",
    venue: "Climate Risk Management",
    detail: "50, 100764",
    year: 2025,
    type: "journal",
    url: "https://doi.org/10.1016/j.crm.2025.100764",
    area: "Infrastructure & Climate",
    first: true,
    contribution: "First author — modelling strategy, synchronized cross-validation design, interpretability analysis."
  },
  {
    title: "Identifying climate-related failures in railway infrastructure using machine learning",
    authors: "Soleimani-Chamkhorami, K., Karbalaie, A., Kasraei, A., Haghighi, E., Famurewa, S. M., & Garmabaki, A. H. S.",
    venue: "Transportation Research Part D: Transport and Environment",
    detail: "135, 104371",
    year: 2024,
    type: "journal",
    url: "https://doi.org/10.1016/j.trd.2024.104371",
    area: "Infrastructure & Climate",
    first: false,
    contribution: "Co-author — primary responsibility for ML analysis and evaluation strategy."
  },
  {
    title: "Event detection in surveillance videos: a review",
    authors: "Karbalaie, A., Abtahi, F., & Sjöström, M.",
    venue: "Multimedia Tools and Applications",
    detail: "",
    year: 2022,
    type: "journal",
    url: "https://doi.org/10.1007/s11042-021-11864-2",
    area: "Computer Vision",
    first: true,
    contribution: "First author — comprehensive survey, taxonomies, latency/throughput evaluation, and synthesis."
  },
  {
    title: "Nailfold microvascular changes in patients with systemic lupus erythematosus",
    authors: "Karbalaie, A., et al.",
    venue: "Microvascular Research",
    detail: "103910",
    year: 2019,
    type: "journal",
    url: "https://doi.org/10.1016/j.mvr.2019.103910",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — quantitative morphometry, statistical evaluation, and clinical correlation."
  },
  {
    title: "Practical issues in assessing nailfold capillaroscopic images: a summary",
    authors: "Karbalaie, A., Emrani, Z., Fatemi, A., Etehadtavakol, M., & Erlandsson, B.-E.",
    venue: "Clinical Rheumatology",
    detail: "",
    year: 2019,
    type: "journal",
    url: "https://doi.org/10.1007/s10067-019-04644-9",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — methodological consensus, observer reliability review, and best-practice recommendations."
  },
  {
    title: "Image enhancement effect on inter and intra-observer reliability of nailfold capillary assessment",
    authors: "Karbalaie, A., et al.",
    venue: "Microvascular Research",
    detail: "",
    year: 2018,
    type: "journal",
    url: "https://doi.org/10.1016/j.mvr.2018.06.005",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — image processing pipeline, multi-observer agreement study, and reproducibility metrics."
  },
  {
    title: "Elliptical broken line method for calculating capillary density in nailfold capillaroscopy: proposal and evaluation",
    authors: "Karbalaie, A., Etehadtavakol, M., Abtahi, F., Fatemi, A., Emrani, Z., & Erlandsson, B.-E.",
    venue: "Microvascular Research",
    detail: "",
    year: 2017,
    type: "journal",
    url: "https://doi.org/10.1016/j.mvr.2017.04.002",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — geometric algorithm design, automated density computation, and clinical benchmarking."
  },
  {
    title: "Capillary density: An important parameter in nailfold capillaroscopy",
    authors: "Karbalaie, A., Emrani, Z., Fatemi, A., Etehadtavakol, M., & Erlandsson, B.-E.",
    venue: "Microvascular Research",
    detail: "",
    year: 2017,
    type: "journal",
    url: "https://doi.org/10.1016/j.mvr.2016.09.001",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — review and quantitative definition of capillary density in systemic sclerosis."
  },
  {
    title: "Counting capillaries in nailfold capillaroscopy: State of the art and a proposed method",
    authors: "Karbalaie, A., et al.",
    venue: "IEEE-EMBS Conference on Biomedical Engineering and Sciences (IECBES)",
    detail: "",
    year: 2016,
    type: "conference",
    url: "https://doi.org/10.1109/IECBES.2016.7843437",
    area: "Medical Imaging",
    first: true,
    contribution: "First author — automated detection architecture and experimental comparison."
  },
  {
    title: "Nailfold Capillaroscopy in Rheumatic Diseases: Which Parameters Should Be Evaluated?",
    authors: "Etehad Tavakol, M., Fatemi, A., Karbalaie, A., Emrani, Z., & Erlandsson, B.-E.",
    venue: "BioMed Research International",
    detail: "",
    year: 2015,
    type: "journal",
    url: "https://doi.org/10.1155/2015/974530",
    area: "Medical Imaging",
    first: false,
    contribution: "Co-author — parameter definitions, clinical image curation, and literature synthesis."
  },
  {
    title: "Exact Solution of Time-Fractional Partial Differential Equations Using Sumudu Transform",
    authors: "Karbalaie, A., Montazeri, M. M., & Muhammed, H. H.",
    venue: "WSEAS Transactions on Mathematics",
    detail: "",
    year: 2014,
    type: "journal",
    url: "",
    area: "Applied Mathematics",
    first: true,
    contribution: "First author — analytical derivation, integral transform methodology, and proof."
  },
  {
    title: "Exact Solution of Partial Differential Equation Using Homo-Separation of Variables",
    authors: "Karbalaie, A., Muhammed, H. H., Shabani, M., & Montazeri, M. M.",
    venue: "International Journal of Nonlinear Science",
    detail: "",
    year: 2014,
    type: "journal",
    url: "",
    area: "Applied Mathematics",
    first: true,
    contribution: "First author — exact analytical solutions for nonlinear PDE systems."
  },
  {
    title: "Application of Homo-Separation of Variables method on nonlinear system of PDEs",
    authors: "Karbalaie, A., et al.",
    venue: "WSEAS Transactions on Mathematics",
    detail: "",
    year: 2014,
    type: "journal",
    url: "",
    area: "Applied Mathematics",
    first: true,
    contribution: "First author — mathematical proofs and applications to coupled physical systems."
  },
  {
    title: "Using Homo-Separation of Variables for Solving Systems of Nonlinear Fractional Partial Differential Equations",
    authors: "Karbalaie, A., Montazeri, M. M., & Muhammed, H. H.",
    venue: "International Journal of Mathematics and Mathematical Sciences",
    detail: "421378",
    year: 2013,
    type: "journal",
    url: "https://doi.org/10.1155/2013/421378",
    area: "Applied Mathematics",
    first: true,
    contribution: "First author — fractional calculus techniques for nonlinear systems."
  },
  {
    title: "New Approach to Find the Exact Solution of Fractional Partial Differential Equation",
    authors: "Karbalaie, A., Muhammed, H. H., & Erlandsson, B.-E.",
    venue: "WSEAS Transactions on Mathematics",
    detail: "",
    year: 2012,
    type: "journal",
    url: "",
    area: "Applied Mathematics",
    first: true,
    contribution: "First author — formulation of exact solutions for fractional differential equations."
  },
  {
    title: "Using Spectral Descriptive Signatures for Industrial Plume Detection",
    authors: "Karbalaie, A., et al.",
    venue: "Conference proceedings",
    detail: "",
    year: 2012,
    type: "conference",
    url: "",
    area: "Computer Vision",
    first: true,
    contribution: "First author — spectral feature extraction and classification pipeline."
  }
];

export const publicationStats = {
  total: publications.length,
  journals: publications.filter((p) => p.type === "journal").length,
  conferences: publications.filter((p) => p.type === "conference").length,
  preprints: publications.filter((p) => p.type === "preprint").length,
  first: publications.filter((p) => p.first).length,
};

export const publicationAreas = [
  "All areas",
  ...Array.from(new Set(publications.map((p) => p.area))),
];


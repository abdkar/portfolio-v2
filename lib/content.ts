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

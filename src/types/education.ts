export type EducationalLevel = 'primary' | 'middle' | 'secondary';

export type PrimaryGrade = 1 | 2 | 3 | 4 | 5;
export type MiddleGrade = 1 | 2 | 3 | 4;
export type SecondaryYear = 1 | 2 | 3;

export type SecondaryStream = 
  | 'cst' // Common Core: Science & Technology
  | 'cah' // Common Core: Arts & Humanities
  | 'experimental-sciences'
  | 'mathematics'
  | 'technical-mathematics'
  | 'literature-philosophy'
  | 'foreign-languages'
  | 'economics-management';

export type TechnicalSpecialization = 'electrical' | 'mechanical' | 'civil' | 'methods';
export type ForeignLanguageChoice = 'spanish' | 'german';

export interface EducationInfo {
  level: EducationalLevel;
  year: PrimaryGrade | MiddleGrade | SecondaryYear;
  stream?: SecondaryStream; // Only for secondary level
  technicalSpecialization?: TechnicalSpecialization; // Only for technical-mathematics stream
  foreignLanguageChoice?: ForeignLanguageChoice; // Only for foreign-languages stream
}

export const EDUCATION_LEVELS = {
  primary: {
    name: 'الابتدائي',
    years: 5,
    grades: {
      1: 'السنة الأولى ابتدائي',
      2: 'السنة الثانية ابتدائي', 
      3: 'السنة الثالثة ابتدائي',
      4: 'السنة الرابعة ابتدائي',
      5: 'السنة الخامسة ابتدائي'
    }
  },
  middle: {
    name: 'المتوسط',
    years: 4,
    grades: {
      1: 'السنة الأولى متوسط',
      2: 'السنة الثانية متوسط',
      3: 'السنة الثالثة متوسط',
      4: 'السنة الرابعة متوسط'
    }
  },
  secondary: {
    name: 'الثانوي',
    years: 3,
    grades: {
      1: 'السنة الأولى ثانوي',
      2: 'السنة الثانية ثانوي',
      3: 'السنة الثالثة ثانوي'
    },
    streams: {
      'cst': 'جذع مشترك علوم وتكنولوجيا',
      'cah': 'جذع مشترك آداب وإنسانيات',
      'experimental-sciences': 'علوم تجريبية',
      'mathematics': 'رياضيات',
      'technical-mathematics': 'تقني رياضي',
      'literature-philosophy': 'آداب وفلسفة',
      'foreign-languages': 'لغات أجنبية',
      'economics-management': 'تسيير واقتصاد'
    },
    technicalSpecializations: {
      'electrical': 'هندسة كهربائية',
      'mechanical': 'هندسة ميكانيكية',
      'civil': 'هندسة مدنية',
      'methods': 'هندسة الطرائق'
    },
    foreignLanguageChoices: {
      'spanish': 'الإسبانية',
      'german': 'الألمانية'
    }
  }
} as const;

// Subject definitions for each level and grade
export const SUBJECTS_BY_LEVEL = {
  primary: {
    1: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'science', name: 'التربية العلمية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'art', name: 'التربية الفنية (الرسم)' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    2: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'science', name: 'التربية العلمية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    3: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'science', name: 'التربية العلمية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    4: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'science', name: 'التربية العلمية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'history-geography', name: 'مدخل إلى التاريخ والجغرافيا' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    5: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'science', name: 'التربية العلمية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ]
  },
  middle: {
    1: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'ict', name: 'الإعلام الآلي' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    2: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'ict', name: 'الإعلام الآلي' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    3: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'ict', name: 'الإعلام الآلي' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    4: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'civic', name: 'التربية المدنية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'ict', name: 'الإعلام الآلي' },
      { id: 'art', name: 'التربية الفنية' },
      { id: 'physical', name: 'التربية البدنية' }
    ]
  },
  secondary: {
    // Year 1 - Common Core streams
    cst: [
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' },
      { id: 'computer-science', name: 'الإعلام الآلي' }
    ],
    cah: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'mathematics', name: 'الرياضيات (مبسط)' },
      { id: 'science', name: 'العلوم (مختصر)' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' },
      { id: 'computer-science', name: 'الإعلام الآلي' }
    ],
    // Specialized streams for Years 2 & 3
    'experimental-sciences': [
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية' },
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    'mathematics': [
      { id: 'mathematics', name: 'الرياضيات المتقدمة' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'natural-sciences', name: 'العلوم الطبيعية الأساسية' },
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    'technical-mathematics': [
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'physics', name: 'الفيزياء' },
      { id: 'technology', name: 'التكنولوجيا' },
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    'literature-philosophy': [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'philosophy', name: 'الفلسفة المتقدمة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'mathematics', name: 'الرياضيات الأساسية' },
      { id: 'science', name: 'العلوم الأساسية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    'foreign-languages': [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'third-language', name: 'اللغة الأجنبية الثالثة' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ],
    'economics-management': [
      { id: 'mathematics', name: 'الرياضيات' },
      { id: 'economics', name: 'الاقتصاد والتسيير' },
      { id: 'accounting', name: 'المحاسبة' },
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'philosophy', name: 'الفلسفة' },
      { id: 'history-geography', name: 'التاريخ والجغرافيا' },
      { id: 'french', name: 'اللغة الفرنسية' },
      { id: 'english', name: 'اللغة الإنجليزية' },
      { id: 'islamic', name: 'التربية الإسلامية' },
      { id: 'physical', name: 'التربية البدنية' }
    ]
  }
} as const;
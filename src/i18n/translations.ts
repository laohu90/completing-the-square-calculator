export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface Translations {
  appName: string;
  appTagline: string;
  tabSolver: string;
  tabVisualizer: string;
  tabExamples: string;
  tabPractice: string;
  tabGuide: string;
  tabFAQ: string;
  presetsTitle: string;
  quickExamples: string;
  inputHeader: string;
  inputDescription: string;
  coeffA: string;
  coeffB: string;
  coeffC: string;
  parseEquationPlaceholder: string;
  parseEquationLabel: string;
  solveButton: string;
  resetButton: string;
  randomButton: string;
  summaryTitle: string;
  vertexLabel: string;
  axisOfSymmetry: string;
  directionOfOpening: string;
  opensUp: string;
  opensDown: string;
  extremumMin: string;
  extremumMax: string;
  rootsLabel: string;
  discriminantLabel: string;
  vertexFormLabel: string;
  standardFormLabel: string;
  magicTermHighlight: string;
  magicTermExplainer: string;
  stepsHeading: string;
  printButton: string;
  copySteps: string;
  copied: string;
  shareLink: string;
  linkCopied: string;

  // Step titles & descriptions
  step1_title: string;
  step1_desc: string;
  step2_title: string;
  step2_desc: string;
  step3_title: string;
  step3_desc: string;
  step4_title: string;
  step4_desc: string;
  step5_title: string;
  step5_desc: string;
  step6_title: string;
  step6_desc: string;
  step7_title: string;
  step7_desc: string;
  step8_title: string;
  step8_desc: string;
  step9_title: string;
  step9_desc: string;

  // Visualizer
  visualizerTitle: string;
  visualizerSubtitle: string;
  visualizerBoxX2: string;
  visualizerBoxBx: string;
  visualizerBoxCorner: string;
  visualizerExplanation: string;
  visualizerStepPrev: string;
  visualizerStepNext: string;
  visualizerAutoPlay: string;
  visualizerPause: string;

  // Practice Mode
  practiceTitle: string;
  practiceSubtitle: string;
  questionFindConstant: string;
  questionFindVertex: string;
  questionFindBinomial: string;
  submitAnswer: string;
  correctAnswer: string;
  wrongAnswer: string;
  nextQuestion: string;
  scoreLabel: string;
  streakLabel: string;
  hintButton: string;

  // Error messages
  error_a_zero: string;
  error_invalid_input: string;

  // FAQ & Educational
  faqTitle: string;
  faqSubtitle: string;
  commonTrapsTitle: string;
  trap1Title: string;
  trap1Desc: string;
  trap2Title: string;
  trap2Desc: string;
  trap3Title: string;
  trap3Desc: string;
  footerRights: string;
  footerDisclaimer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SquareMaster',
    appTagline: 'Completing the Square Calculator & Step-by-Step Solver',
    tabSolver: 'Step-by-Step Solver',
    tabVisualizer: 'Geometric Area Model',
    tabExamples: 'Worked Examples',
    tabPractice: 'Practice & Quiz',
    tabGuide: 'Complete Guide',
    tabFAQ: 'Formulas & FAQ',
    presetsTitle: 'Quick Examples',
    quickExamples: 'Popular Practice Problems:',
    inputHeader: 'Enter Quadratic Equation',
    inputDescription: 'Solve ax² + bx + c = 0 or convert y = ax² + bx + c into vertex form. Supports integers, decimals, and exact fractions (e.g., 3/2).',
    coeffA: 'Coefficient a (x²)',
    coeffB: 'Coefficient b (x)',
    coeffC: 'Constant c',
    parseEquationPlaceholder: 'e.g. 2x^2 + 8x - 10 = 0 or x^2 - 6x + 5',
    parseEquationLabel: 'Or paste raw equation:',
    solveButton: 'Solve & Complete Square',
    resetButton: 'Reset',
    randomButton: 'Random Example',
    summaryTitle: 'Key Solution & Parabola Properties',
    vertexLabel: 'Vertex (h, k)',
    axisOfSymmetry: 'Axis of Symmetry',
    directionOfOpening: 'Direction',
    opensUp: 'Opens Upwards (Minimum point)',
    opensDown: 'Opens Downwards (Maximum point)',
    extremumMin: 'Minimum Value',
    extremumMax: 'Maximum Value',
    rootsLabel: 'Roots (Solutions)',
    discriminantLabel: 'Discriminant (Δ = b² - 4ac)',
    vertexFormLabel: 'Vertex Form',
    standardFormLabel: 'Standard Form',
    magicTermHighlight: 'The Missing Balancing Constant (b / 2a)²',
    magicTermExplainer: 'This is the most critical step that students struggle with. We take half of the linear coefficient and square it to form a perfect square trinomial.',
    stepsHeading: 'Complete Step-by-Step Algebraic Proof',
    printButton: 'Print / Save PDF',
    copySteps: 'Copy Steps (Text)',
    copied: 'Copied to clipboard!',
    shareLink: 'Share Solution Link',
    linkCopied: 'Shareable link copied!',

    step1_title: 'Step 1: Write in Standard Form',
    step1_desc: 'Identify the coefficients a, b, and c in the quadratic equation ax² + bx + c = 0.',
    step2_title: 'Step 2: Move the Constant Term',
    step2_desc: 'Subtract the constant c from both sides to isolate the x² and x variable terms.',
    step3_title: 'Step 3: Divide by Leading Coefficient a',
    step3_desc: 'If a ≠ 1, divide all terms by a (or factor out a) so the x² coefficient becomes 1.',
    step4_title: 'Step 4: Find the Magic Constant (b / 2a)²',
    step4_desc: 'Calculate the value needed to complete the square: take half the x-coefficient and square it.',
    step5_title: 'Step 5: Balance Both Sides',
    step5_desc: 'Add the magic constant to both sides of the equation to preserve mathematical equality.',
    step6_title: 'Step 6: Factor the Perfect Square Trinomial',
    step6_desc: 'The left-hand side now compresses into a binomial squared: (x + b/(2a))².',
    step7_title: 'Step 7: Derive the Vertex Form',
    step7_desc: 'Rearrange back into y = a(x - h)² + k to read the parabolic vertex and axis of symmetry.',
    step8_title: 'Step 8: Apply the Square Root Property',
    step8_desc: 'Take the square root of both sides, making sure to include the ± (plus or minus) symbol.',
    step9_title: 'Step 9: Isolate x & State Exact Solutions',
    step9_desc: 'Solve for both roots in exact simplified radical form, plus decimal approximations if applicable.',

    visualizerTitle: 'Geometric Area Proof: The Missing Corner',
    visualizerSubtitle: 'Why do we add (b/2)²? See how dividing the linear term into two rectangles creates a square with one missing corner!',
    visualizerBoxX2: 'x² (Area x × x)',
    visualizerBoxBx: '(b/2)x Rectangle',
    visualizerBoxCorner: '(b/2)² Missing Corner to Complete Square',
    visualizerExplanation: 'By cutting bx into two rectangles of width (b/2) and placing one on the right and one on the bottom of x², we form an incomplete square of side (x + b/2). Adding the small corner of area (b/2)² completes the perfect square!',
    visualizerStepPrev: 'Previous Step',
    visualizerStepNext: 'Next Step',
    visualizerAutoPlay: 'Auto Play',
    visualizerPause: 'Pause',

    practiceTitle: 'Interactive Practice: Master Completing the Square',
    practiceSubtitle: 'Test your understanding of the magic balancing constant (b/2a)² and vertex form conversions.',
    questionFindConstant: 'What constant must be added to complete the square for:',
    questionFindVertex: 'What are the vertex coordinates (h, k) of:',
    questionFindBinomial: 'Factor into a perfect square binomial (x + d)² for:',
    submitAnswer: 'Check Answer',
    correctAnswer: 'Correct! Fantastic work.',
    wrongAnswer: 'Not quite. Here is the breakdown:',
    nextQuestion: 'Next Practice Problem',
    scoreLabel: 'Solved',
    streakLabel: 'Current Streak',
    hintButton: 'Need a hint?',

    error_a_zero: 'Coefficient "a" cannot be 0 in a quadratic equation (ax²). If a = 0, this is a linear equation.',
    error_invalid_input: 'Please enter valid numerical coefficients (integers, fractions like 3/4, or decimals).',

    faqTitle: 'Mastery Guide & Frequently Asked Questions',
    faqSubtitle: 'Everything middle and high school students need to know for Algebra 1, Algebra 2, and SAT math.',
    commonTrapsTitle: '3 Common Mistakes Students Make (And How to Avoid Them)',
    trap1Title: '1. Forgetting to Multiply by "a" on the Other Side',
    trap1Desc: 'When a ≠ 1 and you factor out a, like 2(x² + 4x + 4), you added 2 × 4 = 8 inside, so you MUST add 8 to the other side, not 4!',
    trap2Title: '2. Sign Errors in the Vertex Form (x - h)²',
    trap2Desc: 'In vertex form y = a(x - h)² + k, notice the minus sign! If the binomial is (x + 3)², the x-coordinate of the vertex h is -3, not +3.',
    trap3Title: '3. Omitting the ± (Plus or Minus) When Taking Square Roots',
    trap3Desc: 'When solving (x - h)² = K, taking the square root always yields TWO roots: x - h = ±√K. Forgetting ± drops half your solutions!',
    footerRights: 'SquareMaster — Free Educational Math Tool. Built for students, teachers, and tutors worldwide.',
    footerDisclaimer: 'Compliant with US Common Core State Standards (CCSS.MATH.CONTENT.HSA.REI.B.4.A & B).',
  },
  es: {
    appName: 'SquareMaster',
    appTagline: 'Calculadora de Completar el Cuadrado Paso a Paso',
    tabSolver: 'Resolución Paso a Paso',
    tabVisualizer: 'Modelo Geométrico',
    tabExamples: 'Ejemplos Resueltos',
    tabPractice: 'Práctica y Desafíos',
    tabGuide: 'Guía Completa',
    tabFAQ: 'Fórmulas y FAQ',
    presetsTitle: 'Ejemplos Rápidos',
    quickExamples: 'Problemas Frecuentes:',
    inputHeader: 'Ingresa la Ecuación Cuadrática',
    inputDescription: 'Resuelve ax² + bx + c = 0 o convierte y = ax² + bx + c a la forma vértice. Acepta enteros, decimales y fracciones exactas (ej. 3/2).',
    coeffA: 'Coeficiente a (x²)',
    coeffB: 'Coeficiente b (x)',
    coeffC: 'Término c',
    parseEquationPlaceholder: 'ej. 2x^2 + 8x - 10 = 0 o x^2 - 6x + 5',
    parseEquationLabel: 'O pega la ecuación completa:',
    solveButton: 'Resolver y Completar Cuadrado',
    resetButton: 'Restablecer',
    randomButton: 'Ejemplo Aleatorio',
    summaryTitle: 'Propiedades Clave de la Parábola',
    vertexLabel: 'Vértice (h, k)',
    axisOfSymmetry: 'Eje de Simetría',
    directionOfOpening: 'Orientación',
    opensUp: 'Abre hacia arriba (Mínimo)',
    opensDown: 'Abre hacia abajo (Máximo)',
    extremumMin: 'Valor Mínimo',
    extremumMax: 'Valor Máximo',
    rootsLabel: 'Raíces (Soluciones)',
    discriminantLabel: 'Discriminante (Δ = b² - 4ac)',
    vertexFormLabel: 'Forma Vértice (Canónica)',
    standardFormLabel: 'Forma General',
    magicTermHighlight: 'El Término Mágico de Balance (b / 2a)²',
    magicTermExplainer: 'Este es el paso donde más dudas surgen: calculamos la mitad del coeficiente lineal y lo elevamos al cuadrado.',
    stepsHeading: 'Desarrollo Algebraico Completo',
    printButton: 'Imprimir / Guardar PDF',
    copySteps: 'Copiar Pasos',
    copied: '¡Copiado al portapapeles!',
    shareLink: 'Compartir Solución',
    linkCopied: '¡Enlace copiado!',

    step1_title: 'Paso 1: Escribir en Forma General',
    step1_desc: 'Identificar los coeficientes a, b y c en la ecuación ax² + bx + c = 0.',
    step2_title: 'Paso 2: Aislar el Término Constante',
    step2_desc: 'Pasar la constante c al lado derecho de la igualdad.',
    step3_title: 'Paso 3: Dividir por el Coeficiente Principal a',
    step3_desc: 'Si a ≠ 1, dividir toda la ecuación por a para que el coeficiente de x² sea 1.',
    step4_title: 'Paso 4: Calcular el Término Mágico (b / 2a)²',
    step4_desc: 'Tomar la mitad del coeficiente de x y elevarlo al cuadrado.',
    step5_title: 'Paso 5: Equilibrar Ambos Lados',
    step5_desc: 'Sumar el término constante obtenido a ambos miembros de la ecuación.',
    step6_title: 'Paso 6: Factorizar el Trinomio Cuadrado Perfecto',
    step6_desc: 'El miembro izquierdo se condensa en un binomio al cuadrado: (x + b/(2a))².',
    step7_title: 'Paso 7: Obtener la Forma Canónica / Vértice',
    step7_desc: 'Escribir en la forma y = a(x - h)² + k para leer el vértice (h, k).',
    step8_title: 'Paso 8: Aplicar la Propiedad de la Raíz Cuadrada',
    step8_desc: 'Extraer raíz cuadrada a ambos lados considerando siempre el signo ±.',
    step9_title: 'Paso 9: Despejar x y Hallar Soluciones',
    step9_desc: 'Encontrar las raíces exactas y sus aproximaciones decimales.',

    visualizerTitle: 'Demostración Geométrica: La Esquina Faltante',
    visualizerSubtitle: '¿Por qué sumamos (b/2)²? Descubre cómo dos rectángulos y un cuadrado revelan la esquina que completa el área.',
    visualizerBoxX2: 'Área x² (x × x)',
    visualizerBoxBx: 'Rectángulo (b/2)x',
    visualizerBoxCorner: 'Esquina Faltante (b/2)²',
    visualizerExplanation: 'Al dividir el término lineal en dos rectángulos iguales de ancho b/2, queda un hueco en la esquina inferior derecha de área (b/2)². ¡Llenar ese hueco es completar el cuadrado!',
    visualizerStepPrev: 'Paso Anterior',
    visualizerStepNext: 'Paso Siguiente',
    visualizerAutoPlay: 'Reproducir',
    visualizerPause: 'Pausar',

    practiceTitle: 'Práctica Interactiva: Domina el Método',
    practiceSubtitle: 'Pon a prueba tu habilidad para hallar la constante mágica y convertir a la forma vértice.',
    questionFindConstant: '¿Qué constante debe sumarse para completar el cuadrado de:',
    questionFindVertex: '¿Cuáles son las coordenadas del vértice (h, k) de:',
    questionFindBinomial: 'Factoriza en binomio al cuadrado (x + d)² para:',
    submitAnswer: 'Verificar Respuesta',
    correctAnswer: '¡Correcto! Excelente deducción.',
    wrongAnswer: 'No del todo. Aquí tienes la explicación:',
    nextQuestion: 'Siguiente Ejercicio',
    scoreLabel: 'Aciertos',
    streakLabel: 'Racha Actual',
    hintButton: '¿Necesitas una pista?',

    error_a_zero: 'El coeficiente "a" no puede ser 0 en una ecuación de segundo grado.',
    error_invalid_input: 'Ingresa valores numéricos válidos (números enteros, decimales o fracciones como 3/4).',

    faqTitle: 'Guía de Dominio y Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre el método de completar el cuadrado.',
    commonTrapsTitle: '3 Errores Clásicos que Debes Evitar',
    trap1Title: '1. Olvidar Multiplicar por "a" al Balancear',
    trap1Desc: 'Si sacas factor común "a", lo que sumas al otro lado debe multiplicarse por "a".',
    trap2Title: '2. Confusión de Signos en (x - h)²',
    trap2Desc: 'Si el binomio es (x + 4)², la coordenada del vértice es h = -4.',
    trap3Title: '3. Olvidar el Símbolo ± al Extraer Raíz',
    trap3Desc: 'Al aplicar la raíz cuadrada, siempre existen dos ramas: positiva y negativa.',
    footerRights: 'SquareMaster — Herramienta matemática gratuita para estudiantes y docentes.',
    footerDisclaimer: 'Diseñado bajo los estándares curriculares internacionales de álgebra.',
  },
  fr: {
    appName: 'SquareMaster',
    appTagline: 'Calculateur de Forme Canonique et Complétion du Carré',
    tabSolver: 'Résolution Détaillée',
    tabVisualizer: 'Modèle Géométrique',
    tabExamples: 'Exemples Résolus',
    tabPractice: 'Entraînement',
    tabGuide: 'Guide Complet',
    tabFAQ: 'Formules & FAQ',
    presetsTitle: 'Exemples Rapides',
    quickExamples: 'Exercices Classiques :',
    inputHeader: 'Entrer l’Équation du Second Degré',
    inputDescription: 'Résolvez ax² + bx + c = 0 ou convertissez y = ax² + bx + c en forme canonique. Fractions exactes supportées (ex. 3/2).',
    coeffA: 'Coefficient a (x²)',
    coeffB: 'Coefficient b (x)',
    coeffC: 'Constante c',
    parseEquationPlaceholder: 'ex. 2x^2 + 8x - 10 = 0 ou x^2 - 6x + 5',
    parseEquationLabel: 'Ou collez l’équation :',
    solveButton: 'Résoudre et Mettre sous Forme Canonique',
    resetButton: 'Réinitialiser',
    randomButton: 'Exemple Aléatoire',
    summaryTitle: 'Propriétés Clés de la Parabole',
    vertexLabel: 'Sommet S(α, β) / (h, k)',
    axisOfSymmetry: 'Axe de Symétrie',
    directionOfOpening: 'Orientation',
    opensUp: 'Tournée vers le haut (Minimum)',
    opensDown: 'Tournée vers le bas (Maximum)',
    extremumMin: 'Valeur Minimale',
    extremumMax: 'Valeur Maximale',
    rootsLabel: 'Racines (Solutions)',
    discriminantLabel: 'Discriminant (Δ = b² - 4ac)',
    vertexFormLabel: 'Forme Canonique a(x - α)² + β',
    standardFormLabel: 'Forme Développée',
    magicTermHighlight: 'Le Terme de Compensation (b / 2a)²',
    magicTermExplainer: 'L’étape clé qui pose souvent difficulté : prendre la moitié du coefficient linéaire et l’élever au carré.',
    stepsHeading: 'Démonstration Algébrique Complète',
    printButton: 'Imprimer / Sauvegarder PDF',
    copySteps: 'Copier les étapes',
    copied: 'Copié dans le presse-papier !',
    shareLink: 'Partager le Lien',
    linkCopied: 'Lien copié !',

    step1_title: 'Étape 1 : Écriture sous Forme Développée',
    step1_desc: 'Identifier les coefficients a, b et c de ax² + bx + c = 0.',
    step2_title: 'Étape 2 : Isoler la Constante c',
    step2_desc: 'Transposer la constante c du côté droit.',
    step3_title: 'Étape 3 : Factoriser par le Coefficient Principal a',
    step3_desc: 'Diviser par a pour obtenir un coefficient 1 devant x².',
    step4_title: 'Étape 4 : Calculer la Constante (b / 2a)²',
    step4_desc: 'Prendre la moitié du coefficient en x et calculer son carré.',
    step5_title: 'Étape 5 : Équilibrer les Deux Membres',
    step5_desc: 'Ajouter cette constante de chaque côté de l’égalité.',
    step6_title: 'Étape 6 : Factoriser le Trinôme Carré Parfait',
    step6_desc: 'Le membre de gauche s’écrit (x + b/(2a))².',
    step7_title: 'Étape 7 : Obtenir la Forme Canonique',
    step7_desc: 'Écrire sous la forme a(x - α)² + β pour identifier le sommet.',
    step8_title: 'Étape 8 : Propriété de la Racine Carrée',
    step8_desc: 'Extraire la racine carrée avec le signe ±.',
    step9_title: 'Étape 9 : Isoler x et Conclure',
    step9_desc: 'Calculer les racines exactes et décimales.',

    visualizerTitle: 'Démonstration Géométrique : Le Coin Manquant',
    visualizerSubtitle: 'Pourquoi ajoute-t-on (b/2)² ? Visualisez comment compléter le grand carré d’aire (x + b/2)²',
    visualizerBoxX2: 'Aire x² (x × x)',
    visualizerBoxBx: 'Rectangle (b/2)x',
    visualizerBoxCorner: 'Coin Manquant (b/2)²',
    visualizerExplanation: 'En divisant le terme bx en deux bandes et en les adossant au carré x², il ne manque qu’un petit coin de côté b/2 pour parfaire le carré.',
    visualizerStepPrev: 'Étape Précédente',
    visualizerStepNext: 'Étape Suivante',
    visualizerAutoPlay: 'Lecture Auto',
    visualizerPause: 'Pause',

    practiceTitle: 'Entraînement Interactif',
    practiceSubtitle: 'Maîtrisez la recherche du terme constant et la forme canonique.',
    questionFindConstant: 'Quel terme constant permet de compléter le carré de :',
    questionFindVertex: 'Quelles sont les coordonnées du sommet de :',
    questionFindBinomial: 'Factorisez sous la forme (x + d)² :',
    submitAnswer: 'Valider',
    correctAnswer: 'Exact ! Félicitations.',
    wrongAnswer: 'Pas tout à fait. Voici l’explication :',
    nextQuestion: 'Question Suivante',
    scoreLabel: 'Score',
    streakLabel: 'Série',
    hintButton: 'Indice',

    error_a_zero: 'Le coefficient "a" ne peut pas être nul.',
    error_invalid_input: 'Veuillez saisir des nombres valides.',

    faqTitle: 'Foire Aux Questions & Guide de Cours',
    faqSubtitle: 'Tout pour réussir son chapitre sur le second degré au lycée.',
    commonTrapsTitle: '3 Pièges Fréquents à Éviter Absolument',
    trap1Title: '1. Oublier de Multiplier par a de l’Autre Côté',
    trap1Desc: 'Si a ≠ 1, le terme ajouté à l’intérieur est multiplié par a à l’extérieur.',
    trap2Title: '2. Inversion de Signe pour le Sommet',
    trap2Desc: 'Dans (x - α)², si on a (x + 5)², alors α = -5.',
    trap3Title: '3. Oublier le Symbole ±',
    trap3Desc: 'L’extraction d’une racine carrée engendre deux cas : positif et négatif.',
    footerRights: 'SquareMaster — Outil pédagogique libre pour élèves et enseignants.',
    footerDisclaimer: 'Conforme aux programmes scolaires officiels de mathématiques.',
  },
  pt: {
    appName: 'SquareMaster',
    appTagline: 'Calculadora de Completar Quadrados e Vértice da Parábola',
    tabSolver: 'Resolução Passo a Passo',
    tabVisualizer: 'Modelo Geométrico',
    tabExamples: 'Exemplos Resolvidos',
    tabPractice: 'Praticar e Exercícios',
    tabGuide: 'Guia Completo',
    tabFAQ: 'Fórmulas e FAQ',
    presetsTitle: 'Exemplos Prontos',
    quickExamples: 'Exercícios Comuns:',
    inputHeader: 'Insira a Equação Quadrática',
    inputDescription: 'Resolva ax² + bx + c = 0 ou converta para a forma canônica/vértice y = a(x - h)² + k. Suporta frações (ex. 3/2).',
    coeffA: 'Coeficiente a (x²)',
    coeffB: 'Coeficiente b (x)',
    coeffC: 'Termo c',
    parseEquationPlaceholder: 'ex: 2x^2 + 8x - 10 = 0 ou x^2 - 6x + 5',
    parseEquationLabel: 'Ou digite a equação:',
    solveButton: 'Resolver e Completar Quadrado',
    resetButton: 'Limpar',
    randomButton: 'Exemplo Aleatório',
    summaryTitle: 'Propriedades da Parábola',
    vertexLabel: 'Vértice (h, k)',
    axisOfSymmetry: 'Eixo de Simetria',
    directionOfOpening: 'Concavidade',
    opensUp: 'Voltada para cima (Ponto mínimo)',
    opensDown: 'Voltada para baixo (Ponto máximo)',
    extremumMin: 'Valor Mínimo',
    extremumMax: 'Valor Máximo',
    rootsLabel: 'Raízes (Soluções)',
    discriminantLabel: 'Discriminante (Δ = b² - 4ac)',
    vertexFormLabel: 'Forma Vértice / Canônica',
    standardFormLabel: 'Forma Padrão',
    magicTermHighlight: 'O Termo de Balanceamento (b / 2a)²',
    magicTermExplainer: 'O passo crucial onde muitos alunos erram: dividimos o coeficiente linear por 2 e elevamos ao quadrado.',
    stepsHeading: 'Demonstração Algébrica Completa',
    printButton: 'Imprimir / Salvar PDF',
    copySteps: 'Copiar Passo a Passo',
    copied: 'Copiado para a área de transferência!',
    shareLink: 'Compartilhar Link',
    linkCopied: 'Link copiado!',

    step1_title: 'Passo 1: Escrever na Forma Padrão',
    step1_desc: 'Identificar os coeficientes a, b e c em ax² + bx + c = 0.',
    step2_title: 'Passo 2: Isolar o Termo Independente',
    step2_desc: 'Mover a constante c para o lado direito da igualdade.',
    step3_title: 'Passo 3: Dividir pelo Coeficiente Principal a',
    step3_desc: 'Se a ≠ 1, dividir toda a equação por a.',
    step4_title: 'Passo 4: Encontrar o Termo (b / 2a)²',
    step4_desc: 'Calcular a metade do coeficiente de x e elevar ao quadrado.',
    step5_title: 'Passo 5: Equilibrar Ambos os Lados',
    step5_desc: 'Somar esse termo em ambos os membros da equação.',
    step6_title: 'Passo 6: Fatorar o Trinômio Quadrado Perfeito',
    step6_desc: 'O lado esquerdo torna-se um binômio ao quadrado: (x + b/(2a))².',
    step7_title: 'Passo 7: Obter a Forma Canônica',
    step7_desc: 'Reescrever como y = a(x - h)² + k para obter o vértice.',
    step8_title: 'Passo 8: Aplicar a Raiz Quadrada',
    step8_desc: 'Extrair a raiz quadrada lembrando do sinal ±.',
    step9_title: 'Passo 9: Encontrar as Raízes',
    step9_desc: 'Isolar x e expressar as soluções exatas e decimais.',

    visualizerTitle: 'Visualização Geométrica: O Canto Faltante',
    visualizerSubtitle: 'Por que somamos (b/2)²? Veja como dividir em dois retângulos gera um quadrado perfeito.',
    visualizerBoxX2: 'Área x² (x × x)',
    visualizerBoxBx: 'Retângulo (b/2)x',
    visualizerBoxCorner: 'Canto Faltante (b/2)²',
    visualizerExplanation: 'Ao posicionar os dois retângulos de base x e altura b/2 ao redor do quadrado x², resta um canto de área (b/2)² para fechar o grande quadrado.',
    visualizerStepPrev: 'Passo Anterior',
    visualizerStepNext: 'Próximo Passo',
    visualizerAutoPlay: 'Reprodução Auto',
    visualizerPause: 'Pausar',

    practiceTitle: 'Exercícios Práticos',
    practiceSubtitle: 'Treine o cálculo da constante de equilíbrio e a conversão para a forma canônica.',
    questionFindConstant: 'Qual constante deve ser somada para completar o quadrado de:',
    questionFindVertex: 'Quais são as coordenadas do vértice de:',
    questionFindBinomial: 'Fatore na forma (x + d)² para:',
    submitAnswer: 'Verificar',
    correctAnswer: 'Exato! Excelente raciocínio.',
    wrongAnswer: 'Não exatamente. Veja a solução:',
    nextQuestion: 'Próxima Questão',
    scoreLabel: 'Acertos',
    streakLabel: 'Sequência',
    hintButton: 'Precisa de dica?',

    error_a_zero: 'O coeficiente "a" não pode ser zero.',
    error_invalid_input: 'Insira números válidos.',

    faqTitle: 'Guia de Estudo e Dúvidas Frequentes',
    faqSubtitle: 'Fundamentos de álgebra para o Ensino Médio e vestibulares.',
    commonTrapsTitle: '3 Erros Comuns que Você Deve Evitar',
    trap1Title: '1. Esquecer de Multiplicar por "a" ao Balancear',
    trap1Desc: 'Ao colocar "a" em evidência, o termo somado do outro lado deve ser multiplicado por "a".',
    trap2Title: '2. Troca de Sinais nas Coordenadas do Vértice',
    trap2Desc: 'Na fórmula (x - h)², se temos (x + 2)², o h é -2.',
    trap3Title: '3. Esquecer o Sinal de ±',
    trap3Desc: 'A raiz quadrada gera duas soluções: positiva e negativa.',
    footerRights: 'SquareMaster — Ferramenta educativa gratuita para estudantes e professores.',
    footerDisclaimer: 'Alinhado às diretrizes curriculares de matemática.',
  },
  zh: {
    appName: 'SquareMaster 配方大师',
    appTagline: '配方法完全平方式计算器 · 二次函数顶点式转换与详细解题步骤',
    tabSolver: '详细解题步骤',
    tabVisualizer: '几何面积拼图模型',
    tabExamples: '常考经典题库',
    tabPractice: '配平强化练习',
    tabGuide: '知识精讲与考卷',
    tabFAQ: '公式宝典与问答',
    presetsTitle: '经典常考题型',
    quickExamples: '快速选择题型：',
    inputHeader: '输入一元二次方程或二次函数',
    inputDescription: '支持 ax² + bx + c = 0 配方求根与 y = ax² + bx + c 转换顶点式。支持整数、小数与分数（如 3/2）。',
    coeffA: '二次项系数 a (x²)',
    coeffB: '一次项系数 b (x)',
    coeffC: '常数项 c',
    parseEquationPlaceholder: '例如：2x^2 + 8x - 10 = 0 或 x^2 - 6x + 5',
    parseEquationLabel: '或者直接粘贴方程式：',
    solveButton: '开始配方拆解计算',
    resetButton: '重置数据',
    randomButton: '随机一道题',
    summaryTitle: '二次函数核心性质与顶点式汇总',
    vertexLabel: '抛物线顶点坐标 (h, k)',
    axisOfSymmetry: '对称轴方程',
    directionOfOpening: '开口方向',
    opensUp: '开口向上（有最小值）',
    opensDown: '开口向下（有最大值）',
    extremumMin: '函数最小值',
    extremumMax: '函数最大值',
    rootsLabel: '方程的解 (根)',
    discriminantLabel: '根的判别式 (Δ = b² - 4ac)',
    vertexFormLabel: '顶点式 (配方后)',
    standardFormLabel: '一般式',
    magicTermHighlight: '核心难点剖析：配方常数项 (b / 2a)²',
    magicTermExplainer: '初二初三最大难点就是很多同学不知道常数项怎么配平！其实只要取一次项系数的一半，再求平方，就是补足完全平方式所必需的“魔法常数”。',
    stepsHeading: '配方法完整推导步骤（详细拆解）',
    printButton: '打印 / 导出为 PDF',
    copySteps: '复制解题文本',
    copied: '已成功复制解题步骤！',
    shareLink: '分享题目链接',
    linkCopied: '题目链接已复制！',

    step1_title: '第 1 步：化为一般形式，确定各项系数',
    step1_desc: '将方程式整理为 ax² + bx + c = 0 标准形式，准确找出二次项系数 a、一次项系数 b 和常数项 c。',
    step2_title: '第 2 步：移项，将常数项移至等号右侧',
    step2_desc: '将常数项 c 移到方程右边，使左侧仅保留含未知数 x 的二次项和一次项：ax² + bx = -c。',
    step3_title: '第 3 步：二次项系数化为 1（若 a ≠ 1）',
    step3_desc: '方程两边同除以二次项系数 a（或在函数中提取公因数 a），使 x² 的系数变为 1：x² + (b/a)x = -c/a。',
    step4_title: '第 4 步：求配方常数项 [(b/a) / 2]²（核心配平）',
    step4_desc: '【最关键的一步】取一次项系数 (b/a) 的一半即 (b/2a)，将其平方得到 [(b/2a)]²。这个数就是凑成完全平方式的常数！',
    step5_title: '第 5 步：方程两边同时加上配方常数',
    step5_desc: '根据等式的基本性质，两边同时加上这个常数项，保持等式平衡：左边凑成完全平方式，右边合并同类项。',
    step6_title: '第 6 步：左侧逆用乘法公式，写成完全平方式',
    step6_desc: '左边 trinominal 完美化简为二项式平方：(x + b/(2a))²，右边计算出最终分数值。',
    step7_title: '第 7 步：转化为二次函数顶点式',
    step7_desc: '若为二次函数，整理为 y = a(x - h)² + k 形式，可直接读出抛物线顶点坐标 (h, k) 及对称轴 x = h。',
    step8_title: '第 8 步：两边开平方（注意正负号 ±）',
    step8_desc: '利用平方根性质两边开方，得 x + b/(2a) = ±√(右边数值)。若右侧为负数，则引入虚数单位 i (i² = -1)。',
    step9_title: '第 9 步：移项解出未知数 x，给出精确解与小数解',
    step9_desc: '分别算出两根 x₁ 与 x₂ 的最简根式形式，并附带精确小数近似值。',

    visualizerTitle: '几何拼图面积模型：为什么配方要加 (b/2)²？',
    visualizerSubtitle: '直观图形化证明：把矩形面积转化为大正方形，看清那块“缺失的角落”！',
    visualizerBoxX2: 'x² 正方形 (边长 x)',
    visualizerBoxBx: '(b/2)x 矩形 (宽 b/2)',
    visualizerBoxCorner: '缺失的右下角 (b/2)²，补上即凑齐大正方形！',
    visualizerExplanation: '古希腊和古代中国数学家解二次方程就是用拼图法！把一次项 bx 平分为两个面积为 (b/2)x 的小长方形，分别拼在 x² 正方形的右边和下边，此时右下角恰好缺一个边长为 b/2 的小正方形（面积为 (b/2)²）。加上它，整个图形就变成了边长为 (x + b/2) 的完美大正方形！',
    visualizerStepPrev: '上一步',
    visualizerStepNext: '下一步',
    visualizerAutoPlay: '自动演示',
    visualizerPause: '暂停',

    practiceTitle: '中考/初二专项巩固：配方常数项测验',
    practiceSubtitle: '针对中考与期末必考点，快速训练寻找常数项配平与顶点式互化的直觉。',
    questionFindConstant: '请问下列式子需要加上哪个常数项才能配成完全平方式：',
    questionFindVertex: '求下列二次函数的顶点坐标 (h, k)：',
    questionFindBinomial: '将下列代数式配方写成 (x + d)² 的形式：',
    submitAnswer: '提交并检查答案',
    correctAnswer: '回答正确！完全掌握了配平技巧。',
    wrongAnswer: '差一点点，详细解析如下：',
    nextQuestion: '练习下一道题',
    scoreLabel: '答对题数',
    streakLabel: '连对次数',
    hintButton: '查看解题思路提示',

    error_a_zero: '二次项系数 a 不能为 0！若 a = 0 则退化为一元一次方程。',
    error_invalid_input: '请输入正确的数字系数（整数、小数或如 3/4 的分数）。',

    faqTitle: '常考考点精讲与常见误区',
    faqSubtitle: '初中数学人教版/北师大版/中考重点专题，彻底攻克配方法。',
    commonTrapsTitle: '学生常犯的 3 大致命错误（中考必看避坑）',
    trap1Title: '1. 提取二次项系数 a 后，右侧忘记乘 a',
    trap1Desc: '当 a ≠ 1 时，例如 2(x² + 4x + 4)，括号内加了 4，实际上整个左式增加了 2 × 4 = 8！等号右边必须加 8 而不是加 4！',
    trap2Title: '2. 顶点坐标 (h, k) 中 h 的符号看错',
    trap2Desc: '顶点式是 y = a(x - h)² + k，注意里面是减号！如果是 (x + 3)²，顶点的横坐标 h 是 -3，千万不要写成 +3！',
    trap3Title: '3. 开平方时漏掉正负号 ±',
    trap3Desc: '在 (x - h)² = M 开方时，如果 M > 0，必须写成 ±√M，漏掉负号会导致丢掉一半的解！',
    footerRights: 'SquareMaster 配方大师 — 专为中小学学生、老师及自学者打造的免费数学工具。',
    footerDisclaimer: '严格遵循初中数学教学大纲与中考数学考纲标准。',
  },
};

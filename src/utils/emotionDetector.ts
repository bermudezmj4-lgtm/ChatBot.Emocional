import { Emotion, EmotionAnalysis } from '../types';

const emotionKeywords: Record<Emotion, string[]> = {
  tristeza: ['triste', 'llorar', 'deprimido', 'solo', 'soledad', 'mal', 'dolor', 'sufro', 'vacío', 'melancólico', 'desanimado', 'decaído', 'abatido', 'afligido'],
  alegria: ['feliz', 'contento', 'alegre', 'genial', 'increíble', 'bien', 'emocionado', 'maravilloso', 'fantástico', 'excelente', 'radiante', 'dichoso', 'encantado', 'eufórico'],
  ansiedad: ['ansioso', 'nervioso', 'preocupado', 'inquieto', 'miedo', 'angustia', 'pánico', 'tenso', 'intranquilo', 'agobiado', 'aterrado', 'asustado'],
  estres: ['estresado', 'estrés', 'presión', 'abrumado', 'saturado', 'colapsado', 'agotado', 'desbordado', 'quemado', 'burnout', 'sobrecargado'],
  cansancio: ['cansado', 'agotado', 'exhausto', 'sin energía', 'fatigado', 'dormido', 'sueño', 'rendido', 'destrozado', 'sin fuerzas', 'pesado'],
  frustracion: ['frustrado', 'molesto', 'enojado', 'furioso', 'irritado', 'harto', 'rabia', 'ira', 'enfadado', 'impotente', 'indignado', 'desesperado'],
  neutral: ['normal', 'bien', 'regular', 'más o menos', 'ahí vamos', 'tranquilo', 'estable', 'calmado']
};

const crisisKeywords = [
  'suicid', 'morir', 'matarme', 'acabar con todo', 'no quiero vivir', 
  'quitarme la vida', 'no vale la pena', 'mejor muerto', 'hacerme daño',
  'autolesion', 'cortarme', 'sin salida', 'nadie me quiere'
];

export const detectEmotion = (text: string): EmotionAnalysis => {
  const lowerText = text.toLowerCase();
  const foundKeywords: string[] = [];
  let detectedEmotion: Emotion = 'neutral';
  let maxScore = 0;
  let isCrisis = false;

  // Detectar crisis primero
  for (const keyword of crisisKeywords) {
    if (lowerText.includes(keyword)) {
      isCrisis = true;
      break;
    }
  }

  // Detectar emoción
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        score++;
        foundKeywords.push(keyword);
      }
    }
    if (score > maxScore) {
      maxScore = score;
      detectedEmotion = emotion as Emotion;
    }
  }

  // Calcular intensidad
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  if (lowerText.includes('muy') || lowerText.includes('demasiado') || lowerText.includes('extremadamente')) {
    intensity = 'high';
  } else if (lowerText.includes('un poco') || lowerText.includes('algo')) {
    intensity = 'low';
  }

  // Calcular confianza
  const confidence = Math.min(0.3 + (maxScore * 0.2), 1);

  return {
    primary: detectedEmotion,
    confidence,
    keywords: foundKeywords,
    intensity,
    emotion: detectedEmotion,
    isCrisis
  };
};

export const getEmotionColor = (emotion?: string): string => {
  switch (emotion) {
    case 'tristeza': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'alegria': return 'bg-green-500/20 text-green-300 border-green-400/30';
    case 'ansiedad': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    case 'estres': return 'bg-red-500/20 text-red-300 border-red-400/30';
    case 'cansancio': return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    case 'frustracion': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
    default: return 'bg-white/10 text-white/70 border-white/20';
  }
};

export const getEmotionEmoji = (emotion?: string): string => {
  switch (emotion) {
    case 'tristeza': return '😢';
    case 'alegria': return '😊';
    case 'ansiedad': return '😰';
    case 'estres': return '😫';
    case 'cansancio': return '😴';
    case 'frustracion': return '😤';
    default: return '😐';
  }
};

export const getEmotionDisplayName = (emotion?: string): string => {
  if (!emotion) return 'Neutral';
  const names: Record<string, string> = {
    tristeza: 'Tristeza',
    alegria: 'Alegría',
    ansiedad: 'Ansiedad',
    estres: 'Estrés',
    cansancio: 'Cansancio',
    frustracion: 'Frustración',
    neutral: 'Neutral'
  };
  return names[emotion] || 'Neutral';
};

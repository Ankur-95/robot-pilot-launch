import { Trophy, Award, Star, Medal, Target } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';

const iconMap: Record<string, any> = { Trophy, Award, Star, Medal, Target };

const Achievements = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

  return;



























};

export default Achievements;
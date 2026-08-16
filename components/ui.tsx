import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  Droplets,
  HardHat,
  Home,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Settings2,
  ShieldCheck,
  Sofa,
  SprayCan,
  Star,
  Target,
  ThumbsUp,
  Truck,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { OrderButton } from "@/components/order-drawer";

/** Mapovanie názvov ikon z lib/site.ts na komponenty lucide. */
const icons: Record<string, LucideIcon> = {
  home: Home,
  car: Car,
  building: Building2,
  spray: SprayCan,
  hardhat: HardHat,
  wind: Wind,
  sofa: Sofa,
  bed: BedDouble,
  layers: Layers,
  droplets: Droplets,
  settings: Settings2,
  leaf: Leaf,
  check: CheckCircle2,
  zap: Zap,
  shield: ShieldCheck,
  users: Users,
  star: Star,
  target: Target,
  pin: MapPin,
  phone: Phone,
  mail: Mail,
  calendar: CalendarCheck,
  truck: Truck,
  thumbs: ThumbsUp,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? CheckCircle2;
  return <Cmp className={className} strokeWidth={1.8} />;
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo">
      <span className="logo-word">
        DAVI<span>CLEAN</span>
      </span>
      {!compact && <span className="logo-sub">Profesionálne čistenie</span>}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  highlight,
  lead,
  action,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  lead?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-head head-row">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h2">
          {title} {highlight && <span>{highlight}</span>}
        </h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-label={`Hodnotenie ${count} z 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}

export function CtaBand({
  title = "Potrebujete profesionálne čistenie?",
  text = "Napíšte nám, čo treba vyčistiť — cenovú ponuku pošleme obratom a bezplatne.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="cta-band">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <a className="btn btn-primary" href={`tel:${site.phoneHref}`}>
          <Phone size={17} /> {site.phone}
        </a>
        <OrderButton className="btn btn-ghost">
          Nezáväzná ponuka <ArrowRight size={16} />
        </OrderButton>
      </div>
    </div>
  );
}

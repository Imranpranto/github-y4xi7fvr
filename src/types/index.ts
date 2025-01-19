export interface ESPCost {
  name: string;
  monthlyPrice: number;
  usersIncluded: number;
  additionalUserCost: number;
  features: string[];
}

export interface InfrastructureCost {
  servers: number;
  security: number;
  maintenance: number;
  backup: number;
  other: number;
}

export interface SequencerCost {
  name: string;
  monthlyPrice: number;
  emailsPerMonth: number;
  features: string[];
}

export interface DMARCPolicy {
  domain: string;
  policy: 'none' | 'quarantine' | 'reject';
  percentage: number;
  spfAlignment: 'r' | 's';
  dkimAlignment: 'r' | 's';
  reportingInterval: number;
  failureOptions: string[];
  rua?: string;
  ruf?: string;
  subdomainPolicy?: string;
}

export interface SPFRecord {
  includes: string[];
  ips: string[];
  mechanisms: string[];
}

export interface EmailValidation {
  spamScore: number;
  issues: string[];
  suggestions: string[];
}

export interface EmailPattern {
  pattern: string;
  example: string;
  description: string;
}
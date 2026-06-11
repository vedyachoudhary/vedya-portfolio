/* Brand icon helper — Simple Icons CDN (+ jsdelivr fallback for some slugs) */
const ICON = (name, color = 'ffffff') =>
  `https://cdn.simpleicons.org/${name}/${color.replace('#', '')}`;

const iconUrl = (entry) => {
  if (entry.src) return entry.src;
  if (entry.jsdelivr) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${entry.icon}.svg`;
  }
  return ICON(entry.icon, entry.color);
};

const CONTACT_EMAIL = 'vedyachowdary5533@gmail.com';

/* Get a free key at https://web3forms.com — enter your email, paste key below */
const WEB3FORMS_ACCESS_KEY = '86a181db-2ce8-4de6-9813-02a02ecf3307';

const TECH_STACK = [
  { name: 'Spring Boot', icon: 'springboot', color: '6DB33F' },
  { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'MySQL', icon: 'mysql', color: '4479A1' },
  { name: 'Azure', icon: 'microsoftazure', color: '0078D4', jsdelivr: true },
  { name: 'AWS', icon: 'amazonaws', color: 'FF9900', jsdelivr: true },
  { name: 'JUnit', icon: 'junit5', color: '25A162' },
  { name: 'JWT', icon: 'jsonwebtokens', color: 'FFFFFF' },
  { name: 'Hibernate', icon: 'hibernate', color: '59666C' },
  { name: 'Postman', icon: 'postman', color: 'FF6C37' },
  { name: 'Git', icon: 'git', color: 'F05032' },
  { name: 'Jira', icon: 'jira', color: '0052CC' },
  { name: 'Python', icon: 'python', color: '3776A9' },
];

const DEV_TOOLS = [
  { name: 'VS Code', icon: 'visualstudiocode', color: '007ACC', jsdelivr: true },
  { name: 'Cursor', icon: 'cursor', color: '000000' },
  { name: 'IntelliJ IDEA', icon: 'intellijidea', color: 'FFFFFF' },
  { name: 'Kiro', src: 'https://kiro.dev/icon.svg' },
  { name: 'Windsurf', icon: 'windsurf', color: '0B100F' },
  { name: 'Postman', icon: 'postman', color: 'FF6C37' },
  { name: 'Git', icon: 'git', color: 'F05032' },
];

/* Contact social — brand colors that read on light pastel backgrounds */
const SOCIAL_LINKS = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vedya-anaparthi/',
    src: 'https://api.iconify.design/simple-icons/linkedin.svg?color=%230A66C2',
  },
  { title: 'GitHub', href: 'https://github.com/vedyachoudhary', icon: 'github', color: '181717' },
  { title: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: 'gmail', color: 'EA4335' },
  { title: 'WhatsApp', href: 'https://wa.me/919492666201', icon: 'whatsapp', color: '25D366' },
];

const AI_TOOLS = [
  { name: 'ChatGPT', icon: 'openai', color: '412991', jsdelivr: true },
  { name: 'Claude AI', icon: 'claude', color: 'D97757' },
  { name: 'Claude Code', icon: 'anthropic', color: '191919' },
  { name: 'Cursor', icon: 'cursor', color: '000000' },
  { name: 'Windsurf', icon: 'windsurf', color: '0B100F' },
  { name: 'Kiro', src: 'https://kiro.dev/icon.svg' },
];

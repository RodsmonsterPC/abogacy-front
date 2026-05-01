const translations = {
  en: {
    // ─── Navbar ──────────────────────────────────────────────────────
    nav: {
      home:    'Home',
      about:   'About',
      services:'Services',
      blog:    'Blog',
      contact: 'Contact',
      cta:     'Free Consultation',
    },

    // ─── Footer ──────────────────────────────────────────────────────
    footer: {
      rights: 'All rights reserved. Professional Legal Excellence.',
      privacy:'Privacy Policy',
      terms:  'Terms of Service',
      contact:'Contact',
    },

    // ─── Home ────────────────────────────────────────────────────────
    home: {
      badge:      'Heritage Law Group',
      heroTitle:  'Professional Legal Excellence. Built on Tradition, Driven by Precision.',
      heroSub:    'Navigating complex legal landscapes with unwavering commitment and strategic foresight. We are your steadfast anchor in a dynamic legal world.',
      ctaPrimary: 'Consult Now',
      ctaSecondary:'Our Services',

      servicesTitle: 'Areas of Practice',

      featuredService: {
        title: 'Corporate Structuring & M&A',
        desc:  'Comprehensive legal strategies for complex mergers, acquisitions, and restructuring to ensure stability and mitigate risk at the highest levels of enterprise.',
        link:  'Learn More',
      },

      needCounsel: {
        title: 'Need Immediate Counsel?',
        desc:  'Our senior partners are available for urgent consultations regarding critical business matters.',
        btn:   'Contact Partners',
      },

      aboutBadge:  'About the Firm',
      aboutTitle:  '25+ Years of Legal Excellence',
      aboutDesc:   'Heritage Law Group combines decades of experience with forward-thinking legal strategy. Our commitment to our clients goes beyond case resolution—we are partners in your long-term success.',
      stats: [
        { num: '25+',  label: 'Years of Experience' },
        { num: '500',  label: 'Cases Resolved' },
        { num: 'Top 1%', label: 'Recognition' },
      ],
      aboutCta: 'Our Story',
    },

    // ─── About ───────────────────────────────────────────────────────
    about: {
      badge:    'Senior Partner',
      name:     'Alexander Sterling',
      subtitle: 'Defending corporate integrity and navigating complex litigation with precision for over two decades.',
      stats: [
        { num: '25+',    label: 'Years of Experience' },
        { num: '500',    label: 'Cases Resolved' },
        { num: 'Top 1%', label: 'National Recognition' },
      ],
      bioTitle: 'Professional Career',
      bio1: 'The practice of law demands more than simple knowledge of jurisprudence; it requires a deep understanding of corporate operations and the strategic vision to anticipate challenges before they become crises.',
      bio2: 'Throughout my career, I have represented multinational corporations, financial institutions, and government entities in high-stakes litigation. The philosophy of Heritage Law is not only to win the case at hand, but to ensure the stability and continued growth of our clients.',
      bio3: 'I firmly believe in the immutability of professional integrity. Every document drafted, every argument presented in court, reflects our unwavering commitment to excellence and truth.',
      educationTitle: 'Education',
      education: [
        { icon: 'school',     title: 'Juris Doctor (J.D.)',         sub: 'Harvard Law School, Magna Cum Laude' },
        { icon: 'menu_book',  title: 'B.A. in Political Science',   sub: 'Yale University, Departmental Honors' },
      ],
      timelineTitle: 'Key Milestones',
      timeline: [
        { period: '2018 – Present', role: 'Senior Partner, Heritage Law',      desc: 'Leading the corporate litigation division, overseeing high-profile M&A cases.', active: true },
        { period: '2010 – 2018',   role: 'Partner, Sterling & Vance LLP',     desc: 'Specialization in white-collar defense and international regulatory compliance.', active: false },
        { period: '2004 – 2010',   role: 'Senior Associate',                  desc: 'Representing financial institutions in complex securities litigation post-2008.', active: false },
        { period: '2001 – 2004',   role: 'Assistant District Attorney',        desc: 'Southern District of New York, financial fraud unit.', active: false },
      ],
    },

    // ─── Services ────────────────────────────────────────────────────
    services: {
      heroTitle: 'Areas of Practice.',
      heroDesc:  'Comprehensive legal strategies tailored for modern enterprises and discerning individuals. We blend traditional authority with sharp, contemporary execution to secure your legacy.',
      defaultServices: [
        { title: 'Corporate Law',           description: 'Strategic counsel for mergers, acquisitions, and corporate governance. We structure resilient frameworks for enterprise growth.',   icon: 'domain' },
        { title: 'Commercial Litigation',   description: 'Aggressive and meticulous representation in high-stakes disputes. We protect your operational continuity in the courtroom.',        icon: 'gavel' },
        { title: 'Real Estate Law',         description: 'Navigating complex commercial and residential transactions, zoning regulations, and property developments.',                       icon: 'account_balance' },
        { title: 'Family Law',              description: 'Discreet, high-net-worth divorce and custody resolutions handled with utmost confidentiality and strategic foresight.',            icon: 'family_restroom' },
        { title: 'Intellectual Property',   description: 'Securing your intangible assets. Trademarks, copyrights, and trade secret protection for innovative enterprises.',                icon: 'lightbulb' },
        { title: 'Estate Planning',         description: 'Crafting enduring legacies. Comprehensive trusts, wills, and succession planning to ensure your heritage is preserved.',         icon: 'history_edu' },
      ],
      cardCta:   'Schedule Consultation',
      ctaTitle:  'Require specialized legal counsel?',
      ctaDesc:   'Engage with our senior partners to discuss your specific requirements. We ensure complete discretion and immediate strategic deployment.',
      ctaBtn:    'Schedule Consultation',
    },

    // ─── Blog ────────────────────────────────────────────────────────
    blog: {
      title:       'Legal Insights',
      subtitle:    'Authoritative perspectives on contemporary legal challenges, corporate governance, and regulatory shifts from the partners at Heritage Law Group.',
      searchPlaceholder: 'Search insights...',
      readMore:    'Read Insight',
      categories:  ['All', 'Corporate', 'Litigation', 'Real Estate', 'Family Law', 'Intellectual Property', 'Estate Planning', 'General'],
      fallbackArticles: [
        { title: 'Navigating M&A in a Tighter Regulatory Environment',    excerpt: 'An analysis of recent antitrust scrutiny and strategic approaches for securing regulatory approval.', category: 'Corporate' },
        { title: 'The Evolution of Fiduciary Duty in the Digital Age',     excerpt: 'Examining how recent landmark rulings are redefining the obligations of corporate directors.', category: 'Litigation' },
        { title: 'Commercial Leasing Shifts Post-2020',                    excerpt: 'Strategic considerations for landlords and anchor tenants renegotiating long-term lease structures.', category: 'Real Estate' },
        { title: 'Structuring Executive Compensation for Long-Term Growth',excerpt: 'Best practices for aligning C-suite incentives with shareholder value.', category: 'Corporate' },
      ],
    },

    // ─── Contact ─────────────────────────────────────────────────────
    contact: {
      title:       'Get in Touch',
      subtitle:    'We provide confidential consultations to discuss your legal needs. Contact us today to schedule an appointment with one of our experienced attorneys.',
      officeTitle: 'Office Location',
      address:     '123 Legal Avenue, Suite 400\nMetropolis, NY 10001',
      phone:       '(555) 123-4567',
      email:       'inquiries@heritagelaw.com',
      hours:       'Mon–Fri: 8:00 AM – 6:00 PM',
      formTitle:   'Send a Message',
      firstName:   'First Name',
      lastName:    'Last Name',
      emailField:  'Email Address',
      practiceArea:'Practice Area of Interest',
      message:     'Message',
      messagePlaceholder: 'Briefly describe your legal needs...',
      submit:      'Submit Inquiry',
      sending:     'Sending...',
      successTitle:'Message Sent!',
      successDesc: 'Thank you for reaching out. We\'ll contact you within 1 business day.',
      sendAnother: 'Send Another',
      areas: ['Corporate Law', 'Real Estate', 'Litigation', 'Estate Planning', 'Family Law', 'Intellectual Property', 'Other'],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // ESPAÑOL
  // ═══════════════════════════════════════════════════════════════════
  es: {
    nav: {
      home:    'Inicio',
      about:   'Nosotros',
      services:'Servicios',
      blog:    'Blog',
      contact: 'Contacto',
      cta:     'Consulta Gratuita',
    },

    footer: {
      rights: 'Todos los derechos reservados. Excelencia Jurídica Profesional.',
      privacy:'Política de Privacidad',
      terms:  'Términos de Servicio',
      contact:'Contacto',
    },

    home: {
      badge:      'Heritage Law Group',
      heroTitle:  'Excelencia Jurídica Profesional. Construida en Tradición, Impulsada por Precisión.',
      heroSub:    'Navegando paisajes legales complejos con compromiso inquebrantable y previsión estratégica. Somos tu ancla firme en un mundo legal dinámico.',
      ctaPrimary: 'Consulta Ahora',
      ctaSecondary:'Nuestros Servicios',

      servicesTitle: 'Áreas de Práctica',

      featuredService: {
        title: 'Estructuración Corporativa y Fusiones',
        desc:  'Estrategias legales integrales para fusiones, adquisiciones y reestructuraciones complejas, garantizando estabilidad y mitigando riesgos al más alto nivel empresarial.',
        link:  'Más Información',
      },

      needCounsel: {
        title: '¿Necesitas Asesoría Inmediata?',
        desc:  'Nuestros socios principales están disponibles para consultas urgentes sobre asuntos empresariales críticos.',
        btn:   'Contactar Socios',
      },

      aboutBadge:  'Acerca del Despacho',
      aboutTitle:  'Más de 25 Años de Excelencia Jurídica',
      aboutDesc:   'Heritage Law Group combina décadas de experiencia con estrategia legal de vanguardia. Nuestro compromiso con los clientes va más allá de la resolución de casos — somos socios en su éxito a largo plazo.',
      stats: [
        { num: '25+',  label: 'Años de Experiencia' },
        { num: '500',  label: 'Casos Resueltos' },
        { num: 'Top 1%', label: 'Reconocimiento' },
      ],
      aboutCta: 'Nuestra Historia',
    },

    about: {
      badge:    'Socio Principal',
      name:     'Alexander Sterling',
      subtitle: 'Defendiendo la integridad corporativa y navegando litigios complejos con precisión durante más de dos décadas.',
      stats: [
        { num: '25+',    label: 'Años de Experiencia' },
        { num: '500',    label: 'Casos Resueltos' },
        { num: 'Top 1%', label: 'Reconocimiento Nacional' },
      ],
      bioTitle: 'Trayectoria Profesional',
      bio1: 'La práctica del derecho exige más que el simple conocimiento de la jurisprudencia; requiere una comprensión profunda de las operaciones corporativas y la visión estratégica para anticipar desafíos antes de que se conviertan en crisis.',
      bio2: 'A lo largo de mi carrera, he representado a corporaciones multinacionales, instituciones financieras y entidades gubernamentales en litigios de alto riesgo. La filosofía de Heritage Law no es solo ganar el caso en cuestión, sino asegurar la estabilidad y el crecimiento continuo de nuestros representados.',
      bio3: 'Creo firmemente en la inmutabilidad de la integridad profesional. Cada documento redactado, cada argumento presentado en la corte, es un reflejo de nuestro compromiso inquebrantable con la excelencia y la verdad.',
      educationTitle: 'Educación',
      education: [
        { icon: 'school',    title: 'Juris Doctor (J.D.)',           sub: 'Harvard Law School, Magna Cum Laude' },
        { icon: 'menu_book', title: 'Licenciatura en Ciencias Políticas', sub: 'Yale University, Honores Departamentales' },
      ],
      timelineTitle: 'Hitos Clave',
      timeline: [
        { period: '2018 – Presente', role: 'Socio Principal, Heritage Law',   desc: 'Liderando la división de litigios corporativos, supervisando casos de M&A de alto perfil.', active: true },
        { period: '2010 – 2018',     role: 'Socio, Sterling & Vance LLP',     desc: 'Especialización en defensa de cuello blanco y cumplimiento regulatorio internacional.', active: false },
        { period: '2004 – 2010',     role: 'Asociado Senior',                 desc: 'Representación de instituciones financieras en litigios de valores post-2008.', active: false },
        { period: '2001 – 2004',     role: 'Asistente Fiscal',                desc: 'Distrito Sur de Nueva York, unidad de fraudes financieros.', active: false },
      ],
    },

    services: {
      heroTitle: 'Áreas de Práctica.',
      heroDesc:  'Estrategias legales integrales adaptadas para empresas modernas e individuos exigentes. Combinamos autoridad tradicional con ejecución contemporánea para asegurar tu legado.',
      defaultServices: [
        { title: 'Derecho Corporativo',        description: 'Asesoría estratégica en fusiones, adquisiciones y gobierno corporativo. Estructuramos marcos resilientes para el crecimiento empresarial.',   icon: 'domain' },
        { title: 'Litigios Comerciales',       description: 'Representación agresiva y meticulosa en disputas de alto riesgo. Protegemos la continuidad operativa en el tribunal.',                       icon: 'gavel' },
        { title: 'Derecho Inmobiliario',       description: 'Navegando transacciones comerciales y residenciales complejas, regulaciones de zonificación y desarrollo de propiedades.',                  icon: 'account_balance' },
        { title: 'Derecho de Familia',         description: 'Resoluciones discretas de divorcio y custodia con alto patrimonio, manejadas con la máxima confidencialidad.',                              icon: 'family_restroom' },
        { title: 'Propiedad Intelectual',      description: 'Asegurando tus activos intangibles. Marcas, derechos de autor y protección de secretos comerciales para empresas innovadoras.',            icon: 'lightbulb' },
        { title: 'Planificación Patrimonial',  description: 'Creando legados duraderos. Fideicomisos, testamentos y planificación sucesoria integral para preservar tu herencia.',                       icon: 'history_edu' },
      ],
      cardCta:  'Agendar Consulta',
      ctaTitle: '¿Requieres asesoría legal especializada?',
      ctaDesc:  'Contacta con nuestros socios principales para discutir tus necesidades específicas. Garantizamos total discreción e implementación estratégica inmediata.',
      ctaBtn:   'Agendar Consulta',
    },

    blog: {
      title:       'Perspectivas Legales',
      subtitle:    'Análisis autorizados sobre desafíos legales contemporáneos, gobierno corporativo y cambios regulatorios de los socios de Heritage Law Group.',
      searchPlaceholder: 'Buscar artículos...',
      readMore:    'Leer Análisis',
      categories:  ['Todos', 'Corporate', 'Litigation', 'Real Estate', 'Family Law', 'Intellectual Property', 'Estate Planning', 'General'],
      fallbackArticles: [
        { title: 'Navegando Fusiones en un Entorno Regulatorio Más Estricto', excerpt: 'Análisis del escrutinio antimonopolio reciente y enfoques estratégicos para obtener aprobación regulatoria.', category: 'Corporate' },
        { title: 'La Evolución del Deber Fiduciario en la Era Digital',       excerpt: 'Examinando cómo fallos recientes redefinen las obligaciones de los directores corporativos.',              category: 'Litigation' },
        { title: 'Cambios en Arrendamientos Comerciales Post-2020',           excerpt: 'Consideraciones estratégicas para propietarios e inquilinos que renegocian estructuras de arrendamiento.', category: 'Real Estate' },
        { title: 'Estructuración de Compensación Ejecutiva',                  excerpt: 'Mejores prácticas para alinear los incentivos de la alta dirección con el valor para los accionistas.',   category: 'Corporate' },
      ],
    },

    contact: {
      title:       'Contáctanos',
      subtitle:    'Ofrecemos consultas confidenciales para discutir tus necesidades legales. Contáctanos para agendar una cita con uno de nuestros abogados experimentados.',
      officeTitle: 'Ubicación de la Oficina',
      address:     '123 Legal Avenue, Suite 400\nMetrópolis, NY 10001',
      phone:       '(555) 123-4567',
      email:       'consultas@heritagelaw.com',
      hours:       'Lun–Vie: 8:00 AM – 6:00 PM',
      formTitle:   'Enviar un Mensaje',
      firstName:   'Nombre',
      lastName:    'Apellido',
      emailField:  'Correo Electrónico',
      practiceArea:'Área de Interés',
      message:     'Mensaje',
      messagePlaceholder: 'Describe brevemente tus necesidades legales...',
      submit:      'Enviar Consulta',
      sending:     'Enviando...',
      successTitle:'¡Mensaje Enviado!',
      successDesc: 'Gracias por contactarnos. Te responderemos en máximo 1 día hábil.',
      sendAnother: 'Enviar Otro',
      areas: ['Derecho Corporativo', 'Bienes Raíces', 'Litigios', 'Planificación Patrimonial', 'Derecho de Familia', 'Propiedad Intelectual', 'Otro'],
    },
  },
}

export default translations

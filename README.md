# SASSA AI Status Update 🇿🇦

A comprehensive, production-ready React web application providing SASSA (South African Social Security Agency) beneficiaries with accurate information, guidance, and tools. This is an **unofficial resource** with prominent disclaimers throughout.

![SASSA AI Status Update](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue)

## 🌟 Features

### Core Functionality
- **📱 Mobile-First Design** - Optimized for South African mobile users
- **🌍 Multilingual Support** - English, isiZulu, and isiXhosa
- **🔍 Smart Search** - Powerful FAQ and guide search functionality
- **📅 Payment Calendar** - Interactive calendar with email reminders
- **🛡️ Scam Protection Hub** - Education and detection tools
- **🤖 AI Chatbot** - Context-aware assistance with fallback systems
- **🗺️ Office Locator** - Interactive map of SASSA offices
- **👥 Community Q&A** - Curated community support

### Accessibility & Performance
- **♿ WCAG 2.1 AA Compliant** - Screen reader compatible, keyboard navigation
- **⚡ Lighthouse Score 90+** - Optimized performance and accessibility
- **🎨 High Contrast Mode** - Multiple theme options for accessibility
- **📱 PWA Ready** - Installable progressive web app
- **⚡ Code Splitting** - Optimized bundle sizes with lazy loading

### Compliance & Legal
- **⚖️ GDPR/POPIA Compliant** - Comprehensive privacy controls
- **🍪 Cookie Consent** - Granular cookie preferences
- **📋 Legal Pages** - Privacy policy, terms of service
- **💰 AdSense Integration** - Ethical monetization with scam warnings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES2020 support

### Installation

1. **Clone and Install**
```bash
git clone https://github.com/yourusername/sassa-help-hub.git
cd sassa-help-hub
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

3. **Start Development**
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application running.

### Environment Variables

Create `.env.local` with these required variables:

```env
# EmailJS Configuration (for payment reminders)
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AdSense (optional)
VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx

# API Configuration (for chatbot)
VITE_VITE_GEMINI_API_KEY=your_VITE_GEMINI_API_KEY
VITE_OPENAI_API_KEY=your_openai_api_key_backup
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Common/          # Shared components (ErrorBoundary, Loading, etc.)
│   ├── Layout/          # Layout components (Header, Footer)
│   ├── Chatbot/         # AI chatbot implementation
│   └── Forms/           # Form components and validation
├── pages/               # Page components and routes
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and helpers
├── types/               # TypeScript type definitions
└── assets/              # Static assets and images

data/                    # JSON data files
├── faqs.json           # Frequently asked questions
├── guides.json         # Step-by-step guides
├── payments.json       # Payment calendar data
├── scams.json          # Known scam information
├── resources.json      # SASSA office locations
├── community.json      # Community Q&A
├── updates.json        # Latest news and updates
└── i18n/               # Translation files
    ├── en.json         # English translations
    ├── zu.json         # isiZulu translations
    └── xh.json         # isiXhosa translations
```

## 🔧 Data Management

### JSON Data Files

All content is stored in JSON files in the `/data` directory. This allows for easy content updates without code changes.

#### Adding New FAQs

Edit `data/faqs.json`:
```json
{
  "id": "faq-new",
  "question": "Your question here",
  "answer": "<p>HTML formatted answer</p>",
  "category": "Applications",
  "tags": ["application", "requirements"],
  "helpful": 0,
  "lastUpdated": "2025-01-15",
  "relatedLinks": [
    {
      "title": "Official SASSA Website",
      "url": "https://www.sassa.gov.za",
      "isExternal": true
    }
  ]
}
```

#### Updating Payment Dates

Edit `data/payments.json`:
```json
{
  "month": "2025-02",
  "grants": [
    {
      "type": "Old Age Grant",
      "dates": ["2025-02-03", "2025-02-04"],
      "amount": 2090,
      "notes": "Dates adjusted due to weekend"
    }
  ]
}
```

#### Adding Scam Alerts

Edit `data/scams.json`:
```json
{
  "id": "scam-new",
  "title": "New SMS Scam Alert",
  "description": "Description of the scam",
  "type": "SMS",
  "severity": "high",
  "reportedDate": "2025-01-15",
  "indicators": ["Requests banking details", "Urgent action required"],
  "prevention": "Never share banking details via SMS"
}
```

## 🎨 Customization

### Theme Configuration

The application uses a custom Tailwind CSS configuration with SASSA-compliant colors:

```javascript
// tailwind.config.js
colors: {
  primary: {
    black: '#020202',
    dark: '#181818', 
    yellow: '#F6E71D',
    gold: '#F5D10D',
  },
  secondary: {
    gray: '#C2C2C2',
    light: '#F5F5F5',
  }
}
```

### Adding New Languages

1. Create translation file: `data/i18n/[language].json`
2. Add language to header component: `src/components/Layout/Header.tsx`
3. Update language selector options

### Customizing Components

All components are modular and can be easily customized:

- **Colors**: Edit `tailwind.config.js`
- **Typography**: Modify font families and sizes in config
- **Layout**: Adjust spacing and breakpoints
- **Animations**: Customize transitions and micro-interactions

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
src/__tests__/
├── components/         # Component tests
├── pages/             # Page tests
├── utils/             # Utility function tests
└── __mocks__/         # Mock data and functions
```

### Writing Tests

Example component test:
```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../contexts/AppContext';
import FAQ from '../pages/FAQ';

test('renders FAQ page with search functionality', () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <FAQ />
      </AppProvider>
    </MemoryRouter>
  );
  
  expect(screen.getByPlaceholderText(/search faqs/i)).toBeInTheDocument();
});
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
```bash
npm i -g vercel
vercel
```

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Configure build settings: `npm run build`
   - Set output directory: `dist`

3. **Custom Domain**
   - Configure custom domain in Vercel
   - Update canonical URLs in components
   - Configure SSL certificate

### Manual Deployment

1. **Build for Production**
```bash
npm run build
```

2. **Deploy to Any Static Host**
   - Upload `dist/` folder to your hosting provider
   - Configure redirects for SPA routing
   - Set up SSL certificate

### Performance Optimization

- **Image Optimization**: Use WebP format with fallbacks
- **Code Splitting**: Implemented by default with React Router
- **Caching**: Configure proper cache headers
- **CDN**: Use CDN for static assets

## 🔒 Security

### Data Protection
- No sensitive user data is stored locally
- All external API calls use HTTPS
- Input sanitization on all user inputs
- CSRF protection on forms

### Privacy Compliance
- Cookie consent with granular options
- Privacy policy with clear data practices
- GDPR/POPIA compliant data handling
- User data deletion capabilities

### Scam Prevention
- Educational content about common scams
- Prominent disclaimers throughout
- Official link verification
- Community reporting system

## 📊 Analytics & Monitoring

### Google Analytics Integration
```javascript
// Configured in src/utils/analytics.js
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href,
});
```

### Error Monitoring
- React Error Boundary implementation
- Console error logging
- User feedback collection
- Performance monitoring

### User Metrics
- Page views and user sessions
- Search query analytics
- FAQ popularity tracking
- Conversion funnel analysis

## 🤝 Contributing

### Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow ESLint and Prettier configurations
   - Write meaningful commit messages
   - Add tests for new features

2. **Component Development**
   - Use functional components with hooks
   - Implement proper prop types
   - Add accessibility attributes
   - Follow mobile-first design

3. **Data Updates**
   - Validate JSON structure
   - Update translation files
   - Test on multiple devices
   - Verify external links

### Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and add tests
4. Ensure all tests pass: `npm test`
5. Update documentation if needed
6. Submit pull request with clear description

## 📞 Support & Contact

### For Technical Issues
- Create GitHub issue with detailed description
- Include browser/device information
- Provide steps to reproduce problem

### For Content Updates
- SASSA information changes frequently
- Community contributions welcome
- Verify information with official sources

### Community
- Join discussions in GitHub Issues
- Share feedback and suggestions
- Help other community members

## 📄 Legal & Compliance

### Disclaimer
This is an **independent  resource** not affiliated with SASSA or the South African Government. Users must verify all information through official SASSA channels:

- **Official Website**: https://www.sassa.gov.za
- **Helpline**: 0800 60 10 11
- **Government News**: https://www.sanews.gov.za

### License
MIT License - see [LICENSE.md](LICENSE.md) for details

### Privacy
See [Privacy Policy](src/pages/Privacy.tsx) for detailed information handling practices

### Terms
See [Terms of Service](src/pages/Terms.tsx) for usage conditions and limitations

---

## 🙏 Acknowledgments

- **SASSA Beneficiaries** - The community this application serves
- **South African Government** - For making SASSA information publicly available  
- **Open Source Community** - For the tools and libraries that make this possible
- **Contributors** - Everyone who helps improve this resource

---

**Built with ❤️ for South African SASSA beneficiaries**

*Remember: Always verify SASSA information through official channels. This is an unofficial resource designed to help, not replace, official SASSA services.*
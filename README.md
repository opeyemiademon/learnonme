# LearnOnMe Admin Dashboard

A modern admin dashboard built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎨 Modern UI with TailwindCSS
- 🔷 TypeScript for type safety
- 📱 Responsive design
- 🎯 Custom color scheme (Primary: #1F2937, Secondary: #F26711)
- 📊 Dashboard with statistics
- ⚙️ Settings pages with email configuration
- 🧭 Top navigation bar with logo and menu
- 🔔 User controls with notifications and settings
- 💜 Purple gradient navigation menu

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
learnonme/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard page
│   │   ├── settings/
│   │   │   └── emails/         # Email settings page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (redirects to dashboard)
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── TopNav.tsx          # Top navigation bar with menu
│       └── DashboardLayout.tsx # Main layout wrapper
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Color Scheme

- **Primary Color**: #1F2937 (Dark Gray)
- **Secondary Color**: #F26711 (Orange)

## Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Pages

- `/dashboard` - Main dashboard with statistics
- `/settings/emails` - Email configuration page
- `/programs` - Programs page
- `/reports` - Reports page
- `/products` - Products page

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: '#1F2937',
  secondary: '#F26711',
}
```

### Navigation Menu

Edit `src/components/TopNav.tsx` to customize navigation menu items.

## License

MIT

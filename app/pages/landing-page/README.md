# Landing Page Documentation

## Summary

The landing page (`index.vue`) is a marketing/promotional page for SplitEase built with Nuxt 3, DaisyUI, and Tailwind CSS. It showcases the application's features and encourages users to sign up.

## Page Structure

**Route:** `/landing-page`

**Layout:** `app` layout

**Components Used:**

- `AppNavbar` - Navigation bar component
- `AppFooter` - Footer component
- `Icon` - Nuxt Icon component for feature icons
- `NuxtLink` - For internal navigation

## Page Sections

### 1. Hero Section

- Full-screen hero with centered content
- **Logo**: SplitEase logo with green blur effect (`#10b981`)
  - Blur overlay: `blur-xl opacity-40`
  - Size: 120x120px (w-30 h-30)
- **Headline**: "Split expenses seamlessly with your group"
  - Green accent on "with your group"
  - Mobile: `text-4xl`
  - Desktop: `text-7xl`
- **Subheadline**: Description of the app's purpose
- **CTA Buttons**:
  - "Proceed Demo" - Primary green button with arrow icon
  - "Sign in" - Outline button
- **Badge**: "Free Forever" text below CTAs

### 2. Features Grid Section

Background: `bg-base-100`

- **Header**: "Everything you need to split expenses"
- **Subheader**: Feature benefits description
- **Grid Layout**: 1 column mobile, 3 columns on large screens

**Features (6 items):**

| Feature                   | Icon                                     | Description                                                           |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| Group Management          | `material-symbols:group-outline`         | Create and manage groups for roommates, trips, or any shared expenses |
| Easy Expense Tracking     | `material-symbols-light:attach-money`    | Log expenses quickly with equal or custom split options               |
| Smart Balance Calculation | `material-symbols-light:pie-chart`       | Automatically calculates who owes what                                |
| Activity Feed             | `material-symbols:notifications-outline` | Real-time transaction history and group activity                      |
| Secure & Private          | `material-symbols:shield-outline`        | Industry-standard security for financial data                         |
| Mobile First Design       | `material-symbols:mobile-2-outline`      | Responsive interface for any device                                   |

**Feature Card Styling:**

- Background: `bg-base-300`
- Border: `border-gray-100/20`, hover: `border-[#10b981]`
- Icon wrapper: `bg-[#10b981]/20` with rounded corners
- Padding: `p-8`

### 3. Why Choose SplitEase Section

Background: `bg-base-200`

Two-column layout on desktop:

**Left Column - Benefits List:**

- "No more awkward money conversations"
- "Track shared expenses in real-time"
- "Settle up with confidence"
- "Perfect for roommates, trips, and teams"
- "Free to use, no hidden fees"
- "Simple and intuitive interface"

Each item has a green checkmark icon (`material-symbols:check-circle-outline-rounded`)

**Right Column - Feature Card:**

- Green-tinted card (`bg-[#10b981]/10`)
- Border: `border-[#10b981]`
- Lightning bolt icon (150px desktop, 90px mobile)
- "Fast & Efficient" heading
- Description text

### 4. Call-to-Action Section

Background: `bg-[#10b981]` (solid green)

- Height: `min-h-[60vh]`
- **Headline**: "Ready to simplify your shared expenses?"
- **Subheadline**: Social proof text
- **CTA Button**: White button with "Get Started Now"
- Text colors: White with white/90 opacity for secondary text

### 5. Contact Section

Background: `bg-base-200`

- **Header**: "Get in Touch"
- **Subheader**: Contact invitation

**Contact Cards (2):**

| Card    | Icon                                            | Content                    |
| ------- | ----------------------------------------------- | -------------------------- |
| Email   | `material-symbols:mail-outline-rounded`         | dev.reymartcasas@gmail.com |
| Connect | `material-symbols:plug-connect-outline-rounded` | LinkedIn link              |

Card styling: `bg-base-100`, `border-gray-100/20`, `rounded-[20px]`

## Styling Details

**Color Scheme:**

- Primary Green: `#10b981`
- Background alternating: `bg-base-200`, `bg-base-100`
- CTA Section: Solid `bg-[#10b981]`
- Text: `text-base-content` with opacity variants

**Responsive Breakpoints:**

- Mobile: Single column layouts, smaller text
- Large (lg): Multi-column grids, larger icons
- Extra Large (xl): Maximum text sizes, expanded layouts

**Layout:**

- Max width containers: `max-w-sm` mobile, `xl:max-w-7xl` desktop
- Centered content with `mx-auto`
- Flexbox and CSS Grid for layouts
- Consistent padding and gaps

## Typography

**Text Sizes:**

- Hero headline: `text-4xl` / `lg:text-7xl`
- Section headers: `text-xl` / `xl:text-4xl`
- Body text: `text-md` / `xl:text-xl`
- Labels: `text-[16px]`

## Accessibility

- Semantic HTML structure with sections
- Alt text for logo image
- Links have hover states
- Color contrast maintained
- Icon components with descriptive names

## Theme Support

The page supports DaisyUI's light/dark theme modes:

- Uses semantic color classes (`bg-base-100`, `bg-base-200`, `text-base-content`)
- Accent color (`#10b981`) remains consistent across themes
- Automatic adaptation based on user preference

## Note

This page provides similar content to the root `index.vue` and serves as an alternative landing page route.

---

```markdown
# Serenity At Home 🌿

A modern home care service website built with **Next.js 13 (App Router)**, **TypeScript**, and **TailwindCSS**.  
It provides information about services, caregivers, and allows families to request care through a contact form.

---

## 🚀 Features

- 🏠 **Home Page** with welcome message, slideshow, and service highlights.
- 👩‍⚕️ **About Page** with mission and values.
- 🛠 **Services Page** listing all available care services.
- 📩 **Contact Page** with a working request form that emails inquiries.
- 📌 **Sticky Footer** with a hiring banner for caregivers.
- 📱 **Responsive Design** optimized for mobile, tablet, and desktop.

---

## 📸 Screenshots

### Home Page
![Home Page](public/images/home.png)

---

### About Us
![About Us](public/images/about.png)

---

### Our Services
![Our Services](public/images/services.png)

---

### Contact Page
![Contact Page](public/images/contact.png)

---

## ⚙️ Tech Stack

- [Next.js 13+](https://nextjs.org/) (App Router, Server Components)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Strapi CMS](https://strapi.io/) (for content)
- Email handling via `/api/contact`

---

## 📂 Project Structure

```

app/
├── layout.tsx        # Root layout with header + footer
├── home/             # Home page
├── about/            # About page
├── services/         # Services page
├── contact/          # Contact page
components/
├── CaregiverCarousel.tsx  # Image slideshow
├── ContactForm.tsx        # Request care form
├── Header.tsx / Footer.tsx
lib/
├── api.ts            # Fetch from Strapi
├── utils.ts          # Utility helpers
public/images/         # Slideshow images

````

---

## 🔑 Configuration

1. **Environment Variables**  
   Add a `.env.local` file at the root of your project:

   ```env
   NEXT_PUBLIC_API_URL=https://your-strapi-instance.com
   CONTACT_RECEIVER_EMAIL=Serenityathome7@gmail.com
````

* `NEXT_PUBLIC_API_URL` → Your Strapi backend or CMS.
* `CONTACT_RECEIVER_EMAIL` → Where form submissions will be sent.

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## 📬 Contact Form

* Validates name, phone, and email before sending.
* Honeypot field (`company`) blocks spam bots.
* Submits data to `/api/contact` → sends email to `Serenityathome7@gmail.com`.

---

## 📌 Roadmap

* [ ] Add blog section for caregiver tips.
* [ ] Multi-language support.
* [ ] Admin dashboard for inquiries.

---

## 📝 License

This project is licensed under the MIT License.

---

© 2025 **Serenity At Home** · All rights reserved.

```

---


# Instructly - Client Side (Frontend)

-   **Live Server**: https://instructly.vercel.app/

## **Project Overview**

Instructly Client is a dynamic educational platform built with Next.js, enabling students to find tutors, book sessions, and manage their learning. Tutors can create profiles, list subjects, and manage availability. The platform supports admin features for user management and content oversight (if implemented). With TypeScript, Tailwind CSS, and Custom secure authentication, Instructly ensures scalability, responsiveness, and a seamless user experience, with data managed via MongoDB.

## **Tech Stack**

-   **Frontend Framework:** NextJS (React + TypeScript)
-   **UI Library:** Shadcn & Tailwind CSS
-   **Routing:** NextJS Pages Router
-   **API Requests:** NextJS Built-in Functionalities
-   **Authentication:** Custom Secured Authentication
-   **Payment Gateway:** SSLCommerz

## **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/mahfuzzayn/instructly-client.git
cd instructly-client
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=your_recaptcha_client_key
NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=your_recaptcha_server_key
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Your app will be available at `http://localhost:3000`.

## **Features**

-   Public routes: Home, Tutors, Tutor Detail, About Us, FAQ & News
-   Private routes: Student & Tutor Dashboard, Subjects, Bookings & Review Managment
-   Responsive design, error handling, and UI enhancements

## **Build & Deployment**

To build the project for production:

```sh
npm run build
```

For deployment, use **Vercel**, **Netlify**, or other static hosting services.

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).

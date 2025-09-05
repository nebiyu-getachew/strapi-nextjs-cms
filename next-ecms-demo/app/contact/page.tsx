import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container">

      <h2>Let’s Connect</h2>
      <p>We’re here to answer your questions and help you get started with care.</p>

      <p><strong>Phone:</strong> 206-973-6729<br/>
         <strong>Email:</strong> Serenityathome7@gmail.com
      </p>

      <p>Or fill out the contact form below, and we’ll reach out soon!</p>

      <h2>Client Intake Form / Request Care</h2>
      <p><em>Need Help at Home?</em> Please fill out the form below, and we’ll be in touch to schedule a free consultation.</p>

      <ContactForm />
    </div>
  );
}

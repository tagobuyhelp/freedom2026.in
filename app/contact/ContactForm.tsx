"use client";

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API route when backend is ready
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-black text-slate-900 mb-5">Send Us a Message</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="How can we help?"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Write your message here..."
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer"
        >
          Send Message
        </button>
        <p className="text-xs text-slate-400">
          Note: Please also email us directly at{" "}
          <a href={`mailto:${email}`} className="text-orange-600 font-medium">
            {email}
          </a>{" "}
          for urgent enquiries.
        </p>
      </form>
    </div>
  );
}

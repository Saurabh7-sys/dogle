"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/app/components/FadeIn";
import { CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/siteConfig";
import { useAuthStore } from "@/app/store/useAuthStore";

function truncateFilename(filename, maxLength = 20) {
  if (!filename || filename.length <= maxLength) return filename;
  const extIndex = filename.lastIndexOf(".");
  if (extIndex === -1) {
    return filename.slice(0, maxLength - 3) + "...";
  }
  const name = filename.slice(0, extIndex);
  const ext = filename.slice(extIndex);
  const allowedLength = maxLength - ext.length - 3;
  if (allowedLength <= 0) {
    return filename.slice(0, maxLength - 3) + "...";
  }
  return name.slice(0, allowedLength) + "..." + ext;
}

const faqs = [
  {
    q: "Do you provide treats?",
    a: "Yes, obviously! We have a full Snack Menu ranging from crunchy bites to frozen pupsicles.",
  },
  {
    q: "Can I bring my dog's favorite bed?",
    a: "Absolutely. Familiar smells help them settle in. Just make sure it's washable!",
  },
  {
    q: "Will I get updates?",
    a: "We send daily photo 'Pupdates' so you can see all the tail-wagging fun they're having.",
  },
];

export default function ContactPage() {
  const { user, profile } = useAuthStore();
  const [form, setForm] = useState({
    human: "",
    dog: "",
    dogBreed: "",
    email: "",
    phone: "",
    subject: "Booking an Inquiry",
    message: "",
  });
  const [vaccineFile, setVaccineFile] = useState(null);
  const [vaccineFileName, setVaccineFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        human: prev.human || profile.name || user?.displayName || "",
        dog: prev.dog || profile.dogName || "",
        dogBreed: prev.dogBreed || profile.dogBreed || "",
        email: prev.email || profile.email || user?.email || "",
        phone: prev.phone || profile.phone || "",
      }));
    }
  }, [profile, user]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setVaccineFile(null);
      setVaccineFileName("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, WEBP, or PDF file.");
      e.target.value = "";
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("File is too large. Maximum size is 4MB.");
      e.target.value = "";
      return;
    }

    setVaccineFile(file);
    setVaccineFileName(file.name);
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let vaccineCertificate = "";
      let vaccineCertificateName = "";

      if (vaccineFile) {
        vaccineCertificate = await readFileAsDataUrl(vaccineFile);
        vaccineCertificateName = vaccineFile.name;
      }

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.human,
          email: form.email,
          phone: form.phone,
          dogName: form.dog,
          dogBreed: form.dogBreed,
          subject: form.subject,
          message: form.message,
          vaccineCertificate,
          vaccineCertificateName,
        }),
      });
      if (res.ok) {
        setSent(true);
        setVaccineFile(null);
        setVaccineFileName("");
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-white border-[3px] border-[#1b1c1c] rounded-full px-6 py-4 text-lg text-[#1b1c1c] focus:outline-none focus:border-[#705d00] focus:scale-[1.02] transition-all duration-150 shadow-[0_4px_0_0_#eae7e7] placeholder:text-[#7e7761]";

  return (
    <main className="pt-36 pb-24 px-6 flex-grow w-full max-w-[1200px] mx-auto flex flex-col gap-16">
      {/* Hero */}
      <FadeIn>
        <section className="text-center flex flex-col items-center gap-4">
          <h1 className="font-black text-5xl md:text-[48px] leading-tight text-[#1b1c1c]">
            Send Us a Woof!
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4633] max-w-2xl">
            Have a question? Ready to book? Or just want to tell us your dog is a
            good boy? (We agree). Drop us a line below!
          </p>
        </section>
      </FadeIn>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── Form Card ── */}
        <FadeIn delay={0.1}>
          <div className="bg-[#fcf9f8] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 relative overflow-hidden shadow-[0_8px_0_0_#1b1c1c] h-full">
            {/* Decorative paw icon */}
            <div className="absolute -top-4 -right-4 bg-[#fc8200] text-[#5d2c00] p-4 rounded-full border-[3px] border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c] rotate-12">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-16 text-center">
                <span
                  className="material-symbols-outlined text-6xl text-[#705d00]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h3 className="font-bold text-3xl text-[#1b1c1c]">
                  Woof received! 🐾
                </h3>
                <p className="text-lg text-[#4d4633]">
                  We&apos;ll get back to you faster than a golden retriever chasing a
                  ball.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      human: "",
                      dog: "",
                      dogBreed: "",
                      email: "",
                      phone: "",
                      subject: "Booking an Inquiry",
                      message: "",
                    });
                    setVaccineFile(null);
                    setVaccineFileName("");
                  }}
                  className="bg-[#ffd93d] text-[#725e00] font-bold px-6 py-3 rounded-full border-2 border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Send another woof
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mt-4"
              >
                {/* Human name */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Your Human Name
                  </label>
                  <input
                    name="human"
                    type="text"
                    placeholder="John Doe"
                    value={form.human}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Dog name */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Your Dog&apos;s Name (The important one)
                  </label>
                  <input
                    name="dog"
                    type="text"
                    placeholder="Buster"
                    value={form.dog}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Dog breed */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Dog Breed
                  </label>
                  <input
                    name="dogBreed"
                    type="text"
                    placeholder="Golden Retriever, Indie, Beagle..."
                    value={form.dogBreed}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Vaccination certificate */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Vaccination Certificate
                  </label>
                  <label
                    htmlFor="vaccineCertificate"
                    className="w-full bg-white border-[3px] border-dashed border-[#1b1c1c] rounded-[2rem] px-6 py-5 text-lg text-[#4d4633] cursor-pointer hover:border-[#705d00] hover:bg-[#fffef8] transition-all duration-150 shadow-[0_4px_0_0_#eae7e7] flex items-center justify-center gap-3"
                  >
                    <span
                      className="material-symbols-outlined text-[#705d00]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      upload_file
                    </span>
                    {vaccineFileName ? truncateFilename(vaccineFileName) : "Upload JPG, PNG, WEBP or PDF (max 4MB)"}
                  </label>
                  <input
                    id="vaccineCertificate"
                    name="vaccineCertificate"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  {vaccineFileName && (
                    <p className="text-sm text-[#705d00] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      {truncateFilename(vaccineFileName)} attached
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder={CONTACT_PHONE_DISPLAY}
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    What&apos;s on your mind?
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option>Booking an Inquiry</option>
                    <option>Question about Daycare</option>
                    <option>Dietary Needs</option>
                    <option>Just saying hi!</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#1b1c1c]">
                    The Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us everything..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white border-[3px] border-[#1b1c1c] rounded-[2rem] px-6 py-4 text-lg text-[#1b1c1c] focus:outline-none focus:border-[#705d00] focus:scale-[1.02] transition-all duration-150 shadow-[0_4px_0_0_#eae7e7] placeholder:text-[#7e7761] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 bg-[#ffd93d] text-[#725e00] font-bold text-2xl py-4 px-8 rounded-full border-[3px] border-[#1b1c1c] shadow-[0_6px_0_0_#1b1c1c] hover:translate-y-1 hover:shadow-[0_2px_0_0_#1b1c1c] active:translate-y-[6px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        {/* ── Right Column ── */}
        <FadeIn delay={0.2} className="flex flex-col gap-8 h-full">
          {/* WhatsApp Quick Contact */}
          <div className="bg-[#bee0ff] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 flex flex-col items-center text-center gap-6 shadow-[0_8px_0_0_#1b1c1c]">
            <div className="bg-white p-4 rounded-full border-[3px] border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-3xl text-[#006697] mb-2">
                Need answers fast?
              </h3>
              <p className="text-base leading-relaxed text-[#006697]">
                We&apos;re on standby to answer your texts. Perfect for quick updates
                or sending us cute pics of your good boy.
              </p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-bold text-2xl py-4 px-8 rounded-full border-[3px] border-[#1b1c1c] shadow-[0_6px_0_0_#1b1c1c] hover:translate-y-1 hover:shadow-[0_2px_0_0_#1b1c1c] active:translate-y-[6px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-3">
              WhatsApp Us ({CONTACT_PHONE_DISPLAY})
            </a>
          </div>

          {/* FAQs */}
          <div className="bg-[#f0eded] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 shadow-[0_8px_0_0_#1b1c1c] flex-grow">
            <h3 className="font-bold text-2xl text-[#1b1c1c] border-b-4 border-[#1b1c1c] pb-4 mb-6 inline-flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#944a00]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                help
              </span>
              Frequent Barks (FAQs)
            </h3>
            <div className="flex flex-col gap-6">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="font-bold text-sm text-[#1b1c1c] mb-2 group-hover:text-[#944a00] transition-colors duration-150">
                    {q}
                  </h4>
                  <p className="text-base leading-relaxed text-[#4d4633]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

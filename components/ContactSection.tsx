"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Youtube,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
}
type SubmissionStatus = "idle" | "sending" | "success" | "error";

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/vincentiusjacob",
    color: "hover:text-gray-300",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/vincentiusjacob",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/vincentiusjacob",
    color: "hover:text-cyan-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:icencodes@gmail.com",
    color: "hover:text-green-400",
  },
  {
    name: "Youtube",
    icon: Youtube,
    url: "https://www.youtube.com/channel/your-channel-id",
    color: "hover:text-red-500",
  },
];

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("sending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmissionStatus("idle"), 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus("idle"), 3000);
    }
  };

  const renderButtonContent = () => {
    switch (submissionStatus) {
      case "sending":
        return (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle size={18} /> Message Sent!
          </>
        );
      case "error":
        return <>Error! Try Again</>;
      default:
        return (
          <>
            <Send size={18} /> Send Message
          </>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white min-h-screen py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_80%,#3e78ad33,transparent)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
              Get in
            </span>
            <span className="text-white ml-4">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
            <span className="text-green-400">&gt;</span>{" "}
            {"I'm open to new projects and collaborations. Let's connect."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h3 className="text-3xl font-light text-white mb-6">
                Send a <span className="text-green-400">Message</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@domain.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors duration-300"
                    placeholder="Project collaboration, consultation, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submissionStatus === "sending"}
                  className={`w-full px-8 py-4 rounded-lg font-mono text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    submissionStatus === "sending"
                      ? "bg-gray-500"
                      : submissionStatus === "success"
                      ? "bg-green-600"
                      : submissionStatus === "error"
                      ? "bg-red-600"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/20 text-white"
                  }`}
                >
                  {renderButtonContent()}
                </button>
              </form>
            </div>
          </div>

          <div
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-light text-white mb-6">
                Contact <span className="text-cyan-400">Information</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin
                    className="text-cyan-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-gray-400">Jakarta, Indonesia</p>
                    <p className="text-gray-500 text-sm">UTC+7 Timezone</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail
                    className="text-green-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a
                      href="mailto:icencodes@gmail.com"
                      className="text-gray-400 hover:text-green-400 transition-colors"
                    >
                      icencodes@gmail.com
                    </a>
                    <p className="text-gray-500 text-sm">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle
                    className="text-purple-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Availability
                    </h4>
                    <p className="text-gray-400">Open for new projects</p>
                    <p className="text-gray-500 text-sm">
                      Full-time & Contract work
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-light text-white mb-6">
                Online <span className="text-purple-400">Profiles</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={20} />
                    <span className="font-mono text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

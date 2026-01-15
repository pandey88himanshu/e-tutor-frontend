"use client";

import React, { useState } from "react";

// FAQ Categories with dummy data
const faqCategories = [
  { id: "nulla-tempor", label: "Nulla tempor odio ut fringilla" },
  { id: "donec-malesuada", label: "Donec malesuada" },
  { id: "quisque", label: "Quisque" },
  { id: "toquam", label: "Toquam, in accumsan" },
  { id: "ut-sed-orci", label: "Ut sed orci" },
  { id: "nullam-non", label: "Nullam non ante" },
  { id: "phasellus", label: "Phasellus" },
  { id: "etiam-eu", label: "Etiam eu libero elementum" },
];

// FAQ Items with dummy data per category
const faqItems: Record<
  string,
  { id: string; question: string; answer: React.ReactNode }[]
> = {
  "nulla-tempor": [
    {
      id: "1",
      question:
        "Fusce placerat interdum magna, ut ultrices odio pharetra pulvinar.",
      answer: null,
    },
    {
      id: "2",
      question:
        "Proin lacinia lobortis metus, ut faucibus eros ullamcorper et.",
      answer: null,
    },
    {
      id: "3",
      question:
        "Etiam a nisl dui. Integer sed eros sed leo blandit interdum eget nec",
      answer: null,
    },
    {
      id: "4",
      question: "Nulla id ligula ligula.",
      answer: (
        <div className="space-y-4">
          <p className="body-md-400 text-[rgb(var(--gray-700))]">
            Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis
            lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor,
            lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed
            varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue
            auctor molestie ut quis felis.
          </p>
          <ol className="list-decimal pl-6 space-y-1 body-md-400 text-[rgb(var(--gray-700))]">
            <li>
              Sed lorem elit, aliquam vel neque condimentum, blandit cursus
              nisl.
            </li>
            <li>Cras ullamcorper posuere felis et vehicula.</li>
            <li>Donec dignissim metus felis, non posuere arcu finibus a.</li>
          </ol>
          <p className="body-md-400 text-[rgb(var(--gray-700))]">
            Sed interdum dignissim odio, vitae mollis nisl congue nec. Ut tellus
            metus, posuere vel odio ut, ullamcorper rutrum ex. Curabitur
            porttitor sem nec felis mollis, nec laoreet leo iaculis.
          </p>
          <ul className="list-disc pl-6 space-y-1 body-md-400 text-[rgb(var(--gray-700))]">
            <li>Donec ut massa</li>
            <li>ac magna iaculis imperdiet ut viverra arcu.</li>
          </ul>
          <p className="body-md-400 text-[rgb(var(--gray-700))]">
            Proin quis elementum velit, eget efficitur nulla. Donec tellus
            massa, faucibus id nulla sit amet, feugiat viverra justo. Curabitur
            auctor nibh ut ante lacinia, ac finibus sem pulvinar. Suspendisse
            vestibulum in dolor eget sodales. Curabitur justo risus, vehicula ac
            mollis sit amet, gravida sed erat.
          </p>
        </div>
      ),
    },
    {
      id: "5",
      question: "Etiam non tellus non dolor suscipit vehicula.",
      answer: null,
    },
    {
      id: "6",
      question: "Vestibulum pellentesque ex magna.",
      answer: null,
    },
    {
      id: "7",
      question: "Ut ullamcorper est sit amet quam aliquet mattis.",
      answer: null,
    },
  ],
  "donec-malesuada": [
    {
      id: "1",
      question: "How do I enroll in a course?",
      answer: (
        <p className="body-md-400 text-[rgb(var(--gray-700))]">
          To enroll in a course, simply browse our catalog, select the course
          you&apos;re interested in, and click the &quot;Enroll Now&quot;
          button. You&apos;ll be guided through the payment process if it&apos;s
          a paid course.
        </p>
      ),
    },
    {
      id: "2",
      question: "Can I access courses on mobile devices?",
      answer: null,
    },
  ],
  quisque: [
    {
      id: "1",
      question: "What payment methods are accepted?",
      answer: (
        <p className="body-md-400 text-[rgb(var(--gray-700))]">
          We accept all major credit cards, PayPal, and bank transfers. Some
          regions may have additional local payment options available.
        </p>
      ),
    },
  ],
  toquam: [
    {
      id: "1",
      question: "How long do I have access to a course?",
      answer: null,
    },
  ],
  "ut-sed-orci": [
    {
      id: "1",
      question: "Can I get a refund if I'm not satisfied?",
      answer: null,
    },
  ],
  "nullam-non": [
    {
      id: "1",
      question: "Do you offer certificates upon completion?",
      answer: null,
    },
  ],
  phasellus: [
    {
      id: "1",
      question: "How do I contact my instructor?",
      answer: null,
    },
  ],
  "etiam-eu": [
    {
      id: "1",
      question: "Are there any prerequisites for courses?",
      answer: null,
    },
  ],
};

// Dropdown options
const userTypes = ["Students", "Instructors", "Parents", "Institutions"];

interface FAQAccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQAccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) => {
  return (
    <div className="border border-[rgb(var(--gray-100))] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${
          isOpen
            ? "bg-[rgb(var(--gray-900))] text-[rgb(var(--white))]"
            : "bg-[rgb(var(--white))] text-[rgb(var(--gray-800))] hover:bg-[rgb(var(--gray-50))]"
        }`}
      >
        <span className="body-md-500 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 bg-[rgb(var(--white))] border-t border-[rgb(var(--gray-100))]">
          {answer || (
            <p className="body-md-400 text-[rgb(var(--gray-700))]">
              Content for this question is coming soon. Please check back later
              for detailed information.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("nulla-tempor");
  const [openItem, setOpenItem] = useState<string | null>("4");
  const [selectedUserType, setSelectedUserType] = useState("Students");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ subject: "", message: "" });
    alert("Your question has been submitted! We'll get back to you soon.");
  };

  const currentFAQs = faqItems[selectedCategory] || [];

  return (
    <section className="w-full py-10 md:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-8 md:px-12 lg:px-75">
        {/* Title and Filter Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-10">
          <h2 className="heading-02 text-[rgb(var(--gray-900))]">
            Frequently asked questions
          </h2>

          {/* User Type Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 px-4 py-3 border border-[rgb(var(--gray-200))] rounded-lg bg-[rgb(var(--white))] min-w-40 body-md-400 text-[rgb(var(--gray-800))] hover:border-[rgb(var(--gray-300))] transition-colors"
            >
              {selectedUserType}
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-full bg-[rgb(var(--white))] border border-[rgb(var(--gray-200))] rounded-lg shadow-lg z-10 overflow-hidden">
                {userTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedUserType(type);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left body-md-400 hover:bg-[rgb(var(--gray-50))] transition-colors ${
                      selectedUserType === type
                        ? "text-[rgb(var(--primary-500))] bg-[rgb(var(--primary-100))]"
                        : "text-[rgb(var(--gray-700))]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Sidebar - Category Navigation */}
          <div className="lg:col-span-3">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setOpenItem(null);
                  }}
                  className={`whitespace-nowrap lg:whitespace-normal text-left px-4 py-3 rounded-lg body-md-500 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-[rgb(var(--primary-500))] text-[rgb(var(--white))]"
                      : "text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Center - FAQ Accordion */}
          <div className="lg:col-span-6">
            <div className="space-y-3">
              {currentFAQs.map((faq) => (
                <FAQAccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openItem === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Question Form */}
          <div className="lg:col-span-3">
            <div className="bg-[rgb(var(--gray-50))] rounded-lg p-6 sticky top-24">
              <h3 className="body-lg-600 text-[rgb(var(--gray-900))] mb-2">
                Don&apos;t find your answer!
              </h3>
              <p className="body-sm-400 text-[rgb(var(--gray-500))] mb-6">
                Don&apos;t worry, write your question here and our support team
                will help you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-[rgb(var(--gray-200))] rounded-lg body-md-400 text-[rgb(var(--gray-800))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))] focus:ring-1 focus:ring-[rgb(var(--primary-500))] transition-colors bg-[rgb(var(--white))]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-[rgb(var(--gray-200))] rounded-lg body-md-400 text-[rgb(var(--gray-800))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))] focus:ring-1 focus:ring-[rgb(var(--primary-500))] transition-colors resize-none bg-[rgb(var(--white))]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[rgb(var(--primary-500))] text-[rgb(var(--white))] rounded-lg body-md-600 hover:bg-[rgb(var(--primary-600))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Question"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

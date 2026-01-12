"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const successStories = [
  {
    title: "20k+ Instructor created their success story with eduguard",
    description:
      "Nunc euismod sapien non felis eleifend porttitor. Maecenas dictum eros justo, id commodo ante laoreet nec. Phasellus aliquet, orci id pellentesque mollis.",
    quote:
      "Nulla sed malesuada augue. Morbi interdum vulputate imperdiet. Pellentesque ullamcorper auctor ante, egestas interdum quam facilisis commodo.",
  },
  {
    title: "Teaching online helped me reach students globally",
    description:
      "Integer malesuada turpis id lorem feugiat, at sagittis mauris tristique. Curabitur laoreet nisi vitae lacus viverra, at fermentum elit luctus.",
    quote:
      "Mauris tristique suscipit metus, a molestie dui dapibus vel. Duis ornare enim ullamcorper congue.",
  },
  {
    title: "Eduguard empowered my career transformation",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    quote:
      "Phasellus efficitur quis ex in consectetur. Sed nec dapibus orci integer nisl turpis.",
  },
];

export default function InstructorSuccessStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevStory = () => {
    setActiveIndex((prev) =>
      prev === 0 ? successStories.length - 1 : prev - 1
    );
  };

  const nextStory = () => {
    setActiveIndex((prev) =>
      prev === successStories.length - 1 ? 0 : prev + 1
    );
  };

  const story = successStories[activeIndex];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-10 md:px-20 lg:px-[300px] py-16 lg:py-20">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-36">
          {/* LEFT CONTENT */}
          <div className="w-full max-w-[536px]">
            <h2 className="heading-02 text-[rgb(var(--gray-900))] mb-6">
              {story.title}
            </h2>

            <p className="body-md-400 text-[rgb(var(--gray-600))] mb-10">
              {story.description}
            </p>

            {/* Quote Card */}
            <div className="mb-10 rounded-xl bg-[rgb(var(--primary-100))] p-6">
              <Quote className="mb-4 h-8 w-8 text-[rgb(var(--primary-500))]" />
              <p className="body-sm-400 text-[rgb(var(--gray-700))] leading-relaxed">
                {story.quote}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <button
                onClick={prevStory}
                aria-label="Previous story"
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-lg border border-[rgb(var(--gray-200))]
                  text-[rgb(var(--gray-700))]
                  hover:bg-[rgb(var(--gray-100))]
                  transition
                "
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextStory}
                aria-label="Next story"
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-lg bg-[rgb(var(--primary-500))]
                  text-white
                  hover:bg-[rgb(var(--primary-600))]
                  transition
                "
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE (STATIC) */}
          <div className="w-full max-w-[536px]">
            <img
              src="/instructor/instructor-success.png"
              alt="Instructor success"
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

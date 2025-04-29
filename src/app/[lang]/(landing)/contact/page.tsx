"use client";

import { useState, useRef, useEffect } from "react";

import {
  IoIosArrowDown,
  IoIosRocket,
  IoIosSchool,
} from "react-icons/io";

import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import "./page.css";
import { useTranslations } from "@/context/I18nClientProvider";

export default function page() {
  return (
    <section className="contact--page">
      <AboutUs />
      <OurStory />
      <Team />
    </section>
  );
}

export const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const handleClickExpanded = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === openIndex) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [openIndex]);

  const { t } = useTranslations();

  const Titles = [
    {
      title: t("contact.about.title"),
      subtitle: t("contact.about.subtitle"),
    },
  ];

  const faqItems = [
    {
      title: t("contact.faq.0.title"),
      content: t("contact.faq.0.content"),
    },
    {
      title: t("contact.faq.1.title"),
      content: t("contact.faq.1.content"),
    },
    {
      title: t("contact.faq.2.title"),
      content: t("contact.faq.2.content"),
    },
    {
      title: t("contact.faq.3.title"),
      content: t("contact.faq.3.content"),
    },
  ];

  return (
    <article className="about-us">
      <figure>
        <img
          src="/images/contact/contact.svg"
          alt="Contact Us"
          className="contact--page__image"
        />
        <figcaption className="contact--page__caption">Contact Us</figcaption>
      </figure>

      <header className="header">
        <h1>{Titles[0]?.title}</h1>
        <h3>{Titles[0]?.subtitle}</h3>
      </header>

      <div className="container--">
        {/* items */}
        <ul className="list">
          {faqItems.map((item, index) => (
            <li
              className={`item ${openIndex === index ? "show" : ""}`}
              key={index}
            >
              <div className="title">
                <h4>{item.title}</h4>
                <button
                  type="button"
                  onClick={() => handleClickExpanded(index)}
                  className={`toggle ${`item ${
                    openIndex === index ? "rotate" : ""
                  }`}`}
                >
                  <IoIosArrowDown />
                </button>
              </div>
              <div
                className="content"
                ref={(el) => {
                  if (el) {
                    contentRefs.current[index] = el;
                  }
                }}
              >
                {item.content}
              </div>
            </li>
          ))}
        </ul>
        {/* items */}
      </div>
    </article>
  );
};

export const OurStory = () => {
  const { t } = useTranslations();

  const dataOurStory = {
    title: t("contact.story.title"),
    subtitle: t("contact.story.subtitle"),

    timeline: [
      {
        date: t("contact.story.timeline.0.date"),
        title: t("contact.story.timeline.0.title"),
        description: t("contact.story.timeline.0.description"),
        icon: <IoIosSchool />,
      },
      {
        date: t("contact.story.timeline.1.date"),
        title: t("contact.story.timeline.1.title"),
        description: t("contact.story.timeline.1.description"),
        icon: <MdOutlineMenuBook />,
      },
      {
        date: t("contact.story.timeline.2.date"),
        title: t("contact.story.timeline.2.title"),
        description: t("contact.story.timeline.2.description"),
        icon: <FaRegLightbulb />
      },
      {
        date: t("contact.story.timeline.3.date"),
        title: t("contact.story.timeline.3.title"),
        description: t("contact.story.timeline.3.description"),
        icon: <IoIosRocket />,
      },
      {
        date: t("contact.story.timeline.4.date"),
        title: t("contact.story.timeline.4.title"),
        description: t("contact.story.timeline.4.description"),
        icon: <IoIosSchool />,
      },
      {
        date: t("contact.story.timeline.5.date"),
        title: t("contact.story.timeline.5.title"),
        description: t("contact.story.timeline.5.description"),
        icon: <IoIosSchool />,
      },
    ],
  };

  return (
    <article className="our-story">
      <header>
        <h1>{dataOurStory.title}</h1>
        <h3>{dataOurStory.subtitle}</h3>
      </header>
      <ul className="timeline">
        {dataOurStory.timeline.map((event, index) => (
          <li className="container" key={index}>
            <figure>{event.icon}</figure>
            <div className="text-box">
              <h2>{event.title}</h2>{" "}
              <dl>
                <dt>{event.date}</dt>
                <dd>{event.title}</dd>
                {event.description && (
                  <dd className="description">{event.description}</dd>
                )}
              </dl>
              <span className="arrow"></span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export const titleTeams = [
  {
    title: "Business Team",
    integrantes: [
      {
        name: "Hunter",
        degrees: "Información académica del miembro del equipo de negocios.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Jason",
        degrees: "Información académica del miembro del equipo de negocios.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Wenjie",
        degrees: "Información académica del miembro del equipo de negocios.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Olivia",
        degrees: "Información académica del miembro del equipo de negocios.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
    ],
  },
  {
    title: "Engineering Team",
    integrantes: [
      {
        name: "Chi",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Xin",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Helen",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Yehor",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Michael",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
      {
        name: "Bryance",
        degrees: "Información académica del miembro del equipo de ingeniería.",
        description:
          "Descripción genérica del rol y responsabilidades dentro del equipo.",
      },
    ],
  },
];

export const Team = () => {
  return (
    <section className="teams">
      <article>
        <h1>{titleTeams[0]?.title}</h1>
        <nav>{}</nav>
      </article>
    </section>
  );
};

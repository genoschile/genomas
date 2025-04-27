"use client";

import { FaRegLightbulb } from "react-icons/fa";
import "./page.css";

export default function page() {
  return (
    <section className="contact--page">
      <AboutUs />
      <OurStory />
      <Team />
    </section>
  );
}
import React, { useState, useRef, useEffect } from "react";
import { HiBookOpen } from "react-icons/hi";
import { IoIosArrowDown, IoIosRocket, IoIosSchool, IoIosStar } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";

const faqItems = [
  {
    title: "Are you open source?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident rerum autem magnam quae et labore saepe. Recusandae placeat tempore tenetur libero, qui porro est hic. Dolore repellendus et quas?",
  },
  {
    title: "What happends to the service if Petal closes down?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident rerum autem magnam quae et labore saepe. Recusandae placeat tempore tenetur libero, qui porro est hic. Dolore repellendus et quas?",
  },
  {
    title: "are you owned by a publisher?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident rerum autem magnam quae et labore saepe. Recusandae placeat tempore tenetur libero, qui porro est hic. Dolore repellendus et quas?",
  },
  {
    title: "Will you be free forever?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident rerum autem magnam quae et labore saepe. Recusandae placeat tempore tenetur libero, qui porro est hic. Dolore repellendus et quas?",
  },
];

const Titles = {
  title: "About us",
  subtitle:
    "Our vision is to drive engagement, collaboration, and promote the visibility of academic research with the general",
};

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
        <h1>{Titles.title}</h1>
        <h3>{Titles.subtitle}</h3>
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
                  className={`toggle ${`item ${openIndex === index ? "rotate" : ""}`}`}
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

const timelineData = [
  {
    date: "Feb 2015",
    title: "Fundación de la empresa",
    description: "Se establece Genomas con la visión de...",
    icon: <IoIosSchool />,
  },
  {
    date: "Mar 2017",
    title: "Primer logro importante",
    description: "Alcanzamos nuestro primer hito significativo...",
    icon: <MdOutlineMenuBook />,
  },
  {
    date: "Ago 2019",
    title: "Expansión del equipo",
    description: "El equipo de Genomas crece para abordar nuevos desafíos...",
    icon: <FaRegLightbulb />,
  },
  {
    date: "Nov 2021",
    title: "Lanzamiento de nuevo producto",
    description: "Presentamos al mercado nuestra innovadora solución...",
    icon: <IoIosRocket />,
  },
  {
    date: "Ene 2023",
    title: "Reconocimiento en la industria",
    description: "Somos reconocidos por nuestra contribución a...",
    icon: <IoIosStar />,
  },
  {
    date: "Abr 2025",
    title: "Hito actual",
    description: "Continuamos avanzando y explorando nuevas oportunidades...",
    icon: <IoIosSchool />,
  },
];

export const OurStory = () => {
  return (
    <article className="our-story">
      <header>
        <h1>Our History</h1>
        <p>I'm Karen, founder Genomas, and this is our history </p>
      </header>
      <ul className="timeline">
        {timelineData.map((event, index) => (
          <li className="container" key={index}>
            <figure>
              {event.icon} 
            </figure>
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

export const Team = () => {
  return <article></article>;
};

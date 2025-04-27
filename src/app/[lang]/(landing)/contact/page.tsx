"use client";

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
import { IoIosSchool } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

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

  const faqItems = [
    {
      title: "whats service",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus provident rerum autem magnam quae et labore saepe. Recusandae placeat tempore tenetur libero, qui porro est hic. Dolore repellendus et quas?",
    },
    {
      title: "another question",
      content:
        "Este es otro contenido de la pregunta. Puedes agregar más texto aquí.",
    },
    // Agrega más items de FAQ aquí
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

      <div className="container--">
        <div className="faq-container">
          <div className="header">
            <h1>fasdkasjdasd askdasd</h1>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cum
              et eaque cumque quasi eum illum veritatis ipsam necessitatibus
              autem officiis odio veniam placeat, iste ex distinctio asperiores
              error corrupti.
            </h3>
          </div>

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
                    className="toggle"
                  >
                    <IoAdd />
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
      </div>
    </article>
  );
};

export const OurStory = () => {
  return (
    <article className="our-story">
      <header>
        <h1>Our History</h1>
        <p>I'm Karen, founder Genomas, and this is our history </p>
      </header>
      <ul className="timeline">
        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span className="arrow"></span>
          </div>
        </li>

        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span className="arrow"></span>
          </div>
        </li>

        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span className="arrow"></span>
          </div>
        </li>

        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span></span>
          </div>
        </li>

        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span></span>
          </div>
        </li>
        <li className="container">
          <figure>
            <IoIosSchool />
          </figure>
          <div className="text-box">
            <h2>Historia de la Empresa</h2>
            <dl>
              <dt>Feb 2015</dt>
              <dd>Fundación de la empresa.</dd>
            </dl>
            <span></span>
          </div>
        </li>
      </ul>
    </article>
  );
};

export const Team = () => {
  return <article></article>;
};

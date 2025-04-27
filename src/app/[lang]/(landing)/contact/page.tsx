import { IoIosSchool } from "react-icons/io";
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

export const AboutUs = () => {
  return (
    <article>
      <figure>
        <img
          src="/images/contact/contact.svg"
          alt="Contact Us"
          className="contact--page__image"
        />
        <figcaption className="contact--page__caption">Contact Us</figcaption>
      </figure>

      <div>
        <span className="section-icon" aria-hidden="true">
          🤔
        </span>
        <h2 className="section-title">Frequently asked questions</h2>
      </div>
      <div className="questions-and-answers">
        <details>
          <summary>Can I animate details/summary elements?</summary>
          <p>
            This used to be something that was impossible, but now thanks to
            modern CSS, it's actually pretty easy to do!
          </p>
        </details>
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

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
        <figcaption className="contact--page__caption">
          Contact Us
        </figcaption>
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

        <details>
          <summary>How is it possible?</summary>
          <p>
            There are a few different ways that you can do it. One of them is
            using <code>calc-size()</code>, which has some extra things you
            could do with it, but right now the easiest way is to use a
            combination of <code>interpolate-size: allow-keywords;</code> and{" "}
            <code>transition-behavior: allow-discrete</code>.
          </p>
        </details>

        <details>
          <summary>What about browser support?</summary>
          <p>
            Browser support isn't great as of the time of creating this demo,
            but it'll only get better from here. Also, it is a great{" "}
            <em>progressive enhancement</em>. This means that it won't break
            anything for people on older browsers, they just won't get the fancy
            animation you've created, while people on newer browser will get it!
          </p>
        </details>

        <details>
          <summary>What's the catch?</summary>
          <p>
            There is none! It's easy to do and it works great! I feel like
            that's too short, and I want to use this demo to show the animations
            and need a longer box to show it properly so here's a little bit of
            extra filler text lorem ipsum dolor sit amet consectetur adipisicing
            elit. Modi at ipsum dolor tempore impedit corrupti ad fugiat
            voluptate reiciendis voluptatum!
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
          <img src="../../columns/columnsGenshin/assets/7.png" alt="" />
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
          <img src="../../columns/columnsGenshin/assets/7.png" alt="" />
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
          <img src="../../columns/columnsGenshin/assets/7.png" alt="" />
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
          <img src="../../columns/columnsGenshin/assets/7.png" alt="" />
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

"use client";

import "./page.css";

import { Suggestions } from "./components/Suggestions";
import { FormSuggestions } from "./components/FormSuggestions";

export default function page() {
  return (
    <section className="suggestions-Enterprise">
      <header>
        <h1>Ai-powered group suggestions and user x </h1>
        <p>
          Its Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          eaque error quisquam quia animi quis sit modi labore fuga, eos sequi,
          ipsam ut rem voluptatem natus expedita ipsa fugit tempore!{" "}
        </p>
      </header>

      <div>
        <FormSuggestions />
        <Suggestions />
      </div>
    </section>
  );
}

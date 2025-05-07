"use client";

import { useState, useRef } from "react";

import { IoIosRocket, IoIosSchool } from "react-icons/io";

import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import "./page.css";
import { useTranslations } from "@/context/I18nClientProvider";
import { AccordionList } from "@/components/accordion/AccordionList";
import { Timeline } from "@/components/timeline/Timeline";

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
      <SectionIntro
        imageSrc="/images/contact/contact.svg"
        imageAlt="Contact Us"
        caption="Contact Us"
        title={Titles[0]?.title}
        subtitle={Titles[0]?.subtitle}
      />

      <div className="container--">
        <AccordionList items={faqItems} />;
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
        icon: <FaRegLightbulb />,
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
      <Timeline dataOurStory={dataOurStory} />
    </article>
  );
};

interface MemberTeams {
  name: string;
  degrees: string;
  description: string;
}

import { useEffect } from "react";
import { SectionIntro } from "@/components/sections/sectionTitle/SectionTitle";

export const Team = () => {
  const { t } = useTranslations();

  const TeamInfoSection = [
    {
      title: t("contact.team.title"),
      members: [
        {
          name: t("contact.team.members.1.name"),
          degrees: t("contact.team.members.1.degrees"),
          description: t("contact.team.members.1.description"),
        },
        {
          name: t("contact.team.members.2.name"),
          degrees: t("contact.team.members.2.degrees"),
          description: t("contact.team.members.2.description"),
        },
        {
          name: t("contact.team.members.3.name"),
          degrees: t("contact.team.members.3.degrees"),
          description: t("contact.team.members.3.description"),
        },
      ],
    },
    {
      title: t("contact.engineering.title"),
      members: [
        {
          name: t("contact.engineering.members.1.name"),
          degrees: t("contact.engineering.members.1.degrees"),
          description: t("contact.engineering.members.1.description"),
        },
        {
          name: t("contact.engineering.members.2.name"),
          degrees: t("contact.engineering.members.2.degrees"),
          description: t("contact.engineering.members.2.description"),
        },
        {
          name: t("contact.engineering.members.3.name"),
          degrees: t("contact.engineering.members.3.degrees"),
          description: t("contact.engineering.members.3.description"),
        },
      ],
    },
  ];

  const [selectedMembers, setSelectedMembers] = useState<{
    [key: number]: MemberTeams;
  }>({
    0: TeamInfoSection[0].members[0],
    1: TeamInfoSection[1].members[0],
  });

  const sliderRefs = useRef<Array<HTMLUListElement | null>>([]);
  const [sliderStyles, setSliderStyles] = useState<{
    [key: number]: React.CSSProperties;
  }>({});

  const handleMemberClick = (
    teamIndex: number,
    member: MemberTeams,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [teamIndex]: member,
    }));

    const li = e.currentTarget.closest("li");
    const container = sliderRefs.current[teamIndex];

    if (li && container) {
      const liRect = li.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setSliderStyles((prev) => ({
        ...prev,
        [teamIndex]: {
          left: liRect.left - containerRect.left + "px",
          width: liRect.width + "px",
        },
      }));
    }
  };

  useEffect(() => {
    TeamInfoSection.forEach((team, index) => {
      const member = selectedMembers[index];
      const container = sliderRefs.current[index];
      if (!container) return;
      const lis = container.querySelectorAll("li");
      const activeLi = Array.from(lis).find((li) =>
        li.textContent?.includes(member.name)
      );
      if (activeLi) {
        const liRect = activeLi.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setSliderStyles((prev) => ({
          ...prev,
          [index]: {
            left: liRect.left - containerRect.left + "px",
            width: liRect.width + "px",
          },
        }));
      }
    });
  }, []);

  return (
    <section className="teams">
      
      <SectionIntro
        imageSrc="/images/contact/contact.svg"
        imageAlt="Contact Us"
        caption="Contact Us"
        title={"Teams"}
        subtitle={""}
      />

      {TeamInfoSection.map((team, index) => (
        <article key={index}>
          <h1>{team.title}</h1>
          <ul className="team" ref={(el) => (sliderRefs.current[index] = el)}>
            <div
              className="slider"
              style={{
                left: sliderStyles[index]?.left || 0,
                width: sliderStyles[index]?.width || 0,
              }}
            />
            {team.members.map((integrante, memberIndex) => (
              <li
                key={memberIndex}
                className={`team-member ${
                  selectedMembers[index]?.name === integrante.name
                    ? "active"
                    : ""
                }`}
              >
                <span onClick={(e) => handleMemberClick(index, integrante, e)}>
                  {integrante.name}
                </span>
              </li>
            ))}
          </ul>
          <article className="member-details">
            {selectedMembers[index] ? (
              <>
                <header>
                  <h3>{selectedMembers[index].name}</h3>
                  <small>{selectedMembers[index].degrees}</small>
                </header>
                <div>
                  <p>{selectedMembers[index].description}</p>
                </div>
              </>
            ) : (
              <p>Haz clic en un integrante para ver su información.</p>
            )}
          </article>
        </article>
      ))}
    </section>
  );
};

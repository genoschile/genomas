import { SectionIntro } from "@/components/sections/sectionTitle/SectionTitle";
import { useTranslations } from "@/context/I18nClientProvider";
import { useState, useRef, useEffect } from "react";

interface MemberTeams {
  name: string;
  degrees: string;
  description: string;
}

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
    <article className="teams">
      <SectionIntro
        imageSrc="/images/contact/contact.svg"
        imageAlt="Contact Us"
        caption="Contact Us"
        title={"Teams"}
        subtitle={""}
      />

      {TeamInfoSection.map((team, index) => (
        <div key={index}>
          <h1>{team.title}</h1>
          <ul
            className="team"
            ref={(el) => {
              sliderRefs.current[index] = el;
            }}
          >
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
          <div className="member-details">
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
          </div>
        </div>
      ))}
    </article>
  );
};

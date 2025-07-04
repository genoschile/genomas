import { Timeline } from "@/components/timeline/Timeline";
import { useTranslations } from "@/context/I18nClientProvider";
import { FaRegLightbulb } from "react-icons/fa";
import { IoIosSchool, IoIosRocket } from "react-icons/io";
import { MdOutlineMenuBook } from "react-icons/md";

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
        <p>{dataOurStory.subtitle}</p>
      </header>
      <Timeline dataOurStory={dataOurStory} />
    </article>
  );
};
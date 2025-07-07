import { AccordionList } from "@/components/accordion/AccordionList";
import { useTranslations } from "@/context/I18nClientProvider";
import { SectionIntro } from "../../components/SectionTitle";

export const AboutUsContainer = () => {
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
        <AccordionList items={faqItems} />
      </div>
    </article>
  );
};

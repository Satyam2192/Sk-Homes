import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function Faqs() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}> How long has SK Real Estate been in the real estate industry?</AccordionHeader>
        <AccordionBody>
          SK Real Estate boasts years of experience in the real estate industry, establishing itself as a trusted name with a proven track record of helping individuals and families find their dream homes.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          What services does SK Real Estate provide?
        </AccordionHeader>
        <AccordionBody>
          SK Real Estate is committed to providing a range of real estate services, including assistance with buying, selling, and investing in both residential and commercial properties.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What sets SK Real Estate apart from other real estate agencies?
        </AccordionHeader>
        <AccordionBody>
          SK Real Estate stands out with expert real estate agents possessing in-depth market knowledge. The agency is dedicated to exceeding customer expectations, ensuring a smooth and successful real estate experience.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(4)}>
          How does SK Real Estate assist buyers, sellers, and investors?
        </AccordionHeader>
        <AccordionBody>
          SK Real Estate provides personalized guidance for buyers, sellers, and investors, offering transparent and honest communication throughout the entire real estate process.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(5)}>
          What types of properties does SK Real Estate have in its listings?
        </AccordionHeader>
        <AccordionBody>
          SK Real Estate offers a wide range of residential and commercial property listings, providing clients with diverse options to meet their specific needs and preferences.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(6)}>
          How can I contact SK Real Estate for assistance?
        </AccordionHeader>
        <AccordionBody>
          For inquiries or assistance, you can reach out to SK Real Estate through their contact details provided on their website. The team is ready to address your real estate needs and queries.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(7)}>
          Does SK Real Estate prioritize transparent communication?
        </AccordionHeader>
        <AccordionBody>
          Yes, SK Real Estate is committed to transparent and honest communication throughout the real estate process, ensuring clients are well-informed and confident in their decisions.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(8)}>
          Can SK Real Estate help with real estate investment strategies?
        </AccordionHeader>
        <AccordionBody>
          Absolutely. SK Real Estate's experienced team can provide guidance and support for real estate investors, helping them make informed decisions and achieve their investment goals.
        </AccordionBody>
      </Accordion>
    </>
  );
}
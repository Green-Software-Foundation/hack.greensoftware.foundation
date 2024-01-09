import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from '@radix-ui/react-icons';


const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`border-b border-primary-dark ${className}`}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 ${className}`}
      {...props}
    >
      {children}
      {icon !== undefined ? (
        icon
      ) : (
        <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={`pb-4 pt-0 ${className}`}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const faqs = [
  {
    question: "What is CarbonHack?",
    answer:
      "CarbonHack is a global contest for developers who want to make a difference in the fight against climate change. It challenges participants to use the Impact Framework, a tool that allows measuring and calculating the environmental impact of software."
  },
  {
    question: "When and where is CarbonHack 2024?",
    answer:
      "CarbonHack 2024 will take place from 26th February to 15th March 2024. It is an online event, so you can join from anywhere in the world so long as the rules are followed."
  },
  {
    question: "What is the theme of CarbonHack 2024?",
    answer:
      "The theme of CarbonHack 2024 is measurement. We want to see how you can use the Impact Framework to measure the carbon emissions, water consumption, or any other environmental impact of software. You can also create models, manifest files, content, or contributions to the framework itself."
  },
  {
    question: "How can I participate in CarbonHack 2024?",
    answer:
      "To participate in CarbonHack 2024, you need to register on the CarbonHack website. You can form a team of up to 5 people. You can also use the matchmaking process to find new teammates. You will also need to install the Impact CLI and have access to the Impact Framework repository."
  },
  {
    question: "What are the prizes for CarbonHack 2024?",
    answer:
      "CarbonHack 2024 offers prizes in different categories, such as:\n\n- Beyond Carbon: for submissions that demonstrate the application of the Impact Framework beyond carbon, such as water, death, or any other environmental impact.\n\n- Best Manifest File: for submissions that show the complexity, flexibility, reusability, and uniqueness of the manifest file, which contains the input data, models, and configuration for the impact calculation.\n\n- Best Model: for submissions that create a new model or improve an existing one, that can be used for a broad set of use cases, support other models in the pipeline, and open the doors to new applications.\n\n- Best Contribution to the Framework: for submissions that contribute code to the Impact Framework repository, that meet or exceed the existing requirements, and that add value to the framework.\n\n- Best Content: for submissions that create content (such as blog posts, videos, podcasts, etc.) that explain, promote, or showcase the Impact Framework to a wide audience.\n\n- Best Undergraduate: for submissions from participants who are undergraduate students."
  },
  {
    question: "Can individuals take part in CarbonHack?",
    answer:
      "Absolutely! We usually recommend that folks work as part of teams which allows a range of different talents to be brought to the project, but there is no restriction on individual participation and indeed, individuals have won prizes in CarbonHack in the past."
  },
  {
    question: "Who are the judges for CarbonHack 2024?",
    answer:
      "Judges are drawn from the organizations sponsoring CarbonHack 2024, as well as key stakeholders from the Green Software Foundation. A full list will be published when the hack begins."
  },
  {
    question: "What are the rules and guidelines for CarbonHack 2024?",
    answer:
      "Full rules will be published in January 2024 and will be found at https://grnsft.org/hack/rules."
  },
  {
    question: "What do we want to emerge from the Hackathon?",
    answer:
      "Our vision for the Hackathon is to unleash the creative potential of developers who care about the planet and want to make a difference. We believe that software can be a powerful tool for reducing carbon emissions and promoting sustainability, and we want to celebrate the innovative solutions that you will create and share with the world. By participating in the Hackathon, you are not only demonstrating your skills and passion, but also inspiring others to join the Green Software movement and make an impact for the future."
  }
];

const FAQ = () => {
  return (
    <section id="faq">
      <div className="py-12 md:py-16 lg:py-10 text-center">
        <h1 className="text-2xl lg:text-3xl text-primary-lightest-2 font-black text-center">
          FAQs
        </h1>
        <p className="text-white mt-8">Click on the following link to view the FAQs for CarbonHack 2024
        </p>
        <a href="https://grnsft.org/hack/faq" target="_blank"
          rel="noopener noreferrer"
          className="no-underline mt-2 inline-block py-3 px-6 bg-secondary hover:bg-secondary-light text-primary-darkest text-sm font-bold rounded-md focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-darkest transition-all duration-300 ease-in-out">Read FAQs</a>
        {/* <div className="w-full max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-white font-bold  text-left text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base">
                  <p className="text-primary-lighter whitespace-break-spaces">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>))}
          </Accordion>
        </div> */}
      </div>
    </section>
  );
}

export default FAQ;

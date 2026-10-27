import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("ui-accordion", className)}
      {...props}
    />
  );
}
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("ui-accordion-item", className)}
      {...props}
    />
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="ui-accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("ui-accordion-trigger", className)}
        {...props}
      >
        {children}
        <span className="ui-accordion-icon" aria-hidden="true">
          +
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="ui-accordion-panel"
      {...props}
    >
      <div className={cn("ui-accordion-content", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

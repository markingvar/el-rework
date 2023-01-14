### Jan 13

### Form Requirements

1. Handle complicated forms (wizard, lists, dependent fields)
2. Browser side validation
3. Server side validation
4. Declarative and `simple` way to define forms

### Ideas

- zod and zod-to-json-schema to declare form sections
- domain functions to handle submitted form data
- zod schema follows over to client side (zod-to-json?)

#### What should schema declaration look like?

Say that we are trying to create a wizard form with three steps:

1. We want to get a client's name. If they are a commercial client, we want the company name. If they aren't, we just want their name.
2. We want to get the ways that they would like to be contacted, giving them multiple options of which they can choose any method that they like.
3. We want to provide a to-do list type interface where they can list their goals and a timeline for when they would like to complete them.

```tsx
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const step_one_schema = z
  .object({
    commercial_client: z.enum(["Yes", "No"]).describe({
      order: 1,
      field_label: "Are you a commercial client?",
      children: [["commercial_client_name"], ["client_name"]],
    }),
    client_name: z.string().min(2).describe({ nested_child: true }),
    commercial_client_name: z
      .string()
      .optional()
      .describe({ nested_child: true }),
  })
  .refine((val) => {
    if (val.commercial_client === "Yes") return !!val.commercial_client_name;
    if (val.commercial_client === "No") return !!val.client_name;
    return true;
  });
```

The above code includes conditional fields. Depending on whether the user indicates that they are a commercial user or not, they will be shown different text inputs to enter values into.

#### Challenge with conditional fields

If we want to do this without JS, we are going to need a checkbox nested high in the form hierarchy.

We will have to create a pseudo checkbox and add focus styles to it.

Otherwise we do this with JavaScript and accept the fact that some sites may break if JavaScript is disabled.

If we do this with JS, we won't have to worry about focus styles.

If we are doing this with JS, why don't we just use useState or something like that?

Or, do we treat this as a mini-form and use an action to handle the state update?




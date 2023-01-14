import type { ActionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { inputFromForm } from "domain-functions";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export async function action({ request }: ActionArgs) {
  console.log("Haro");
  const result = await inputFromForm(request);

  console.log({ result });
  return {};
}

export default function Index() {
  const step_one_schema = z
    .object({
      // @ts-expect-error - overloading describe to generate form schema
      commercial_client: z.enum(["Yes", "No"]).describe({
        order: 1,
        input_type: "stateful_radio",
        field_label: "Are you a commercial client?",
        children: [["commercial_client_name"], ["client_name"]],
      }),
      // @ts-expect-error - overloading describe to generate form schema
      client_name: z.string().min(2).describe({
        nested_child: true,
        input_type: "text",
        field_label: "Client name",
      }),
      commercial_client_name: z
        .string()
        .optional()
        // @ts-expect-error - overloading describe to generate form schema
        .describe({
          nested_child: true,
          input_type: "text",
          field_label: "Company name",
        }),
    })
    .refine((val) => {
      if (val.commercial_client === "Yes") return !!val.commercial_client_name;
      if (val.commercial_client === "No") return !!val.client_name;
      return true;
    });

  const jsonSchema = zodToJsonSchema(step_one_schema)?.properties;

  console.log({
    jsonSchema,
  });

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Electric Ladyland</h1>
      <form method="post">
        {Object.entries(jsonSchema).map(([fieldName, fieldValues], fieldIndex) => {
          console.log({ enum: fieldValues?.enum, fieldValues });
          if (fieldValues?.enum) {
            return (
              <StatefulRadio
                key={fieldName}
                fieldName={fieldName}
                fieldValues={fieldValues}
                jsonSchema={jsonSchema}
                fieldIndex={fieldIndex}
              />
            );
          }
          if (!jsonSchema[fieldName]?.description?.nested_child) {
            return <div key={fieldName}>{jsonSchema[fieldName]?.type}</div>;
          }
        })}
      </form>
    </main>
  );
}

function StatefulRadio({
  fieldName,
  fieldValues,
  jsonSchema,
  fieldIndex,
}: {
  fieldName: string;
  fieldValues: any;
  jsonSchema: any;
  fieldIndex: number;
}) {
  return (
    <div key={fieldName} className="flex">
      <>
        {fieldValues?.enum?.map((enumValue: string, index: number) => {
          return (
            <input
              className="sr-only"
              key={`${fieldName}-${enumValue}`}
              type="radio"
              name={`${fieldName}`}
              value={enumValue}
              id={`${fieldName}-${enumValue}`}
              data-sf-input={`${fieldIndex}-sfr-${index}`}
            />
          );
        })}
      </>
      <div>
        <div>{fieldValues?.description?.field_label}</div>
        {fieldValues?.enum.map((enumValue, index) => {
          return (
            <div key={`${fieldName}-${index}`}>
              <label data-sf-label={`${fieldIndex}-sfr-${index}`} htmlFor={`${fieldName}-${enumValue}`}>{enumValue}</label>
            </div>
          );
        })}
      </div>
      {fieldValues?.description?.children?.map((child, index) => {
        console.log({ child });
        if (child.length >= 1) {
          return (
            <div key={`${fieldName}-children-${index}`}>
              <fieldset data-sf-fieldset={`${fieldIndex}-sfr-${index}`}>
                {child.map((childKey, index) => {
                  let fieldSchema = jsonSchema[childKey];

                  if (fieldSchema?.description?.input_type === "text") {
                    return (
                      <label key={`${childKey}-${index}`} htmlFor={childKey}>
                        <div>{fieldSchema?.description?.field_label}</div>
                        <input type="text" name={childKey} id={childKey} />
                      </label>
                    );
                  }
                  return (
                    <pre>{JSON.stringify(jsonSchema[childKey], null, 2)}</pre>
                  );
                })}
              </fieldset>
            </div>
          );
        }
      })}
    </div>
  );
}

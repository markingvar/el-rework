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
      zommercial_client: z.enum(["Yes", "No"]).describe({
        order: 1,
        field_label: "Are you a commercial client?",
        children: [["commercial_client_name"], ["client_name"]],
      }),
      client_name: z.string().min(2).describe({ nested_child: true }),
      commercial_client_name: z
        .string()
        .optional()
        .describe({ nested_child: true }),
      regex: z
        .string()
        .regex(/^[a-z]+$/)
        .describe({ order: 2 }),
    })
    .refine((val) => {
      if (val.zommercial_client === "Yes") return !!val.commercial_client_name;
      return true;
    });

  type Test = z.infer<typeof step_one_schema>;

  const jsonSchema = zodToJsonSchema(step_one_schema)?.properties;

  console.log({
    jsonSchema,
    step_one_schema,
    regex: z.string().regex(/a/).describe({ order: 1 }),
  });

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Electric Ladyland</h1>
      <form method="post" action="/?index">
        {Object.entries(jsonSchema).map(([key, value], index) => {
          console.log({ enum: value?.enum, value });
          if (value?.enum) {
            return (
              <div key={key} className="flex">
                <div>{value?.description?.field_label}</div>
                {value.enum.map((enumValue, index) => {
                  return (
                    <div key={`${key}-${index}`}>
                      <input
                        type="radio"
                        name={key}
                        id={`${key}-${enumValue}`}
                        value={enumValue}
                      />
                      <label htmlFor={`${key}-${enumValue}`}>{enumValue}</label>
                    </div>
                  );
                })}
              </div>
            );
          }
          return <div key={index}>{jsonSchema[key]?.type}</div>;
        })}
      </form>
      <p>Remix form library</p>
      <section>
        <h2>Basic Forms</h2>
        <ul>
          <li>
            <Link to="/text-input">Text Input</Link>
          </li>
          <li>
            <Link to="/radio">Radio</Link>
          </li>
          <li>
            <Link to="/select">Select</Link>
          </li>
          <li>
            <Link to="/stateful-radio">Stateful Radio</Link>
          </li>
          <li>
            <Link to="/checkbox-group">Checkbox Group</Link>
          </li>
          <li>
            <Link to="/multi-item-list">Multi-item List</Link>
          </li>
        </ul>
      </section>
      <section>
        <h3>Multi-Step/Wizard Forms</h3>
        <ul>
          <li>
            <Link to="/multi-step-form">Multi-Step Form</Link>
          </li>
        </ul>
      </section>
      <section>
        <form>
          <input type="radio" name="testarosa" value="dags" id="dags" />

          <div>
            <label htmlFor="dags">Dags</label>
          </div>
          <div>
            <input type="radio" name="testarosa" value="cats" id="cats" />
            <label htmlFor="cats">Cats</label>
          </div>
        </form>
        <form method="post" action="/?index">
          <input name="numbers[]" defaultValue="1" />
          <input name="numbers[]" defaultValue="2" />
          <input name="person[0][email]" defaultValue="john@doe.com" />
          <input name="person[0][password]" defaultValue="1234" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

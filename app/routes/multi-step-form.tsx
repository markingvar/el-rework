import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { multiItemStepForm } from "~/forms/multi-item-form";
import {
  formActionFunction,
  formLoaderFunction,
  ElectricLadylandForm,
} from "el-rework";
import * as formUtilitiesFromRemixApp from "~/form-utils-from-remix.server";
import * as remixBrowserUtils from "~/forms/remix-browser-utils";

const metaTitle = "Multi-Step Form";
const metaDescription = "TODO - Fill in description";

export let meta: MetaFunction = () => {
  return {
    title: metaTitle,
    description: metaDescription,
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  const { formStructure, context, commitSession, session } =
    await formLoaderFunction({
      request,
      formBlueprint: multiItemStepForm,
      formUtilitiesFromRemixApp,
    });

  //   console.log({ formStructure, multiItemStepForm, context });

  return json(
    {
      formStructure,
      context,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  return formActionFunction({
    formBlueprint: multiItemStepForm,
    request: request,
    handleDataFn: () => {
      return [true, "Successfully submitted form"];
    },
    successRedirectPath: "/form-submission-success",
    formUtilitiesFromRemixApp,
  });
};

export default function MultiStepForm() {
  let data = useLoaderData();

  let context = data?.context;
  let formStructure = data?.formStructure;

  return (
    <>
      <div className="content-wrapper form-content-wrapper">
        <ElectricLadylandForm
          remixBrowserUtils={remixBrowserUtils}
          context={context}
          formStructure={formStructure}
        />
      </div>
    </>
  );
}

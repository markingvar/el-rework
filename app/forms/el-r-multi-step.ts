import { z } from "zod";

const step1 = [{
    name: "text-one",
    zod: z.string().optional().default("Harry Potter"),
}];

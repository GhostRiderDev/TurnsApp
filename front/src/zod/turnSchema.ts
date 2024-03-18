import { z } from "zod";

const turnSchema = z.object({
  date: z.string({ required_error: "Username is require" }).datetime(),
  startTime: z.string({ required_error: "Start Time is required" }),
  finishTime: z.string({ required_error: "Start Time is required" }),
});

export default turnSchema;

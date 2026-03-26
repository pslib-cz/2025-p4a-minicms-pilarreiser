import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const weedTypeOptions = ["Indica", "Sativa", "Hybrid"] as const;

export const weedLogInputSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(120),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters.")
    .max(140)
    .regex(slugPattern, "Use lowercase letters, numbers, and single hyphens only."),
  strain: z.string().trim().min(2, "Strain must be at least 2 characters.").max(80),
  type: z
    .string()
    .trim()
    .refine((value) => weedTypeOptions.includes(value as (typeof weedTypeOptions)[number]), {
      message: "Choose Indica, Sativa, or Hybrid.",
    }),
  rating: z.coerce.number().int().min(1, "Rating must be between 1 and 10.").max(10),
  content: z.string().trim().min(20, "Tell people a bit more about the experience."),
  tags: z.string().trim().max(240).default(""),
  imageUrl: z
    .string()
    .trim()
    .max(260)
    .refine((value) => !value || value.startsWith("/"), {
      message: "Image URL must be a local upload path.",
    })
    .default(""),
});

export const weedLogListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(24).default(12),
  query: z.string().trim().max(120).optional(),
  tag: z.string().trim().max(80).optional(),
  type: z.string().trim().max(40).optional(),
});

export type WeedLogInput = z.infer<typeof weedLogInputSchema>;
export type WeedLogListQuery = z.infer<typeof weedLogListQuerySchema>;

export function parseTagInput(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
    ),
  );
}

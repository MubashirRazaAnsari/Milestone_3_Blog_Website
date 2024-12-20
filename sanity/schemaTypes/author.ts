import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon as any,
  fields: [
    // Name field
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Full name of the author",
      validation: (Rule) => Rule.required().min(2).warning("Name should be at least 2 characters."),
    }),
    // Username field
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      description: "Unique username for the author",
      validation: (Rule) => Rule.required(),
    }),
    // Email field
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email address of the author",
      validation: (Rule) => Rule.required().email(),
    }),
    // Bio field
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      description: "Short biography of the author",
    }),
    // Author image field
    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "url",
      description: "Upload an image of the author",
    })
    ,
  ],
  preview: {
    select: {
      title: "name",
      media: "authorImage",
    },
  },
});

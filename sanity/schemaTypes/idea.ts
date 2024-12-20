import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const idea = defineType({
  name: "idea",
  title: "Idea",
  type: "document",
  
  fields: [
    
    defineField({
      name: "ideaTitle",
      title: "Idea Title",
      type: "string",
      description: "Title of the idea",
      validation: (Rule) => Rule.required().min(2).warning("Title should be at least 2 characters."),
    }),
    // Username field
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Unique slug for the idea",
      validation: (Rule) => Rule.required(),
    }),
    // Email field
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "Author of the idea",
      to: [{ type: "author" }],
    }),
    // Bio field
    defineField({
      name: "viewCount",
      title: "View Count",
      type: "number",
      description: "Number of views of the idea",
    }),
    // Author image field
    defineField({
      name: "ideaImage",
      title: "Idea Image",
      type: "image",
      description: "Upload an image of the idea",
      options: {
        hotspot: true, // Allows image cropping in the studio
      },
    }),
    defineField({
        name: "category",
        title: "Category",
        type: "string",
        description: "Category of the idea",
      })
    ,
    defineField({
        name: "description",
        title: "Description",
        type: "markdown",
        description: "Description of the idea",
      }),
  ],
});

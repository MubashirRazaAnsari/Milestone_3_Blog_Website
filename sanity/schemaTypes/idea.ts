import { defineField, defineType } from "sanity";

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
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "ideaTitle",
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-'),
      },
      description: "Unique slug for the idea",
      validation: (Rule) => Rule.required(),
    }),
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description of the idea",
    }),
      defineField({
        name: 'ideaImage',
        title: 'Idea Image',
        type: 'url', // Sanity image asset
        validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      }),
      
    defineField({
        name: "category",
        title: "Category",
        type: "string",
        validation: (Rule) => Rule.min(1).max(20).required().warning("Category should be at least 20 characters."),
        description: "Category of the idea",
      })
    ,
    defineField({
        name: "pitch",
        title: "Pitch",
        type: "markdown",
        description: "Pitch of the idea",
      }),
  ],
  preview: {
    select: {
      title: "ideaTitle",
      imageUrl: "ideaImage",
    },
  },
});

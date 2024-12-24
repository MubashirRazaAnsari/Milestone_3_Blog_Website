const comment = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'text',
        title: 'Comment Text',
        type: 'text',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'idea',
        title: 'Idea',
        type: 'reference',
        to: [{ type: 'idea' }],
        validation: (Rule: any) => Rule.required(),
      },
    ],
  };
  
  export default comment; 
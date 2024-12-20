import { defineQuery } from "next-sanity";

export const IdeasQuery = defineQuery(
  `*[_type == 'idea' && defined(slug.current) && !defined($search) || ideaTitle match $search || category match $search || author->name match $search]  | order(publishedAt desc)  {
    _id,
    _createdAt,
    ideaTitle,
    slug,
    author->{
        _id,
        name,
        authorImage,
        bio
    },
    description,
    ideaImage,
    category,
    pitch,
    viewCount
  }`
);


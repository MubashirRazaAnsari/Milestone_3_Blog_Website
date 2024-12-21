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
    viewCount
  }`
);

export const Ideas_by_id = defineQuery(`*[_type == "idea" && _id == $id][0]{
  _id,
  ideaTitle,
  slug,
  author->{
    _id,
    name,
    username,
    authorImage,
    bio
  },
  description,
  ideaImage,
  category,
  _createdAt,
  pitch,
  viewCount
  }`)


  export const StartViewCount = defineQuery(`*[_type == "idea" && _id == $id][0]{
    _id,
    viewCount
  }`)
    

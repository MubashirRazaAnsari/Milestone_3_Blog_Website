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

  export const AUTHOR_By_GitHUB_ID = defineQuery(`*[_type == "author" && _Id == $id][0]{
    _id,
    id,
    username,
    email,
    name,
    authorImage,
    bio
  }`)

  export const AUTHOR_By_Email = defineQuery(`*[_type == "author" && email == $email][0]{
    _id,
    id,
    username,
    email,
    name,
    authorImage,
    bio
  }`);

  export const AUTHOR_By_ID = defineQuery(`
    *[_type == "author" && _id == $id][0]{
      _id,
      name,
      username,
      email,
      authorImage,
      bio,
      "ideas": *[_type == "idea" && author._ref == ^._id]{
        _id,
        _createdAt,
        ideaTitle,
        description,
        category,
        ideaImage,
        viewCount,
        author->{
          _id,
          name,
          username,
          authorImage
        }
      }
    }
  `)


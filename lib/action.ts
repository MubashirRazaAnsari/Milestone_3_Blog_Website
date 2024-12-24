"use server";
import { auth } from "@/auth";
import { parseServerActiobResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";

export const createIdea = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if (!session)
    return parseServerActiobResponse({
      error: "Not Signed in, Please Sign in to post your Idea",
      status: "ERROR",
    });

 const { ideaTitle, description, category, ideaImage } = Object.fromEntries(
    Array.from(form).filter(([key])=> key !== 'pitch'),
 );

 const slug = slugify(ideaTitle as string, {lower: true, strict: true})

 try {

    const idea = {
        ideaTitle,
        description,
        category,
        ideaImage,
        slug: {
            _type: 'slug',
            current: slug,
        },
        author:{
            _type: 'reference',
            _ref: session?.user?.id,
        },
        pitch,
    };

    const result = await writeClient.create({_type : 'idea', ...idea })

    return parseServerActiobResponse({
        ...result,
        error: '',
        status: 'SUCCESS',
    })

 }
 catch (error){

    console.log(error);
     return parseServerActiobResponse({
        error: JSON.stringify(error),
        status: 'ERROR',
     })

 }
};

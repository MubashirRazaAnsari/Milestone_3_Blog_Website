import { client } from "@/sanity/lib/client";
import { Ideas_by_id } from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

import { marked } from "marked";
import { Skeleton } from "@/components/ui/skeleton";
import ViewCount from "@/components/ViewCount";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // console.log({ id });
  const idea = await client.fetch(Ideas_by_id, { id });

  if (!idea) return notFound();
  // const ideaImageUrl = urlFor(idea.ideaImage).url();
  // const authorImageUrl = urlFor(idea.author.authorImage).url();
  const formattedDate = idea._createdAt ? formatDate(idea._createdAt) : "N/A";

  const parsedContent = marked(idea?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formattedDate}</p>

        <h1 className="heading">{idea.ideaTitle}</h1>
        <p className="sub-heading !max-w-5xl">{idea.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={idea.ideaImage}
          alt={idea.ideaTitle}
          className="mx-auto !max-w-full max-h-[400px] lg:w-[80vw] md:w-[90vw] h-auto rounded-xl"
          width={900}
          height={500}
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${idea.author?._id}`}
              className="flex items-center mb-3 gap-2"
            >
              <Image
                src={idea.author.authorImage}
                alt={idea.author.name}
                className="drop-shadow-lg rounded-full"
                width={64}
                height={64}
              />
              <div>
                <p className="text-20-medium">{idea.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{idea.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{idea.category}</p>
          </div>
          <h3 className="text-30-bold font-work-sans mb-5">Idea Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: await parsedContent }}
            />
          ) : (
            <p className="no-result">No details available</p>
          )}
        </div>
        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <ViewCount id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

import IdeaCard, { IdeaCardType } from "@/components/IdeaCard";
import SeachForm from "../../components/SeachForm";
import { IdeasQuery } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {





  const query = (await searchParams).query;
  const params = {search: query || null}
  const session = await auth();


  console.log(session?.user?.id);

  const {data : ideas} = await sanityFetch({query: IdeasQuery, params});

  
  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Share your ideas, <br />
          find people like <span className="text-red-500">you</span>.
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your ideas and find people who share your interests.Vote on
          ideas and see what others think.
        </p>
        <SeachForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "All ideas"}
        </p>
        <ul className="mt-7 card_grid">
          {ideas.length > 0 ? (
            ideas.map((idea: IdeaCardType, index: number) => (

                <IdeaCard idea={idea} key={index} />
              
            ))
          ) : (
            <p className="text-center text-20-semibold">No ideas found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </div>
  );
}

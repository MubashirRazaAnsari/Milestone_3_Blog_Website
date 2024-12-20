import IdeaCard from "@/components/IdeaCard";
import SeachForm from "../../components/SeachForm";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const ideas = [
    {
      _createdAt: new Date().toISOString(),
      views:10,
      image: 'https://picsum.photos/200/300',
      id: 1,
      title: 'We Robots',
      description: 'This is a description of idea 1',
      category: 'Technology',
      
      author:{
        _id: '1',
        name: 'John Doe',
        authorImage: 'https://picsum.photos/48/48',
      }
    }
  ];
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
            ideas.map((idea) => (
                <IdeaCard idea={idea} key={idea.id} />
              
            ))
          ) : (
            <p className="text-center text-20-semibold">No ideas found</p>
          )}
        </ul>
      </section>
    </div>
  );
}

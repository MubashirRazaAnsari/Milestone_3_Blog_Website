import { formatDate } from "@/lib/utils";
import { EyeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Idea, Author } from "@/sanity.types";

export type IdeaCardType = Omit<Idea, "author"> & { author: Author };
const IdeaCard = ({ idea }: { idea: IdeaCardType }) => {
  const formattedDate = idea._createdAt ? formatDate(idea._createdAt) : "N/A";

  const {
    ideaImage,
    ideaTitle,
    description,
    category,
    author: { name, _id: authorId, authorImage },
    _id,
    viewCount,
    _createdAt,
  } = idea;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formattedDate}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-semibold">{viewCount || 0}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/idea/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{ideaTitle}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`} className="flex-center gap-2">
          {authorImage ? (
            <Image
              src={authorImage}
              width={48}
              height={48}
              alt={"User Image"}
              className="rounded-full"
            />
          ) : (
            <UserIcon className="size-12 text-primary" />
          )}
        </Link>
      </div>
      <Link href={`/idea/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        {ideaImage ? (
          <img
            src={ideaImage}
            alt={ideaTitle}
            className="startup-card_img"
          />
        ) : (
          <img
            src="https://picsum.photos/200/300"
            alt={ideaTitle}
            className="startup-card_img"
          />
        )}
      </Link>
      <div className="flex-between mt-5 gap-3">
        {category && (
          <Link
            href={`/?query=${category.toLowerCase()}`}
            className="flex-center gap-2"
          >
            <p className="text-16-medium">{category}</p>
          </Link>
        )}
        <Button className="startup-card_btn" asChild>
          <Link href={`/idea/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default IdeaCard;

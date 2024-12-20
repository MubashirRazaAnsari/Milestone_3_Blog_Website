import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface IdeaCardProps {
  idea: any;
}

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const formattedDate = idea._createdAt ? formatDate(idea._createdAt) : "N/A";
  const authorName = idea.author.name || "Unknown Author";

  const {
    image,
    title,
    description,
    category,
    author: { name, _id: authorId, authorImage },
    _id,
    views,
    _createdAt,
  } = idea;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formattedDate}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-semibold">{views || 0}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/startup/${authorId}`} className="flex-center gap-2">
          <Image
            src={authorImage}
            width={48}
            height={48}
            alt={authorName}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_description'>{description}</p>
        <img src={image} alt={title} className="startup-card_img" /> 
      </Link>
      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category.toLowerCase()}`} className="flex-center gap-2">
          <p className="text-16-medium">{category}</p>

        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default IdeaCard;

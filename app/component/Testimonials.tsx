import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Arjun Patel",
    username: "@arjun",
    body: "This is incredible. I'm really impressed.",
    img: "https://randomuser.me/api/portraits/men/1.jpg", // Male avatar
  },
  {
    name: "Priya Sharma",
    username: "@priya",
    body: "I'm speechless! Absolutely amazing.",
    img: "https://randomuser.me/api/portraits/women/1.jpg", // Female avatar
  },
  {
    name: "Ravi Kumar",
    username: "@ravi",
    body: "Beyond my expectations. Truly amazing.",
    img: "https://randomuser.me/api/portraits/men/2.jpg", // Male avatar
  },
  {
    name: "Ananya Iyer",
    username: "@ananya",
    body: "Really something special. I adore it.",
    img: "https://randomuser.me/api/portraits/women/2.jpg", // Female avatar
  },
  {
    name: "Karan Singh",
    username: "@karan",
    body: "Incredible! Truly amazed.",
    img: "https://randomuser.me/api/portraits/men/3.jpg", // Male avatar
  },
  {
    name: "Sneha Gupta",
    username: "@sneha",
    body: "Totally changed the game for me.",
    img: "https://randomuser.me/api/portraits/women/3.jpg", // Female avatar
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

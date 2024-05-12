import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map((lang) => (
        <Badge key={lang} className="w-fit">
          {lang}
        </Badge>
      ))}
    </div>
  );
}

export function splitTags(tags: string) {
  return tags
    .split(",")
    .map((lang) => lang.trim())
    .filter((lang) => lang !== "");
}

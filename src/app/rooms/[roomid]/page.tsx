import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { PairifyVideoPlayer } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomid: string } }) {
  const roomId = props.params.roomid;

  unstable_noStore();
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room found with this ID</div>;
  }

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-4 md:min-h-screen">
      <div className="col-span-4 mt-6 md:col-span-3 md:p-4 md:pr-2 md:mt-0">
        <div className="drop-shadow-lg bg-gray-100 dark:bg-gray-900 p-4 rounded-lg bg-card text-card-foreground shadow-sm">
          <PairifyVideoPlayer room={room} />
        </div>
      </div>

      <div className="col-span-4 md:col-span-1 md:p-4">
        <div className="drop-shadow-lg bg-gray-100 dark:bg-gray-900 rounded p-4 bg-card text-card-foreground shadow-sm flex flex-col gap-4">
          <h1 className="text-base font-bold">{room?.name}</h1>
          <p className="text-base text-gray-600 border border-gray-400 rounded-lg p-2">
            {room?.description}
          </p>

          <TagsList tags={splitTags(room.tags)} />

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-sm underline"
              target="_blank"
              rel="noopner noreferrer"
            >
              <GithubIcon />{" "}
              <span className="hover:scale-105 font-bold"> Github Project</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

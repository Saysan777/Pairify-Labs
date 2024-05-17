import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { PairifyVideoPlayer } from "./video-player";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomid: string } }) {
  const roomId = props.params.roomid;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room found with this ID</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="drop-shadow-lg bg-gray-100 dark:bg-gray-900 p-4 rounded-lg bg-card text-card-foreground shadow-sm">
          <PairifyVideoPlayer room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4">
        <div className="drop-shadow-lg bg-gray-100 dark:bg-gray-900 rounded p-4 bg-card text-card-foreground shadow-sm flex flex-col gap-4">
          <h1 className="text-base font-bold">{room?.name}</h1>
          <p className="text-base text-gray-600 border border-gray-400 rounded-xl p-4">
            {room?.description}
          </p>

          <TagsList tags={splitTags(room.tags)} />

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2"
              target="_blank"
              rel="noopner noreferrer"
            >
              <GithubIcon /> Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

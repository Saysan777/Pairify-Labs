import CreateRoomForm from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className=" flex flex-col gap-8 pt-12 pb-24 md:container md:mx-auto">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}

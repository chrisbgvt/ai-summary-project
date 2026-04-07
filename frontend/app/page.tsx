import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center lg:px-30">
      <h2 className="text-center">
        Stay Informed in 60 Seconds.
      </h2>
      <p className="mt-4 text-center">
        Your time is valuable. Our platform groups the world's leading stories by date and provides intelligent AI summaries so you can grasp the essence instantly. Filter by date, discover key connections, and take full control of your information flow.
      </p>
    </div>
  );
}

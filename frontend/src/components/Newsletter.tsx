import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-200">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Get the latest hardware news, exclusive deals, and build guides delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 flex-1"
            />
            <Button className="bg-zinc-200 text-zinc-900  hover:bg-zinc-800 hover:text-blue-500 px-8 button">
              Subscribe
            </Button>
          </div>
          
          <p className="text-zinc-400 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import StatCards from "../components/StatCards";

const About = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-700 mb-8">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
          Every day, perfectly usable items are thrown away: furniture,
          appliances, clothes, and more, while people and organizations nearby
          are looking for those exact things. We built this platform to close
          that gap in a way that feels good for everyone involved.
        </p>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto">
          This is a free donation marketplace where people can list items they
          no longer need, and individuals or nonprofits can browse and request
          them. No selling. No bidding. No pressure. Just a simple way to pass
          useful items along to someone who can truly use them.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <StatCards title="Items Donated" count={1245} />
        <StatCards title="Items Recieved" count={678} />
      </div>
    </section>
  );
};

export default About;

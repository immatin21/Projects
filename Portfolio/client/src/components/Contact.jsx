import React from "react";

const Contact = () => {
  const contacts = [
    {
      title: "Email",
      subtitle: "Send Email",
      src: "/src/Icons/gmail.svg",
      link: "mailto:mondalmatin04@gmail.com",
      text: "text-pink-400"
    },
    {
      title: "WhatsApp",
      subtitle: "Chat on WhatsApp",
      src: "/src/Icons/whatsapp.svg",
      link: "https://wa.me/916354085535",
      text: "text-green-400"
    },
    {
      title: "LinkedIn",
      subtitle: "Connect",
      src: "/src/Icons/linkedin.svg",
      link: "https://www.linkedin.com/in/matin-mondal-631575286",
      text: "text-blue-400"
    },

    {
      title: "Github",
      subtitle: "View Profile",
      src: "/src/Icons/github.svg",
      link: "https://github.com/yourusername",
      text: "text-gray-300"
    }
  ];

  return (
    <section
      id="contact"
      className="bg-black flex flex-col items-center justify-center px-6 py-20"
    >

      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-400">
          Contact Me
        </h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          Let’s connect and work together
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {contacts.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            onClick={item.onClick}
            className="group rounded-2xl bg-white/5 border border-white/10 p-6 h-44
                       flex flex-col items-center justify-center
                       transition-all duration-600
                       hover:-translate-y-4 hover:border-white/20
                       hover:bg-white/10"
          >

            <img
              className={`w-10 h-10 rounded-full flex items-center justify-center
                          
                          transition-transform duration-300
                          group-hover:scale-110`}
                          src={item.src}
            >
              
            </img>

            <h3 className="mt-5 text-white font-semibold text-lg">
              {item.title}
            </h3>
            <p className={`mt-1 text-sm ${item.text}`}>
              {item.subtitle}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;

"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// YouTube Player Component
function YouTubePlayer({ videoId, startTime = 5 }: { videoId: string; startTime?: number }) {
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    // ✅ capture current node for cleanup to avoid ref changing
    const node = containerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [isInView]);

  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const embedUrl = `https://www.youtube.com/embed/${getVideoId(videoId)}?autoplay=${isInView ? 1 : 0}&mute=1&start=${startTime}&controls=1&rel=0&modestbranding=1`;

  return (
    <div ref={containerRef} className="aspect-video w-full mb-2 rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

// Section Component
function Section({ id, title, children }: { id: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="bg-gray-50 scroll-mt-24 py-16 md:py-24">
      <div className="max-w-[90%] mx-auto">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-[#4B9CD3] inline-block pb-1"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-gray-50 text-black font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-[90%] mx-auto px-0">
          <div className="flex items-center justify-between h-14">
            <a href="#home" className="font-semibold text-[#4B9CD3]">Myles Scott</a>
            <div className="flex items-center gap-3 text-sm">
              <a href="#about" className="hover:underline hover:text-[#4B9CD3]">About</a>
              <a href="#skills" className="hover:underline hover:text-[#4B9CD3]">Skills</a>
              <a href="#projects" className="hover:underline hover:text-[#4B9CD3]">Projects</a>
              <a href="#contact" className="hover:underline hover:text-[#4B9CD3]">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Section id="home">
        <div className="pt-16 md:pt-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Hi, I&#39;m <span className="text-[#4B9CD3]">Myles</span>
            </motion.h1>
            <p className="text-gray-700">
              Third-year Computer Science major and <span className="text-[#4B9CD3]">Chancellor&#39;s Science Scholar</span> at UNC, combining a drive for innovation in tech with dedication as a Division I track athlete.
            </p>
            <div className="flex gap-3">
              <a
                href="#projects"
                className="rounded-full bg-[#4B9CD3] text-white px-5 py-2 text-sm hover:opacity-90 transition"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Profile picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="justify-self-center"
          >
            <img
              src="/RealHeadShot.png"
              alt="Profile"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover object-[center_0%] border-4 border-gray-200 shadow"
            />
          </motion.div>
        </div>
      </Section>

      {/* About Me */}
      <Section id="about" title="About Me">
        <p className="text-gray-700 leading-relaxed">
          I&#39;m a Computer Science student at UNC Chapel Hill and a Division I track athlete with a passion for building technology that makes a tangible impact. I&#39;ve worked on projects like an AI foul detection system for track &amp; field and BikeWatch UNC, a campus platform to track and prevent bike theft. Currently, I&#39;m an undergraduate researcher in the Society-Centered Artificial Intelligence Lab (SAIL), where I develop machine learning models with a focus on fairness and reproducibility, and build scalable FastAPI pipelines for data processing and deployment. Across my work, I enjoy tackling real-world problems, collaborating across disciplines, and turning ideas into practical solutions.
        </p>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-4 justify-center">
          {/* AI Foul Detector Project */}
          <motion.div
            key="AI Foul Detector"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border p-4 hover:shadow-md transition bg-white relative"
          >
            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-yellow-300 text-black text-xs font-bold px-2 py-1 rounded-full shadow"
              >
                Olympic-Level Interest
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
              >
                100k+ Views on @ThrowersUniverse
              </motion.div>
            </div>

            <YouTubePlayer videoId="LmHFdx8SZsU" startTime={5} />
            <div className="font-semibold text-[#4B9CD3] mt-2">AI Foul Detection System</div>
            <p className="text-gray-600 text-sm">
              Real-time foul detector for track and field events using a custom-trained YOLOV8 deep learning model.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/Myles94/AI-Foul-Detector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-[#4B9CD3]"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          {/* BikeWatch UNC Project */}
          <motion.div
            key="BikeWatch UNC"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border p-4 hover:shadow-md transition bg-white"
          >
            <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-gray-50">
              <img
                src="/bikewatch-screenshot.png.png"
                alt="Preview"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="font-semibold text-[#4B9CD3]">BikeWatch UNC (Coming Soon!)</div>
            <p className="text-gray-600 text-sm">Full stack web app for reporting stolen bikes and e-scooters on UNC&#39;s campus.</p>
            <div className="pt-2">
              <a
                href="https://github.com/Myles94/bikewatch-unc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-[#4B9CD3]"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4 hover:shadow-md transition bg-white">
            <div className="font-semibold text-[#4B9CD3]">Undergraduate Research Assistant</div>
            <p className="text-gray-600 text-sm">
              Collaborating on machine learning projects focusing on fairness, reproducibility, and applied AI research.
            </p>
          </div>
          <div className="rounded-2xl border p-4 hover:shadow-md transition bg-white">
            <div className="font-semibold text-[#4B9CD3]">Team Lead (HEALLY)</div>
            <p className="text-gray-600 text-sm">
              Helped lead a student-led AI for education startup, guiding development of an AI tutor now used by UNC students under mentorship from industry experts.
            </p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Python", "React", "scikit-learn", "FastAPI", "PyTorch", "TensorFlow", "OpenCV", "Java", "Git", "PostgreSQL"].map((s) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border bg-white p-3 text-center text-sm shadow-sm hover:shadow-md transition"
            >
              <div className="font-medium text-[#4B9CD3]">{s}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="flex flex-col gap-4 max-w-xl">
          {/* Email (readonly) */}
          <input
            type="text"
            value="mylesscott.unc@gmail.com"
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-default text-[#4B9CD3]"
          />

          {/* Social buttons */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/myles-scott-7545852a6"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#4B9CD3] text-white px-5 py-2 text-sm hover:opacity-90 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Myles94"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#4B9CD3] text-white px-5 py-2 text-sm hover:opacity-90 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}



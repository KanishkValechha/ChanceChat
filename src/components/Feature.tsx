import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shuffle,
  Coins,
  UserCircle,
  Shield,
  Vote,
  Share2,
  Bot,
  Code,
  Users,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const CustomButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
        hover:to-purple-600 text-white px-8 py-6 rounded-xl text-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 
                hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg 
                hover:shadow-blue-500/10"
    >
      <div
        className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    flex items-center justify-center mb-4"
      >
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Shuffle,
      title: "Random Discovery",
      description:
        "Experience serendipitous connections through our unique random content algorithm.",
    },
    {
      icon: Coins,
      title: "Token Rewards",
      description:
        "Earn tokens for creating engaging content and participating in community governance.",
    },
    {
      icon: Shield,
      title: "Decentralized Security",
      description:
        "Your data is secured through blockchain technology and decentralized storage.",
    },
    {
      icon: Vote,
      title: "Community Governance",
      description:
        "Participate in platform decisions through our on-chain voting system.",
    },
    {
      icon: Share2,
      title: "Cross-Chain Integration",
      description:
        "Seamlessly interact with multiple blockchain networks and communities.",
    },
    {
      icon: Bot,
      title: "AI-Enhanced Experience",
      description:
        "Smart content recommendations and automated content moderation.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience social media like never before with our innovative
            decentralized platform
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { value: "100%", label: "Decentralized" },
    { value: "24/7", label: "Support" },
    { value: "10+", label: "Blockchain Networks" },
  ];

  const team = [
    { name: "Alex Thompson", role: "Founder & CEO" },
    { name: "Sarah Chen", role: "Chief Technology Officer" },
    { name: "Michael Rodriguez", role: "Head of Product" },
    { name: "Emma Williams", role: "Community Lead" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Mission Statement */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            We're building the future of social connection through decentralized
            technology, empowering users with ownership, privacy, and genuine
            engagement.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold"
            >
              Why Choose DecentraSocial?
            </motion.h3>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mt-1">
                  <Code className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Open Source</h4>
                  <p className="text-slate-400">
                    Our platform is built on open-source technology, ensuring
                    transparency and community-driven development.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mt-1">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community First</h4>
                  <p className="text-slate-400">
                    Every feature and decision is made with our community's best
                    interests at heart.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700"
              >
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Export the components
export { Features, About };

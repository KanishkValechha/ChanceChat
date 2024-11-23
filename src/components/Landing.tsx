import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Spline from "@splinetool/react-spline";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { Features, About } from "./Feature";
import WalletAuth from "./Wallet";
import Contact from "./Contact";

// Define interfaces for component props
interface FloatingCardProps {
  children: ReactNode;
  className?: string;
}

interface StatsCardProps {
  value: string;
  label: string;
}


interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 
        border border-slate-700 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <div className="text-3xl font-bold text-blue-400">{value}</div>
      <div className="text-slate-400">{label}</div>
    </motion.div>
  );
};

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  onClick,
  variant = "default",
  ...props
}) => {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
        hover:to-purple-600 text-white px-8 py-6 rounded-xl text-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const LandingPage: React.FC = () => {
  const handleCreateAccount = () => {
    // Redirect to Martian Wallet's website
    window.open("https://www.martianwallet.xyz/", "_blank");
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">ChanceChat</div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a href="#about" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                Beta Launch 🚀
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Decentralized Social
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {" "}
                Experience
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="text-lg md:text-xl text-slate-300"
            >
              Discover a new way to connect, share, and earn. Our platform uses
              random algorithms to promote diverse interactions and genuine
              engagement.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="flex flex-col sm:flex-row gap-4"
            >
              <CustomButton onClick={handleCreateAccount}>
                Create Account
              </CustomButton>
              <WalletAuth />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <StatsCard value="0K+" label="Active Users" />
              <StatsCard value="00K+" label="Posts Created" />
              <StatsCard value="0M+" label="Tokens Earned" />
            </div>
          </div>

          {/* Right Column - 3D Robot */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="relative"
          >
            {/* Placeholder for Spline component */}
            <div className="aspect-square rounded-2xl bg-black relative overflow-hidden">
              <Spline scene="https://prod.spline.design/WDjdQipeb5cOS5MO/scene.splinecode" />
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full 
                filter blur-3xl transform translate-x-1/2 -translate-y-1/2"
              ></div>
              <div
                className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full 
                filter blur-3xl transform -translate-x-1/2 translate-y-1/2"
              ></div>

              {/* Placeholder text - Replace this div with your Spline component */}
              <div className="h-full flex items-center justify-center text-slate-400 text-center">
                <p>Replace this with your Spline Robot Component</p>
              </div>
            </div>

            {/* Floating cards */}
            <FloatingCard className="absolute -bottom-6 -left-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div>
                  <div className="text-sm font-medium">Random Discovery</div>
                  <div className="text-xs text-slate-400">
                    Find new connections
                  </div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="absolute -top-6 -right-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <div>
                  <div className="text-sm font-medium">Earn Tokens</div>
                  <div className="text-xs text-slate-400">
                    Reward engagement
                  </div>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </main>
      <section id="features">
        <Features />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default LandingPage;

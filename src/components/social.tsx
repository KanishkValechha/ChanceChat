import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  User,
  Home,
  BarChart3,
  Settings,
  Vote,
  Coins,
  Shuffle,
  TrendingUp,
} from "lucide-react";

// Type definitions
interface Author {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

interface PostStats {
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: number;
  author: Author;
  content: string;
  timestamp: string;
  stats: PostStats;
  tokens: number;
  tags: string[];
}

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  tokensEarned: number;
}

interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  stats: UserStats;
  reputation: number;
  topCategories: string[];
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
  endTime: string;
  category: string;
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Mock data with types
const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Alex Thompson",
      handle: "@alexthompson",
      avatar: "AT",
      verified: true,
    },
    content:
      "Just deployed my first smart contract on Aptos! The future of social media is decentralized. #Web3 #Blockchain",
    timestamp: "2h ago",
    stats: {
      upvotes: 1245,
      downvotes: 23,
      comments: 89,
      shares: 45,
    },
    tokens: 156,
    tags: ["Technology", "Blockchain", "Web3"],
  },
  {
    id: 2,
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "SC",
      verified: true,
    },
    content:
      "The random discovery algorithm just connected me with amazing crypto artists! Check out this NFT collection I found 🎨",
    timestamp: "4h ago",
    stats: {
      upvotes: 892,
      downvotes: 15,
      comments: 67,
      shares: 34,
    },
    tokens: 98,
    tags: ["Art", "NFT", "Crypto"],
  },
];

const mockUser: UserProfile = {
  name: "John Doe",
  handle: "@johndoe",
  avatar: "JD",
  stats: {
    posts: 156,
    followers: 2345,
    following: 1234,
    tokensEarned: 15678,
  },
  reputation: 92,
  topCategories: ["Technology", "Crypto", "Gaming"],
};

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: "Implement Token Burning Mechanism",
    description:
      "Proposal to implement a token burning mechanism to control inflation",
    status: "Active",
    votesFor: 15678,
    votesAgainst: 4532,
    endTime: "2 days left",
    category: "Tokenomics",
  },
  {
    id: 2,
    title: "Modify Content Discovery Algorithm",
    description:
      "Update the random discovery algorithm to include user preferences",
    status: "Active",
    votesFor: 12456,
    votesAgainst: 3421,
    endTime: "4 days left",
    category: "Platform",
  },
];

// Component Props interfaces
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface PostComponentProps {
  post: Post;
}

// Components
const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
  <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-4 fixed left-0">
    <div className="flex items-center gap-2 mb-8">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <h1 className="text-xl font-bold text-white">ChanceChat</h1>
    </div>

    <nav className="space-y-2">
      {[
        { icon: Home, label: "Home", id: "home" },
        { icon: User, label: "Profile", id: "profile" },
        { icon: Vote, label: "Governance", id: "governance" },
        { icon: Settings, label: "Settings", id: "settings" },
      ].map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors
                    ${
                      activeTab === id
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-slate-400 hover:bg-slate-800"
                    }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </button>
      ))}
    </nav>
  </div>
);

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
        hover:to-purple-600 text-white px-8 py-6 rounded-xl text-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Post: React.FC<PostComponentProps> = ({ post }) => {
  const [votes, setVotes] = useState({
    up: post.stats.upvotes,
    down: post.stats.downvotes,
  });
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (type === userVote) {
      setVotes((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
      setUserVote(null);
    } else {
      setVotes((prev) => ({
        up: userVote === "down" ? prev.up + 1 : prev.up,
        down: userVote === "up" ? prev.down + 1 : prev.down,
        [type]: prev[type] + 1,
      }));
      setUserVote(type);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                      flex items-center justify-center font-semibold"
        >
          {post.author.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author.name}</span>
            {post.author.verified && (
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </div>
          <div className="text-sm text-slate-400">{post.author.handle}</div>
        </div>
        <div className="text-sm text-slate-400 ml-auto">{post.timestamp}</div>
      </div>

      <p className="mb-4">{post.content}</p>

      <div className="flex gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => handleVote("up")}
          className={`flex items-center gap-2 transition-colors ${
            userVote === "up"
              ? "text-blue-400"
              : "text-slate-400 hover:text-blue-400"
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          {votes.up}
        </button>
        <button
          onClick={() => handleVote("down")}
          className={`flex items-center gap-2 transition-colors ${
            userVote === "down"
              ? "text-red-400"
              : "text-slate-400 hover:text-red-400"
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          {votes.down}
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
          <MessageCircle className="w-5 h-5" />
          {post.stats.comments}
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
          <Share2 className="w-5 h-5" />
          {post.stats.shares}
        </button>
        <div className="ml-auto flex items-center gap-2 text-blue-400">
          <Coins className="w-5 h-5" />
          {post.tokens} tokens
        </div>
      </div>
    </motion.div>
  );
};

const HomeFeed: React.FC = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="space-y-6"
  >
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold">Home Feed</h2>
      <CustomButton className="flex items-center gap-2">
        <Shuffle className="w-4 h-4" />
        Shuffle Feed
      </CustomButton>
    </div>
    {mockPosts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </motion.div>
);

// Additional interfaces
interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  colorClass: string;
}

// Components
const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  colorClass,
}) => (
  <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="font-semibold">{title}</div>
    </div>
    <div className="text-3xl font-bold text-blue-400 mb-1">{value}</div>
    <div className="text-sm text-slate-400">{subtitle}</div>
  </div>
);

const ProfilePage: React.FC = () => (
  <div className="space-y-8">
    {/* Profile Header */}
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700">
      <div className="flex items-center gap-6">
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                      flex items-center justify-center text-2xl font-bold"
        >
          {mockUser.avatar}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-1">{mockUser.name}</h2>
          <p className="text-slate-400 mb-4">{mockUser.handle}</p>
          <div className="flex gap-6">
            <div>
              <div className="text-xl font-bold">{mockUser.stats.posts}</div>
              <div className="text-sm text-slate-400">Posts</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {mockUser.stats.followers}
              </div>
              <div className="text-sm text-slate-400">Followers</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {mockUser.stats.following}
              </div>
              <div className="text-sm text-slate-400">Following</div>
            </div>
          </div>
        </div>
        <div className="ml-auto text-center">
          <div className="text-3xl font-bold text-blue-400">
            {mockUser.stats.tokensEarned}
          </div>
          <div className="text-sm text-slate-400">Tokens Earned</div>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-3 gap-6">
      <StatsCard
        icon={BarChart3}
        title="Engagement Rate"
        value="92%"
        subtitle="Above average"
        colorClass="bg-blue-500/20"
      />
      <StatsCard
        icon={TrendingUp}
        title="Growth Rate"
        value="+47%"
        subtitle="This month"
        colorClass="bg-purple-500/20"
      />
      <StatsCard
        icon={Vote}
        title="Reputation Score"
        value={mockUser.reputation.toString()}
        subtitle="Excellent"
        colorClass="bg-blue-500/20"
      />
    </div>

    {/* Top Categories */}
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4">Top Categories</h3>
      <div className="flex gap-3">
        {mockUser.topCategories.map((category) => (
          <div
            key={category}
            className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GovernanceDashboard: React.FC = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Governance Dashboard</h2>
      <CustomButton className="bg-blue-500 hover:bg-blue-600">
        Create Proposal
      </CustomButton>
    </div>

    <div className="grid gap-6">
      {mockProposals.map((proposal) => (
        <div
          key={proposal.id}
          className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
              {proposal.category}
            </div>
            <div className="text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-400">
              {proposal.status}
            </div>
            <div className="text-sm text-slate-400 ml-auto">
              {proposal.endTime}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
          <p className="text-slate-400 mb-6">{proposal.description}</p>

          <div className="space-y-4">
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${
                    (proposal.votesFor /
                      (proposal.votesFor + proposal.votesAgainst)) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <div className="text-blue-400">{proposal.votesFor} Votes For</div>
              <div className="text-red-400">
                {proposal.votesAgainst} Votes Against
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 p-8 w-full bg-slate-900 min-h-screen text-white">
        {activeTab === "home" && <HomeFeed />}
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "governance" && <GovernanceDashboard />}
      </main>
    </div>
  );
};

export default Social;
import { useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import {  useEffect } from "react";
import { motion } from "framer-motion";
import ProfileSetup from "./Profile";
import { useNavigate } from "react-router-dom";
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
  {
    id: 3,
    author: {
      name: "Michael Johnson",
      handle: "@mjohnson",
      avatar: "MJ",
      verified: false,
    },
    content:
      "Just finished a deep dive into AI art generation. The possibilities are endless! #AI #Art #Technology",
    timestamp: "6h ago",
    stats: {
      upvotes: 543,
      downvotes: 12,
      comments: 45,
      shares: 21,
    },
    tokens: 78,
    tags: ["AI", "Art", "Technology"],
  },
  {
    id: 4,
    author: {
      name: "Emily Davis",
      handle: "@emdavis",
      avatar: "ED",
      verified: true,
    },
    content:
      "Excited to share my latest VR experience. It's like stepping into a whole new world! #VR #Metaverse #Gaming",
    timestamp: "8h ago",
    stats: {
      upvotes: 912,
      downvotes: 18,
      comments: 72,
      shares: 38,
    },
    tokens: 112,
    tags: ["VR", "Metaverse", "Gaming"],
  },
  {
    id: 5,
    author: {
      name: "David Lee",
      handle: "@davidlee",
      avatar: "DL",
      verified: false,
    },
    content:
      "Just discovered a new DeFi protocol with amazing yields. #DeFi #Crypto #Finance",
    timestamp: "10h ago",
    stats: {
      upvotes: 678,
      downvotes: 14,
      comments: 56,
      shares: 28,
    },
    tokens: 89,
    tags: ["DeFi", "Crypto", "Finance"],
  },
  {
    id: 6,
    author: {
      name: "Sophia Kim",
      handle: "@sophiakim",
      avatar: "SK",
      verified: true,
    },
    content:
      "Can't believe how fast blockchain technology is evolving. The future is bright! #Blockchain #Web3 #Technology",
    timestamp: "12h ago",
    stats: {
      upvotes: 1023,
      downvotes: 21,
      comments: 84,
      shares: 42,
    },
    tokens: 125,
    tags: ["Blockchain", "Web3", "Technology"],
  },
  {
    id: 7,
    author: {
      name: "Ethan Brown",
      handle: "@ethanbrown",
      avatar: "EB",
      verified: false,
    },
    content:
      "Just built my first AR app. It's mind-blowing how immersive it is! #AR #XR #Technology",
    timestamp: "14h ago",
    stats: {
      upvotes: 432,
      downvotes: 9,
      comments: 34,
      shares: 17,
    },
    tokens: 65,
    tags: ["AR", "XR", "Technology"],
  },
  {
    id: 8,
    author: {
      name: "Ava Lee",
      handle: "@avalee",
      avatar: "AL",
      verified: true,
    },
    content:
      "Excited to be part of the Web3 revolution. The future of the internet is decentralized. #Web3 #Blockchain #Crypto",
    timestamp: "16h ago",
    stats: {
      upvotes: 789,
      downvotes: 16,
      comments: 63,
      shares: 31,
    },
    tokens: 97,
    tags: ["Web3", "Blockchain", "Crypto"],
  },
  {
    id: 9,
    author: {
      name: "Noah Mitchell",
      handle: "@noahmitchell",
      avatar: "NM",
      verified: false,
    },
    content:
      "Just discovered a new crypto trading strategy. Let's see how it performs! #Crypto #Trading #Finance",
    timestamp: "18h ago",
    stats: {
      upvotes: 395,
      downvotes: 8,
      comments: 31,
      shares: 15,
    },
    tokens: 58,
    tags: ["Crypto", "Trading", "Finance"],
  },
  {
    id: 10,
    author: {
      name: "Zoe Chen",
      handle: "@zoechen",
      avatar: "ZC",
      verified: true,
    },
    content:
      "Can't wait for the next-gen gaming consoles to launch. The graphics are insane! #Gaming #Technology #Entertainment",
    timestamp: "20h ago",
    stats: {
      upvotes: 821,
      downvotes: 17,
      comments: 68,
      shares: 34,
    },
    tokens: 103,
    tags: ["Gaming", "Technology", "Entertainment"],
  },
];


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



interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (
    newPost: Omit<Post, "id" | "author" | "timestamp" | "stats">
  ) => void;
}

interface ModalOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPost,
}) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [tokens] = useState(0); // In a real app, this would be calculated based on content

  const handleSubmit = () => {
    if (!content.trim()) return;

    onPost({
      content,
      tags,
      tokens,
    });

    // Reset form
    setContent("");
    setTags([]);
    setNewTag("");
    onClose();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-slate-800 rounded-xl p-6 w-[500px] max-w-[90vw] text-white border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 bg-slate-700 rounded-lg p-3 text-white placeholder:text-slate-400 resize-none"
          />

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="text-slate-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add tag"
              className="flex-1 bg-slate-700 rounded-lg p-2 text-white placeholder:text-slate-400"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

interface HomeFeedProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  userProfile: UserProfile | null;
  onCreatePost: (
    post: Omit<Post, "id" | "author" | "timestamp" | "stats">
  ) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({
  setPosts,
  userProfile,
  onCreatePost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Initialize posts with either user posts or mock posts
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setDisplayPosts(parsedPosts);
       setDisplayPosts(mockPosts);
      localStorage.setItem("posts", JSON.stringify(mockPosts));
      setPosts(mockPosts);
    } else {
      setDisplayPosts(mockPosts);
      localStorage.setItem("posts", JSON.stringify(mockPosts));
      setPosts(mockPosts);
    }
  }, [setPosts]);

  const handleShuffle = () => {
    const shuffledPosts = [...displayPosts].sort(() => Math.random() - 0.5);
    setDisplayPosts(shuffledPosts);
    setPosts(shuffledPosts);
    localStorage.setItem("posts", JSON.stringify(shuffledPosts));
  };

  const handleCreatePost = (
    newPost: Omit<Post, "id" | "author" | "timestamp" | "stats">
  ) => {
    if (!userProfile) {
      console.error("No user profile found");
      return;
    }
    onCreatePost(newPost);

    // Update display posts
    const post: Post = {
      id: Date.now(),
      author: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        verified: true,
      },
      content: newPost.content,
      timestamp: "Just now",
      stats: {
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
      },
      tokens: newPost.tokens,
      tags: newPost.tags,
    };

    const updatedPosts = [post, ...displayPosts];
    setDisplayPosts(updatedPosts);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to ChanceChat</h2>
          <p className="text-slate-400 mb-6">
            Please complete your profile to start posting
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Home Feed</h2>
        <div className="flex gap-4">
          <CustomButton
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle Feed
          </CustomButton>
          <CustomButton
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Create Post
          </CustomButton>
        </div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handleCreatePost}
      />

      <div className="space-y-6">
        {displayPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {displayPosts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-slate-400">No posts yet. Be the first to post!</p>
        </div>
      )}
    </motion.div>
  );
};

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

interface ProfilePageProps {
  profile: UserProfile;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile }) => (
  <div className="space-y-8">
    {/* Profile Header */}
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700">
      <div className="flex items-center gap-6">
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                      flex items-center justify-center text-2xl font-bold"
        >
          {profile.avatar}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
          <p className="text-slate-400 mb-4">{profile.handle}</p>
          <div className="flex gap-6">
            <div>
              <div className="text-xl font-bold">{profile.stats.posts}</div>
              <div className="text-sm text-slate-400">Posts</div>
            </div>
            <div>
              <div className="text-xl font-bold">{profile.stats.followers}</div>
              <div className="text-sm text-slate-400">Followers</div>
            </div>
            <div>
              <div className="text-xl font-bold">{profile.stats.following}</div>
              <div className="text-sm text-slate-400">Following</div>
            </div>
          </div>
        </div>
        <div className="ml-auto text-center">
          <div className="text-3xl font-bold text-blue-400">
            {profile.stats.tokensEarned}
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
        value={profile.reputation.toString()}
        subtitle="Excellent"
        colorClass="bg-blue-500/20"
      />
    </div>

    {/* Top Categories */}
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4">Top Categories</h3>
      <div className="flex gap-3">
        {profile.topCategories.map((category) => (
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  useEffect(() => {
    // Check if user is logged in (you'll need to implement this based on your wallet auth)
    const walletConnected = localStorage.getItem("walletConnected");
    if (!walletConnected) {
      navigate("/auth");
      return;
    }

    // Check for existing profile
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setIsFirstLogin(false);

      // Load saved posts
      const savedPosts = localStorage.getItem("posts");
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    }
  }, [navigate]);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsFirstLogin(false);
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const handleCreatePost = (
    newPost: Omit<Post, "id" | "author" | "timestamp" | "stats">
  ) => {
    if (!userProfile) return;

    const post: Post = {
      id: Date.now(),
      author: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        verified: true,
      },
      content: newPost.content,
      timestamp: "Just now",
      stats: {
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
      },
      tokens: newPost.tokens,
      tags: newPost.tags,
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  if (isFirstLogin) {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 p-8 w-full bg-slate-900 min-h-screen text-white">
        {activeTab === "home" && (
          <HomeFeed
            posts={posts}
            setPosts={setPosts}
            userProfile={userProfile}
            onCreatePost={handleCreatePost}
          />
        )}
        {activeTab === "profile" && userProfile && (
          <ProfilePage profile={userProfile} />
        )}
        {activeTab === "governance" && <GovernanceDashboard />}
      </main>
    </div>
  );
};

export default Social;
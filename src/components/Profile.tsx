import React, { useState } from "react";

interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    tokensEarned: number;
  };
  reputation: number;
  topCategories: string[];
}

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    categories: [] as string[],
  });
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
      setNewCategory("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProfile: UserProfile = {
      name: formData.name,
      handle: formData.handle,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      stats: {
        posts: 0,
        followers: 0,
        following: 0,
        tokensEarned: 0,
      },
      reputation: 0,
      topCategories: formData.categories,
    };

    onComplete(newProfile);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full bg-slate-700 rounded-lg p-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Handle</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400">@</span>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, handle: e.target.value }))
                }
                className="w-full bg-slate-700 rounded-lg p-3 pl-8 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Interest Categories</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 bg-slate-700 rounded-lg p-3 text-white"
                placeholder="Add a category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-2"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        categories: prev.categories.filter(
                          (c) => c !== category
                        ),
                      }))
                    }
                    className="text-slate-400 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-lg"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;

import { motion } from "framer-motion";

const Blog = () => {
  const posts = [
    { id: 1, title: "🚀 Mastering React Router", content: "Navigate your app like a pro with React Router!" },
    { id: 2, title: "🎨 Tailwind CSS Magic", content: "Build stunning UIs effortlessly with Tailwind." },
    { id: 3, title: "⚡ Boosting React Performance", content: "Optimize your React apps for lightning speed!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white p-8">
      <motion.h2 
        className="text-4xl font-extrabold text-center mb-8 text-pink-500 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✨ Fancy Blog ✨
      </motion.h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <motion.div 
            key={post.id} 
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-pink-500 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: post.id * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-pink-400">{post.title}</h3>
            <p className="text-gray-300 mt-2">{post.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

import { motion } from "framer-motion";
import { Hand, Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSignup = () => {
    navigate("/verify-email");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md px-2 w-full backdrop-blur-2xl rounded-none sm:rounded-2xl shadow-xl 
			overflow-hidden border border-green-900 bg-zinc-700/50"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        <SplitText text="Create Account" className="text-green-500 font-mono" />
      </h2>
      <form onSubmit={HandleSignup}>
        <Input
          icon={User}
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={Mail}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrengthMeter password={password}/>
        <div className="flex items-center justify-center">
          <motion.button
            className="mt-5 w-1/2 py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-black font-mono
						font-bold rounded-lg border border-green-600 shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </div>
      </form>

      <div className="px-8 py-4 mx-[-1rem] mt-10 bg-gray-900 bg-opacity-50 flex justify-center ">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default HomePage;

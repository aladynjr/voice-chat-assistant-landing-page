import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Mic, Chrome, Github, Volume2, Pause, Play, StopCircle } from "lucide-react"
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const Logo = ({ size, color, accent }: { size: number; color: string; accent: string }) => (
  <div 
    className="relative flex items-center justify-center overflow-hidden rounded-lg"
    style={{ 
      width: size, 
      height: size, 
      backgroundColor: color,
    }}
  >
    <Mic size={size * 0.6} color={accent} strokeWidth={2} />
    <div 
      className="absolute top-2 right-2 w-4 h-4 rounded-full"
      style={{ backgroundColor: accent, opacity: 0.5 }}
    />
    <div 
      className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
      style={{ backgroundColor: accent, opacity: 0.3 }}
    />
  </div>
)

export default function TeslaInspiredVoiceChatAssistantLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        hideControls: false,
        captions: { active: false, language: 'auto', update: false },
        youtube: { 
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          cc_load_policy: 0  // Disable captions
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const features = [
    { icon: Mic, title: "Voice Input", description: "Speak your messages naturally" },
    { icon: Volume2, title: "Text-to-Speech", description: "Hear AI responses in near real-time" },
    { icon: Play, title: "Streaming Responses", description: "Experience real-time conversation flow" },
    { icon: Pause, title: "Audio Controls", description: "Play, pause, and stop audio playback" },
    { icon: StopCircle, title: "'Over' Command", description: "Say 'over' to send your message" },
    { icon: Chrome, title: "Easy Integration", description: "Works directly on chat.openai.com" }
  ]

  const faqs = [
    {
      question: "What's the quickest way to start talking to ChatGPT?",
      answer: (
        <ol className="list-decimal list-inside space-y-2 pl-1">
          <li>Install the extension from the Chrome Web Store</li>
          <li>Get an ElevenLabs API key (free tier available)</li>
          <li>Visit chat.openai.com and click 'Activate Voice Chat'</li>
          <li>Start speaking and say 'over' to send</li>
          <li>Listen to ChatGPT's voice response</li>
        </ol>
      )
    },
    {
      question: "Is this available on other browsers besides Chrome?",
      answer: "Currently, Voice Chat Assistant is exclusively available for Chrome. You can install it directly from the Chrome Web Store, or if you're a developer, load it as an unpacked extension in developer mode from our GitHub repository."
    },
    {
      question: "Do I need to pay anything to use this?",
      answer: "The extension itself is free! You'll just need an ElevenLabs API key for the voice features. They offer a free tier with 10,000 characters per month at elevenlabs.io - perfect for trying it out."
    },
    {
      question: "Can I customize the AI's voice?",
      answer: "Yes! You can choose from several high-quality voices through the ElevenLabs integration. Simply click the extension icon and select your preferred voice from the settings menu."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/apple-touch-icon.png" 
              alt="Voice Chat Assistant Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-lg tracking-wider">VOICE CHAT ASSISTANT</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <section className="text-center mb-32 pt-16">
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-[#22D3EE] rounded-full blur-3xl opacity-10 animate-pulse"></div>
            <Logo size={96} color="#1E293B" accent="#22D3EE" />
          </div>
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Voice Chat Assistant for ChatGPT</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Add voice interaction to ChatGPT web. Speak with AI using your voice, right in your browser.
          </p>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <a 
                href="https://voicechatassistant.web.app"
                className="bg-[#22D3EE] text-black font-bold py-6 px-12 rounded-full text-lg inline-flex items-center"
              >
                <Chrome className="w-6 h-6 mr-2" />
                <span>Add to Chrome</span>
              </a>
              <a 
                href="https://github.com/aladynjr/chatbot-voice-chat-assistant" 
                className="flex items-center text-white py-6 px-4"
              >
                <Github className="w-6 h-6 mr-2" />
                <span>View on GitHub</span>
              </a>
            </div>
            <a 
              href="https://twitter.com/aladdinnjr" 
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              Have questions or need help? Contact developer
            </a>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-center">See It in Action</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
            <div 
              ref={videoRef} 
              className="plyr__video-embed"
            >
              <iframe
                src="https://www.youtube.com/embed/5eZ-4FyEJm4?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&amp;cc_load_policy=0"
                allowFullScreen
                allow="autoplay"
              ></iframe>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-400">
            Watch how Voice Chat Assistant seamlessly integrates with ChatGPT.
          </p>
        </section>

        {/* Feature Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black border border-gray-800 hover:bg-gray-900 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="w-12 h-12 text-[#22D3EE] mb-4" />
                  <h3 className="text-white text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-black border border-gray-800">
                <CardContent className="p-0">
                  <Button
                    className="w-full text-left p-6 flex justify-between items-center bg-transparent hover:bg-gray-900 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-bold text-white">{faq.question}</span>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </Button>
                  {openFaq === index && (
                    <div className="p-6 text-gray-300 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Voice Chat Assistant. All rights reserved.</p>
        <a 
          href="/privacy-policy.html"
          className="mt-2 inline-block hover:text-gray-300"
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  )
}
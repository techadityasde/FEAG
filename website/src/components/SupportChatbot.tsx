"use client";

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { Send, X } from "lucide-react";

type Topic = {
  label: string;
  icon: string;
  prompts: string[];
  answer: string;
  keywords: string[];
  href: string;
};

type ChatMessage = {
  from: "bot" | "user";
  text: string;
  href?: string;
};

const topics: Topic[] = [
  {
    label: "Account & Registration",
    icon: "👤",
    prompts: ["How do I create an account?"],
    answer:
      "Create an account with your email or phone number, then verify it to get started. To reset a password, select “Forgot password” on the Sign-In screen and follow the secure reset link.",
    keywords: ["account", "register", "sign up", "password", "login"],
    href: "/login",
  },
  {
    label: "Booking",
    icon: "📅",
    prompts: ["How do I book a creator?"],
    answer:
      "Pick a creator and package, select your event details, then continue to checkout. You can review the creator’s profile and available booking options before confirming.",
    keywords: ["book", "booking", "contact", "availability"],
    href: "/discover",
  },
  {
    label: "Cancellation & Refunds",
    icon: "❌",
    prompts: ["Can I cancel my booking?", "When will I receive my refund?"],
    answer:
      "Cancellation and refund eligibility depend on the booking terms and timing. Open your booking to review the applicable policy and request help if you need it.",
    keywords: ["cancel", "cancellation", "refund"],
    href: "/cancellation-and-refund-policy",
  },
  {
    label: "Payments & Transactions",
    icon: "💳",
    prompts: ["How do I view my payments?"],
    answer:
      "You can review your completed payments and transaction history from your account.",
    keywords: ["payment", "payments", "transaction", "transactions", "charged"],
    href: "/transactions",
  },
  {
    label: "Support",
    icon: "🆘",
    prompts: ["I have a problem with my booking.", "How do I contact support?"],
    answer:
      "We’re here to help. Please share your booking concern with as much detail as possible, and the support team can guide you to the right next step.",
    keywords: ["support", "problem", "help", "issue"],
    href: "/contact",
  },
];

const questionResponses: Record<string, { answer: string; href: string }> = {
  "How do I create an account?": {
    answer:
      "Go to the sign-in page and continue with your mobile number or Google account. If you are new to FEAG, you will be guided through registration.",
    href: "/login",
  },
  "How do I book a creator?": {
    answer:
      "Browse creators, open the profile that suits your event, choose a service or package, then submit your booking details.",
    href: "/discover",
  },
  "Can I cancel my booking?": {
    answer:
      "Yes. Open your orders to find the booking and request cancellation. The amount refunded depends on how close the cancellation is to the scheduled service.",
    href: "/orders",
  },
  "When will I receive my refund?": {
    answer:
      "Once approved, refunds are returned to the original payment method. Processing may take 7–14 working business days, depending on your payment provider or bank.",
    href: "/cancellation-and-refund-policy",
  },
  "How do I view my payments?": {
    answer:
      "Your completed payments and transaction history are available from your account transactions page.",
    href: "/transactions",
  },
  "I have a problem with my booking.": {
    answer:
      "Please send FEAG Support the booking details and a short description of the problem so the team can help you with the next step.",
    href: "/contact",
  },
  "How do I contact support?": {
    answer:
      "You can reach FEAG Support through the contact form. Include your booking details so the team can assist you faster.",
    href: "/contact",
  },
};

export default function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isPortalReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const latestReplyRef = useRef<HTMLDivElement>(null);
  const replyTimeoutRef = useRef<number | null>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current !== null) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const closeChat = () => {
    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }

    setIsTyping(false);
    setInput("");
    setMessages([]);
    setOpen(false);
  };

  const getPageUrl = (path: string) => {
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (typeof window === "undefined") {
      return configuredSiteUrl
        ? new URL(path, configuredSiteUrl).toString()
        : path;
    }

    const isLocalDevelopment = ["localhost", "127.0.0.1"].includes(
      window.location.hostname,
    );
    const baseUrl = isLocalDevelopment
      ? window.location.origin
      : configuredSiteUrl || window.location.origin;

    return new URL(path, baseUrl).toString();
  };

  useEffect(() => {
    if (!open) return;

    const handleOutsideTap = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !chatbotRef.current?.contains(event.target)
      ) {
        closeChat();
      }
    };

    document.addEventListener("pointerdown", handleOutsideTap);
    return () => document.removeEventListener("pointerdown", handleOutsideTap);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const isOutsideChatbot = (event: Event) =>
      event.target instanceof Node &&
      !chatbotRef.current?.contains(event.target);

    const preventPageScroll = (event: Event) => {
      if (isOutsideChatbot(event)) event.preventDefault();
    };
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      const scrollKeys = [
        " ",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        "ArrowUp",
        "ArrowDown",
      ];
      if (scrollKeys.includes(event.key) && isOutsideChatbot(event)) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", preventPageScroll, { passive: false });
    document.addEventListener("touchmove", preventPageScroll, {
      passive: false,
    });
    document.addEventListener("keydown", preventKeyboardScroll);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("wheel", preventPageScroll);
      document.removeEventListener("touchmove", preventPageScroll);
      document.removeEventListener("keydown", preventKeyboardScroll);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!isTyping && messages.length > 1) {
      latestReplyRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, isTyping]);

  const replyTo = (question: string) => {
    if (isTyping) return;
    const query = question.toLowerCase();
    const match = topics.find((topic) =>
      topic.keywords.some((word) => query.includes(word)),
    );
    const directResponse = questionResponses[question];
    const answer =
      directResponse?.answer ??
      match?.answer ??
      "I can help with bookings, creators, payments, your account and more. Choose a topic below, or try asking your question a different way.";
    const href = getPageUrl(directResponse?.href ?? match?.href ?? "/contact");
    setMessages((current) => [...current, { from: "user", text: question }]);
    setIsTyping(true);
    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: "bot", text: answer, href },
      ]);
      setIsTyping(false);
      replyTimeoutRef.current = null;
    }, 850);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setInput("");
    replyTo(question);
  };

  const chatbot = (
    <>
      <style jsx global>{`
        @keyframes feag-chat-in {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes feag-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes feag-glow {
          0%,
          100% {
            opacity: 0.32;
            transform: scale(0.94);
          }
          50% {
            opacity: 0.62;
            transform: scale(1.06);
          }
        }

        @keyframes feag-shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes feag-message {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feag-chat-panel {
          animation: feag-chat-in 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .feag-message {
          animation: feag-message 0.28s ease-out both;
        }

        .feag-float {
          animation: feag-float 3.8s ease-in-out infinite;
        }

        .feag-glow {
          animation: feag-glow 2.8s ease-in-out infinite;
        }

        .feag-shimmer {
          animation: feag-shimmer 3.6s ease-in-out infinite;
        }

        .feag-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .feag-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .feag-scroll::-webkit-scrollbar-thumb {
          background: rgba(226, 154, 38, 0.28);
          border-radius: 999px;
        }
      `}</style>

      <div
        ref={chatbotRef}
        className={`fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 ${
          open ? "z-[1000]" : "z-40"
        } sm:bottom-6 sm:right-6`}
      >
        {open && (
          <div
            className="fixed inset-0 z-0 bg-[#2e2215]/25 backdrop-blur-[1px]"
            onPointerDown={closeChat}
            aria-hidden="true"
          />
        )}

        {!open && (
          <div
            className="absolute bottom-[46px] right-[62px] flex items-end gap-2 sm:bottom-[56px] sm:right-[82px] max-sm:bottom-[42px] max-sm:right-[60px] max-[359px]:bottom-[34px] max-[359px]:right-[46px]"
            role="status"
            aria-live="polite"
          >
            <div className="relative max-w-[calc(100vw-92px)] overflow-hidden whitespace-nowrap rounded-2xl rounded-br-md border border-white/70 bg-white/75 px-4 py-2.5 text-xs font-semibold text-[#51463c] shadow-[0_12px_35px_rgba(46,34,21,.14)] backdrop-blur-xl max-sm:px-3 max-sm:py-2 max-sm:text-[11px] max-[359px]:max-w-[calc(100vw-72px)] max-[359px]:px-2.5 max-[359px]:text-[10px]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent feag-shimmer" />
              <span className="relative">How may I help you?</span>
            </div>
          </div>
        )}

        {open && (
          <section
            className="feag-chat-panel absolute z-10 bottom-0 right-[calc(100%+16px)] flex h-[min(455px,calc(100dvh-175px))] w-[calc(100vw-40px)] max-w-[370px] flex-col overflow-hidden rounded-[30px] border border-white/80 bg-white/82 shadow-[0_28px_80px_rgba(46,34,21,.24),0_8px_28px_rgba(226,154,38,.10)] backdrop-blur-2xl max-sm:bottom-[calc(100%+10px)] max-sm:right-0 max-sm:h-[min(400px,calc(100dvh-130px))] max-sm:w-[min(20rem,calc(100vw-2rem))] max-sm:rounded-[22px] max-[359px]:h-[min(380px,calc(100dvh-120px))] max-[359px]:w-[calc(100vw-28px)]"
            aria-label="FEAG support chat"
          >
            {/* Soft glossy light behind the content */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#e29a26]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-20 h-44 w-44 rounded-full bg-[#f4d39c]/20 blur-3xl" />

            {/* Header */}
            <div className="relative shrink-0 border-b border-white/70 bg-white/55 px-3 pb-2 pt-3 backdrop-blur-xl max-sm:pb-2 max-sm:pt-2.5 max-[359px]:px-2.5 max-[359px]:pt-2">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e29a26]/50 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute -inset-1.5 rounded-full bg-[#e29a26]/20 blur-md feag-glow" />
                    <div className="relative flex h-10 w-10 overflow-hidden rounded-full border border-white/80 bg-white shadow-[0_7px_20px_rgba(46,34,21,.18)]">
                      <img
                        src="/feag-support-agent-no-chat.png"
                        alt="FEAG"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#67b86b]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[14px] font-bold tracking-[-0.01em] text-[#2e2215]">
                        FEAG Support
                      </h2>
                      <span className="rounded-full border border-[#e29a26]/20 bg-[#e29a26]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9a6417]">
                        AI
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-[#8d8175]">
                      Online · Ready to help
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeChat}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#8d8175] shadow-[0_4px_14px_rgba(46,34,21,.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#51463c] focus:outline-none focus:ring-2 focus:ring-[#e29a26]/30"
                  aria-label="Close chat"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Welcome card */}
              <div className="relative mt-2 overflow-hidden rounded-[18px] border border-white/80 bg-gradient-to-br from-white/90 via-white/65 to-[#fff7eb]/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_8px_24px_rgba(46,34,21,.06)] max-sm:rounded-[16px] max-[359px]:px-2.5">
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#e29a26]/10 blur-2xl" />
                <div className="relative flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#e29a26]/10 text-sm">
                    ✨
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#3d2d20]">
                      Welcome to FEAG!
                    </p>
                    <p className="hidden mt-1 text-[12px] leading-5 text-[#7d6e60]">
                      Ask me about creators, bookings, payments, accounts and
                      more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation */}
            <div className="feag-scroll relative min-h-0 flex-1 touch-pan-y overscroll-contain overflow-y-auto px-4 py-3 [-webkit-overflow-scrolling:touch] max-sm:px-3 max-sm:py-2.5 max-[359px]:px-2.5 max-[359px]:py-2">
              <div className="flex items-center gap-2 pb-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e7d9c7]" />
                <span className="rounded-full border border-[#e7d9c7] bg-white/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a6417] backdrop-blur-md">
                  Commonly Asked Questions 
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e7d9c7]" />
              </div>

              <div className="flex flex-col items-start gap-2">
                {topics.flatMap((topic) =>
                  topic.prompts.map((prompt, promptIndex) => (
                    <button
                      key={prompt}
                      disabled={isTyping}
                      onClick={() => replyTo(prompt)}
                      className="group relative min-h-11 overflow-hidden rounded-full border border-[#e4cda9]/80 bg-white/72 px-3.5 py-2 text-left text-[11.5px] font-medium leading-[1.25] text-[#875916] shadow-[0_4px_14px_rgba(46,34,21,.045),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-[#e29a26]/60 hover:bg-[#fff9f0] hover:shadow-[0_8px_20px_rgba(226,154,38,.12)] disabled:cursor-wait disabled:opacity-50"
                    >
                      <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-[feag-shimmer_1.1s_ease-in-out]" />
                      <span className="relative">
                        {prompt}
                        <span className="ml-1.5" aria-hidden>
                          {promptIndex === 0 ? topic.icon : "↗"}
                        </span>
                      </span>
                    </button>
                  )),
                )}
              </div>

              <div className="mt-4 space-y-2.5">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`feag-message flex ${
                      message.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      ref={
                        index === messages.length - 1 && message.from === "bot"
                          ? latestReplyRef
                          : undefined
                      }
                      className={`max-w-[86%] rounded-[20px] px-4 py-3 text-[12.5px] leading-5 shadow-[0_5px_18px_rgba(46,34,21,.07)] ${
                        message.from === "user"
                          ? "rounded-br-md bg-[#e29a26] text-white shadow-[0_7px_20px_rgba(226,154,38,.20)]"
                          : "rounded-bl-md border border-white/80 bg-white/78 text-[#49392b] backdrop-blur-md"
                      }`}
                    >
                      <span className="block">{message.text}</span>
                      {message.from === "bot" && message.href && (
                        <a
                          href={message.href}
                          className="mt-3 inline-flex min-h-9 items-center rounded-full border border-[#e29a26]/25 bg-[#fff7eb] px-3 py-1 text-[11px] font-bold text-[#9a6417] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] transition hover:border-[#e29a26]/50 hover:bg-[#fff0d9] hover:text-[#75470d] sm:min-h-8"
                        >
                          Visit here
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="feag-message flex justify-start">
                    <div
                      className="flex items-center gap-1.5 rounded-[20px] rounded-bl-md border border-white/80 bg-white/78 px-4 py-3 shadow-[0_5px_18px_rgba(46,34,21,.07)] backdrop-blur-md"
                      aria-label="FEAG Support is typing"
                    >
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b57b26] [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b57b26] [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b57b26]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Composer */}
            <form
              onSubmit={submit}
              className="relative shrink-0 border-t border-white/80 bg-white/65 p-3 backdrop-blur-2xl max-sm:p-2.5"
            >
              <div className="relative flex items-center gap-2 overflow-hidden rounded-[20px] border border-white/90 bg-white/82 p-1.5 shadow-[0_8px_28px_rgba(46,34,21,.09),inset_0_1px_0_rgba(255,255,255,.95)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70" />

                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask me anything…"
                  className="relative min-w-0 flex-1 bg-transparent px-3 text-base text-[#2e2215] outline-none placeholder:text-[#a39587] sm:text-[12.5px]"
                />

                <button
                  type="submit"
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#e29a26] text-white shadow-[0_7px_18px_rgba(226,154,38,.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c88319] hover:shadow-[0_10px_22px_rgba(226,154,38,.32)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#e29a26]/30 sm:h-10 sm:w-10"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Floating launcher */}
        <div className="relative z-10">
          <button
            onClick={() => (open ? closeChat() : setOpen(true))}
            className="feag-float flex h-[58px] w-[58px] items-center justify-center rounded-full transition duration-200 hover:scale-105 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 max-[359px]:h-11 max-[359px]:w-11 sm:h-[78px] sm:w-[78px] [-webkit-tap-highlight-color:transparent]"
            aria-label={
              open ? "Close FEAG support chat" : "Open FEAG support chat"
            }
            aria-expanded={open}
          >
            <img
              src="/feag-support-agent-no-chat.png"
              alt=""
              className="h-full w-full rounded-full object-contain"
            />
          </button>
        </div>
      </div>
    </>
  );

  return isPortalReady ? createPortal(chatbot, document.body) : null;
}

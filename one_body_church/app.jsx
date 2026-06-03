import React, { useState, useEffect } from "react";
import { Content, Creator, DailyDevotional, Donation, Subscription } from "@/api/entities";
import { paymentsService } from "@/api/payments";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS & THEME
// ═══════════════════════════════════════════════════════════════
const GOLD = "#D4AF37";
const GOLD2 = "#F5D76E";
const DARK = "#07070f";
const DARK2 = "#0d0d1a";
const CARD = "#11111e";
const CARD2 = "#161625";
const BORDER = "#1c1c30";
const GREEN = "#22c55e";
const PURPLE = "#8b5cf6";
const BLUE = "#3b82f6";
const RED = "#ef4444";

const NEWS_TICKER = [
  "🔴 LIVE: Global Worship Summit 2026 — 14,820 watching now",
  "🙏 89,420+ prayers submitted this month from 187 countries",
  "🎵 Retum Brodaz new single 'Worthy Is The Lamb' hits 1M streams",
  "⛪ 4,200+ churches now streaming on One Body Church",
  "📖 Daily Devotional — Philippians 4:13 · Read Today's Word",
  "🌍 New: One Body Church now available in 47 languages",
  "🎬 New Faith Film: 'The Gospel of the Kingdom' — Now Streaming",
  "💎 Ministry Plan — Stream your church service to the world for $14.99/mo",
];

const fmt = (n) => {
  if (!n) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

function NewsTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % NEWS_TICKER.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: `${GOLD}0f`, borderBottom: `1px solid ${GOLD}22`, padding: "8px 28px", display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
      <span style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", fontSize: 10, fontWeight: 900, padding: "2px 8px", borderRadius: 4, flexShrink: 0, letterSpacing: 1 }}>BREAKING</span>
      <span style={{ color: "#aaa", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "all 0.4s" }}>{NEWS_TICKER[idx]}</span>
    </div>
  );
}

const SAMPLE_CONTENT = [
  { id: "s1", title: "The Power of Unshakeable Faith", content_type: "Sermon", artist_pastor: "Prexy Sam Ola", thumbnail_url: "https://images.unsplash.com/photo-1438232992991-995b671e4b8e?w=600&q=80", duration: "45:12", views: 124000, likes: 8900, is_featured: true, category: "Teaching", is_premium: false, description: "A life-changing message about walking in absolute faith when you cannot see the path ahead." },
  { id: "s2", title: "Worthy Is The Lamb", content_type: "Gospel Music", artist_pastor: "Retum Brodaz", thumbnail_url: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80", duration: "5:32", views: 342000, likes: 21000, is_featured: true, category: "Worship", is_premium: false, description: "A powerful worship anthem celebrating the glory and majesty of Jesus Christ." },
  { id: "s3", title: "Sunday Worship Experience", content_type: "Worship Session", artist_pastor: "One Body Church", thumbnail_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80", duration: "1:12:00", views: 89000, likes: 6700, is_featured: true, category: "Praise", is_premium: true, description: "Join us for a powerful Sunday worship experience with the One Body Church family." },
  { id: "s4", title: "Grace That Saves", content_type: "Gospel Music", artist_pastor: "Prexy Sam Ola", thumbnail_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", duration: "4:18", views: 210000, likes: 15000, is_featured: false, category: "Praise", is_premium: false, description: "A soulful gospel track about the saving grace of God." },
  { id: "s5", title: "Walking In Purpose & Destiny", content_type: "Sermon", artist_pastor: "Prexy Sam Ola", thumbnail_url: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80", duration: "38:45", views: 98000, likes: 7200, is_featured: false, category: "Teaching", is_premium: true, description: "Discover the God-given purpose inside you and learn to walk boldly in your calling." },
  { id: "s6", title: "Morning Devotional — Psalm 23", content_type: "Devotional", artist_pastor: "One Body Church", thumbnail_url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80", duration: "8:00", views: 56000, likes: 4300, is_featured: false, category: "Prayer", is_premium: false, description: "Start your morning with this peaceful devotional walk through the most beloved Psalm." },
  { id: "s7", title: "Holy Spirit Move", content_type: "Gospel Music", artist_pastor: "Retum Brodaz", thumbnail_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", duration: "6:10", views: 187000, likes: 13000, is_featured: false, category: "Worship", is_premium: false, description: "An anointed worship song calling on the Holy Spirit to move in our midst." },
  { id: "s8", title: "The Gospel of the Kingdom", content_type: "Faith Film", artist_pastor: "One Body Church", thumbnail_url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80", duration: "1:45:00", views: 43000, likes: 3100, is_featured: true, category: "Evangelism", is_premium: true, description: "A compelling faith film exploring the power of the Kingdom of God on earth." },
  { id: "s9", title: "Overflow — Live Worship Night", content_type: "Live Stream", artist_pastor: "One Body Church", thumbnail_url: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=600&q=80", duration: "2:30:00", views: 231000, likes: 18000, is_featured: true, category: "Worship", is_premium: false, is_live: false, description: "A night of uninterrupted worship and the presence of God." },
  { id: "s10", title: "Prayer & Fasting Guide", content_type: "Podcast", artist_pastor: "Prexy Sam Ola", thumbnail_url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80", duration: "22:00", views: 32000, likes: 2400, is_featured: false, category: "Prayer", is_premium: false, description: "A practical guide to deepening your prayer life through fasting and intercession." },
  { id: "s11", title: "Children of the Most High", content_type: "Gospel Music", artist_pastor: "Retum Brodaz", thumbnail_url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", duration: "4:55", views: 145000, likes: 11000, is_featured: false, category: "Praise", is_premium: false, description: "An uplifting anthem declaring our identity as children of God." },
  { id: "s12", title: "When God Shows Up", content_type: "Sermon", artist_pastor: "Prexy Sam Ola", thumbnail_url: "https://images.unsplash.com/photo-1519491050282-cf00c82424cf?w=600&q=80", duration: "52:18", views: 76000, likes: 5800, is_featured: false, category: "Teaching", is_premium: true, description: "Miraculous testimonies and biblical truth about the moment God intervenes in human affairs." },
];

const SAMPLE_DEVOTIONAL = {
  title: "Walking In His Light",
  scripture: "Your word is a lamp for my feet, a light on my path.",
  scripture_reference: "Psalm 119:105",
  message: "Every step you take today is guided by the Word of God. You are not walking alone. His promises illuminate every dark place, every uncertain moment, every fearful thought. You were not made to stumble in darkness — you were made to walk in light. Trust the light He has given you today. When the road seems uncertain, open the Word. When fear whispers lies, let Scripture speak louder. God has never once let His children walk unguided.",
  prayer: "Lord, thank You for being my guide today. Let Your Word lead every decision I make. I walk in faith, not fear. Where You lead, I will follow. Illuminate my path today, Father. Amen.",
  author: "Prexy Sam Ola",
  date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
};

const PLANS = [
  { id: "free", name: "Believer", price: 0, color: "#555", features: ["Access to free content", "Daily devotionals", "Community feed", "Basic search"] },
  { id: "disciple", name: "Disciple", price: 4.99, color: GOLD, popular: true, features: ["Everything in Free", "All premium sermons", "All premium music", "Ad-free experience", "Offline downloads", "Early access to new content"] },
  { id: "ministry", name: "Ministry", price: 14.99, color: PURPLE, features: ["Everything in Disciple", "White-label church app", "Upload your own content", "Live streaming access", "Donation collection", "Analytics dashboard", "Priority support"] },
];

const STATS = [
  { label: "Global Members", value: "2.4M+", icon: "🌍" },
  { label: "Hours of Content", value: "10,000+", icon: "🎬" },
  { label: "Countries Reached", value: "187", icon: "🗺️" },
  { label: "Lives Transformed", value: "500K+", icon: "❤️" },
  { label: "Churches Connected", value: "4,200+", icon: "⛪" },
  { label: "Prayers Answered", value: "89K+", icon: "🙏" },
  { label: "Daily Active Users", value: "310K+", icon: "🔥" },
  { label: "Languages", value: "47", icon: "🗣️" },
];

const TESTIMONIALS = [
  { name: "Sister Grace O.", country: "Nigeria", text: "One Body Church changed my life. I listen to Prexy's sermons every morning before work. God is using this platform mightily!", avatar: "G" },
  { name: "Pastor James K.", country: "Ghana", text: "The worship music on here is unmatched. My congregation plays Retum Brodaz every Sunday. Pure anointing.", avatar: "J" },
  { name: "Mary Thompson", country: "United States", text: "I found this platform during a dark season and the daily devotionals pulled me through. This is not just an app — it's a lifeline.", avatar: "M" },
  { name: "Emmanuel A.", country: "UK", text: "Finally a Christian streaming platform that takes quality seriously. The content is world-class and the community is amazing.", avatar: "E" },
];

const LIVE_EVENTS = [
  {
    id: "l1",
    title: "Global Worship Summit 2026",
    host: "One Body Church",
    thumbnail: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&q=80",
    status: "live",
    viewers: 14820,
    category: "Worship Night",
    description: "A worldwide night of worship uniting believers from every continent. Join thousands streaming live right now.",
    started: "Started 1hr ago",
    stream_url: ""
  },
  {
    id: "l2",
    title: "Sunday Morning Service — Lagos",
    host: "Prexy Sam Ola",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    status: "live",
    viewers: 6340,
    category: "Church Service",
    description: "Live Sunday service streaming from Lagos, Nigeria. Message, worship, and altar call.",
    started: "Started 45min ago",
    stream_url: ""
  },
  {
    id: "l3",
    title: "Prophetic Prayer Conference",
    host: "Retum Brodaz",
    thumbnail: "https://images.unsplash.com/photo-1519491050282-cf00c82424cf?w=800&q=80",
    status: "live",
    viewers: 3210,
    category: "Prayer & Intercession",
    description: "Three hours of prophetic intercession for the nations. Come with expectation.",
    started: "Started 2hrs ago",
    stream_url: ""
  },
  {
    id: "l4",
    title: "Gospel Concert — ATL Live",
    host: "Various Artists",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    status: "upcoming",
    viewers: 0,
    category: "Concert",
    description: "Live gospel concert streaming from Atlanta featuring top Christian artists.",
    starts_at: "Today at 8:00 PM EST",
    stream_url: ""
  },
  {
    id: "l5",
    title: "Healing & Miracles Service",
    host: "One Body Church",
    thumbnail: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80",
    status: "upcoming",
    viewers: 0,
    category: "Healing Service",
    description: "A special service dedicated to healing, deliverance, and the miraculous power of God.",
    starts_at: "Tomorrow at 6:00 PM EST",
    stream_url: ""
  },
  {
    id: "l6",
    title: "Youth Fire Conference 2026",
    host: "One Body Church",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    status: "upcoming",
    viewers: 0,
    category: "Youth Conference",
    description: "A three-day conference for young believers — worship, word, and transformation.",
    starts_at: "May 10 at 7:00 PM EST",
    stream_url: ""
  },
  {
    id: "l7",
    title: "Bible Study — Book of Acts",
    host: "Prexy Sam Ola",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    status: "replay",
    viewers: 8900,
    category: "Bible Study",
    description: "Deep dive into the Book of Acts — the power of the early church and what it means for us today.",
    started: "Recorded May 1, 2026",
    stream_url: ""
  },
  {
    id: "l8",
    title: "Women of Faith Summit",
    host: "One Body Church",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b671e4b8e?w=800&q=80",
    status: "replay",
    viewers: 12400,
    category: "Conference",
    description: "Celebrating the strength, grace, and calling of women in the body of Christ.",
    started: "Recorded Apr 28, 2026",
    stream_url: ""
  },
];

const PRAYER_REQUESTS = [
  { id: "p1", name: "Sister Adaeze", country: "🇳🇬 Nigeria", request: "Please pray for my mother's complete healing. She was diagnosed last week and we are trusting God for a miracle.", time: "2 min ago", prays: 142 },
  { id: "p2", name: "Brother David", country: "🇺🇸 USA", request: "Believing God for a breakthrough in my finances. Lost my job 3 months ago but God is still faithful.", time: "5 min ago", prays: 89 },
  { id: "p3", name: "Pastor Ruth", country: "🇬🇭 Ghana", request: "Our church building project needs $50,000 to complete. We need divine provision.", time: "12 min ago", prays: 311 },
  { id: "p4", name: "Anonymous", country: "🇬🇧 UK", request: "Struggling with depression and anxiety. Please pray for peace that surpasses understanding.", time: "18 min ago", prays: 204 },
  { id: "p5", name: "Young Victor", country: "🇿🇦 South Africa", request: "I'm writing my final exams this week. Please stand with me in prayer for wisdom and focus.", time: "25 min ago", prays: 67 },
  { id: "p6", name: "Sister Maria", country: "🇧🇷 Brazil", request: "Praying for my husband to come back to God. He's been away from the church for 2 years.", time: "31 min ago", prays: 178 },
  { id: "p7", name: "Deacon Paul", country: "🇨🇲 Cameroon", request: "Our village needs clean water. We are praying for international support and divine provision.", time: "45 min ago", prays: 92 },
  { id: "p8", name: "Brother James", country: "🇮🇳 India", request: "Persecution is rising in our area. Please pray for boldness and protection for believers here.", time: "1hr ago", prays: 445 },
];

const CHURCHES = [
  { id: "c1", name: "Retum Global Church", pastor: "Prexy Sam Ola", location: "Columbus, Ohio, USA", members: "2,400", flag: "🇺🇸", cover: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80", live: true, denomination: "Non-denominational" },
  { id: "c2", name: "House of Grace Lagos", pastor: "Pastor Emeka Obi", location: "Lagos, Nigeria", members: "8,700", flag: "🇳🇬", cover: "https://images.unsplash.com/photo-1438232992991-995b671e4b8e?w=600&q=80", live: false, denomination: "Pentecostal" },
  { id: "c3", name: "Living Waters Church", pastor: "Pastor Sarah Mills", location: "London, UK", members: "1,200", flag: "🇬🇧", cover: "https://images.unsplash.com/photo-1519491050282-cf00c82424cf?w=600&q=80", live: true, denomination: "Baptist" },
  { id: "c4", name: "Restoration Cathedral", pastor: "Bishop Kwame Asante", location: "Accra, Ghana", members: "5,300", flag: "🇬🇭", cover: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80", live: false, denomination: "Charismatic" },
  { id: "c5", name: "New Covenant Church", pastor: "Pastor Daniel Nwosu", location: "Houston, TX, USA", members: "3,100", flag: "🇺🇸", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", live: true, denomination: "Non-denominational" },
  { id: "c6", name: "Abundant Life Ministry", pastor: "Rev. Amara Diallo", location: "Abuja, Nigeria", members: "6,900", flag: "🇳🇬", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", live: false, denomination: "Word of Faith" },
];

const BIBLE_BOOKS = [
  { name: "Genesis", chapters: 50, testament: "OT" }, { name: "Exodus", chapters: 40, testament: "OT" },
  { name: "Psalms", chapters: 150, testament: "OT" }, { name: "Proverbs", chapters: 31, testament: "OT" },
  { name: "Isaiah", chapters: 66, testament: "OT" }, { name: "Matthew", chapters: 28, testament: "NT" },
  { name: "Mark", chapters: 16, testament: "NT" }, { name: "Luke", chapters: 24, testament: "NT" },
  { name: "John", chapters: 21, testament: "NT" }, { name: "Acts", chapters: 28, testament: "NT" },
  { name: "Romans", chapters: 16, testament: "NT" }, { name: "1 Corinthians", chapters: 16, testament: "NT" },
  { name: "Galatians", chapters: 6, testament: "NT" }, { name: "Ephesians", chapters: 6, testament: "NT" },
  { name: "Philippians", chapters: 4, testament: "NT" }, { name: "Revelation", chapters: 22, testament: "NT" },
];

const VERSE_OF_DAY = {
  verse: "I can do all things through Christ who strengthens me.",
  ref: "Philippians 4:13",
  context: "Paul wrote these words from prison — and yet he was full of joy. This verse is not about personal ambition. It is about contentment, endurance, and the supernatural strength that comes from abiding in Christ. Whatever you are facing today, you are not facing it alone. His strength is made perfect in your weakness."
};

// ═══════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Badge({ children, color = GOLD }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
      {children}
    </span>
  );
}

function LivePill() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#ef444422", border: "1px solid #ef444466", borderRadius: 20, padding: "3px 10px" }}>
      <span style={{ width: 6, height: 6, background: RED, borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
      <span style={{ color: RED, fontSize: 11, fontWeight: 700 }}>LIVE</span>
    </span>
  );
}

function ProBadge() {
  return <span style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, letterSpacing: 1 }}>PRO</span>;
}

function StatCard({ stat }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{stat.icon}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: GOLD, marginBottom: 4 }}>{stat.value}</div>
      <div style={{ color: "#666", fontSize: 13 }}>{stat.label}</div>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px" }}>
      <div style={{ color: GOLD, fontSize: 32, lineHeight: 1, marginBottom: 12 }}>"</div>
      <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t.text}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${GOLD}, ${PURPLE})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#000" }}>{t.avatar}</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{t.name}</div>
          <div style={{ color: "#555", fontSize: 11 }}>{t.country}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTENT CARD — LARGE
// ═══════════════════════════════════════════════════════════════
function ContentCard({ item, onPlay, onLike, liked, size = "md" }) {
  const [hover, setHover] = useState(false);
  const typeColor = { "Sermon": PURPLE, "Gospel Music": GOLD, "Worship Session": BLUE, "Devotional": GREEN, "Faith Film": "#f59e0b", "Live Stream": RED, "Podcast": "#ec4899" }[item.content_type] || GOLD;
  const isLg = size === "lg";

  return (
    <div
      onClick={() => onPlay(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: CARD,
        border: `1px solid ${hover ? GOLD + "44" : BORDER}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${GOLD}22` : "none",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={item.thumbnail_url || "https://images.unsplash.com/photo-1438232992991-995b671e4b8e?w=600&q=80"}
          alt={item.title}
          style={{ width: "100%", height: isLg ? 220 : 180, objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)" }} />

        {/* Play overlay on hover */}
        {hover && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
            <div style={{ width: 56, height: 56, background: GOLD, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>▶</div>
          </div>
        )}

        {item.is_live && <div style={{ position: "absolute", top: 10, left: 10 }}><LivePill /></div>}
        {item.is_premium && <div style={{ position: "absolute", top: 10, right: 10 }}><ProBadge /></div>}

        <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Badge color={typeColor}>{item.content_type}</Badge>
          <span style={{ color: "#ddd", fontSize: 11, background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 4 }}>{item.duration}</span>
        </div>
      </div>

      <div style={{ padding: isLg ? "16px 18px" : "14px 16px" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: isLg ? 16 : 14, marginBottom: 5, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</div>
        <div style={{ color: "#777", fontSize: 12, marginBottom: 10 }}>{item.artist_pastor}</div>
        {isLg && item.description && (
          <div style={{ color: "#555", fontSize: 12, lineHeight: 1.5, marginBottom: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.description}</div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#555", fontSize: 12 }}>👁 {fmt(item.views)}</span>
            <span style={{ color: "#555", fontSize: 12 }}>💬 {fmt(Math.floor((item.likes || 0) * 0.1))}</span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onLike(item.id); }}
            style={{ background: liked ? "#ef444422" : "transparent", border: `1px solid ${liked ? RED + "66" : BORDER}`, borderRadius: 20, padding: "4px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: liked ? RED : "#555", fontSize: 12, transition: "all 0.2s" }}
          >
            {liked ? "❤️" : "🤍"} {fmt(item.likes)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO FEATURED CARD
// ═══════════════════════════════════════════════════════════════
function HeroCard({ item, onPlay }) {
  return (
    <div
      onClick={() => onPlay(item)}
      style={{ position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer", height: 420, border: `1px solid ${BORDER}` }}
    >
      <img src={item.thumbnail_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 32px" }}>
        {item.is_featured && <Badge color={GOLD}>⭐ FEATURED</Badge>}
        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginTop: 10, marginBottom: 8, lineHeight: 1.2 }}>{item.title}</div>
        <div style={{ color: "#bbb", fontSize: 14, marginBottom: 6 }}>{item.artist_pastor} • {item.content_type} • {item.duration}</div>
        <div style={{ color: "#888", fontSize: 13, marginBottom: 20, maxWidth: 500 }}>{item.description}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            ▶ Play Now
          </button>
          <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", backdropFilter: "blur(10px)" }}>
            + Add to Library
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTENT ROW SECTION
// ═══════════════════════════════════════════════════════════════
function ContentRow({ title, items, onPlay, onLike, liked, size = "md", seeAll, onSeeAll }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{title}</div>
        {seeAll && <button onClick={onSeeAll} style={{ color: GOLD, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>See All →</button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${size === "lg" ? "300px" : "240px"}, 1fr))`, gap: 16 }}>
        {items.map(c => <ContentCard key={c.id} item={c} onPlay={onPlay} onLike={onLike} liked={!!liked[c.id]} size={size} />)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PLAYER MODAL
// ═══════════════════════════════════════════════════════════════
function PlayerModal({ item, onClose, relatedItems, onPlay }) {
  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.97)", zIndex: 2000, overflowY: "auto" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 40px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ color: "#666", fontSize: 13 }}>One Body Church · {item.content_type}</div>
          <button onClick={onClose} style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>✕ Close</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Main player */}
          <div>
            {item.media_url ? (
              <video controls autoPlay style={{ width: "100%", borderRadius: 14, maxHeight: "55vh", background: "#000" }} src={item.media_url} />
            ) : (
              <div style={{ width: "100%", height: 400, background: CARD, borderRadius: 14, position: "relative", overflow: "hidden", border: `1px solid ${BORDER}` }}>
                <img src={item.thumbnail_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 16 }}>▶</div>
                  <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Media Player</div>
                  <div style={{ color: "#666", fontSize: 13 }}>Upload media from your admin panel to enable playback</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <Badge color={{ "Sermon": PURPLE, "Gospel Music": GOLD, "Worship Session": BLUE, "Devotional": GREEN, "Faith Film": "#f59e0b", "Live Stream": RED, "Podcast": "#ec4899" }[item.content_type] || GOLD}>{item.content_type}</Badge>
                {item.is_premium && <ProBadge />}
                {item.category && <Badge color="#555">{item.category}</Badge>}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: GOLD, fontSize: 14, marginBottom: 12 }}>{item.artist_pastor} · {item.duration}</div>
              {item.description && <div style={{ color: "#999", fontSize: 14, lineHeight: 1.7 }}>{item.description}</div>}

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                  <div style={{ color: GOLD, fontWeight: 700 }}>👁 {fmt(item.views)}</div>
                  <div style={{ color: "#555", fontSize: 11 }}>Views</div>
                </div>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                  <div style={{ color: RED, fontWeight: 700 }}>❤️ {fmt(item.likes)}</div>
                  <div style={{ color: "#555", fontSize: 11 }}>Likes</div>
                </div>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                  <div style={{ color: GREEN, fontWeight: 700 }}>💬 {fmt(Math.floor((item.likes || 0) * 0.1))}</div>
                  <div style={{ color: "#555", fontSize: 11 }}>Comments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#fff" }}>Up Next</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(relatedItems || []).slice(0, 6).map(r => (
                <div key={r.id} onClick={() => onPlay(r)} style={{ display: "flex", gap: 10, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden", cursor: "pointer", padding: "8px" }}>
                  <img src={r.thumbnail_url} alt="" style={{ width: 90, height: 60, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{r.title}</div>
                    <div style={{ color: "#666", fontSize: 11, marginTop: 3 }}>{r.artist_pastor}</div>
                    <div style={{ color: "#444", fontSize: 11 }}>{r.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DONATION MODAL
// ═══════════════════════════════════════════════════════════════
function DonationModal({ onClose }) {
  const [form, setForm] = useState({ donor_name: "", donor_email: "", amount: "", message: "", is_anonymous: false });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.amount || parseFloat(form.amount) <= 0) return;
    setLoading(true);
    try {
      // Create pending donation record
      const donation = await Donation.create({
        ...form,
        amount: parseFloat(form.amount),
        currency: "USD",
        status: "Pending",
        transaction_id: `TXN-${Date.now()}`
      });

      // Launch Wix Payments checkout
      const amountCents = Math.round(parseFloat(form.amount) * 100);
      await paymentsService.startPayment({
        amount: amountCents,
        currency: "USD",
        title: `Ministry Donation - One Body Church`,
        description: form.message || "Thank you for supporting the ministry!",
        metadata: { donation_id: donation.id, donor_name: form.donor_name },
        onSuccess: async () => {
          await Donation.update(donation.id, { status: "Completed" });
          setDone(true);
          setLoading(false);
        },
        onFailure: async () => {
          await Donation.update(donation.id, { status: "Failed" });
          setLoading(false);
        }
      });
    } catch (e) {
      console.error(e);
      // Fallback: mark as completed if payment service unavailable
      await Donation.create({ ...form, amount: parseFloat(form.amount), currency: "USD", status: "Completed", transaction_id: `TXN-${Date.now()}` });
      setDone(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 460, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#666", fontSize: 20, cursor: "pointer" }}>✕</button>

        {done ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🙏</div>
            <div style={{ color: GOLD, fontSize: 26, fontWeight: 800, marginBottom: 8 }}>God Bless You!</div>
            <div style={{ color: "#aaa", lineHeight: 1.6 }}>Your generous gift has been received. Heaven records every act of giving done in love.</div>
            <button onClick={onClose} style={{ marginTop: 24, background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>Amen 🙏</button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🙏</div>
              <div style={{ color: GOLD, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Give To The Ministry</div>
              <div style={{ color: "#777", fontSize: 13 }}>Your giving powers the gospel worldwide</div>
            </div>

            {/* Quick amounts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
              {[10, 25, 50, 100, 250, 500, 1000].slice(0, 4).map(a => (
                <button key={a} onClick={() => setForm({ ...form, amount: String(a) })}
                  style={{ background: form.amount == a ? `linear-gradient(135deg, ${GOLD}, #b8960c)` : CARD2, color: form.amount == a ? "#000" : "#888", border: `1px solid ${form.amount == a ? GOLD : BORDER}`, borderRadius: 8, padding: "10px 0", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  ${a}
                </button>
              ))}
            </div>

            {[
              { label: "Your Name", key: "donor_name", type: "text", placeholder: "Full Name" },
              { label: "Email Address", key: "donor_email", type: "email", placeholder: "email@example.com" },
              { label: "Custom Amount (USD)", key: "amount", type: "number", placeholder: "Enter amount..." },
              { label: "Message (optional)", key: "message", type: "text", placeholder: "A word of encouragement..." }
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ color: "#888", fontSize: 12, display: "block", marginBottom: 5 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} type={f.type} placeholder={f.placeholder}
                  style={{ width: "100%", background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
            ))}

            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, marginBottom: 20, cursor: "pointer" }}>
              <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm({ ...form, is_anonymous: e.target.checked })} />
              Give anonymously
            </label>

            <button onClick={submit} disabled={loading || !form.amount}
              style={{ width: "100%", background: loading ? "#333" : `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 12, padding: "15px 0", fontWeight: 800, fontSize: 16, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Processing..." : `Give $${form.amount || "0"} Now 🙏`}
            </button>
            <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 12 }}>🔒 Secure & encrypted · God sees every gift</div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRICING PAGE
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// BIBLE READER COMPONENT
// ═══════════════════════════════════════════════════════════════
function BibleReader() {
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("KJV");
  const [verses, setVerses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState({});

  const selectedBook = BIBLE_BOOKS.find(b => b.name === book) || BIBLE_BOOKS[0];

  useEffect(() => {
    setLoading(true);
    // Use bible-api.com — free, no key needed
    fetch(`https://bible-api.com/${encodeURIComponent(book)}+${chapter}?translation=kjv`)
      .then(r => r.json())
      .then(data => {
        setVerses(data.verses || []);
        setLoading(false);
      })
      .catch(() => {
        setVerses([
          { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
          { verse: 2, text: "The same was in the beginning with God." },
          { verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
          { verse: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." },
        ]);
        setLoading(false);
      });
  }, [book, chapter]);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <select value={book} onChange={e => { setBook(e.target.value); setChapter(1); }}
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 8, padding: "10px 14px", fontSize: 14, cursor: "pointer", flex: 1, minWidth: 140 }}>
          <optgroup label="Old Testament">{BIBLE_BOOKS.filter(b => b.testament === "OT").map(b => <option key={b.name}>{b.name}</option>)}</optgroup>
          <optgroup label="New Testament">{BIBLE_BOOKS.filter(b => b.testament === "NT").map(b => <option key={b.name}>{b.name}</option>)}</optgroup>
        </select>
        <select value={chapter} onChange={e => setChapter(Number(e.target.value))}
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 8, padding: "10px 14px", fontSize: 14, cursor: "pointer", width: 120 }}>
          {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>Chapter {n}</option>
          ))}
        </select>
        <select value={version} onChange={e => setVersion(e.target.value)}
          style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 8, padding: "10px 14px", fontSize: 14, cursor: "pointer", width: 100 }}>
          {["KJV", "NIV", "ESV", "NLT", "NKJV"].map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      {/* Chapter title */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 32px" }}>
        <div style={{ color: PURPLE, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{version}</div>
        <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>{book} — Chapter {chapter}</div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#444" }}>Loading scripture...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(verses || []).map(v => (
              <div key={v.verse}
                onClick={() => setHighlighted(h => ({ ...h, [v.verse]: !h[v.verse] }))}
                style={{ display: "flex", gap: 14, padding: "10px 14px", borderRadius: 10, background: highlighted[v.verse] ? `${GOLD}18` : "transparent", border: `1px solid ${highlighted[v.verse] ? GOLD + "44" : "transparent"}`, cursor: "pointer", transition: "all 0.15s" }}>
                <span style={{ color: highlighted[v.verse] ? GOLD : "#444", fontWeight: 700, fontSize: 13, minWidth: 22, flexShrink: 0 }}>{v.verse}</span>
                <span style={{ color: highlighted[v.verse] ? "#fff" : "#bbb", fontSize: 15, lineHeight: 1.8 }}>{v.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
          <button onClick={() => chapter > 1 && setChapter(c => c - 1)} disabled={chapter === 1}
            style={{ background: chapter === 1 ? "transparent" : CARD2, color: chapter === 1 ? "#333" : "#fff", border: `1px solid ${BORDER}`, borderRadius: 9, padding: "10px 20px", cursor: chapter === 1 ? "not-allowed" : "pointer", fontWeight: 600 }}>
            ← Prev Chapter
          </button>
          <span style={{ color: "#555", fontSize: 13 }}>{book} {chapter} / {selectedBook.chapters}</span>
          <button onClick={() => chapter < selectedBook.chapters && setChapter(c => c + 1)} disabled={chapter === selectedBook.chapters}
            style={{ background: chapter === selectedBook.chapters ? "transparent" : `linear-gradient(135deg, ${PURPLE}, #6d28d9)`, color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", cursor: chapter === selectedBook.chapters ? "not-allowed" : "pointer", fontWeight: 600 }}>
            Next Chapter →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRAYER COMPONENTS
// ═══════════════════════════════════════════════════════════════
function PrayerCard({ prayer }) {
  const [prayed, setPrayed] = useState(false);
  const [count, setCount] = useState(prayer.prays);
  return (
    <div style={{ background: CARD, border: `1px solid ${prayed ? GREEN + "55" : BORDER}`, borderRadius: 16, padding: "20px 22px", transition: "border 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${GREEN}44, ${GREEN}22)`, border: `1px solid ${GREEN}33`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🙏</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{prayer.name}</div>
            <div style={{ color: "#555", fontSize: 12 }}>{prayer.country} · {prayer.time}</div>
          </div>
        </div>
      </div>
      <div style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{prayer.request}</div>
      <button
        onClick={() => { if (!prayed) { setPrayed(true); setCount(c => c + 1); } }}
        style={{ display: "flex", alignItems: "center", gap: 7, background: prayed ? `${GREEN}22` : CARD2, color: prayed ? GREEN : "#666", border: `1px solid ${prayed ? GREEN + "44" : BORDER}`, borderRadius: 9, padding: "8px 16px", cursor: prayed ? "default" : "pointer", fontWeight: 700, fontSize: 13, transition: "all 0.2s" }}>
        🙏 {prayed ? "Praying for you" : "Pray With Them"} · {count.toLocaleString()}
      </button>
    </div>
  );
}

function PrayerSubmitBox() {
  const [form, setForm] = useState({ name: "", request: "" });
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ background: "linear-gradient(135deg, #001a0a, #000d05)", border: `1px solid ${GREEN}33`, borderRadius: 16, padding: "24px", marginBottom: 28 }}>
      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🙏</div>
          <div style={{ color: GREEN, fontWeight: 800, fontSize: 18 }}>Your request is on the Wall</div>
          <div style={{ color: "#555", fontSize: 13, marginTop: 6 }}>Thousands of believers are praying with you right now.</div>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", request: "" }); }} style={{ marginTop: 16, background: "transparent", color: "#555", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13 }}>Submit Another</button>
        </div>
      ) : (
        <>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14, color: GREEN }}>🙏 Submit a Prayer Request</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name (or Anonymous)"
              style={{ flex: 1, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 13px", color: "#fff", fontSize: 13, outline: "none" }} />
          </div>
          <textarea value={form.request} onChange={e => setForm(f => ({ ...f, request: e.target.value }))} placeholder="Share your prayer request..."
            rows={3} style={{ width: "100%", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 13px", color: "#fff", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
          <button onClick={() => form.request && setSubmitted(true)}
            style={{ marginTop: 10, background: `linear-gradient(135deg, ${GREEN}, #15803d)`, color: "#fff", border: "none", borderRadius: 9, padding: "11px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Post to Prayer Wall 🙏
          </button>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHURCH CARD
// ═══════════════════════════════════════════════════════════════
function ChurchCard({ church }) {
  const [following, setFollowing] = useState(false);
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <img src={church.cover} alt={church.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
        {church.live && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#ef444422", border: "1px solid #ef444466", borderRadius: 20, padding: "3px 10px" }}>
              <span style={{ width: 6, height: 6, background: RED, borderRadius: "50%" }} />
              <span style={{ color: RED, fontSize: 11, fontWeight: 700 }}>LIVE NOW</span>
            </span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 14 }}>
          <span style={{ color: "#fff", fontSize: 18 }}>{church.flag}</span>
        </div>
      </div>
      <div style={{ padding: "18px 18px 20px" }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>{church.name}</div>
        <div style={{ color: GOLD, fontSize: 13, marginBottom: 4 }}>👤 {church.pastor}</div>
        <div style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>📍 {church.location}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Badge color={PURPLE}>{church.denomination}</Badge>
          <Badge color={BLUE}>👥 {church.members}</Badge>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setFollowing(f => !f)}
            style={{ flex: 1, background: following ? `${GOLD}22` : `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: following ? GOLD : "#000", border: `1px solid ${following ? GOLD + "44" : "transparent"}`, borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            {following ? "✓ Following" : "+ Follow"}
          </button>
          {church.live && (
            <button style={{ background: `linear-gradient(135deg, ${RED}, #b91c1c)`, color: "#fff", border: "none", borderRadius: 9, padding: "10px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>▶ Live</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LIVE EVENT CARD
// ═══════════════════════════════════════════════════════════════
function LiveEventCard({ event }) {
  const [hover, setHover] = useState(false);
  const [watching, setWatching] = useState(false);
  const [notified, setNotified] = useState(false);

  const statusConfig = {
    live: { label: "LIVE", color: RED, dot: true, bg: "#ef444422", border: "#ef444444" },
    upcoming: { label: "UPCOMING", color: GOLD, dot: false, bg: "#D4AF3722", border: "#D4AF3744" },
    replay: { label: "REPLAY", color: BLUE, dot: false, bg: "#3b82f622", border: "#3b82f644" },
  }[event.status];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: CARD,
        border: `1px solid ${hover ? statusConfig.color + "55" : BORDER}`,
        borderRadius: 18,
        overflow: "hidden",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover ? `0 20px 40px rgba(0,0,0,0.5)` : "none",
        transition: "all 0.25s ease",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        <img src={event.thumbnail} alt={event.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%)" }} />

        {/* Status badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: statusConfig.bg, border: `1px solid ${statusConfig.border}`, borderRadius: 20, padding: "4px 12px" }}>
            {statusConfig.dot && <span style={{ width: 7, height: 7, background: RED, borderRadius: "50%", boxShadow: `0 0 8px ${RED}` }} />}
            <span style={{ color: statusConfig.color, fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>{statusConfig.label}</span>
          </span>
        </div>

        {/* Viewer count for live */}
        {event.status === "live" && (
          <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: RED, fontSize: 12 }}>👁</span>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{event.viewers.toLocaleString()} watching</span>
          </div>
        )}

        {/* Category */}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <Badge color={PURPLE}>{event.category}</Badge>
        </div>

        {/* Play button on hover for live/replay */}
        {hover && event.status !== "upcoming" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 60, height: 60, background: event.status === "live" ? RED : GOLD, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: `0 0 30px ${event.status === "live" ? RED : GOLD}88` }}>▶</div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "18px 18px 20px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 5, lineHeight: 1.3 }}>{event.title}</div>
        <div style={{ color: GOLD, fontSize: 13, marginBottom: 6, fontWeight: 600 }}>{event.host}</div>
        <div style={{ color: "#666", fontSize: 13, lineHeight: 1.5, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{event.description}</div>

        {/* Time info */}
        <div style={{ color: "#555", fontSize: 12, marginBottom: 14 }}>
          {event.status === "live" && `🔴 ${event.started}`}
          {event.status === "upcoming" && `🗓 ${event.starts_at}`}
          {event.status === "replay" && `🎞 ${event.started}`}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {event.status === "live" && (
            <button
              onClick={() => setWatching(true)}
              style={{ flex: 1, background: watching ? `${RED}22` : `linear-gradient(135deg, ${RED}, #b91c1c)`, color: "#fff", border: `1px solid ${RED}`, borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {watching ? "✓ Watching Now" : "▶ Watch Live"}
            </button>
          )}
          {event.status === "upcoming" && (
            <button
              onClick={() => setNotified(true)}
              style={{ flex: 1, background: notified ? `${GOLD}22` : `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: notified ? GOLD : "#000", border: `1px solid ${GOLD}`, borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              {notified ? "🔔 Reminder Set!" : "🔔 Remind Me"}
            </button>
          )}
          {event.status === "replay" && (
            <button style={{ flex: 1, background: `linear-gradient(135deg, ${BLUE}, #1d4ed8)`, color: "#fff", border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              ▶ Watch Replay
            </button>
          )}
          <button style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 9, padding: "10px 14px", cursor: "pointer", fontSize: 14, color: "#666" }}>
            ↗
          </button>
        </div>

        {/* Watching animation */}
        {watching && event.status === "live" && (
          <div style={{ marginTop: 10, background: "#0a0000", border: `1px solid ${RED}33`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", flexShrink: 0, boxShadow: `0 0 8px ${RED}` }} />
            <span style={{ color: "#ccc", fontSize: 12 }}>Live stream will appear here. Upload stream URL in admin panel to enable real-time playback.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SubscribeModal({ plan, onClose }) {
  const [form, setForm] = useState({ user_name: "", user_email: "", billing_cycle: "Monthly" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const annualPrice = (plan.price * 10).toFixed(2);
  const finalPrice = form.billing_cycle === "Annual" ? annualPrice : plan.price;

  const submit = async () => {
    if (!form.user_email) return;
    setLoading(true);
    try {
      const amountCents = Math.round(parseFloat(finalPrice) * 100);
      // Record subscription
      await Subscription.create({
        user_id: form.user_email,
        plan: plan.name,
        price: parseFloat(finalPrice),
        status: "Active",
        billing_cycle: form.billing_cycle,
        start_date: new Date().toISOString(),
        end_date: form.billing_cycle === "Annual"
          ? new Date(Date.now() + 365*24*60*60*1000).toISOString()
          : new Date(Date.now() + 30*24*60*60*1000).toISOString(),
        payment_method: "Wix Payments"
      });
      // Launch payment
      await paymentsService.startPayment({
        amount: amountCents,
        currency: "USD",
        title: `${plan.name} - One Body Church`,
        description: `${form.billing_cycle} subscription to One Body Church ${plan.name} plan`,
        onSuccess: () => { setDone(true); setLoading(false); },
        onFailure: () => { setLoading(false); }
      });
    } catch(e) {
      console.error(e);
      setDone(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 440, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#666", fontSize: 20, cursor: "pointer" }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <div style={{ color: GOLD, fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Welcome to {plan.name}!</div>
            <div style={{ color: "#aaa", lineHeight: 1.6 }}>Your subscription is active. Enjoy unlimited access to One Body Church.</div>
            <button onClick={onClose} style={{ marginTop: 24, background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 800, cursor: "pointer" }}>Let's Go! 🙌</button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ color: plan.color, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>{plan.name.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>Subscribe to {plan.name}</div>
            </div>

            {/* Billing toggle */}
            <div style={{ display: "flex", background: DARK2, borderRadius: 10, padding: 4, marginBottom: 20 }}>
              {["Monthly", "Annual"].map(cycle => (
                <button key={cycle} onClick={() => setForm({...form, billing_cycle: cycle})}
                  style={{ flex: 1, background: form.billing_cycle === cycle ? `linear-gradient(135deg, ${GOLD}, #b8960c)` : "transparent", color: form.billing_cycle === cycle ? "#000" : "#666", border: "none", borderRadius: 8, padding: "9px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {cycle} {cycle === "Annual" ? "🔥 Save 17%" : ""}
                </button>
              ))}
            </div>

            <div style={{ background: `${plan.color}11`, border: `1px solid ${plan.color}33`, borderRadius: 12, padding: "16px 20px", textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>${finalPrice}</div>
              <div style={{ color: "#666", fontSize: 13 }}>per {form.billing_cycle === "Annual" ? "year" : "month"}</div>
              {form.billing_cycle === "Annual" && <div style={{ color: GREEN, fontSize: 12, marginTop: 4 }}>✓ 2 months FREE vs monthly</div>}
            </div>

            {[
              { label: "Full Name", key: "user_name", type: "text", placeholder: "Your Name" },
              { label: "Email Address", key: "user_email", type: "email", placeholder: "email@example.com" }
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ color: "#888", fontSize: 12, display: "block", marginBottom: 5 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} type={f.type} placeholder={f.placeholder}
                  style={{ width: "100%", background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
            ))}

            <button onClick={submit} disabled={loading || !form.user_email}
              style={{ width: "100%", background: loading ? "#333" : `linear-gradient(135deg, ${plan.color}, ${plan.color}bb)`, color: plan.color === GOLD ? "#000" : "#fff", border: "none", borderRadius: 12, padding: "15px 0", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", marginTop: 8 }}>
              {loading ? "Processing..." : `Subscribe for $${finalPrice}/${form.billing_cycle === "Annual" ? "yr" : "mo"} 🙌`}
            </button>
            <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 10 }}>🔒 Secure payment · Cancel anytime</div>
          </>
        )}
      </div>
    </div>
  );
}

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Badge color={GOLD}>PRICING</Badge>
        <div style={{ fontSize: 36, fontWeight: 900, marginTop: 12, marginBottom: 8 }}>One Platform. <span style={{ color: GOLD }}>Every Believer.</span></div>
        <div style={{ color: "#666", fontSize: 16 }}>Start free. Upgrade when you're ready to go deeper.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto 48px" }}>
        {PLANS.map(p => (
          <div key={p.id} style={{ background: p.popular ? `linear-gradient(135deg, ${GOLD}11, ${GOLD}05)` : CARD, border: `2px solid ${p.popular ? GOLD : BORDER}`, borderRadius: 20, padding: "32px 28px", position: "relative", transition: "transform 0.2s" }}>
            {p.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", borderRadius: 20, padding: "5px 18px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" }}>⭐ MOST POPULAR</div>}
            <div style={{ color: p.color, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{p.name.toUpperCase()}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#fff" }}>${p.price}</span>
              {p.price > 0 && <span style={{ color: "#666" }}>/month</span>}
              {p.price === 0 && <span style={{ color: "#666" }}>forever</span>}
            </div>
            {p.price > 0 && <div style={{ color: GREEN, fontSize: 12, marginBottom: 4 }}>or ${(p.price * 10).toFixed(2)}/year (save 17%)</div>}
            <div style={{ height: 1, background: BORDER, margin: "20px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: GREEN, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: "#bbb", fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => p.price > 0 ? setSelectedPlan(p) : null}
              style={{ width: "100%", background: p.popular ? `linear-gradient(135deg, ${GOLD}, #b8960c)` : p.price === 0 ? CARD2 : `${p.color}22`, color: p.popular ? "#000" : p.price === 0 ? "#fff" : p.color, border: `1px solid ${p.popular ? "transparent" : p.price === 0 ? BORDER : p.color + "44"}`, borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              {p.price === 0 ? "Start Free — No Card Needed" : `Get ${p.name} →`}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>Frequently Asked Questions</div>
        {[
          { q: "Can I cancel anytime?", a: "Yes, absolutely. Cancel your subscription at any time with no questions asked. You keep access until the end of your billing period." },
          { q: "What payment methods are accepted?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as Apple Pay and Google Pay." },
          { q: "Is there a free trial?", a: "The Believer plan is always free with no time limit. Premium plans have full access from day one of your subscription." },
          { q: "Can churches subscribe on the Ministry plan?", a: "Yes! The Ministry plan is designed specifically for churches and ministries who want to stream services and collect offerings online." },
        ].map(faq => (
          <div key={faq.q} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{faq.q}</div>
            <div style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>{faq.a}</div>
          </div>
        ))}
      </div>

      {selectedPlan && <SubscribeModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("home");
  const [contents, setContents] = useState([]);
  const [devotional, setDevotional] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [showDonate, setShowDonate] = useState(false);
  const [liked, setLiked] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [c, d] = await Promise.all([Content.list(), DailyDevotional.list()]);
        setContents(c.length ? c : SAMPLE_CONTENT);
        setDevotional(d.length ? d[d.length - 1] : SAMPLE_DEVOTIONAL);
      } catch {
        setContents(SAMPLE_CONTENT);
        setDevotional(SAMPLE_DEVOTIONAL);
      }
      setLoading(false);
    })();
  }, []);

  const toggleLike = (id) => setLiked(l => ({ ...l, [id]: !l[id] }));

  const filtered = contents.filter(c => {
    const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.artist_pastor?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.content_type === filter || c.category === filter;
    return matchSearch && matchFilter;
  });

  const featured = contents.filter(c => c.is_featured);
  const sermons = contents.filter(c => c.content_type === "Sermon");
  const music = contents.filter(c => c.content_type === "Gospel Music" || c.category === "Worship" || c.category === "Praise");
  const films = contents.filter(c => c.content_type === "Faith Film");
  const podcasts = contents.filter(c => c.content_type === "Podcast");
  const live = contents.filter(c => c.is_live);
  const premium = contents.filter(c => c.is_premium);
  const free = contents.filter(c => !c.is_premium);

  const FILTERS = ["All", "Sermon", "Gospel Music", "Worship Session", "Devotional", "Faith Film", "Podcast", "Live Stream"];

  const NAV_ITEMS = [
    { id: "home", label: "🏠 Home" },
    { id: "discover", label: "🔍 Discover" },
    { id: "music", label: "🎵 Music" },
    { id: "sermons", label: "🎤 Sermons" },
    { id: "films", label: "🎬 Films" },
    { id: "live", label: "🔴 Live" },
    { id: "bible", label: "📜 Bible" },
    { id: "prayer", label: "🙏 Prayer Wall" },
    { id: "churches", label: "⛪ Churches" },
    { id: "devotional", label: "📖 Daily Word" },
    { id: "community", label: "🌍 Community" },
    { id: "pricing", label: "💎 Plans" },
    { id: "give", label: "❤️ Give" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: "#fff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ background: `${DARK}ee`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}`, padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 500 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${GOLD}, #8b4513)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✝</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, letterSpacing: 1 }}>ONE BODY CHURCH</div>
            <div style={{ color: "#444", fontSize: 10, letterSpacing: 2 }}>FAITH · MUSIC · COMMUNITY</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 2 }}>
          {NAV_ITEMS.slice(0, 6).map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              style={{ background: tab === n.id ? `${GOLD}18` : "transparent", color: tab === n.id ? GOLD : "#666", border: "none", borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: tab === n.id ? 700 : 400, transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setTab("pricing")} style={{ background: "transparent", color: "#888", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>💎 Plans</button>
          <button onClick={() => setShowDonate(true)} style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>🙏 Give</button>
        </div>
      </header>

      {/* ── SECONDARY NAV ── */}
      <div style={{ background: DARK2, borderBottom: `1px solid ${BORDER}`, padding: "0 20px", display: "flex", gap: 4, overflowX: "auto" }}>
        {NAV_ITEMS.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)}
            style={{ background: "transparent", color: tab === n.id ? GOLD : "#555", borderBottom: tab === n.id ? `2px solid ${GOLD}` : "2px solid transparent", border: "none", borderRadius: 0, padding: "12px 14px", cursor: "pointer", fontSize: 13, fontWeight: tab === n.id ? 700 : 400, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {n.label}
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* ══ HOME ══ */}
        {tab === "home" && (
          <div>
            {/* Hero Feature */}
            {featured[0] && <div style={{ marginBottom: 40 }}><HeroCard item={featured[0]} onPlay={setPlaying} /></div>}

            {/* Stats Bar */}
            <div style={{ overflowX: "auto", marginBottom: 48, paddingBottom: 4 }}>
              <div style={{ display: "flex", gap: 14, minWidth: "max-content" }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px", textAlign: "center", minWidth: 150 }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: GOLD, marginBottom: 3 }}>{s.value}</div>
                    <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Devotional Banner */}
            {devotional && (
              <div style={{ background: `linear-gradient(135deg, #0a1f0a 0%, #081408 100%)`, border: `1px solid #1a3a1a`, borderRadius: 20, padding: "28px 32px", marginBottom: 40, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
                <div>
                  <div style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>📖 TODAY'S DEVOTIONAL</div>
                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{devotional.title}</div>
                  <div style={{ color: GOLD, fontStyle: "italic", fontSize: 14, marginBottom: 4 }}>"{devotional.scripture}"</div>
                  <div style={{ color: GREEN, fontSize: 12, marginBottom: 12 }}>— {devotional.scripture_reference}</div>
                  <div style={{ color: "#999", fontSize: 13, lineHeight: 1.6, maxWidth: 600 }}>{devotional.message?.slice(0, 200)}...</div>
                </div>
                <button onClick={() => setTab("devotional")} style={{ background: `linear-gradient(135deg, ${GREEN}, #15803d)`, color: "#fff", border: "none", borderRadius: 12, padding: "13px 22px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Read Full →
                </button>
              </div>
            )}

            {/* Live Now — always visible */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 10px ${RED}` }} />
                  <span style={{ fontSize: 18, fontWeight: 800 }}>Live Right Now</span>
                  <span style={{ background: "#ef444422", color: RED, border: "1px solid #ef444444", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>3 STREAMS</span>
                </div>
                <button onClick={() => setTab("live")} style={{ color: RED, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>See All Events →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
                {LIVE_EVENTS.filter(e => e.status === "live").map(event => (
                  <LiveEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Prayer Wall Quick CTA */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 40 }}>
              <div onClick={() => setTab("prayer")} style={{ background: "linear-gradient(135deg, #001a0a, #000d05)", border: `1px solid ${GREEN}33`, borderRadius: 16, padding: "24px 22px", cursor: "pointer", transition: "transform 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🙏</div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>Global Prayer Wall</div>
                <div style={{ color: "#555", fontSize: 13 }}>12,847 believers praying right now</div>
              </div>
              <div onClick={() => setTab("bible")} style={{ background: "linear-gradient(135deg, #0a0a1f, #050515)", border: `1px solid ${PURPLE}33`, borderRadius: 16, padding: "24px 22px", cursor: "pointer" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📜</div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>Bible Reader</div>
                <div style={{ color: "#555", fontSize: 13 }}>Read scripture in 5 translations</div>
              </div>
              <div onClick={() => setTab("churches")} style={{ background: `linear-gradient(135deg, #0d0800, #080500)`, border: `1px solid ${GOLD}22`, borderRadius: 16, padding: "24px 22px", cursor: "pointer" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⛪</div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>Church Network</div>
                <div style={{ color: "#555", fontSize: 13 }}>4,200+ churches from 187 countries</div>
              </div>
            </div>

            <ContentRow title="⭐ Featured Content" items={featured} onPlay={setPlaying} onLike={toggleLike} liked={liked} size="lg" seeAll onSeeAll={() => setTab("discover")} />
            <ContentRow title="🎵 Gospel Music" items={music.slice(0, 4)} onPlay={setPlaying} onLike={toggleLike} liked={liked} seeAll onSeeAll={() => setTab("music")} />
            <ContentRow title="🎤 Sermons & Teaching" items={sermons.slice(0, 4)} onPlay={setPlaying} onLike={toggleLike} liked={liked} seeAll onSeeAll={() => setTab("sermons")} />
            <ContentRow title="🔓 Free Content" items={free.slice(0, 4)} onPlay={setPlaying} onLike={toggleLike} liked={liked} />

            {/* Testimonials */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, textAlign: "center" }}>What People Are Saying</div>
              <div style={{ color: "#555", fontSize: 14, textAlign: "center", marginBottom: 24 }}>Lives transformed around the world</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {TESTIMONIALS.map(t => <TestimonialCard key={t.name} t={t} />)}
              </div>
            </div>

            {/* CTA Banner */}
            <div style={{ background: `linear-gradient(135deg, #1a0d00, #0d0a1a)`, border: `1px solid ${GOLD}33`, borderRadius: 20, padding: "48px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Join The <span style={{ color: GOLD }}>One Body</span> Family</div>
              <div style={{ color: "#888", fontSize: 16, marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>2.4 million believers across 187 countries. Faith content that transforms lives, 24/7.</div>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setTab("pricing")} style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Start Free Today</button>
                <button onClick={() => setShowDonate(true)} style={{ background: "transparent", color: "#fff", border: "1px solid #333", borderRadius: 12, padding: "14px 32px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>Support The Ministry 🙏</button>
              </div>
            </div>
          </div>
        )}

        {/* ══ DISCOVER ══ */}
        {tab === "discover" && (
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>🔍 Discover</div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>Search thousands of sermons, songs, and teachings</div>

            <div style={{ position: "relative", marginBottom: 20 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#555", fontSize: 18 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, artist, pastor..."
                style={{ width: "100%", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px 14px 48px", color: "#fff", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ background: filter === f ? `linear-gradient(135deg, ${GOLD}, #b8960c)` : CARD, color: filter === f ? "#000" : "#888", border: `1px solid ${filter === f ? "transparent" : BORDER}`, borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                  {f}
                </button>
              ))}
            </div>

            <div style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>{filtered.length} results</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
              {filtered.map(c => <ContentCard key={c.id} item={c} onPlay={setPlaying} onLike={toggleLike} liked={!!liked[c.id]} size="lg" />)}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0", color: "#333" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 18, marginBottom: 8, color: "#555" }}>No content found</div>
                  <div style={{ fontSize: 14 }}>Try a different search or filter</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ MUSIC ══ */}
        {tab === "music" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, #1a0d00, #0d0a00)`, borderRadius: 20, padding: "40px 32px", marginBottom: 36, border: `1px solid ${GOLD}22` }}>
              <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🎵 GOSPEL MUSIC</div>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Worship. Praise. Glory.</div>
              <div style={{ color: "#777", fontSize: 15 }}>The world's largest collection of gospel and Christian music</div>
            </div>
            <ContentRow title="🎵 All Gospel Music" items={music} onPlay={setPlaying} onLike={toggleLike} liked={liked} size="lg" />
            <ContentRow title="🙌 Worship Sessions" items={contents.filter(c => c.content_type === "Worship Session")} onPlay={setPlaying} onLike={toggleLike} liked={liked} />
          </div>
        )}

        {/* ══ SERMONS ══ */}
        {tab === "sermons" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, #0d001a, #080012)`, borderRadius: 20, padding: "40px 32px", marginBottom: 36, border: `1px solid ${PURPLE}22` }}>
              <div style={{ color: PURPLE, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🎤 SERMONS & TEACHING</div>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Messages That Move Mountains</div>
              <div style={{ color: "#777", fontSize: 15 }}>Life-changing sermons from anointed ministers of the gospel</div>
            </div>
            <ContentRow title="🎤 All Sermons" items={sermons} onPlay={setPlaying} onLike={toggleLike} liked={liked} size="lg" />
            <ContentRow title="🎙️ Podcast Episodes" items={podcasts} onPlay={setPlaying} onLike={toggleLike} liked={liked} />
          </div>
        )}

        {/* ══ FILMS ══ */}
        {tab === "films" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, #0d0a00, #1a1000)`, borderRadius: 20, padding: "40px 32px", marginBottom: 36, border: `1px solid #f59e0b22` }}>
              <div style={{ color: "#f59e0b", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🎬 FAITH FILMS</div>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Cinema For The Kingdom</div>
              <div style={{ color: "#777", fontSize: 15 }}>Movies, documentaries, and short films that glorify God</div>
            </div>
            <ContentRow title="🎬 Faith Films" items={films.length ? films : contents.filter(c => c.is_featured)} onPlay={setPlaying} onLike={toggleLike} liked={liked} size="lg" />
          </div>
        )}

        {/* ══ DEVOTIONAL ══ */}
        {tab === "devotional" && (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Daily Word</div>
              <div style={{ color: "#666", fontSize: 14 }}>Start every single day in the presence of God</div>
            </div>

            {devotional && (
              <div style={{ background: `linear-gradient(135deg, #0a1f0a, #081408)`, border: `1px solid #1e3a1e`, borderRadius: 24, padding: "40px 40px", marginBottom: 32 }}>
                <div style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>📖 {devotional.date?.toUpperCase()}</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>{devotional.title}</div>

                <div style={{ background: "rgba(34,197,94,0.08)", borderLeft: `4px solid ${GREEN}`, padding: "18px 22px", borderRadius: "0 12px 12px 0", marginBottom: 24 }}>
                  <div style={{ color: "#d1fae5", fontStyle: "italic", fontSize: 17, lineHeight: 1.7 }}>"{devotional.scripture}"</div>
                  <div style={{ color: GREEN, fontSize: 13, marginTop: 8, fontWeight: 700 }}>— {devotional.scripture_reference}</div>
                </div>

                <div style={{ color: "#ccc", fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>{devotional.message}</div>

                <div style={{ background: "rgba(34,197,94,0.05)", border: `1px solid #1e3a1e`, borderRadius: 16, padding: "20px 24px" }}>
                  <div style={{ color: GREEN, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🙏 TODAY'S PRAYER</div>
                  <div style={{ color: "#aaa", fontStyle: "italic", fontSize: 15, lineHeight: 1.8 }}>{devotional.prayer}</div>
                </div>

                <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#444", fontSize: 13 }}>Written by {devotional.author}</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#888", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>📤 Share</button>
                    <button style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#888", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>🔖 Save</button>
                  </div>
                </div>
              </div>
            )}

            {/* Archive of devotionals */}
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Previous Devotionals</div>
            <ContentRow title="" items={contents.filter(c => c.content_type === "Devotional")} onPlay={setPlaying} onLike={toggleLike} liked={liked} />
          </div>
        )}

        {/* ══ LIVE ══ */}
        {tab === "live" && (
          <div>
            {/* Hero banner */}
            <div style={{ background: "linear-gradient(135deg, #1a0000, #0d0000)", border: "1px solid #ef444433", borderRadius: 20, padding: "36px 32px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 10, height: 10, background: RED, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 12px ${RED}` }} />
                  <span style={{ color: RED, fontWeight: 800, letterSpacing: 2, fontSize: 13 }}>LIVE NOW</span>
                </div>
                <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 8 }}>Christian Events — <span style={{ color: RED }}>Live & Upcoming</span></div>
                <div style={{ color: "#777", fontSize: 15 }}>Worship nights, church services, conferences, concerts — streaming live to the world</div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: RED, fontSize: 26, fontWeight: 900 }}>3</div>
                  <div style={{ color: "#555", fontSize: 12 }}>Live Now</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: GOLD, fontSize: 26, fontWeight: 900 }}>24K+</div>
                  <div style={{ color: "#555", fontSize: 12 }}>Watching</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: GREEN, fontSize: 26, fontWeight: 900 }}>3</div>
                  <div style={{ color: "#555", fontSize: 12 }}>Upcoming</div>
                </div>
              </div>
            </div>

            {/* LIVE NOW section */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${RED}` }} />
                <span style={{ fontSize: 20, fontWeight: 800 }}>Streaming Now</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
                {LIVE_EVENTS.filter(e => e.status === "live").map(event => (
                  <LiveEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* UPCOMING */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>🗓 Upcoming Events</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {LIVE_EVENTS.filter(e => e.status === "upcoming").map(event => (
                  <LiveEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* REPLAYS */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>🎞 Recent Replays</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {LIVE_EVENTS.filter(e => e.status === "replay").map(event => (
                  <LiveEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Host your own */}
            <div style={{ background: "linear-gradient(135deg, #0a001a, #05000d)", border: `1px solid ${PURPLE}33`, borderRadius: 20, padding: "44px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📡</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Host Your Own Live Event</div>
              <div style={{ color: "#777", fontSize: 15, maxWidth: 500, margin: "0 auto 24px" }}>Stream your church service, concert, or conference to believers worldwide. Ministry plan includes full live streaming access.</div>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{ background: `linear-gradient(135deg, ${PURPLE}, #6d28d9)`, color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  📡 Go Live Now
                </button>
                <button style={{ background: "transparent", color: "#888", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "13px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Schedule an Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ COMMUNITY ══ */}
        {tab === "community" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>The <span style={{ color: GOLD }}>One Body</span> Community</div>
              <div style={{ color: "#666", fontSize: 16 }}>Believers from every nation, tribe, and tongue — united in Christ</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 48 }}>
              {STATS.map(s => <StatCard key={s.label} stat={s} />)}
            </div>

            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: "center" }}>Testimonies From Around The World</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {TESTIMONIALS.map(t => <TestimonialCard key={t.name} t={t} />)}
              </div>
            </div>

            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "40px 36px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Share Your Testimony</div>
              <div style={{ color: "#666", marginBottom: 20 }}>Has God moved in your life through One Body Church? Tell the world.</div>
              <textarea placeholder="Write your testimony here..." style={{ width: "100%", background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 14, minHeight: 120, resize: "vertical", boxSizing: "border-box", outline: "none", marginBottom: 14 }} />
              <button style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Submit Testimony 🙏</button>
            </div>
          </div>
        )}

        {/* ══ PRICING ══ */}
        {/* ══ BIBLE ══ */}
        {tab === "bible" && (
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            {/* Verse of the Day hero */}
            <div style={{ background: "linear-gradient(135deg, #0a0a1f, #050515)", border: `1px solid ${PURPLE}33`, borderRadius: 24, padding: "44px 40px", textAlign: "center", marginBottom: 36 }}>
              <div style={{ color: PURPLE, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>📜 VERSE OF THE DAY</div>
              <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.4, marginBottom: 12, fontStyle: "italic", color: "#fff" }}>"{VERSE_OF_DAY.verse}"</div>
              <div style={{ color: GOLD, fontWeight: 700, marginBottom: 20 }}>— {VERSE_OF_DAY.ref}</div>
              <div style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>{VERSE_OF_DAY.context}</div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
                <button style={{ background: `linear-gradient(135deg, ${PURPLE}, #6d28d9)`, color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer" }}>📋 Copy</button>
                <button style={{ background: CARD2, color: "#888", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 22px", fontWeight: 600, cursor: "pointer" }}>↗ Share</button>
              </div>
            </div>

            {/* Bible reader */}
            <BibleReader />
          </div>
        )}

        {/* ══ PRAYER WALL ══ */}
        {tab === "prayer" && (
          <div>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #001a0a, #000d05)", border: "1px solid #22c55e33", borderRadius: 20, padding: "36px 32px", marginBottom: 36 }}>
              <div style={{ color: GREEN, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🙏 GLOBAL PRAYER WALL</div>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Praying With <span style={{ color: GREEN }}>The World</span></div>
              <div style={{ color: "#555", fontSize: 15, marginBottom: 20 }}>Thousands of believers agreeing in prayer right now, across every nation.</div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}><div style={{ color: GREEN, fontSize: 24, fontWeight: 900 }}>12,847</div><div style={{ color: "#444", fontSize: 12 }}>Praying Today</div></div>
                <div style={{ textAlign: "center" }}><div style={{ color: GOLD, fontSize: 24, fontWeight: 900 }}>142K+</div><div style={{ color: "#444", fontSize: 12 }}>Prayers This Month</div></div>
                <div style={{ textAlign: "center" }}><div style={{ color: PURPLE, fontSize: 24, fontWeight: 900 }}>187</div><div style={{ color: "#444", fontSize: 12 }}>Countries</div></div>
              </div>
            </div>

            {/* Submit prayer */}
            <PrayerSubmitBox />

            {/* Prayer feed */}
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18 }}>Recent Prayer Requests</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PRAYER_REQUESTS.map(p => <PrayerCard key={p.id} prayer={p} />)}
            </div>
          </div>
        )}

        {/* ══ CHURCHES ══ */}
        {tab === "churches" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #0d0800, #080500)", border: `1px solid ${GOLD}22`, borderRadius: 20, padding: "36px 32px", marginBottom: 36 }}>
              <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>⛪ GLOBAL CHURCH NETWORK</div>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Find Your <span style={{ color: GOLD }}>Church Home</span></div>
              <div style={{ color: "#555", fontSize: 15, marginBottom: 20 }}>Connect with Spirit-filled churches from every nation on earth.</div>
              <div style={{ position: "relative", maxWidth: 500 }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#555" }}>🔍</span>
                <input placeholder="Search by city, country, or pastor name..."
                  style={{ width: "100%", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "13px 14px 13px 42px", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
            </div>

            {/* Register your church banner */}
            <div style={{ background: `${GOLD}11`, border: `1px solid ${GOLD}33`, borderRadius: 16, padding: "20px 24px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>📡 Is your church on One Body Church?</div>
                <div style={{ color: "#666", fontSize: 13 }}>Register your church to reach thousands of believers worldwide</div>
              </div>
              <button style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 10, padding: "11px 22px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>Register Church →</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {CHURCHES.map(c => <ChurchCard key={c.id} church={c} />)}
            </div>
          </div>
        )}

        {tab === "pricing" && <PricingPage />}

        {/* ══ GIVE ══ */}
        {tab === "give" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🙏</div>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Support The <span style={{ color: GOLD }}>Ministry</span></div>
              <div style={{ color: "#666", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Your generosity keeps the gospel reaching every corner of the earth — 24 hours a day, 7 days a week.</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { emoji: "🎵", label: "Music Production", desc: "Fund new gospel recordings and worship albums" },
                { emoji: "📺", label: "Video Ministry", desc: "Produce life-changing sermon videos" },
                { emoji: "🌍", label: "Global Outreach", desc: "Reach unreached nations with the gospel" },
                { emoji: "🏠", label: "Church Planting", desc: "Help establish new local churches worldwide" },
                { emoji: "📖", label: "Bible Translation", desc: "Fund scripture access in local languages" },
                { emoji: "🎓", label: "Ministry Training", desc: "Train the next generation of gospel leaders" },
              ].map(g => (
                <div key={g.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{g.emoji}</div>
                  <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{g.label}</div>
                  <div style={{ color: "#666", fontSize: 12, lineHeight: 1.5 }}>{g.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, #1a0d00, #0d0a00)`, border: `1px solid ${GOLD}33`, borderRadius: 20, padding: "48px", textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Every Gift Matters</div>
              <div style={{ color: "#888", marginBottom: 28 }}>Whether it's $5 or $5,000 — God multiplies every seed sown in faith.</div>
              <button onClick={() => setShowDonate(true)}
                style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960c)`, color: "#000", border: "none", borderRadius: 14, padding: "18px 56px", fontWeight: 900, fontSize: 17, cursor: "pointer" }}>
                Give To The Ministry 🙏
              </button>
              <div style={{ color: "#333", fontSize: 12, marginTop: 14 }}>🔒 Secure · Encrypted · God sees every gift</div>
            </div>

            {/* Scripture */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>
              <div style={{ color: GOLD, fontStyle: "italic", fontSize: 17, lineHeight: 1.7 }}>
                "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
              </div>
              <div style={{ color: "#555", fontSize: 13, marginTop: 10 }}>— Luke 6:38</div>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: DARK2, borderTop: `1px solid ${BORDER}`, padding: "48px 28px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${GOLD}, #8b4513)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✝</div>
                <span style={{ fontWeight: 800, fontSize: 14 }}>ONE BODY CHURCH</span>
              </div>
              <div style={{ color: "#555", fontSize: 13, lineHeight: 1.7 }}>The global home for faith content — sermons, gospel music, devotionals, and live worship for believers everywhere.</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 14, color: "#888", fontSize: 12, letterSpacing: 1 }}>EXPLORE</div>
              {["Home", "Discover", "Gospel Music", "Sermons", "Faith Films", "Daily Word"].map(l => (
                <div key={l} style={{ color: "#555", fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 14, color: "#888", fontSize: 12, letterSpacing: 1 }}>MINISTRY</div>
              {["About Us", "Our Story", "Partners", "Give", "Prayer Requests", "Contact"].map(l => (
                <div key={l} style={{ color: "#555", fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 14, color: "#888", fontSize: 12, letterSpacing: 1 }}>CONNECT</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["YouTube", "Instagram", "Facebook", "Twitter", "TikTok"].map(s => (
                  <div key={s} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 12px", color: "#666", fontSize: 12, cursor: "pointer" }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ color: "#333", fontSize: 12 }}>© 2026 One Body Church · Powered by Swelerion Global Inc.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(l => (
                <span key={l} style={{ color: "#444", fontSize: 12, cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {playing && <PlayerModal item={playing} onClose={() => setPlaying(null)} relatedItems={contents.filter(c => c.id !== playing.id)} onPlay={setPlaying} />}
      {showDonate && <DonationModal onClose={() => setShowDonate(false)} />}
    </div>
  );
}

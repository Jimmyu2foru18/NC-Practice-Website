import { GoogleGenAI } from "@google/genai";
import { NewsItem } from "../types";

// Helper to initialize AI only when needed, preventing startup crashes if key is missing
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const searchSite = async (query: string): Promise<string> => {
  const ai = getAI();
  if (!ai) {
    return "Search is currently unavailable (API Key missing). Please check your configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are the Official AI Assistant for the Nassau County Website.
    
    Your capabilities include:
    1. **General Information**: Helping residents find departments, news, and services.
    2. **Form Finder**: If a user asks for a form (e.g., "building permit", "marriage license"), explain exactly where to find it or summarize the steps.
    3. **Itinerary Planner**: If a user is a visitor (e.g., "plan a day trip"), suggest a list of parks, museums, and beaches from the website's content.

    The website has the following sections:
    - Home: Quick links, news.
    - Government: Directory of departments (Police, Parks, Health, etc.), County Executive.
    - Services: Residents, Business, Visitors categories.
    - News & Alerts: Latest updates.
    - Events: Community calendar.
    - Map: Interactive county map / Destination Explorer.
    - Emergency: Police, Fire, Hospital info.
    - Transportation: Bus, Rail, and Air info.
    - Contact: Feedback forms.

    **Style Guidelines**:
    - Keep answers concise (max 3-4 sentences unless listing an itinerary).
    - Be professional, welcoming, and authoritative.
    - If suggesting a page, mention the section name (e.g., "Visit the Services section").
    
    User Query: ${query}`;

    const response = await ai.models.generateContent({
      model,
      contents: `User Query: ${query}`,
      config: {
        systemInstruction,
        temperature: 0.4,
        maxOutputTokens: 300,
      }
    });

    return response.text || "I couldn't find specific information on that. Please try the Services or Government sections.";
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return "An error occurred while searching. Please try again later.";
  }
};

export const generateSafetyAlert = async (): Promise<string> => {
    const ai = getAI();
    if (!ai) return "No active alerts at this time.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate a realistic, short, one-sentence public safety placeholder alert for a county website (e.g., road closure due to weather or maintenance).",
        });
        return response.text || "Main Street closed for maintenance until 5 PM.";
    } catch (e) {
        return "Standard Operations - No Active Alerts";
    }
}

// Helper to generate dynamic dates for fallback data so the site always looks fresh
const getMockDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Fallback news data grouped by source
const mockNews: NewsItem[] = [
    // News 12
    { id: '1', title: 'Nassau Budget Talks Continue', source: 'News 12 Long Island', date: getMockDate(0), category: 'Government', summary: 'Legislators debate new fiscal proposals for the upcoming year.', url: '#' },
    { id: '2', title: 'Eisenhower Park Renovations Complete', source: 'News 12 Long Island', date: getMockDate(1), category: 'Community', summary: 'New fields open to the public this weekend.', url: '#' },
    { id: '3', title: 'Fire in Hempstead Controlled', source: 'News 12 Long Island', date: getMockDate(2), category: 'Safety', summary: 'Firefighters quickly extinguished a blaze on Main St.', url: '#' },
    // Newsday
    { id: '4', title: 'Housing Market Trends in Nassau', source: 'Newsday', date: getMockDate(0), category: 'Business', summary: 'Real estate prices see a slight stabilization in Q3.', url: '#' },
    { id: '5', title: 'Local High School Wins Championship', source: 'Newsday', date: getMockDate(1), category: 'Sports', summary: 'Massapequa takes home the state trophy.', url: '#' },
    // NYT
    { id: '7', title: 'Nassau Politics in Spotlight', source: 'New York Times', date: getMockDate(1), category: 'Politics', summary: 'How local elections could shift the balance of power.', url: '#' },
    // LI Herald
    { id: '9', title: 'Community Fundraiser Success', source: 'LI Herald', date: getMockDate(2), category: 'Community', summary: 'Locals raise $50k for library repairs.', url: '#' },
    // Patch
    { id: '11', title: 'Police Blotter: Weekly Recap', source: 'Patch', date: getMockDate(1), category: 'Safety', summary: 'Summary of incidents in the 3rd Precinct.', url: '#' },
];

export const fetchRealNews = async (limit: number = 50): Promise<NewsItem[]> => {
  const ai = getAI();
  if (!ai) {
     return mockNews;
  }
  
  try {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeString = today.toLocaleTimeString('en-US');
    const shortDateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    const model = 'gemini-2.5-flash';
    // Requesting a larger batch of news
    const prompt = `You are a news aggregator API. Current Date: ${dateString}. Current Time: ${timeString}.
    
    Perform a Google Search to find REAL, RECENT news articles related to Nassau County, NY.
    
    CRITICAL:
    - Prioritize news from TODAY (${dateString}) and YESTERDAY. The user wants the absolute latest updates.
    - If there is breaking news happening right now, prioritize it.
    
    Sources to check:
    1. News 12 Long Island
    2. Newsday
    3. New York Times
    4. LI Herald
    5. Patch
    6. CBS New York / NBC New York

    Attempt to find up to 8 distinct articles for EACH source.
    
    Return a raw JSON array (no Markdown, no code blocks).
    
    JSON Schema per item:
    {
      "id": "unique-id",
      "title": "Article Headline",
      "source": "Exact Source Name",
      "date": "Date string (e.g. Nov 02). MUST be the real publication date.",
      "category": "Category (Government, Community, Safety, Business, Sports, Lifestyle, Weather)",
      "summary": "Brief summary (1-2 sentences)",
      "url": "Article URL"
    }`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    let text = response.text || "[]";
    // Sanitize response to ensure it's valid JSON
    // Sometimes the model wraps JSON in markdown blocks ```json ... ```
    const match = text.match(/\[.*\]/s);
    if (match) {
        text = match[0];
    }
    
    try {
        const newsItems = JSON.parse(text);
        if (Array.isArray(newsItems) && newsItems.length > 0) {
             return newsItems.map((item, index) => ({
                id: item.id || `gen-${index}-${Date.now()}`,
                title: item.title || "Untitled News",
                source: item.source || "Nassau News",
                date: item.date || today.toLocaleDateString('en-US', shortDateOptions),
                category: item.category || "General",
                summary: item.summary || "Click to read full article.",
                url: item.url || "#",
                image: item.image
            }));
        }
        return mockNews;
    } catch (e) {
        console.warn("Failed to parse news JSON", e);
        return mockNews;
    }

  } catch (error) {
    console.error("News fetch error", error);
    return mockNews;
  }
}
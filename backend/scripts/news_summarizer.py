import json
import re
import os
from datetime import datetime
import feedparser
from transformers import pipeline

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=-1
)

RSS_FEEDS = [
    {"url": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en", "source": "Google News - Top Stories"},
    {"url": "https://news.google.com/rss/search?q=technology&hl=en-US&gl=US&ceid=US:en", "source": "Google News - Technology"},
    {"url": "https://news.google.com/rss/search?q=business&hl=en-US&gl=US&ceid=US:en", "source": "Google News - Business"}
]

def clean_text(text):
    """Remove HTML tags and extra spaces"""
    text = re.sub('<.*?>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def fetch_articles():
    """Fetch top news articles from RSS feeds"""
    articles = []
    for feed_info in RSS_FEEDS:
        feed = feedparser.parse(feed_info["url"])
        for entry in feed.entries[:5]:  # Limit per source for token limit
            articles.append({
                "title": entry.title,
                "content": clean_text(entry.summary),
                "source": feed_info["source"]
            })
    return articles

def build_daily_prompt(articles):
    """
    Combines all articles into one structured text for summarization
    """
    combined_text = ""
    for article in articles:
        combined_text += f"Title: {article['title']}\nContent: {article['content']}\n\n"

    prompt = f"""
DAILY NEWS BRIEFING

{combined_text}

SUMMARY:
"""
    return prompt[:2000]

def summarize_articles(articles):
    if not articles:
        return "No articles found today."

    prompt = build_daily_prompt(articles)

    result = summarizer(
        prompt,
        max_length=180,
        min_length=60,
        do_sample=False,
        truncation=True
    )

    summary = result[0]["summary_text"].replace("SUMMARY:", "").strip()
    return summary

def build_response(summary):
    return {
        "title": "Daily News Summary",
        "summary": summary,
        "source": "Multiple News Sources",
        "published_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

if __name__ == "__main__":
    try:
        articles = fetch_articles()
        summary = summarize_articles(articles)
        response = build_response(summary)
        print(json.dumps(response, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        exit(1)
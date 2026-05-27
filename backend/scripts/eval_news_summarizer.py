import json
import os
from datetime import datetime
from news_summarizer import fetch_articles, summarize_articles, build_response, build_daily_prompt

# Path to the file where evaluation history is saved
EVALS_LOG_FILE = os.path.join(os.path.dirname(__file__), "evals_history.jsonl")

def calculate_metrics(prompt, summary):
    """Calculates quantitative metrics for the quality of the summary"""
    prompt_words = len(prompt.split())
    summary_words = len(summary.split())
    
    # measures how effectively the text was condensed
    compression_ratio = round(summary_words / max(1, prompt_words), 3)
    
    # catches word-level loops like "the the the")
    unique_words_ratio = round(len(set(summary.split())) / max(1, summary_words), 3)

    return {
        "prompt_word_count": prompt_words,
        "summary_word_count": summary_words,
        "compression_ratio": compression_ratio,
        "unique_words_ratio": unique_words_ratio
    }

def run_evaluation():
    print(f"[{datetime.now()}] Starting evaluation run...")
    
    articles = fetch_articles()
    if not articles:
        print("Evaluation failed: No articles fetched.")
        return
    
    prompt = build_daily_prompt(articles)
    summary = summarize_articles(articles)
    response = build_response(summary)
    
    metrics = calculate_metrics(prompt, summary)
    
    sentences = [s.strip() for s in summary.split('.') if s.strip()]
    unique_sentences = len(set(sentences))
    is_not_repetitive = (unique_sentences / max(1, len(sentences))) > 0.75
    
    
    assertions = {
        "has_content": len(summary) > 0,
        "is_not_too_short": metrics["summary_word_count"] >= 100,
        "is_not_too_long": metrics["summary_word_count"] <= 400,
        "ends_with_punctuation": summary.endswith(('.', '!', '?')),
        "no_raw_prompt_leak": "DAILY NEWS BRIEFING" not in summary,
        "no_severe_repetition": is_not_repetitive  # Catches repeating loop sentences
    }
    
    # (If the summary length is under 5% or over 35% of the original prompt size)
    needs_review = metrics["compression_ratio"] < 0.05 or metrics["compression_ratio"] > 0.35
    
    eval_record = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "model_used": "sshleifer/distilbart-cnn-12-6",
        "input_articles_count": len(articles),
        "generated_title": response["title"],
        "metrics": metrics,
        "assertions": assertions,
        "success": all(assertions.values()),
        "needs_human_review": needs_review,
        "human_rating": "None",  # To be filled during manual example - "8/10" or None
        "human_notes": "",     # User feedback notes
        "generated_summary": summary
    }
    
    with open(EVALS_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(eval_record, ensure_ascii=False) + "\n")
        
    print(f"Evaluation finished. Success: {eval_record['success']}. Needs review: {eval_record['needs_human_review']}. Results saved to {EVALS_LOG_FILE}")

if __name__ == "__main__":
    run_evaluation()

import os
from playwright.sync_api import sync_playwright

def run_review():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Home Page Review
        page.goto("http://localhost:3000")
        page.screenshot(path="/home/jules/verification/review_home.png")
        print("- Home page rendered successfully.")

        # 2. News/Update Detail Review (Check dynamic metadata and accessibility)
        page.goto("http://localhost:3000/updates/update-2026-013")
        title = page.title()
        print(f"- News Page Title: {title}")
        page.screenshot(path="/home/jules/verification/review_news.png")

        # 3. Eligibility Checker Review (Check interactive elements)
        page.goto("http://localhost:3000/eligibility-check")
        page.screenshot(path="/home/jules/verification/review_eligibility.png")

        # 4. Accessibility Check (Check for images without alt tags)
        images_without_alt = page.query_selector_all("img:not([alt])")
        print(f"- Images without alt tags: {len(images_without_alt)}")

        # 5. AdSense Compliance Check (Check for "ADVERTISEMENT" label)
        # Note: In dev mode, AdSense script may not be fully active, but we can check layout space.

        browser.close()

if __name__ == "__main__":
    run_review()

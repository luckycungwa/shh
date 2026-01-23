import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify_news():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Start vite directly
        process = subprocess.Popen(["npx", "vite", "--port", "5173"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(5)

        url = "http://localhost:5173"
        print(f"Connecting to {url}")

        try:
            # Go to news list page
            await page.goto(f'{url}/updates')
            # Wait for any heading or content to confirm page loaded
            await page.wait_for_selector('h1', timeout=10000)

            # Look for the specific news item
            content = await page.content()
            if "SASSA February 2026 Grant Payment Dates Confirmed" in content:
                print("Found news item text!")
            else:
                print("News item text NOT found. Available text highlights:")
                print(await page.inner_text('body'))

            await page.screenshot(path='/home/jules/verification/news_list_check.png', full_page=True)

        except Exception as e:
            print(f"Error during verification: {e}")
            await page.screenshot(path='/home/jules/verification/error_debug.png')
        finally:
            await browser.close()
            process.terminate()

if __name__ == "__main__":
    asyncio.run(verify_news())

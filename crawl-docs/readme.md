* cài đặt crawl4ai và kiểm tra cài đặt
```bash
pip install -U crawl4ai
crawl4ai-setup
crawl4ai-doctor
```
* fix browser nếu lỗi
```bash
python -m playwright install --with-deps chromium
```
* crawl cơ bản bằng python async
```python
import asyncio
from crawl4ai import AsyncWebCrawler
async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(
            url="https://www.nbcnews.com/business"
        )
        print(result.markdown)
asyncio.run(main())
```
* crawl nhiều trang bằng cli
```bash
crwl https://www.nbcnews.com/business -o markdown
```
* crawl sâu nhiều page (bfs)
```bash
crwl https://docs.crawl4ai.com --deep-crawl bfs --max-pages 10
```
* extract dữ liệu bằng css schema (không cần llm)
```python
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, JsonCssExtractionStrategy
schema = {
    "name": "example",
    "baseSelector": "div",
    "fields": [
        {"name": "title", "selector": "h1", "type": "text"}
    ]
}
strategy = JsonCssExtractionStrategy(schema)
async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(
            url="https://example.com",
            config=CrawlerRunConfig(extraction_strategy=strategy)
        )
        print(result.extracted_content)
```
* extract bằng llm (optional)
```python
from crawl4ai import LLMExtractionStrategy, LLMConfig
LLMExtractionStrategy(
    llm_config=LLMConfig(provider="openai/gpt-4o", api_token="YOUR_KEY"),
    schema=YourSchema,
    extraction_type="schema",
    instruction="extract structured data"
)
```
* rule vận hành tối thiểu
```text
crawl -> markdown -> filter -> optional extraction -> pipeline
```

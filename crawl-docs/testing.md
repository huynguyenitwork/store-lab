## quick startt
* crawl 1 trang bằng cli
```bash
crwl https://mikro-orm.io/docs/ -o markdown > docs-one.md
```
* crawl sâu nhiều page (bfs)
```bash
crwl https://mikro-orm.io/docs/ --deep-crawl bfs --max-pages 10 -o markdown > docs-multil.md
```
## tùy chỉnh
* crawl full page
```bash
crwl https://mikro-orm.io/docs --bypass-cache --verbose --deep-crawl dfs --max-pages 100 -o markdown > docs-depth.md
```
* crawl chỉ lấy phần thực hành và sàng lọc
```bash
crwl https://mikro-orm.io/docs/guide --deep-crawl dfs --max-pages 50 -o markdown > docs-guide.md
```

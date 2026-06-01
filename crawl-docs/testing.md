* crawl 1 trang bằng cli
```bash
crwl https://mikro-orm.io/docs/ -o markdown > docs-one.md
```
* crawl sâu nhiều page (bfs)
```bash
crwl https://mikro-orm.io/docs/ --deep-crawl bfs --max-pages 10 -o markdown > docs-multil.md
```